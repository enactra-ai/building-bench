"""How a run is filed: a provider that turned the agent away is never a result."""
import argparse
import json
import subprocess

import pytest

from harness import agents, run
from harness import lane as lanes


def file_run(tmp_path, monkeypatch, name, returncode, stdout, stderr=""):
    """run_one on a real lane, the container replaced by what its CLI printed
    -- after the agent had written submission/building.glb."""
    def container(box, command, *, timeout=None):
        (box.root / "repo" / "submission" / "building.glb").write_bytes(b"glTF")
        return subprocess.CompletedProcess(command, returncode, stdout, stderr)

    monkeypatch.setattr(lanes.Sandbox, "run", container)
    # logins and HOME seeding are not what is filed, and opencode's reaches the network
    monkeypatch.setattr(agents, "access", lambda *a, **k: agents.Access())
    monkeypatch.setattr(agents, "seed_home", lambda *a, **k: None)
    args = argparse.Namespace(
        lanes=tmp_path / "lanes", runs=tmp_path / "runs", image=lanes.IMAGE,
        network="bridge", memory="8g", cpus="4", minutes=0, tool=[], env=[],
        codex_auth=None, claude_credentials=None, kimi_context=0, dry_run=False)
    config = agents.CONFIGS[name]
    row = run.run_one("melbourne_25422768", args, config, agents.lane_command(config), name)
    assert row["handed_in"]
    assert json.loads((tmp_path / "runs" / "index.jsonl").read_text()) == row
    return row


def jsonl(*events):
    return "".join(json.dumps(e) + "\n" for e in events)


def grok_log(stamp, message):
    # Grok Build's stderr, colours and all
    return f"\x1b[2m2026-09-14T{stamp}Z\x1b[0m \x1b[31mERROR\x1b[0m {message}\n"


def field(name, value):
    return f"\x1b[3m{name}\x1b[0m\x1b[2m=\x1b[0m{value}"


REQUEST_URL = "\n\nRequest URL: https://cli-chat-proxy.grok.com/v1/responses"
SIDE_REQUEST_429 = grok_log("03:49:17.378995", "responses API error " + " ".join([
    field("status", "429 Too Many Requests"),
    field("error_message", "resource-exhausted: Too many requests for team t-0001 and "
          "model grok-build. Your team's rate limit is — Requests per Second "
          "(actual/limit): 4/4." + REQUEST_URL),
    field("model_id", "grok-build")]))
UPLOAD_403 = grok_log("03:49:15.519725", "file upload failed " + " ".join([
    field("artifact", '"plugins"'), field("reason", '"gcs_upload_failed"'),
    field("status_code", "Some(403)")]))


def test_a_grok_lane_cut_off_by_a_spent_balance_is_not_a_result(tmp_path, monkeypatch):
    # 2026-09-13: twelve lanes on one Grok Build account, all cut at ~18
    # minutes when the balance ran out; the seven with a glb on disk were
    # filed complete
    internal = json.dumps({
        "message": "API error (status 402 Payment Required): Grok Build usage "
                   "balance exhausted" + REQUEST_URL,
        "http_status": 402}, indent=2)
    stdout = json.dumps({"type": "error", "message": f"Internal error: {internal}"})
    stderr = (UPLOAD_403 + SIDE_REQUEST_429
              + grok_log("04:07:33.876650", "responses API error " + " ".join([
                  field("status", "402 Payment Required"),
                  field("error_message", "Grok Build usage balance exhausted" + REQUEST_URL),
                  field("model_id", "grok-4.6")]))
              + grok_log("04:07:33.877861", field("error", f"Internal error: {internal}"))
              + f"Error: Internal error: {internal}\n")
    row = file_run(tmp_path, monkeypatch, "grok46xhigh", 1, stdout, stderr)
    assert row["status"] == "rate limited"
    assert "402 Payment Required): Grok Build usage balance exhausted" in row["reported"]["said"]


def test_a_finished_run_that_met_a_429_along_the_way_is_complete(tmp_path, monkeypatch):
    stdout = json.dumps({"text": "Submission admissible; the overlays match.",
                         "stopReason": "EndTurn", "sessionId": "s-0001",
                         "requestId": "r-0001", "thought": "Done."}, indent=2)
    stderr = (UPLOAD_403
              # the CLI's own side request, refused while the agent worked on
              + SIDE_REQUEST_429
              # and a website that throttled the agent's own fetch
              + grok_log("03:59:28.951654", "tool_error: execution_failure " + " ".join([
                  field("tool_name", '"web_fetch"'), field("model_id", '"grok-4.6"'),
                  field("error", '"HTTP 429 Too Many Requests: '
                        'https://nominatim.openstreetmap.org/search?q=Government+House"')])))
    row = file_run(tmp_path, monkeypatch, "grok46xhigh", 0, stdout, stderr)
    assert row["status"] == "complete"
    assert "said" not in row["reported"]


def claude_result(text, is_error):
    return json.dumps({"type": "result", "subtype": "success", "is_error": is_error,
                       "result": text, "num_turns": 57, "total_cost_usd": 12.5,
                       "duration_ms": 1_834_000})


def codex_command(output):
    return {"type": "item.completed", "item": {"type": "command_execution",
                                               "aggregated_output": output}}


def opencode_error(status, message):
    return {"type": "error", "sessionID": "ses_1", "error": {"name": "APIError", "data": {
        "message": message, "statusCode": status, "isRetryable": False}}}


OPENCODE_WORK = ({"type": "step_start"}, {"type": "tool_use", "part": {"tool": "bash"}},
                 {"type": "step_finish", "part": {"reason": "tool-calls"}})
KIMI_WORK = ({"role": "assistant", "content": "Measuring the portico.",
              "tool_calls": [{"type": "function", "id": "Shell_18"}]},
             {"role": "tool", "content": "done", "tool_call_id": "Shell_18"})
KIMI_429 = ("Error code: 429 - {'error': {'message': 'Rate limit exceeded: "
            "moonshotai/kimi-k3', 'code': 429}}\n")


#: (configuration, exit status, what its CLI printed, the words it is filed with)
REFUSED = [
    ("fablemax", 1, claude_result("You've hit your session limit · resets 11:10pm (UTC)",
                                  True), "session limit"),
    ("deepseek-v41-flash-claude-code", 1, claude_result(
        'API Error: 402 {"error":{"message":"Insufficient credits. Add more using '
        'https://openrouter.ai/settings/credits","code":402}}', True), "Insufficient credits"),
    ("gpt-5.6-sol-max", 1, jsonl(
        {"type": "thread.started"}, {"type": "turn.started"}, codex_command("ok"),
        {"type": "error", "message": "exceeded retry limit, last status: 429 Too Many Requests"},
        {"type": "item.completed", "item": {"type": "todo_list"}},
        {"type": "turn.failed", "error": {
            "message": "exceeded retry limit, last status: 429 Too Many Requests"}}),
     "429 Too Many Requests"),
    # opencode exits 0 on a refusal, and the lane stops resuming once a glb exists
    ("glm-5.3-flash-max", 0, jsonl(*OPENCODE_WORK, {"type": "step_start"}, opencode_error(
        402, "Insufficient credits. Add more using https://openrouter.ai/settings/credits")),
     "APIError 402 Insufficient credits"),
    ("kimi-k3-max", 1, jsonl(*KIMI_WORK) + KIMI_429 * 6, "Error code: 429"),
    ("musespark13max", 1, jsonl({"payload_type": "run.terminal.failed", "payload": {
        "kind": "run_terminal", "terminal": "failed",
        "reason": "API error 429: rate limit exceeded (after 10 provider attempts)"}}),
     "rate limit exceeded"),
    ("gemini38flash", 1, json.dumps({
        "conversation_id": "c1", "status": "ERROR", "num_turns": 31, "response": "",
        "error": "Individual quota reached. Please upgrade your subscription to "
                 "increase your limits. Resets in 48h12m45s."}), "Individual quota reached"),
]

#: (configuration, what its CLI printed for a run that finished)
CARRIED_ON = [
    # the model's own last words, not the CLI's
    ("fablemax", claude_result("Done. Overpass answered 429 Too Many Requests, so the "
                               "footprint is traced from the photographs.", False)),
    # a retry it came back from, and a page the agent fetched
    ("gpt-5.6-sol-max", jsonl(
        {"type": "thread.started"}, {"type": "turn.started"},
        {"type": "error", "message": "Reconnecting... 2/5 (unexpected status 429 "
                                     "Too Many Requests)"},
        codex_command("HTTP/2 429\nretry-after: 60\n{\"error\": \"rate limit exceeded\"}"),
        {"type": "turn.completed", "usage": {"input_tokens": 10, "output_tokens": 5}})),
    # refused, resumed, and finished
    ("glm-5.3-flash-max", jsonl({"type": "step_start"}, opencode_error(
        429, "Rate limit exceeded: z-ai/glm-5.3-flash"), *OPENCODE_WORK)),
    ("kimi-k3-max", KIMI_429 + jsonl(*KIMI_WORK)),
]


@pytest.mark.parametrize("name, returncode, stdout, said", REFUSED,
                         ids=[case[0] for case in REFUSED])
def test_a_refusal_outranks_the_submission_in_every_cli(tmp_path, monkeypatch, name,
                                                        returncode, stdout, said):
    row = file_run(tmp_path, monkeypatch, name, returncode, stdout)
    assert row["status"] == "rate limited"
    assert said in row["reported"]["said"]


@pytest.mark.parametrize("name, stdout", CARRIED_ON, ids=[case[0] for case in CARRIED_ON])
def test_a_limit_the_run_carried_on_past_is_not_a_refusal(tmp_path, monkeypatch, name,
                                                          stdout):
    row = file_run(tmp_path, monkeypatch, name, 0, stdout)
    assert row["status"] == "complete"
    assert "said" not in row["reported"]
