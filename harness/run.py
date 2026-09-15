"""Run an agent on cases in the reference lane, and collect what it hands in.

    python -m harness.run --agent haiku --case melbourne_25422768
    python -m harness.run --agent gpt-5.6-luna-max --all
    python -m harness.run --command 'my-agent --prompt {prompt}' --label my-agent --all

``--agent`` takes one of the reference configurations (``--list`` prints
them); ``--command`` runs anything else, with ``{prompt}`` replaced by the
quoted opening prompt. Either way the agent runs inside the lane image with
the case's ``agent/`` folder as its working directory, and whatever is in
``submission/`` when it stops is what it handed in.

Each run leaves ``runs/<run_id>/`` -- agent.stdout, agent.stderr, run.json and
submission/ -- and one line in ``runs/index.jsonl``. This release does not
score: send the submission to have it scored.
"""
from __future__ import annotations

import argparse
import json
import re
import shlex
import signal
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from harness import agents, cases
from harness import lane as lanes


#: How a provider says "not now" -- a status code, a limit, money run out -- in
#: any CLI's words. Read in what a CLI says ended its run (``reported``'s
#: ``said``): across a whole transcript it also matches a website's 429, a page
#: about quotas, and base64 image data.
RATE_LIMITED = re.compile(r"\b429\b|too many requests|rate.?limit|daily limit|quota|"
                          r"usage limit|session limit|(hit|reached) your .{0,40}\blimit|"
                          r"spend(ing)?.?limit|\b402\b|payment required|balance exhausted|"
                          r"insufficient credit|out of (usage )?credits|"
                          r"credit balance is too low|credits? (are )?depleted|"
                          r"resource.exhausted", re.I)


def _report(stdout: str) -> dict[str, Any]:
    """A CLI's one JSON object: all of stdout, or its last line."""
    text = stdout.strip()
    for candidate in (text, text[text.rfind("\n") + 1:]):
        try:
            body = json.loads(candidate)
        except ValueError:
            continue
        if isinstance(body, dict):
            return body
    return {}


def _log(stdout: str) -> list[dict[str, Any] | str]:
    """A CLI's JSON-lines log; a line that is not a JSON object stays text."""
    lines: list[dict[str, Any] | str] = []
    for line in stdout.splitlines():
        try:
            event = json.loads(line)
        except ValueError:
            event = None
        if isinstance(event, dict):
            lines.append(event)
        elif line.strip():
            lines.append(line.strip())
    return lines


def reported(product: str, stdout: str) -> dict[str, Any]:
    """What the CLI itself says about the run, where it says anything.

    ``said`` is the CLI's own account of an error that ended the run, which is
    where a provider refusing the agent shows up -- each CLI keeps it somewhere
    else, and an error the run carried on past is not one.
    """
    out: dict[str, Any] = {}
    said = ""
    if product in ("claude", "claude-openrouter"):
        body = _report(stdout)
        out = {k: body.get(k) for k in ("total_cost_usd", "num_turns",
                                        "duration_ms", "is_error") if k in body}
        if body.get("is_error"):
            said = str(body.get("result", ""))
    elif product == "codex":
        turns, usage = 0, {}
        for event in _log(stdout):
            if isinstance(event, str):
                continue
            # an `error` event alone is often a retry ("Reconnecting... 2/5");
            # the one that ended the turn is repeated in turn.failed
            if event.get("type") == "turn.failed":
                said = str((event.get("error") or {}).get("message", ""))
            elif event.get("type") == "turn.completed":
                turns, said = turns + 1, ""
                for key, value in (event.get("usage") or {}).items():
                    if isinstance(value, (int, float)):
                        usage[key] = usage.get(key, 0) + value
        if turns:
            out = {"turns": turns, "usage": usage}
    elif product == "grok":
        # {"text", "stopReason", ...} for a turn that ended; {"type": "error",
        # "message"} for one that did not. Its stderr is no guide: the CLI logs
        # every API error there, its own side requests' too -- a 429 for
        # `grok-build` in a lane that went on working for eighteen minutes.
        body = _report(stdout)
        if body.get("type") == "error":
            said = str(body.get("message", ""))
    elif product == "antigravity":
        body = _report(stdout)
        if str(body.get("status", "SUCCESS")).upper() != "SUCCESS":
            said = str(body.get("error") or body.get("status"))
    elif product == "muse":
        # its last run.terminal.* event carries a reason only when it failed
        ends = [event for event in _log(stdout) if isinstance(event, dict)
                and str(event.get("payload_type")).startswith("run.terminal.")]
        if ends:
            said = str((ends[-1].get("payload") or {}).get("reason") or "")
    elif product in ("opencode", "kimi"):
        # Neither says how its run ended, and the lane resumes both: an error
        # ended the run only if nothing came after it. opencode logs its errors
        # as events (and exits 0 on them); kimi-cli prints "Error code: 429 -
        # ..." as plain lines between its JSON messages.
        errors: list[str] = []
        for event in _log(stdout):
            if isinstance(event, str):
                if event.lower().startswith("error"):
                    errors.append(event)
            elif event.get("type") == "error":
                error = event.get("error") or {}
                data = error.get("data") or {}
                parts = (error.get("name"), data.get("statusCode"), data.get("message"))
                errors.append(" ".join(str(part) for part in parts if part))
            elif event.get("type") != "step_start":
                errors = []
        said = "\n".join(dict.fromkeys(errors))      # each resume says it again
    if said:
        out["said"] = said[:500]
    return out


def scrub(lane_root: Path) -> None:
    """Secrets the lane needed while running, gone once it has stopped."""
    (lane_root / "lane.env").unlink(missing_ok=True)
    # the login files seed_home copied into HOME, as the CLI last refreshed them
    for login in (".grok/auth.json", ".gemini/antigravity-cli/antigravity-oauth-token"):
        (lane_root / "home" / login).unlink(missing_ok=True)
    kimi = lane_root / "home" / ".kimi" / "config.toml"
    if kimi.is_file():
        kimi.write_text(re.sub(r'(?m)^api_key = ".*"$', 'api_key = ""', kimi.read_text()))


def _text(captured: bytes | str | None) -> str:
    if isinstance(captured, bytes):
        return captured.decode("utf-8", "replace")
    return captured or ""


def run_one(case: str, args: argparse.Namespace, config: agents.Config | None,
            command: str, label: str) -> dict[str, Any]:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    run_id = f"{case}-{label}-{stamp}"
    lane_root = Path(args.lanes).resolve() / run_id
    out = Path(args.runs).resolve() / run_id

    lanes.prepare(cases.path(case), lane_root)
    got = (agents.access(config, codex_auth=args.codex_auth,
                         claude_credentials=args.claude_credentials)
           if config else agents.Access())
    tools = dict(got.tools)
    for item in args.tool:
        name, _, where = item.partition("=")
        tools[name] = Path(where)
    env = dict(got.env)
    for name in args.env:
        env[name] = agents._need(name)
    box = lanes.Sandbox(root=lane_root, name=re.sub(r"[^A-Za-z0-9_.-]", "-", run_id),
                        image=args.image, network=args.network, memory=args.memory,
                        cpus=args.cpus, credentials=got.credentials,
                        writable=got.writable, tools=tools, env=env)
    box.prepare()
    if config:
        agents.seed_home(config, lane_root, kimi_context=args.kimi_context)
    if args.dry_run:
        print(" ".join(shlex.quote(a) for a in box.argv(command)))
        scrub(lane_root)
        return {}

    print(f"[{run_id}] starting", flush=True)
    started = time.time()
    capped = False
    try:
        proc = box.run(command, timeout=args.minutes * 60 if args.minutes else None)
        returncode, stdout, stderr = proc.returncode, proc.stdout, proc.stderr
    except subprocess.TimeoutExpired as expired:
        # What it had built is on disk, and it is collected like any other run.
        capped, returncode = True, 124
        stdout, stderr = _text(expired.stdout), _text(expired.stderr)
    finally:
        # also on Ctrl-C or a kill: the env file holds the provider key
        scrub(lane_root)
    seconds = round(time.time() - started, 1)

    out.mkdir(parents=True, exist_ok=True)
    (out / "agent.stdout").write_text(stdout or "")
    (out / "agent.stderr").write_text(stderr or "")
    submission = lanes.collect(lane_root, out / "submission")
    handed_in = (submission / "building.glb").is_file()
    said = reported(config.product if config else "", stdout or "")
    if RATE_LIMITED.search(said.get("said", "")):
        # The provider turned the agent away, in the words the CLI ended on.
        # That decides before the submission does: a lane cut off mid-run has
        # handed in whatever it had built by then, which is no result either.
        status = "rate limited"
    elif handed_in or returncode == 0:
        status = "complete"
    else:
        # A lane that never handed anything in AND did not exit cleanly is a
        # run that did not happen (a refused login, a provider limit, an
        # outage), not a model that built nothing. A --command CLI's report is
        # not read, so its limit can only be looked for in all it printed.
        status = ("rate limited" if config is None
                  and RATE_LIMITED.search(f"{stdout}\n{stderr}") else "failed")
    row = {"schema": "building_bench.run/1", "run_id": run_id, "case": case,
           "model": label, "label": config.label if config else label,
           "product": config.product if config else "custom",
           "served_model": config.model if config else "",
           "effort": config.effort if config else "",
           "command": command, "image": args.image,
           "recorded": datetime.now(timezone.utc).isoformat(timespec="seconds"),
           "status": status,
           "returncode": returncode, "capped": capped, "seconds": seconds,
           "cost_usd": said.get("total_cost_usd"),
           "turns": said.get("num_turns", said.get("turns")),
           "reported": said, "handed_in": handed_in}
    (out / "run.json").write_text(json.dumps(row, indent=1))
    index = Path(args.runs) / "index.jsonl"
    with index.open("a") as ledger:
        ledger.write(json.dumps(row) + "\n")
    if status == "complete":
        print(f"[{run_id}] complete, exit {returncode}, {seconds / 60:.0f} min, "
              + ("submission/building.glb handed in" if handed_in else "nothing handed in"),
              flush=True)
    else:
        print(f"[{run_id}] {status}, exit {returncode}, {seconds / 60:.0f} min -- not "
              f"a result. The CLI said: {said.get('said') or (stderr or '')[-300:]}",
              flush=True)
    return row


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    who = ap.add_mutually_exclusive_group(required=True)
    who.add_argument("--agent", choices=sorted(agents.CONFIGS),
                     help="a reference configuration")
    who.add_argument("--command", help="any agent command; {prompt} is replaced")
    who.add_argument("--list", action="store_true", help="print the configurations")
    ap.add_argument("--label", help="the name --command runs are filed under")
    where = ap.add_mutually_exclusive_group()
    where.add_argument("--case", action="append", choices=cases.names())
    where.add_argument("--all", action="store_true", help="all twelve cases")
    ap.add_argument("--minutes", type=float, default=0,
                    help="wall-clock cap per run; 0 (the default, and what the "
                         "reference runs had) is none")
    ap.add_argument("--image", default=lanes.IMAGE)
    ap.add_argument("--network", default="bridge")
    ap.add_argument("--memory", default="8g")
    ap.add_argument("--cpus", default="4")
    ap.add_argument("--runs", default=str(cases.ROOT / "runs"))
    ap.add_argument("--lanes", default=str(cases.ROOT / "lanes"))
    ap.add_argument("--codex-auth", help="auth.json for Codex (bound writable)")
    ap.add_argument("--claude-credentials",
                    help="Claude Code login file (default ~/.claude/.credentials.json)")
    ap.add_argument("--kimi-context", type=int, default=0,
                    help="override kimi-cli's declared context size")
    ap.add_argument("--tool", action="append", default=[], metavar="NAME=PATH",
                    help="bind a host binary onto the lane's PATH, e.g. agy=/usr/local/bin/agy")
    ap.add_argument("--env", action="append", default=[], metavar="NAME",
                    help="pass this environment variable into the lane")
    ap.add_argument("--dry-run", action="store_true",
                    help="prepare the lane and print the docker command only")
    args = ap.parse_args(argv)
    # `kill <pid>` has to stop the agent, not just this process: raising here
    # unwinds through Sandbox.run, which kills the container on the way out.
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(143))

    if args.list:
        for name, config in sorted(agents.CONFIGS.items()):
            print(f"{name:26s} {config.label:32s} {config.product:18s} {config.model}"
                  + (f"  effort={config.effort}" if config.effort else ""))
        return 0
    chosen = cases.names() if args.all else (args.case or [])
    if not chosen:
        ap.error("give --case KEY (repeatable) or --all")
    if args.command and not args.label:
        ap.error("--command needs --label")
    if not args.dry_run:
        probe = subprocess.run(["docker", "image", "inspect", args.image],
                               capture_output=True, text=True)
        if probe.returncode:
            raise SystemExit(f"no image {args.image!r}: docker build -f "
                             "docker/lane.Dockerfile -t building-bench-lane .")
    config = agents.CONFIGS.get(args.agent) if args.agent else None
    command = (agents.lane_command(config) if config
               else args.command.replace("{prompt}", json.dumps(agents.PROMPT)))
    label = config.name if config else args.label
    failed = 0
    for case in chosen:
        row = run_one(case, args, config, command, label)
        failed += row.get("status") == "failed"
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
