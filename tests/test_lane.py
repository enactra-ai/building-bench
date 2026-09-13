"""The lane an agent gets, and the container around it."""
import ast
import json
import os
import subprocess
import sys

from harness import agents, cases
from harness import lane as lanes


def test_prepare_builds_the_reference_lane(tmp_path):
    case = cases.path("helsinki_cathedral")
    repo = lanes.prepare(case, tmp_path / "lane")
    got = sorted(str(p.relative_to(repo)) for p in repo.rglob("*") if p.is_file())
    expected = sorted(
        [str(p.relative_to(case / "agent")) for p in (case / "agent").rglob("*") if p.is_file()]
        + ["bench/__init__.py"] + [f"bench/building/{m}" for m in lanes.KIT]
        + list(lanes.SCRIPTS))
    assert got == expected
    assert (repo / "submission").is_dir() and not any((repo / "submission").iterdir())
    for module in lanes.KIT:
        assert (repo / "bench/building" / module).read_bytes() == \
            (lanes.KIT_SOURCE / module).read_bytes()
    for script in lanes.SCRIPTS:
        assert os.access(repo / script, os.X_OK)


def test_nothing_in_the_lane_names_where_the_answer_is(tmp_path):
    # tests/test_cases.py holds the case's own files to this; the kit is copied
    # into the same directory, so it is held to it too -- a module docstring
    # once named the dataset the photographs were rendered from.
    for key, entry in cases.catalogue().items():
        repo = lanes.prepare(cases.path(key), tmp_path / key)
        seen = " ".join(p.read_text(errors="replace") for p in repo.rglob("*")
                        if p.is_file() and p.suffix in (".py", ".md", ".json", ".txt", ""))
        for clue in (entry["source"], entry["attribution"], entry["source_url"],
                     "CC BY", "Google", "Cesium", "Photomesh", "3D city model",
                     "hel.fi", "melbourne.vic.gov"):
            assert clue not in seen, (key, clue)


def test_the_kit_imports_nothing_but_numpy_and_pil():
    allowed = {"numpy", "PIL", "bench", "__future__"} | set(sys.stdlib_module_names)
    for module in lanes.KIT:
        tree = ast.parse((lanes.KIT_SOURCE / module).read_text())
        for node in ast.walk(tree):
            names = ([a.name for a in node.names] if isinstance(node, ast.Import)
                     else [node.module] if isinstance(node, ast.ImportFrom) and node.module
                     else [])
            for name in names:
                assert name.split(".")[0] in allowed, (module, name)
                if name.startswith("bench.building."):
                    assert name.split(".")[2] + ".py" in lanes.KIT, (module, name)


def test_the_kit_works_on_its_own(tmp_path):
    repo = lanes.prepare(cases.path("melbourne_25422768"), tmp_path / "lane")
    proc = subprocess.run([sys.executable, "-m", "bench.building.kit", "check"],
                          cwd=repo, capture_output=True, text=True,
                          env={**os.environ, "PYTHONPATH": str(repo)})
    assert proc.returncode == 1                  # empty submission: not admissible
    assert "no building.glb" in proc.stdout + proc.stderr


def test_the_muse_lane_carries_its_meter(monkeypatch):
    # access() refuses a Muse lane with no key, so give it one: this test is
    # about where the two files land, not about the operator's credentials
    monkeypatch.setenv("META_API_KEY", "not-a-key")
    got = agents.access(agents.CONFIGS["musespark13max"])
    # the runner shells out to these two by absolute path; Sandbox.mounts binds
    # a tool at exactly /usr/local/bin/<name>
    assert set(got.tools) == {"muse-max-runner", "muse-max-meter"}
    for binary in got.tools.values():
        assert binary.is_file(), binary
    box = lanes.Sandbox(root=lanes.ROOT / "x", name="t", tools=got.tools)
    argv = box.argv("true")
    for name, binary in box.tools.items():
        assert f"{binary}:/usr/local/bin/{name}:ro" in argv


def test_the_container_is_the_reference_sandbox(tmp_path):
    box = lanes.Sandbox(root=tmp_path, name="t")
    argv = box.argv("true")
    for flag in (["--network", "bridge"], ["--memory", "8g"], ["--cpus", "4"],
                 ["--cap-drop", "ALL"], ["--security-opt", "no-new-privileges"],
                 ["--pids-limit", "512"], ["-w", "/lane/repo"],
                 ["-v", f"{tmp_path.resolve()}:/lane"], ["-e", "HOME=/lane/home"]):
        i = argv.index(flag[0])
        assert argv[i:i + 2] == flag
    assert argv[-4:] == [lanes.IMAGE, "bash", "-lc", "true"]


def test_reference_commands():
    prompt = json.dumps(agents.PROMPT)
    assert agents.lane_command(agents.CONFIGS["haiku"]) == (
        f"claude -p {prompt} --permission-mode bypassPermissions "
        "--model claude-haiku-4-5 --output-format json")
    assert agents.lane_command(agents.CONFIGS["opusmax"]).endswith(
        "--model claude-opus-5 --output-format json --effort max")
    assert agents.lane_command(agents.CONFIGS["gpt-6-astra-ultra"]) == (
        "codex exec --json --ephemeral --skip-git-repo-check "
        "--sandbox danger-full-access -m gpt-6-astra "
        f"-c model_reasoning_effort=ultra {prompt}")
    assert agents.lane_command(agents.CONFIGS["kimi-k3-max"]).startswith(
        "kimi-cli --thinking --print --yolo")
    # the effort reaches OpenRouter too: first-party-only here once meant a
    # row whose name said max sent nothing
    assert agents.lane_command(
        agents.CONFIGS["deepseek-v41-flash-claude-code"]).endswith(
        "--model deepseek/deepseek-v4.1-flash:wafer --output-format json --effort max")
    # the metered runner, and the lane binds it where the runner looks
    assert agents.lane_command(agents.CONFIGS["musespark13max"]) == (
        'muse-max-runner --model "muse-spark-1.3" --reasoning-effort ultra '
        "--wire-effort max --base-url http://127.0.0.1:8897/v1 "
        f"--prompt {prompt}")
