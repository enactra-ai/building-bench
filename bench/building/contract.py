"""The submission contract: what counts as an answer at all.

Existence is a gate, not a verdict. This module answers only the prior
question: is the thing on disk a building model at all, in metres, the right
way up, self-contained, and small enough to render?

Every complaint is written to be actionable by whoever reads it — the agent
runs this itself with ``./check``. None of these gates looks at the truth: a
submission can pass every one of them and still be a poor model.
"""
from __future__ import annotations

import json
import subprocess
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import numpy as np

from bench.building import glb
from bench.building.glb import GlbError, Mesh
from bench.building.spec import Budget

SCHEMA = "city_bench.building_submission/1"
MODEL_NAME = "building.glb"
MANIFEST_NAME = "manifest.json"

#: Extensions that change what the geometry MEANS. Reading past one would read a
#: different building from the one that was delivered, so they are refused.
BLOCKING_EXTENSIONS = {
    "KHR_draco_mesh_compression",
    "EXT_meshopt_compression",
    "KHR_texture_basisu",
    "EXT_mesh_gpu_instancing",
}


@dataclass
class Submission:
    root: Path
    mesh: Mesh | None = None
    manifest: dict[str, Any] = field(default_factory=dict)
    complaints: list[str] = field(default_factory=list)

    @property
    def accepted(self) -> bool:
        return not self.complaints and self.mesh is not None

    @property
    def model_path(self) -> Path:
        return self.root / MODEL_NAME

    def as_dict(self) -> dict[str, Any]:
        return {"accepted": self.accepted, "complaints": list(self.complaints),
                "triangles": self.mesh.triangle_count if self.mesh else 0,
                "bytes": self.model_path.stat().st_size if self.model_path.is_file() else 0,
                "geometry": self.mesh.geometry_hash() if self.mesh else "",
                "method": self.manifest.get("method", "")}


def load(root: str | Path, *, budget: Budget | None = None,
         site_radius_m: float = 60.0) -> Submission:
    """Read a submission directory and gate it. Never raises on bad input."""
    budget = budget or Budget()
    root = Path(root)
    out = Submission(root=root)

    model = root / MODEL_NAME
    if not model.is_file():
        out.complaints.append(
            f"there is no {MODEL_NAME} in {root} — the submission is one binary "
            f"glTF file at that exact path")
        return out

    size_mb = model.stat().st_size / 1e6
    if size_mb > budget.megabytes:
        out.complaints.append(
            f"{MODEL_NAME} is {size_mb:.1f} MB and the budget is "
            f"{budget.megabytes:.0f} MB — most of that is usually texture "
            f"resolution nobody can see at the reference distance")

    try:
        mesh = glb.read(model)
    except GlbError as exc:
        out.complaints.append(str(exc))
        return out
    except Exception as exc:                                  # noqa: BLE001
        out.complaints.append(f"{MODEL_NAME} will not parse: "
                              f"{type(exc).__name__}: {exc}")
        return out
    out.mesh = mesh

    blocking = sorted(set(mesh.extensions_required) & BLOCKING_EXTENSIONS)
    if blocking:
        out.complaints.append(
            f"the file requires {', '.join(blocking)}, which is not accepted "
            f"— export uncompressed geometry and PNG or JPEG textures")

    if mesh.triangle_count == 0:
        out.complaints.append("the file contains no triangles")
        return out
    if mesh.triangle_count > budget.triangles:
        out.complaints.append(
            f"{mesh.triangle_count:,} triangles against a budget of "
            f"{budget.triangles:,}")

    out.complaints.extend(_placed(mesh, site_radius_m))
    out.manifest, manifest_complaints = _manifest(root)
    out.complaints.extend(manifest_complaints)
    return out


def _placed(mesh: Mesh, site_radius_m: float) -> list[str]:
    """Is it in metres, the right way up, and standing where the site is?

    Every one of these has a characteristic failure: a model authored in
    centimetres is a hundred times too big, a model exported Z-up lies on its
    side, and a model built around its own centroid sits somewhere other than
    the building. All three look like a bad model rather than a mistake, which
    is why they are named here instead.
    """
    out: list[str] = []
    low, high = mesh.bounds()
    span = high - low
    height = float(span[1])
    horizontal = float(max(span[0], span[2]))
    reach = float(np.abs(np.concatenate([low[[0, 2]], high[[0, 2]]])).max())

    if height < 2.0:
        out.append(f"the model is {height:.2f} m tall along +Y. glTF is Y-up and "
                   f"the units are METRES; a Z-up export lands here")
    if height > 400.0:
        out.append(f"the model is {height:.0f} m tall — if it was authored in "
                   f"centimetres this is what that looks like")
    if horizontal > 25.0 * site_radius_m:
        out.append(f"the model spans {horizontal:.0f} m horizontally against a "
                   f"building whose footprint radius is {site_radius_m:.0f} m")
    if reach > 8.0 * max(site_radius_m, 10.0):
        out.append(f"the model's furthest point is {reach:.0f} m from the site "
                   f"origin; the origin is the footprint centroid at ground "
                   f"level and the building should straddle it")
    if float(low[1]) < -12.0:
        out.append(f"the model reaches {float(low[1]):.1f} m BELOW ground "
                   f"(Y = 0 is the ground plane)")
    if not np.isfinite(mesh.vertices).all():
        out.append("some vertex positions are NaN or infinite")
    return out


def _manifest(root: Path) -> tuple[dict[str, Any], list[str]]:
    path = root / MANIFEST_NAME
    if not path.is_file():
        return {}, [f"there is no {MANIFEST_NAME} beside the model — it has to "
                    f"say how the model was made ('method') so a result can be "
                    f"read a month later"]
    try:
        data = json.loads(path.read_text())
    except Exception as exc:                                  # noqa: BLE001
        return {}, [f"{MANIFEST_NAME} is not valid JSON: {exc}"]
    complaints = []
    if not str(data.get("method", "")).strip():
        complaints.append(f"{MANIFEST_NAME} has no 'method' — one or two "
                          f"sentences on how the model was produced")
    build = data.get("build") or {}
    if build and not build.get("cmd"):
        complaints.append("'build' is present but has no 'cmd' to run")
    return data, complaints


# --------------------------------------------------------------------------- #
# reproducibility
# --------------------------------------------------------------------------- #

def rebuild(root: str | Path, *, timeout_s: float = 900.0,
            log=print) -> dict[str, Any]:
    """Run the declared build command and check it makes the same building.

    The claim being tested is "this model is the output of that source", and
    it is tested on GEOMETRY rather than on bytes: two runs of a texture baker
    can differ in a few bytes of PNG and be the same building. A submission
    that does not declare a build command is not failed for it — it is
    recorded as unverified, which is a different thing and should read
    differently on a report.
    """
    root = Path(root)
    before = load(root)
    if before.mesh is None:
        return {"checked": False, "reason": "the submission does not parse"}
    manifest = before.manifest
    build = manifest.get("build") or {}
    if not build.get("cmd"):
        return {"checked": False, "reason": "no build command declared"}

    original = before.mesh.geometry_hash()
    backup = root / (MODEL_NAME + ".before-rebuild")
    backup.write_bytes((root / MODEL_NAME).read_bytes())
    try:
        proc = subprocess.run(build["cmd"], cwd=str(root / build.get("cwd", ".")),
                              capture_output=True, text=True, timeout=timeout_s)
        if proc.returncode != 0:
            return {"checked": True, "reproduced": False,
                    "reason": f"the build command exited {proc.returncode}: "
                              f"{proc.stderr[-400:]}"}
        after = load(root)
        if after.mesh is None:
            return {"checked": True, "reproduced": False,
                    "reason": "the rebuilt file does not parse"}
        same = after.mesh.geometry_hash() == original
        return {"checked": True, "reproduced": same,
                "geometry_before": original,
                "geometry_after": after.mesh.geometry_hash(),
                "reason": "" if same else
                          "the build command produced different geometry"}
    except subprocess.TimeoutExpired:
        return {"checked": True, "reproduced": False,
                "reason": f"the build command did not finish in {timeout_s:.0f}s"}
    finally:
        if not (root / MODEL_NAME).is_file():
            backup.replace(root / MODEL_NAME)
        else:
            backup.unlink(missing_ok=True)


def write_manifest(root: str | Path, *, method: str, build: dict | None = None,
                   **extra: Any) -> Path:
    root = Path(root)
    root.mkdir(parents=True, exist_ok=True)
    body = {"schema": SCHEMA, "method": method, **extra}
    if build:
        body["build"] = build
    path = root / MANIFEST_NAME
    path.write_text(json.dumps(body, indent=1, ensure_ascii=False))
    return path
