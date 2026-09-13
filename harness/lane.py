"""A lane: the directory an agent works in, and the container around it.

Both halves reproduce what the reference runs used.

``prepare`` is ``bench.building.run.prepare`` as it stood at the frozen commit:
the case's ``agent/`` folder becomes the working directory, an empty
``submission/`` is added, the kit modules are copied under ``bench/building/``,
and two wrapper scripts are written beside TASK.md. The brief also names
``./materials``; this release does not include it. ``tests/test_lane.py`` holds it to that.

``Sandbox`` is ``harness.sandbox.Sandbox`` from the same commit with the
settings the release runner passed: the default bridge network (the agent's
CLI has to reach its provider), 8 GB, 4 CPUs, every capability dropped, no
new privileges, 512 processes, the host user's uid and gid, and one mount --
the lane directory at ``/lane`` -- plus whatever credential files the agent's
CLI needs in its HOME. Nothing else on the host is visible to the agent.
"""
from __future__ import annotations

import hashlib
import os
import shutil
import stat
import subprocess
import uuid
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KIT_SOURCE = ROOT / "bench" / "building"

#: The modules the lane's kit is made of. Each imports only the others, numpy
#: and PIL, so nothing else ships into the lane.
KIT = ("__init__.py", "frame.py", "glb.py", "contract.py", "spec.py",
       "image.py", "raster.py", "kit.py")

SCRIPTS = {
    "check": """#!/bin/sh
# The acceptance gates. Exit 0 when admissible.
exec python3 -m bench.building.kit check "$@"
""",
    "preview": """#!/bin/sh
# Render submission/building.glb through the cameras you were given, and draw
# its outline on each photograph. Look at previews/over_*.png.
exec python3 -m bench.building.kit preview "$@"
""",
}

KIT_DOC = ('"""The kit this lane was given: read and write glTF, and check '
           'yourself."""\n')


def prepare(case: str | Path, lane_root: str | Path) -> Path:
    """Copy a case's agent half into a fresh lane and add the kit."""
    case = Path(case)
    lane_root = Path(lane_root)
    repo = lane_root / "repo"
    if repo.exists():
        shutil.rmtree(repo)
    shutil.copytree(case / "agent", repo)
    (repo / "submission").mkdir(exist_ok=True)
    (lane_root / "home").mkdir(parents=True, exist_ok=True)

    kit = repo / "bench" / "building"
    kit.mkdir(parents=True, exist_ok=True)
    (repo / "bench" / "__init__.py").write_text(KIT_DOC)
    for name in KIT:
        shutil.copyfile(KIT_SOURCE / name, kit / name)

    for name, body in SCRIPTS.items():
        script = repo / name
        script.write_text(body)
        script.chmod(script.stat().st_mode | stat.S_IXUSR | stat.S_IXGRP |
                     stat.S_IXOTH)
    return repo


def collect(lane_root: str | Path, out: str | Path) -> Path:
    """Take the submission out of the lane, leaving the lane alone."""
    lane_root, out = Path(lane_root), Path(out)
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(lane_root / "repo" / "submission", out)
    return out


# --------------------------------------------------------------------------- #
# the container
# --------------------------------------------------------------------------- #

IMAGE = os.environ.get("BUILDING_BENCH_IMAGE", "building-bench-lane")
LANE = "/lane"
REPO = "/lane/repo"
HOME = "/lane/home"


@dataclass
class Sandbox:
    root: Path                          # the host lane directory
    name: str                           # used in the container name
    image: str = IMAGE
    network: str = "bridge"
    memory: str = "8g"
    cpus: str = "4"
    #: {path inside HOME: host path}. A file is bound read-only; a directory is
    #: copied into the lane's own HOME (CLIs write state beside their login).
    credentials: dict[str, Path] = field(default_factory=dict)
    #: HOME paths whose token refreshes must persist. The PARENT directory is
    #: bound read-write, because a refresh is write-temp-and-rename, which a
    #: single-file bind mount cannot receive.
    writable: frozenset[str] = frozenset()
    #: Binaries the image does not carry, bound read-only onto the PATH.
    tools: dict[str, Path] = field(default_factory=dict)
    #: Passed through a mode-600 env file, never on the command line.
    env: dict[str, str] = field(default_factory=dict)

    def __post_init__(self) -> None:
        # docker reads a relative -v source as a named volume and refuses it.
        self.root = Path(self.root).resolve()
        self.credentials = {inside: Path(outside).expanduser().resolve()
                            for inside, outside in self.credentials.items()
                            if Path(outside).expanduser().exists()}
        self.writable = frozenset(self.writable or ())
        self.tools = {n: Path(p).expanduser().resolve() for n, p in self.tools.items()}

    def container_name(self) -> str:
        mark = hashlib.sha256(str(self.root).encode()).hexdigest()[:8]
        return f"building-bench-{self.name}-{mark}"

    def mounts(self) -> list[str]:
        args = ["-v", f"{self.root}:{LANE}"]
        for inside, outside in self.credentials.items():
            if outside.is_dir():
                continue                    # copied by prepare()
            if inside in self.writable:
                if outside.name != Path(inside).name:
                    raise ValueError(f"writable credential {inside} must keep its "
                                     f"file name; the host file is {outside.name}")
                args += ["-v", f"{outside.parent}:{HOME}/{Path(inside).parent}:rw"]
                continue
            args += ["-v", f"{outside}:{HOME}/{inside}:ro"]
        for name, binary in self.tools.items():
            args += ["-v", f"{binary}:/usr/local/bin/{name}:ro"]
        return args

    def prepare(self) -> None:
        for name in ("repo", "home"):
            (self.root / name).mkdir(parents=True, exist_ok=True)
        for inside, outside in self.credentials.items():
            target = self.root / "home" / inside
            target.parent.mkdir(parents=True, exist_ok=True)
            if outside.is_dir():
                if target.exists():
                    shutil.rmtree(target)
                shutil.copytree(outside, target, ignore=shutil.ignore_patterns(
                    "*.sock", "ipc", "cache", "history.jsonl", "*.sqlite"))

    def env_file(self) -> Path | None:
        if not self.env:
            return None
        path = self.root / "lane.env"
        path.write_text("".join(f"{k}={v}\n" for k, v in self.env.items()))
        path.chmod(0o600)
        return path

    def argv(self, command: str, container_name: str | None = None) -> list[str]:
        argv = ["docker", "run", "--rm",
                "--name", container_name or self.container_name(),
                "--network", self.network,
                "--memory", self.memory, "--cpus", self.cpus,
                "--cap-drop", "ALL", "--security-opt", "no-new-privileges",
                "--pids-limit", "512",
                "-w", REPO, "-u", f"{os.getuid()}:{os.getgid()}"]
        argv += self.mounts()
        # Running as a uid with no passwd entry leaves HOME unset otherwise.
        argv += ["-e", f"HOME={HOME}"]
        written = self.env_file()
        if written is not None:
            argv += ["--env-file", str(written)]
        argv += [self.image, "bash", "-lc", command]
        return argv

    def run(self, command: str, *, timeout: float | None = None
            ) -> subprocess.CompletedProcess:
        name = f"{self.container_name()}-run-{uuid.uuid4().hex[:12]}"
        try:
            return subprocess.run(self.argv(command, container_name=name),
                                  capture_output=True, text=True,
                                  timeout=timeout, check=False)
        except BaseException:
            # A timeout, Ctrl-C or a kill of this process ends the docker
            # CLIENT, not the container: left alone, the agent inside goes on
            # working -- and spending -- with nobody to collect its result.
            subprocess.run(["docker", "kill", name], capture_output=True,
                           text=True, timeout=60)
            raise
