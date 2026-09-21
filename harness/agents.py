"""How each reference configuration was launched, and how to launch your own.

Every command template, the opening prompt and the resume prompt below are
copied from the runner that produced the reference results. For each of the
reference configurations, ``lane_command(name)`` returns the same string the
reference runner put in front of ``docker run ... bash -lc``.

What went into those runs, beyond the command:

* the blind tier -- the agent gets photographs and camera poses, nothing else;
* no wall-clock cap (the release runner passed none; ``task.json`` carries a
  5400 s / 120 step budget, which it did not enforce);
* the highest reasoning effort each product exposes, pinned on the command;
* open network access. That is part of the setting: an agent may look things
  up. What it is not told is where its photographs came from -- nothing in
  the case's ``agent/`` folder names the source dataset.
"""
from __future__ import annotations

import json
import os
import shutil
import sys
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

#: The lane's Muse meter and the runner that starts it.
MUSE = Path(__file__).resolve().parent / "muse"

PROMPT = ("Read TASK.md in this directory and do what it asks. Everything you need "
          "is here. Use ./preview to look at your model through the cameras you "
          "were given, ./materials to see how your PBR materials read, and ./check "
          "to find out whether the submission is admissible. Keep working until "
          "./check exits 0, the preview overlays match the photographs as closely "
          "as you can get them, and ./materials reports no complaints.")

#: Said to an agent whose CLI ended the turn before it handed anything in
#: (opencode ends a turn on any message without a tool call; kimi-cli on a
#: dropped stream). Only those two harnesses resume.
RESUME = ("The previous turn ended without you stopping it -- this harness "
          "ends a turn when a message carries no tool call, and the model may "
          "also have been briefly unreachable. Nothing you did caused it. "
          "There is still no submission/building.glb; ./check is what decides "
          "whether one is admissible. Carry on from where you were.")

PRODUCTS = {
    "claude": ('claude -p {prompt} --permission-mode bypassPermissions '
               '--model {model} --output-format json'),
    # Claude Code speaking the Anthropic protocol to OpenRouter.
    "claude-openrouter": ('claude -p {prompt} --permission-mode bypassPermissions '
                          '--model {model} --output-format json'),
    "codex": ('codex exec --json --ephemeral --skip-git-repo-check '
              '--sandbox danger-full-access -m {model} '
              '-c model_reasoning_effort={effort} {prompt}'),
    "opencode": (
        'set -o pipefail; '
        'run() {{ opencode run --format json '
        '--dangerously-skip-permissions --variant {effort} -m {model} '
        '"$@" | tee -a "$HOME/opencode-stream.jsonl"; }}; '
        'run {prompt}; rc=$?; '
        'sid=$(grep -o \'"sessionID":"[^"]*"\' "$HOME/opencode-stream.jsonl" '
        '| head -1 | cut -d\'"\' -f4); '
        'for attempt in 1 2 3 4 5 6; do '
        '[ -f submission/building.glb ] && break; '
        '[ -z "$sid" ] && break; '
        '[ $rc -ne 0 ] && sleep 300; '
        'echo "$attempt" >> "$HOME/opencode-continues"; '
        'run --session "$sid" {resume}; rc=$?; '
        'done; '
        '[ -n "$sid" ] && opencode export "$sid" '
        '> "$HOME/opencode-session.json" 2>/dev/null; '
        '[ -f submission/building.glb ] && exit 0; exit $rc'),
    "kimi": (
        'kimi-cli --print --yolo --output-format stream-json '
        '--model {model} --prompt {prompt} </dev/null; rc=$?; '
        'if [ $rc -ne 0 ]; then '
        'for attempt in 1 2 3 4 5; do sleep 120; '
        'sid=$(ls -t "$HOME"/.kimi/sessions/*/*/wire.jsonl 2>/dev/null '
        '| head -1 | xargs -r dirname | xargs -r basename); '
        '[ -z "$sid" ] && break; '
        'kimi-cli --print --yolo --output-format stream-json '
        '--model {model} --session "$sid" --prompt {resume} </dev/null '
        '&& rc=0 && break; done; fi; exit $rc'),
    # Meta's own terminal agent for Muse Spark, run through the lane's meter
    # (`harness/muse/`, bound in beside it). The meter is not optional: the CLI
    # reports no tokens and Meta serves no usage endpoint, so without it a Muse
    # run has no cost anywhere, and this board plots cost. It also carries the
    # request-size guard -- a body over the provider's limit loses its
    # superseded preview images instead of being refused -- and the one
    # transform that is not pass-through, `--wire-effort max`. The CLI itself
    # is not redistributable: bring your own binary (--tool muse=...) and your
    # own key. `--yolo` turns off Muse's approval prompts and its own OS
    # sandbox; what isolates the agent here is the lane container, the same
    # bargain `claude` and `agy` make one line down their own argv.
    "muse": ('muse-max-runner --model {model} --reasoning-effort {effort} '
             '--wire-effort max --base-url http://127.0.0.1:8897/v1 '
             '--prompt {prompt}'),
    # xAI's Grok Build, on a subscription login. Not redistributable: bring
    # your own `grok` binary and a `grok login`. The CLI has two effort flags
    # and only one of them reaches the model: --reasoning-effort becomes the
    # request's `reasoning.effort`, while --effort (low..max) is the CLI's own
    # setting and leaves the request unchanged -- captured with CLI 0.2.22,
    # --effort max, xhigh, high, low and no flag at all each sent `"effort":
    # "high"`, the catalogue default. Both are pinned at their top. Kept off:
    # --check (appends a self-verification loop to the prompt) and --best-of-n
    # (runs the task N ways and keeps the best) -- no other row had either.
    "grok": ('grok -p {prompt} -m {model} --output-format json '
             '--always-approve --effort max --reasoning-effort {effort}'),
    # Google's Antigravity CLI. Not redistributable: bring your own `agy`
    # binary (--tool agy=/path/to/agy) and your own login.
    "antigravity": ('agy --print {prompt} --output-format json '
                    '--dangerously-skip-permissions --disable-slash-commands '
                    '--add-dir "$PWD" --print-timeout 180m --model {model}'),
}


@dataclass(frozen=True)
class Config:
    name: str            # the short name the reference ledger files it under
    label: str           # what the leaderboard prints
    product: str         # which CLI
    model: str           # what goes into {model}
    effort: str = ""     # what goes into --effort / {effort}; "" = none sent
    #: kimi-cli only: the OpenRouter id behind the [models.<name>] entry, and
    #: the context size declared for it.
    served: str = ""
    context: int = 0
    notes: tuple[str, ...] = field(default_factory=tuple)


#: The configurations on the reference board, keyed by the name the reference
#: ledger uses. Effort is what the command sent.
CONFIGS = {c.name: c for c in (
    Config("fable51max", "Claude Fable 5.1 (max)", "claude", "claude-fable-5-1", "max"),
    Config("opusmax", "Claude Opus 5 (max)", "claude", "claude-opus-5", "max"),
    Config("fablemax", "Claude Fable 5 (max)", "claude", "claude-fable-5", "max"),
    Config("sonnetmax", "Claude Sonnet 5 (max)", "claude", "claude-sonnet-5", "max"),
    Config("fable", "Claude Fable 5 (high)", "claude", "claude-fable-5", "high"),
    Config("fablelow", "Claude Fable 5 (low)", "claude", "claude-fable-5", "low"),
    # Haiku 4.5 takes no effort setting; none is sent.
    Config("haiku", "Claude Haiku 4.5", "claude", "claude-haiku-4-5"),
    Config("gpt-6-astra-ultra", "GPT-6 Astra (ultra)", "codex", "gpt-6-astra", "ultra"),
    Config("gpt-5.6-sol-max", "GPT-5.6 Sol (max)", "codex", "gpt-5.6-sol", "max"),
    Config("gpt-5.6-terra-max", "GPT-5.6 Terra (max)", "codex", "gpt-5.6-terra", "max"),
    Config("gpt-5.6-luna-max", "GPT-5.6 Luna (max)", "codex", "gpt-5.6-luna", "max"),
    Config("gemini38flash", "Gemini 3.8 Flash (high)", "antigravity",
           "gemini-3.8-flash-high",
           notes=("Antigravity folds the effort into the model id; -high is "
                  "the highest it serves.",)),
    Config("gemini", "Gemini 3.1 Pro (high)", "antigravity", "gemini-3.1-pro-high"),
    Config("kimi-k3-max", "Kimi K3 (thinking)", "kimi", "kimi-k3-max", "max",
           served="moonshotai/kimi-k3", context=70_000,
           notes=("kimi-cli's highest posture is the --thinking switch.",
                  "Declared context 70,000: kimi-cli compacts before the "
                  "session's image history passes OpenRouter's 30 MB limit. "
                  "9 of the 12 reference cells ran this way; the other 3 ran "
                  "at 100,000 (--kimi-context 100000), where 9 of 12 first "
                  "attempts died on that limit.")),
    # `ultra` is the client selection; the CLI's own `ultra` reasoning effort
    # is gated off, so an unmodified request reaches Meta as `xhigh` and the
    # meter's `--wire-effort max` is what makes this row `(max)`.
    Config("musespark13max", "Muse Spark 1.3 (max)", "muse", "muse-spark-1.3",
           "ultra",
           notes=("`muse` on a normal install is a small shim that dispatches "
                  "to a versioned `muse-bin-*` beside it. The lane binds the "
                  "one binary you name, so name the versioned one: given the "
                  "shim alone the agent dies in seconds with \"installed "
                  "binary is missing\".",)),
    # xAI's own model catalogue (GET /v1/models on the CLI's proxy) lists
    # grok-4.6's reasoning efforts as low, medium, high (the default) and
    # xhigh, "Highest effort and reasoning level"; the CLI rejects
    # `--reasoning-effort max`.
    Config("grok46xhigh", "Grok 4.6 (xhigh)", "grok", "grok-4.6", "xhigh",
           notes=("Grok Build on a subscription login, not an API key: "
                  "`grok login --device-auth` on the host, then the lane gets "
                  "that login file and nothing else from ~/.grok.",
                  "xhigh is grok-4.6's highest reasoning effort. --effort max "
                  "is passed too, but it does not change the request.")),
    # grok-4.7's catalogue entry offers xhigh ("Maximum reasoning for the
    # hardest tasks"), high (the default), medium and low.
    Config("grok47xhigh", "Grok 4.7 (xhigh)", "grok", "grok-4.7", "xhigh",
           notes=("Grok Build on a subscription login, as grok46xhigh is.",
                  "xhigh is grok-4.7's highest reasoning effort.")),
    Config("glm-5.3-flash-max", "GLM 5.3 Flash (max)", "opencode",
           "openrouter/z-ai/glm-5.3-flash", "max"),
    Config("inkling-free", "Inkling (free) · opencode", "opencode",
           "openrouter/thinkingmachines/inkling:free", "high"),
    Config("deepseek-v41-flash-claude-code", "DeepSeek V4.1 Flash (max)",
           "claude-openrouter", "deepseek/deepseek-v4.1-flash:wafer", "max",
           notes=("The endpoint is pinned because OpenRouter's default routing "
                  "is not one model here: of the eleven endpoints serving this "
                  "model, four answered a request carrying images with a bare "
                  "400. `wafer` is the one the reference runs used, and its own "
                  "published rates are what priced them.",)),
    Config("inkling-free-claude-code", "Inkling (free) · Claude Code",
           "claude-openrouter", "thinkingmachines/inkling:free"),
    Config("z-ai-glm-5.3-flashx-claude-code", "GLM 5.3 FlashX (max) · Claude Code",
           "claude-openrouter", "z-ai/glm-5.3-flashx", "max"),
    Config("step-5-preview-claude-code", "Step 5 Preview · Claude Code",
           "claude-openrouter", "step-5-preview", "max",
           notes=("Served by StepFun's own API, the only place step-5-preview runs, "
                  "reached through an Anthropic-protocol adapter; StepFun's published "
                  "rates are what priced it.",)),
)}

def label(name: str) -> str:
    if name in CONFIGS:
        return CONFIGS[name].label
    return name


def lane_command(config: Config, prompt: str = PROMPT) -> str:
    """The one-liner that runs this configuration's agent over the task."""
    command = PRODUCTS[config.product].format(
        prompt=json.dumps(prompt),
        # the runner takes its model quoted, every other CLI bare
        model=json.dumps(config.model) if config.product == "muse" else config.model,
        effort=config.effort or "high", resume=json.dumps(RESUME))
    if config.product == "kimi" and config.effort == "max":
        command = command.replace("kimi-cli --print ", "kimi-cli --thinking --print ")
    # `claude-openrouter` too, and it does arrive: Claude Code carries the
    # effort in output_config.effort, which OpenRouter validates rather than
    # drops. First-party-only here meant a row whose name said max sent nothing.
    if config.product in ("claude", "claude-openrouter") and config.effort:
        command += f" --effort {config.effort}"
    return command


# --------------------------------------------------------------------------- #
# credentials: what each CLI needs to find in the lane
# --------------------------------------------------------------------------- #

@dataclass
class Access:
    env: dict[str, str] = field(default_factory=dict)
    credentials: dict[str, Path] = field(default_factory=dict)
    writable: frozenset[str] = frozenset()
    tools: dict[str, Path] = field(default_factory=dict)


def access(config: Config, *, codex_auth: str | None = None,
           claude_credentials: str | None = None) -> Access:
    """Resolve credentials from the operator's environment. Nothing here is
    written into the lane except what the CLI must read from its HOME."""
    got = Access()
    env = os.environ
    if config.product == "claude":
        key = env.get("CLAUDE_CODE_OAUTH_TOKEN") or env.get("ANTHROPIC_API_KEY")
        if key:
            got.env["CLAUDE_CODE_OAUTH_TOKEN" if key.startswith("sk-ant-oat")
                    else "ANTHROPIC_API_KEY"] = key
        else:
            path = Path(claude_credentials or "~/.claude/.credentials.json").expanduser()
            if not path.is_file():
                raise SystemExit("Claude Code needs ANTHROPIC_API_KEY, "
                                 "CLAUDE_CODE_OAUTH_TOKEN, or a login at "
                                 f"{path} (pass --claude-credentials)")
            got.credentials[".claude/.credentials.json"] = path
    elif config.product == "claude-openrouter":
        got.env.update({"ANTHROPIC_AUTH_TOKEN": _need("OPENROUTER_API_KEY"),
                        "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
                        "ANTHROPIC_API_KEY": ""})
    elif config.product == "codex":
        # Codex refreshes its token during a long run, so the file is bound
        # writable. Use a copy dedicated to benchmarking, not your main login.
        path = Path(codex_auth or env.get("CODEX_AUTH_FILE") or
                    "~/.codex/auth.json").expanduser()
        if not path.is_file():
            raise SystemExit(f"Codex needs a login at {path}: run `CODEX_HOME=<dir> "
                             "codex login` and pass --codex-auth <dir>/auth.json")
        if path.name != "auth.json":
            raise SystemExit("--codex-auth must point at a file named auth.json")
        got.credentials[".codex/auth.json"] = path
        got.writable = frozenset({".codex/auth.json"})
    elif config.product == "opencode":
        got.env["OPENROUTER_API_KEY"] = _need("OPENROUTER_API_KEY")
    elif config.product == "kimi":
        _need("OPENROUTER_API_KEY")         # written into the lane config by seed_home
    elif config.product == "muse":
        # Muse's own help says META_API_KEY takes priority over the account
        # login, so a lane that has it is billed per token -- which is what
        # the meter then counts and prices.
        got.env["META_API_KEY"] = _need("META_API_KEY")
        path = Path(env.get("MUSE_AUTH_FILE") or "~/.config/muse/auth.json").expanduser()
        if path.is_file():
            got.credentials[".config/muse/auth.json"] = path
        # The runner looks for the meter, and for `muse`, on the PATH at the
        # very place Sandbox.mounts binds a tool. `muse` is the operator's
        # (--tool muse=...); these two are ours.
        got.tools.update({"muse-max-runner": MUSE / "runner.py",
                          "muse-max-meter": MUSE / "meter.py"})
    elif config.product == "grok":
        # Checked here; seed_home copies the login file into the lane.
        login = _grok_home()
        if not (login / "auth.json").is_file():
            raise SystemExit(f"Grok Build needs a login at {login}: run "
                             "`grok login --device-auth` first")
        binary = Path(env.get("GROK_BIN") or "~/.local/bin/grok").expanduser()
        if not binary.exists():
            raise SystemExit(f"no grok binary at {binary}")
        got.tools["grok"] = binary
    elif config.product == "antigravity":
        pass                                # binary via --tool, login via seed_home
    return got


#: The model catalogue opencode downloads for itself on first start.
MODELS_DEV = "https://models.dev/api.json"


def seed_home(config: Config, lane_root: Path, *, kimi_context: int = 0) -> None:
    """Whatever the CLI must find in HOME before it starts."""
    home = Path(lane_root) / "home"
    if config.product == "opencode":
        # opencode resolves the model id against that catalogue, and in a
        # fresh HOME its first lookup races the download: measured, the first
        # run fails ("Model not found", "Unexpected server error") and the
        # second, with the catalogue cached, starts. Putting the same file
        # where opencode keeps it makes every lane start as a warm one does;
        # the command the agent runs is unchanged.
        target = home / ".cache" / "opencode" / "models.json"
        target.parent.mkdir(parents=True, exist_ok=True)
        # models.dev answers Python's default User-Agent with 403.
        request = urllib.request.Request(MODELS_DEV, headers={
            "User-Agent": "building-bench (+https://github.com/DeepWorld101/building-bench)"})
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                target.write_bytes(response.read())
        except OSError as exc:
            print(f"warning: could not fetch {MODELS_DEV} ({exc}); opencode will "
                  "fetch it itself, and its first lookup may miss", file=sys.stderr)
    elif config.product == "kimi":
        # kimi-cli takes its provider and key from a config file and does not
        # expand environment variables inside it.
        key = _need("OPENROUTER_API_KEY")
        target = home / ".kimi"
        target.mkdir(parents=True, exist_ok=True)
        config_file = target / "config.toml"
        config_file.write_text(
            f'default_model = "{config.model}"\n'
            'telemetry = false\n'
            '\n[providers.openrouter]\n'
            'type = "openai_legacy"\n'
            'base_url = "https://openrouter.ai/api/v1"\n'
            f'api_key = "{key}"\n'
            f'\n[models.{config.model}]\n'
            'provider = "openrouter"\n'
            f'model = "{config.served}"\n'
            f'max_context_size = {kimi_context or config.context}\n'
            'capabilities = ["image_in", "thinking"]\n')
        config_file.chmod(0o600)
    elif config.product == "grok":
        # The login file and nothing else. The rest of ~/.grok is the
        # operator's own use of the CLI -- logs, other sessions, other
        # projects' terminal output -- and none of it is needed: measured in
        # the lane image, a .grok holding only auth.json starts logged in
        # (`grok models`), and the CLI writes its own agent_id, docs, skills
        # and config.toml.
        source, state = _grok_home() / "auth.json", home / ".grok"
        if not source.is_file():
            raise SystemExit(f"no Grok Build login at {source}: run "
                             "`grok login --device-auth` first")
        state.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, state / "auth.json")
        (state / "auth.json").chmod(0o600)
    elif config.product == "antigravity":
        # The login, and only the login: the rest of that directory is the
        # CLI's memory of other conversations.
        state = home / ".gemini" / "antigravity-cli"
        state.mkdir(parents=True, exist_ok=True)
        source = Path("~/.gemini/antigravity-cli").expanduser()
        copied = 0
        for name in ("antigravity-oauth-token", "settings.json", "installation_id"):
            if (source / name).is_file():
                shutil.copyfile(source / name, state / name)
                (state / name).chmod(0o600)
                copied += 1
        if not copied:
            raise SystemExit(f"no Antigravity login under {source}: run `agy` "
                             "and sign in first")


def _grok_home() -> Path:
    return Path(os.environ.get("GROK_HOME") or "~/.grok").expanduser()


def _need(name: str) -> str:
    value = os.environ.get(name, "")
    if not value:
        raise SystemExit(f"{name} is not set")
    return value
