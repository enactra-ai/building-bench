"""The local frame every part of this task agrees in, and the two lenses.

Three coordinate systems meet here and each one is somebody's convention:

  geodetic   lat, lon, height above the WGS84 ellipsoid.
  ENU        metres east / north / up from a stated origin on the ground. What
             a person reasons in, and what the cameras are given in.
  glTF       metres, +Y up. What the agent hands in and what three.js and
             Unreal both read without being told anything.

The glTF axes are pinned as **X east, Y up, Z south** — right-handed, and the
convention three.js already assumes when it calls -Z "forward". Writing that
down is not pedantry: a model delivered with north along +Z is a building
mirrored about its own axis.

Every camera's height is ``ground_ellipsoidal_m + u``: metres above the site's
own ground, so a camera and the ground it looks at share one datum.
"""
from __future__ import annotations

import math
from dataclasses import asdict, dataclass
from typing import Any

# WGS84
A = 6378137.0
F = 1.0 / 298.257223563
E2 = F * (2.0 - F)


def curvature(lat_deg: float) -> tuple[float, float]:
    """Metres per radian north and east at this latitude (M, N cos(lat))."""
    lat = math.radians(lat_deg)
    s = math.sin(lat)
    w = math.sqrt(1.0 - E2 * s * s)
    meridional = A * (1.0 - E2) / (w ** 3)
    prime_vertical = A / w
    return meridional, prime_vertical * math.cos(lat)


@dataclass(frozen=True)
class Origin:
    """Where ENU (0, 0, 0) is: a point on the ground under the building."""

    lat: float
    lon: float
    ground_ellipsoidal_m: float = 0.0
    #: How the ground datum was arrived at: "mesh" was measured, "assumed" was not.
    ground_source: str = "assumed"

    def to_enu(self, lat: float, lon: float) -> tuple[float, float]:
        m, n = curvature(self.lat)
        return ((lon - self.lon) * math.radians(1.0) * n,
                (lat - self.lat) * math.radians(1.0) * m)

    def to_geodetic(self, east: float, north: float) -> tuple[float, float]:
        m, n = curvature(self.lat)
        return (self.lat + math.degrees(north / m), self.lon + math.degrees(east / n))

    def as_dict(self) -> dict[str, Any]:
        return asdict(self)


def enu_to_gltf(east: float, north: float, up: float) -> tuple[float, float, float]:
    """ENU metres -> glTF metres (X east, Y up, Z south)."""
    return (east, up, -north)


def gltf_to_enu(x: float, y: float, z: float) -> tuple[float, float, float]:
    return (x, -z, y)


# --------------------------------------------------------------------------- #
# the lens
# --------------------------------------------------------------------------- #

@dataclass(frozen=True)
class View:
    """One camera: where it is in the site's ENU frame, and which way it looks."""

    name: str
    #: Where the camera is, in the site's ENU frame.
    east: float
    north: float
    up: float
    #: Heading clockwise from north, pitch up from the horizon (negative looks
    #: down), roll about the view axis.
    heading_deg: float
    pitch_deg: float
    roll_deg: float = 0.0
    #: HORIZONTAL field of view.
    fov_deg: float = 45.0
    width: int = 1024
    height: int = 768
    #: "orbit" | "street" | "top".
    family: str = "orbit"

    def geodetic(self, origin: Origin) -> dict[str, float]:
        lat, lon = origin.to_geodetic(self.east, self.north)
        return {"lat": lat, "lon": lon,
                "alt_m": origin.ground_ellipsoidal_m + self.up,
                "heading_deg": self.heading_deg, "pitch_deg": self.pitch_deg,
                "roll_deg": self.roll_deg, "fov_deg": self.fov_deg}

    # -- the same lens, as a matrix ----------------------------------------- #
    def basis(self) -> tuple[tuple[float, float, float], ...]:
        """(forward, up, right) unit vectors in ENU.

        Derived from heading, pitch and roll.
        """
        h = math.radians(self.heading_deg)
        p = math.radians(self.pitch_deg)
        r = math.radians(self.roll_deg)
        cp, sp, ch, sh = math.cos(p), math.sin(p), math.cos(h), math.sin(h)
        forward = (cp * sh, cp * ch, sp)
        up = (-sp * sh, -sp * ch, cp)
        right = (ch, -sh, 0.0)
        if r:
            cr, sr = math.cos(r), math.sin(r)
            right, up = (tuple(cr * right[i] + sr * up[i] for i in range(3)),
                         tuple(-sr * right[i] + cr * up[i] for i in range(3)))
        return forward, up, right

    def intrinsics(self) -> tuple[float, float, float, float]:
        """(fx, fy, cx, cy) in pixels, square pixels, principal point centred."""
        fx = (self.width / 2.0) / math.tan(math.radians(self.fov_deg) / 2.0)
        return fx, fx, self.width / 2.0, self.height / 2.0

    def as_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> View:
        return cls(**{k: v for k, v in data.items() if k in cls.__annotations__})


def look_at(target: tuple[float, float, float], *, azimuth_deg: float,
            elevation_deg: float, distance_m: float, **kw: Any) -> View:
    """A camera standing off ``target`` on a compass bearing, aimed back at it.

    ``azimuth_deg`` is the bearing FROM the target TO the camera — so 0 puts
    the camera due north of the building looking south, which is the reading
    that survives being said out loud.
    """
    az, el = math.radians(azimuth_deg), math.radians(elevation_deg)
    horizontal = distance_m * math.cos(el)
    return View(east=target[0] + horizontal * math.sin(az),
                north=target[1] + horizontal * math.cos(az),
                up=target[2] + distance_m * math.sin(el),
                heading_deg=(azimuth_deg + 180.0) % 360.0,
                pitch_deg=-elevation_deg, **kw)


def aimed_at(position: tuple[float, float, float],
             target: tuple[float, float, float], **kw: Any) -> View:
    """A camera at a stated place, looking at a stated point.

    ``look_at`` puts the camera on an orbit; this puts it where a person would
    stand. Street-level views need the second form: an elevation angle that
    lands the camera at eye height from 80 m away is a fraction of a degree,
    and stating the height directly is both clearer and stable when the
    building's size changes.
    """
    east = target[0] - position[0]
    north = target[1] - position[1]
    up = target[2] - position[2]
    horizontal = math.hypot(east, north)
    heading = math.degrees(math.atan2(east, north)) % 360.0
    pitch = math.degrees(math.atan2(up, horizontal)) if horizontal else (
        90.0 if up > 0 else -90.0)
    return View(east=position[0], north=position[1], up=position[2],
                heading_deg=heading, pitch_deg=pitch, **kw)
