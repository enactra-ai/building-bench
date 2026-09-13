"""What the task IS: one hashable file that says which building, seen how, and
with how much of the answer given away.

Difficulty is a vector that can be moved one axis at a time, not a word like
"hard":

  footprint   given | hint | none      the plan of the building
  height      given | hint | none      how tall it is
  cameras     given | none             the pose of each reference view
  views       how many, from where     evidence

``hint`` means the value is degraded in a stated way (rounded, or perturbed by
a stated amount). ``cameras`` is always ``given`` in this version.
"""
from __future__ import annotations

import hashlib
import json
from dataclasses import asdict, dataclass, field
from enum import StrEnum
from pathlib import Path
from typing import Any


SCHEMA = "city_bench.building_task/1"

#: Part of a task's identity alongside its fields: the version of the camera
#: layout the fields describe.
LAYOUT_VERSION = 2


class Reveal(StrEnum):
    GIVEN = "given"
    HINT = "hint"
    NONE = "none"


@dataclass(frozen=True)
class Viewpoints:
    """How the building is photographed. Sizes come from the building itself.

    Distance is a multiple of the footprint radius rather than a number of
    metres, so a task on a kiosk and a task on a tower frame their subject the
    same way.
    """

    orbit_count: int = 8
    orbit_elevation_deg: float = 28.0
    orbit_distance_radii: float = 4.8
    heldout_count: int = 4
    heldout_elevation_deg: float = 52.0
    heldout_extrapolated: int = 2
    street_count: int = 2
    #: Eye height, in metres above the site's ground. An ELEVATION ANGLE was
    #: tried first and is the wrong parameter: 4 degrees at 77 m puts the
    #: camera 16 m up, which is a first-floor window rather than a pavement,
    #: and it moves with the building's size.
    street_camera_height_m: float = 3.5
    street_distance_radii: float = 2.4
    plan_view: bool = True
    plan_distance_radii: float = 26.0
    plan_fov_deg: float = 12.0
    fov_deg: float = 45.0
    width: int = 1024
    height: int = 768



@dataclass(frozen=True)
class Budget:
    triangles: int = 300_000
    megabytes: float = 64.0
    #: What a run is allowed to spend. Part of the task's identity, because a
    #: submission made with ten times the budget is not comparable.
    steps: int = 120
    seconds: float = 5400.0


@dataclass(frozen=True)
class Task:
    id: str
    site_id: str
    lat: float
    lon: float
    osm_date: str = ""
    osm_ref: str = ""
    footprint: str = Reveal.GIVEN.value
    height: str = Reveal.NONE.value
    cameras: str = Reveal.GIVEN.value
    views: Viewpoints = field(default_factory=Viewpoints)
    budget: Budget = field(default_factory=Budget)
    #: Metres of noise a "hint" carries. Stated in the brief, so an agent can
    #: reason about how much to trust it.
    hint_noise_m: float = 1.5
    note: str = ""

    def __post_init__(self) -> None:
        for name in ("footprint", "height", "cameras"):
            Reveal(getattr(self, name))
        if self.cameras != Reveal.GIVEN.value:
            raise NotImplementedError(
                "cameras=none is not implemented in this version")

    def identity(self) -> str:
        payload = {"site": [self.site_id, self.lat, self.lon, self.osm_date, self.osm_ref],
                   "reveal": [self.footprint, self.height, self.cameras],
                   "views": asdict(self.views), "layout": LAYOUT_VERSION,
                   "budget": asdict(self.budget),
                   "hint_noise_m": self.hint_noise_m}
        blob = json.dumps(payload, sort_keys=True)
        return hashlib.sha256(blob.encode()).hexdigest()[:16]

    def to_dict(self) -> dict[str, Any]:
        return {"schema": SCHEMA, "identity": self.identity(), **asdict(self)}

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Task:
        found = data.get("schema", SCHEMA)
        data = {k: v for k, v in data.items() if k not in ("schema", "identity")}
        try:
            if isinstance(data.get("views"), dict):
                data["views"] = Viewpoints(**data["views"])
            if isinstance(data.get("budget"), dict):
                data["budget"] = Budget(**data["budget"])
            return cls(**data)
        except TypeError as exc:
            # A task file the current code cannot read is a task from a
            # different version, and quietly dropping the fields it does not
            # recognise would make two runs with different identities claim
            # the same one. Say so instead.
            raise ValueError(
                f"this task file says {found!r} but does not fit it ({exc}). "
                f"Rebuild the instance rather than editing the file: the "
                f"identity is over the fields, and a partial read is a "
                f"different task wearing the same hash.") from exc

    def save(self, path: str | Path) -> Path:
        path = Path(path)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(self.to_dict(), indent=1, ensure_ascii=False))
        return path

    @classmethod
    def load(cls, path: str | Path) -> Task:
        return cls.from_dict(json.loads(Path(path).read_text()))


# --------------------------------------------------------------------------- #
# the ladder
# --------------------------------------------------------------------------- #

TIERS: dict[str, dict[str, Any]] = {
    # The plan and the height are handed over. What is left is everything the
    # map cannot say: the steps, the overhangs, the columns, the facade.
    "sighted": {"footprint": Reveal.GIVEN.value, "height": Reveal.GIVEN.value},
    # The map's plan, and the height is the agent's to read off the pictures.
    "standard": {"footprint": Reveal.GIVEN.value, "height": Reveal.NONE.value},
    # A traced plan, a metre or two out, offered as a starting point rather
    # than as truth.
    "hinted": {"footprint": Reveal.HINT.value, "height": Reveal.HINT.value},
    # Pictures and camera poses. Everything else is the agent's to recover.
    "blind": {"footprint": Reveal.NONE.value, "height": Reveal.NONE.value},
}


def tier(name: str) -> dict[str, Any]:
    if name not in TIERS:
        raise KeyError(f"no tier {name!r}; known: {', '.join(TIERS)}")
    return dict(TIERS[name])
