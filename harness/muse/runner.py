#!/usr/bin/env python3
"""Run Muse Code through the audited loopback usage and request-size meter."""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import socket
import subprocess
import sys
import time


def wait_until_listening(host: str, port: int, process: subprocess.Popen) -> None:
    deadline = time.time() + 10
    while time.time() < deadline:
        if process.poll() is not None:
            raise RuntimeError(f"Muse Max meter exited with {process.returncode}")
        try:
            with socket.create_connection((host, port), timeout=0.2):
                return
        except OSError:
            time.sleep(0.05)
    raise RuntimeError("Muse Max meter did not start within 10 seconds")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--reasoning-effort", default="ultra")
    parser.add_argument("--wire-effort", default="")
    parser.add_argument("--base-url", default="http://127.0.0.1:8897/v1")
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--meter-dir", default=os.environ.get("MUSE_MAX_METER_DIR", "/lane/meter"))
    parser.add_argument("--max-model-steps", type=int, default=0)
    args = parser.parse_args()
    wire_effort = args.wire_effort or args.reasoning_effort
    rewrite_xhigh_to_max = (
        args.reasoning_effort == "ultra" and wire_effort == "max"
    )

    meter_dir = pathlib.Path(args.meter_dir)
    meter_dir.mkdir(parents=True, exist_ok=True)
    meter_log = meter_dir / f"meter-{time.time_ns()}.jsonl"
    version = subprocess.run(
        ["/usr/local/bin/muse", "--version"],
        capture_output=True,
        text=True,
        check=False,
    )
    (meter_dir / "client.json").write_text(
        json.dumps(
            {
                "schema": "city_bench.muse_client/1",
                "client": "Muse Code",
                "version": (version.stdout or version.stderr).strip(),
                "model": args.model,
                "client_selection_effort": args.reasoning_effort,
                "root_wire_effort": wire_effort,
                "wire_transform": (
                    "xhigh->max" if rewrite_xhigh_to_max else "unchanged"
                ),
                "context_compaction": "Muse Code defaults",
                "request_size_guard": "drop-oldest-preview-groups/1 in the audited meter",
                "base_url": args.base_url,
                "meter_log": meter_log.name,
            },
            indent=2,
        )
        + "\n"
    )
    port = int(args.base_url.rsplit(":", 1)[1].split("/", 1)[0])
    meter_command = [
        "/usr/local/bin/muse-max-meter",
        "--bind",
        "127.0.0.1",
        "--port",
        str(port),
        "--log",
        str(meter_log),
        "--client-effort",
        args.reasoning_effort,
    ]
    if rewrite_xhigh_to_max:
        meter_command += ["--rewrite-xhigh-to-max", "--rewrite-model", args.model]
    meter = subprocess.Popen(
        meter_command,
        stdout=sys.stderr,
        stderr=sys.stderr,
    )
    try:
        wait_until_listening("127.0.0.1", port, meter)
        command = [
            "/usr/local/bin/muse",
            "exec",
            "--json",
            "--yolo",
            "--model",
            args.model,
            "--reasoning-effort",
            args.reasoning_effort,
            "--base-url",
            args.base_url,
        ]
        if args.max_model_steps:
            command += ["--max-model-steps", str(args.max_model_steps)]
        command.append(args.prompt)
        return subprocess.run(command, check=False).returncode
    finally:
        meter.terminate()
        try:
            meter.wait(timeout=5)
        except subprocess.TimeoutExpired:
            meter.kill()
            meter.wait(timeout=5)


if __name__ == "__main__":
    raise SystemExit(main())
