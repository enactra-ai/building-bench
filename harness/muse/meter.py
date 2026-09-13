#!/usr/bin/env python3
"""Transparent Meta Responses proxy for metered Muse Spark benchmarks.

Muse Code's ``ultra`` client selection sends ``xhigh`` on the wire.  For the
explicit Max benchmark lanes, this proxy changes only the selected root
model's ``xhigh`` requests to ``max``. Auxiliary reminder-agent requests keep
the effort selected by Muse. Every response is logged with its provider usage
and an auditable cost calculation, while the Muse JSONL trajectory remains in
``agent.stdout``.
"""

from __future__ import annotations

import argparse
import hashlib
import http.server
import json
import pathlib
import ssl
import threading
import time
import urllib.error
import urllib.request
import uuid
from typing import Any


UPSTREAM = "https://api.meta.ai"
DEFAULT_REWRITE_MODEL = "muse-spark-1.3"
RATES = {"input": 1.25, "cached_input": 0.15, "output": 4.25}
PRICING_NOTE = (
    "Meta published Muse Spark card, shared by versions 1.1-1.3 as of "
    "2026-08-25; effort-specific price not separately published"
)
IMAGE_GUARD_LIMIT = 14_000_000
IMAGE_GUARD_TARGET = 12_000_000
IMAGE_OMITTED = (
    "[Historical preview image omitted by the audited request-size guard; "
    "a newer preview remains available.]"
)


def json_bytes(payload: Any) -> bytes:
    """Serialize the same compact UTF-8 JSON shape emitted by Muse Code."""
    return json.dumps(payload, separators=(",", ":"), ensure_ascii=False).encode()


def guard_image_history(
    payload: dict[str, Any],
    limit: int = IMAGE_GUARD_LIMIT,
    target: int = IMAGE_GUARD_TARGET,
) -> tuple[bytes, dict[str, Any]]:
    """Drop superseded preview images only when the wire body is unsafe.

    The newest image-bearing message is always retained.  Older image content
    is replaced with an explicit marker, while all text, reasoning, tool calls,
    and tool outputs remain in their original order.
    """
    before = json_bytes(payload)
    inputs = payload.get("input")
    groups: list[tuple[int, list[int]]] = []
    if isinstance(inputs, list):
        for input_index, item in enumerate(inputs):
            content = item.get("content") if isinstance(item, dict) else None
            if not isinstance(content, list):
                continue
            image_indexes = [
                index
                for index, part in enumerate(content)
                if isinstance(part, dict) and part.get("type") == "input_image"
            ]
            if image_indexes:
                groups.append((input_index, image_indexes))
    metadata: dict[str, Any] = {
        "policy": "drop-oldest-preview-groups/1",
        "limit_bytes": limit,
        "target_bytes": target,
        "applied": False,
        "bytes_before": len(before),
        "bytes_after": len(before),
        "image_groups_before": len(groups),
        "images_before": sum(len(indexes) for _, indexes in groups),
        "removed_groups": [],
    }
    if len(before) <= limit or len(groups) < 2:
        metadata["images_after"] = metadata["images_before"]
        return before, metadata

    removed = 0
    body = before
    # Keep the newest preview group at full fidelity.  Remove whole older
    # batches until there is comfortable headroom below the observed boundary.
    for input_index, image_indexes in groups[:-1]:
        content = inputs[input_index]["content"]
        image_digests = []
        encoded_bytes = 0
        for content_index in image_indexes:
            part = content[content_index]
            image_url = str(part.get("image_url") or "")
            encoded = image_url.encode()
            encoded_bytes += len(encoded)
            image_digests.append(hashlib.sha256(encoded).hexdigest())
            content[content_index] = {"type": "input_text", "text": IMAGE_OMITTED}
        removed += len(image_indexes)
        metadata["removed_groups"].append(
            {
                "input_index": input_index,
                "images": len(image_indexes),
                "encoded_bytes": encoded_bytes,
                "image_url_sha256": image_digests,
            }
        )
        body = json_bytes(payload)
        if len(body) <= target:
            break
    metadata.update(
        {
            "applied": removed > 0,
            "bytes_after": len(body),
            "images_after": metadata["images_before"] - removed,
        }
    )
    return body, metadata


def route_reasoning_effort(
    payload: dict[str, Any], rewrite_xhigh_to_max: bool,
    rewrite_model: str = DEFAULT_REWRITE_MODEL,
) -> tuple[str, str, str, bool]:
    """Apply the explicit Max wire transform and report its audit fields."""
    model = str(payload.get("model") or "")
    effort_before = ""
    effort_sent = ""
    rewritten = False
    reasoning = payload.get("reasoning")
    if isinstance(reasoning, dict):
        effort_before = str(reasoning.get("effort") or "")
        if (
            rewrite_xhigh_to_max
            and model == rewrite_model
            and effort_before == "xhigh"
        ):
            reasoning["effort"] = "max"
            rewritten = True
        effort_sent = str(reasoning.get("effort") or "")
    return model, effort_before, effort_sent, rewritten


def usage_objects(value: Any) -> list[dict[str, Any]]:
    """Find provider usage objects in plain JSON or Responses SSE events."""
    found: list[dict[str, Any]] = []
    if isinstance(value, dict):
        usage = value.get("usage")
        if isinstance(usage, dict) and any(
            key in usage
            for key in ("input_tokens", "output_tokens", "prompt_tokens", "total_tokens")
        ):
            found.append(usage)
        for child in value.values():
            found.extend(usage_objects(child))
    elif isinstance(value, list):
        for child in value:
            found.extend(usage_objects(child))
    return found


def last_usage(blob: bytes) -> dict[str, Any] | None:
    """Return the final usage block from JSON or a streamed SSE response."""
    text = blob.decode("utf-8", "replace")
    found: list[dict[str, Any]] = []
    try:
        found.extend(usage_objects(json.loads(text)))
    except ValueError:
        pass
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith("data:"):
            continue
        piece = line[5:].strip()
        if not piece or piece == "[DONE]":
            continue
        try:
            found.extend(usage_objects(json.loads(piece)))
        except ValueError:
            continue
    return found[-1] if found else None


def normalized_tokens(usage: dict[str, Any] | None) -> dict[str, int] | None:
    if not usage:
        return None
    input_tokens = int(usage.get("input_tokens") or usage.get("prompt_tokens") or 0)
    output_tokens = int(usage.get("output_tokens") or usage.get("completion_tokens") or 0)
    input_details = usage.get("input_tokens_details") or usage.get("prompt_tokens_details") or {}
    output_details = usage.get("output_tokens_details") or usage.get("completion_tokens_details") or {}
    cached = int(
        input_details.get("cached_tokens")
        or usage.get("cached_tokens")
        or usage.get("cache_read_tokens")
        or 0
    )
    reasoning = int(
        output_details.get("reasoning_tokens")
        or output_details.get("thinking_tokens")
        or usage.get("reasoning_tokens")
        or 0
    )
    return {
        "input_tokens": input_tokens,
        "cached_input_tokens": min(cached, input_tokens),
        "output_tokens": output_tokens,
        "reasoning_tokens": reasoning,
        "total_tokens": int(usage.get("total_tokens") or input_tokens + output_tokens),
    }


def estimated_cost(tokens: dict[str, int] | None) -> float | None:
    if not tokens:
        return None
    cached = tokens["cached_input_tokens"]
    uncached = max(tokens["input_tokens"] - cached, 0)
    return round(
        (
            uncached * RATES["input"]
            + cached * RATES["cached_input"]
            + tokens["output_tokens"] * RATES["output"]
        )
        / 1_000_000,
        9,
    )


class State:
    def __init__(
        self,
        log: pathlib.Path,
        client_effort: str,
        rewrite_xhigh_to_max: bool,
        rewrite_model: str,
        lane: str,
    ):
        self.log = log
        self.lane = lane
        self.client_effort = client_effort
        self.rewrite_xhigh_to_max = rewrite_xhigh_to_max
        self.rewrite_model = rewrite_model
        self.log.parent.mkdir(parents=True, exist_ok=True)
        self.log.touch()
        self.lock = threading.Lock()

    def cell_for(self, ip: str) -> str:
        """Which lane a request came from.

        The meter used to answer this by asking docker which container held
        the client address, because it was deployed once on the bridge for
        every lane at once. ``runner.py`` starts one per lane on that lane's
        own loopback instead, so the answer is the lane it was started in and
        the lookup could only ever have failed here.
        """
        return self.lane if ip in ("127.0.0.1", "::1") else f"unattributed:{ip}"

    def write(self, row: dict[str, Any]) -> None:
        with self.lock, self.log.open("a") as handle:
            handle.write(json.dumps(row, separators=(",", ":")) + "\n")
            handle.flush()


def make_handler(state: State):
    class Handler(http.server.BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, *_args: Any) -> None:
            return

        def do_GET(self) -> None:  # noqa: N802
            """Pass Muse's non-billable model-catalog lookup through."""
            request = urllib.request.Request(UPSTREAM + self.path, method="GET")
            allowed = {"authorization", "content-type", "accept", "user-agent"}
            for name, value in self.headers.items():
                if name.lower() in allowed:
                    request.add_header(name, value)
            try:
                try:
                    upstream = urllib.request.urlopen(
                        request, context=ssl.create_default_context(), timeout=120
                    )
                except urllib.error.HTTPError as error:
                    upstream = error
                self.send_response(upstream.status)
                for name, value in upstream.headers.items():
                    if name.lower() in ("transfer-encoding", "connection"):
                        continue
                    self.send_header(name, value)
                self.send_header("connection", "close")
                self.close_connection = True
                self.end_headers()
                while True:
                    chunk = upstream.read(65536)
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    self.wfile.flush()
            except Exception as error:  # noqa: BLE001
                try:
                    self.send_response(502)
                    self.send_header("connection", "close")
                    self.end_headers()
                    self.wfile.write(str(error).encode())
                except OSError:
                    pass

        def do_POST(self) -> None:  # noqa: N802
            request_id = str(uuid.uuid4())
            started = time.time()
            length = int(self.headers.get("content-length") or 0)
            original = self.rfile.read(length) if length else b""
            body = original
            model = ""
            effort_before = ""
            effort_sent = ""
            rewrite = False
            image_guard: dict[str, Any] | None = None
            try:
                payload = json.loads(original) if original else {}
                if isinstance(payload, dict):
                    model, effort_before, effort_sent, rewrite = (
                        route_reasoning_effort(
                            payload, state.rewrite_xhigh_to_max,
                            state.rewrite_model,
                        )
                    )
                    body, image_guard = guard_image_history(payload)
            except ValueError:
                effort_sent = effort_before

            row: dict[str, Any] = {
                "schema": "city_bench.meta_meter/1",
                "request_id": request_id,
                "at": started,
                "cell": state.cell_for(self.client_address[0]),
                "path": self.path,
                "model": model,
                "client_effort": state.client_effort,
                "wire_effort_before": effort_before,
                "wire_effort_sent": effort_sent,
                "rewritten_to_max": rewrite,
                "request_bytes": len(original),
                "request_sha256": hashlib.sha256(original).hexdigest(),
                "upstream_request_bytes": len(body),
                "upstream_request_sha256": hashlib.sha256(body).hexdigest(),
                "image_guard": image_guard,
            }

            request = urllib.request.Request(UPSTREAM + self.path, data=body, method="POST")
            # Forward only ordinary API headers. Muse's gateway/session
            # tracing headers are scoped to the original first-party hop; if
            # replayed by a proxy, Meta treats the otherwise valid key as an
            # invalid gateway credential and returns 401.
            allowed = {"authorization", "content-type", "accept", "user-agent"}
            for name, value in self.headers.items():
                if name.lower() in allowed:
                    request.add_header(name, value)

            try:
                try:
                    upstream = urllib.request.urlopen(
                        request, context=ssl.create_default_context(), timeout=1200
                    )
                except urllib.error.HTTPError as error:
                    upstream = error
                self.send_response(upstream.status)
                for name, value in upstream.headers.items():
                    if name.lower() in ("transfer-encoding", "connection", "content-length"):
                        continue
                    self.send_header(name, value)
                self.send_header("connection", "close")
                self.close_connection = True
                self.end_headers()

                response = bytearray()
                client_open = True
                while True:
                    chunk = upstream.read(65536)
                    if not chunk:
                        break
                    response.extend(chunk)
                    if client_open:
                        try:
                            self.wfile.write(chunk)
                            self.wfile.flush()
                        except (BrokenPipeError, ConnectionResetError):
                            client_open = False

                usage = last_usage(bytes(response))
                tokens = normalized_tokens(usage)
                row.update(
                    {
                        "status": upstream.status,
                        "duration_ms": round((time.time() - started) * 1000),
                        "response_bytes": len(response),
                        "usage": usage,
                        "tokens": tokens,
                        "cost_usd": estimated_cost(tokens),
                        "pricing_usd_per_million": RATES,
                        "pricing_note": PRICING_NOTE,
                    }
                )
                if upstream.status >= 400:
                    row["response_error"] = bytes(response[-2000:]).decode(
                        "utf-8", "replace"
                    )
                    capture_dir = state.log.parent / "failed-requests"
                    capture_dir.mkdir(parents=True, exist_ok=True)
                    client_capture = capture_dir / f"{request_id}-client.json"
                    upstream_capture = capture_dir / f"{request_id}-upstream.json"
                    client_capture.write_bytes(original)
                    upstream_capture.write_bytes(body)
                    client_capture.chmod(0o600)
                    upstream_capture.chmod(0o600)
                    row["failed_client_request_capture"] = str(client_capture)
                    row["failed_upstream_request_capture"] = str(upstream_capture)
            except Exception as error:  # noqa: BLE001
                row.update(
                    {
                        "status": 502,
                        "duration_ms": round((time.time() - started) * 1000),
                        "error": f"{type(error).__name__}: {error}",
                    }
                )
                try:
                    self.send_response(502)
                    self.send_header("connection", "close")
                    self.end_headers()
                    self.wfile.write(str(error).encode())
                except OSError:
                    pass
            finally:
                state.write(row)

    return Handler


def main() -> None:
    parser = argparse.ArgumentParser()
    # runner.py binds this to the lane's own loopback; the bridge address is
    # what a single host-side meter for every lane at once would have wanted
    parser.add_argument("--bind", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8897)
    parser.add_argument("--log", required=True)
    parser.add_argument("--client-effort", required=True)
    parser.add_argument("--rewrite-xhigh-to-max", action="store_true")
    parser.add_argument("--rewrite-model", default=DEFAULT_REWRITE_MODEL)
    parser.add_argument("--lane", default="",
                        help="what to file these rows under; the log's own "
                             "directory by default")
    args = parser.parse_args()
    state = State(
        pathlib.Path(args.log),
        client_effort=args.client_effort,
        rewrite_xhigh_to_max=args.rewrite_xhigh_to_max,
        rewrite_model=args.rewrite_model,
        lane=args.lane or pathlib.Path(args.log).resolve().parent.name,
    )
    server = http.server.ThreadingHTTPServer((args.bind, args.port), make_handler(state))
    print(
        f"Muse meter {args.bind}:{args.port} -> {UPSTREAM}; "
        f"client_effort={state.client_effort}; "
        f"rewrite_model={state.rewrite_model}; "
        f"rewrite_xhigh_to_max={state.rewrite_xhigh_to_max}; log={state.log}",
        flush=True,
    )
    server.serve_forever()


if __name__ == "__main__":
    main()
