"""The tools a lane gets, in one file: check and preview.

    ./check      is this submission admissible?
    ./preview    render it through the cameras you were given

They live together because they are one thing from the agent's side — the
answer to "am I done yet". What is NOT here is a score: these say what is
wrong, never how well it did.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

# --------------------------------------------------------------------------- #
# check — the acceptance gates
# --------------------------------------------------------------------------- #

def check(args: argparse.Namespace) -> int:
    from bench.building import contract
    from bench.building.spec import Budget

    radius = 60.0
    site = Path(args.site)
    if site.is_file():
        body = json.loads(site.read_text())
        if body.get("footprint_m"):
            radius = max((x * x + y * y) ** 0.5 for x, y in body["footprint_m"])

    result = contract.load(args.submission,
                           budget=Budget(triangles=args.triangles,
                                         megabytes=args.megabytes),
                           site_radius_m=radius)
    if args.json:
        print(json.dumps(result.as_dict(), indent=1))
        return 0 if result.accepted else 1
    if result.accepted:
        size = result.model_path.stat().st_size / 1e6
        low, high = result.mesh.bounds()
        print(f"admissible: {result.mesh.triangle_count:,} triangles, {size:.1f} MB")
        print(f"  bounds  x {low[0]:+.1f} .. {high[0]:+.1f} m   "
              f"y {low[1]:+.1f} .. {high[1]:+.1f} m   "
              f"z {low[2]:+.1f} .. {high[2]:+.1f} m")
        print("  this says it is admissible. It does not say it is good.")
        return 0
    print("not admissible yet:", file=sys.stderr)
    for complaint in result.complaints:
        print(f"  - {complaint}", file=sys.stderr)
    return 1


# --------------------------------------------------------------------------- #
# preview — see your own model through the given cameras
# --------------------------------------------------------------------------- #

def preview(args: argparse.Namespace) -> int:
    """Writes ``previews/<view>.png`` and ``previews/over_<view>.png``.

    The overlay is the one to look at: a silhouette that hugs the building and
    one that is a storey too tall are indistinguishable without it. Note that
    this is UNLIT base colour — it is the geometry check. The lit PBR renders
    happen on the grading side, in Unreal and in three.js.
    """
    import numpy as np

    from bench.building import glb, raster
    from bench.building import image as img
    from bench.building.frame import Origin, View

    model = Path(args.submission) / "building.glb"
    if not model.is_file():
        print(f"no model at {model}")
        return 1
    mesh = glb.read(model)
    body = json.loads(Path(args.cameras).read_text())
    views = [View.from_dict(v) for v in body["views"]]
    if args.only:
        views = [v for v in views if v.name in set(args.only)]
    # The preview lives in the model's own frame, so only the axes matter.
    origin = Origin(lat=0.0, lon=0.0)

    out = Path(args.out)
    rows = []
    for view in views:
        frame = raster.render(mesh, view, origin, lambert=True)
        img.write(out / f"{view.name}.png", frame.colour)
        photo = Path(args.views) / f"{view.name}.png"
        if photo.is_file():
            reference = img.read(photo)
            if reference.shape[:2] == frame.alpha.shape:
                edge = img.dilate(img.edges(frame.mask), 1)
                img.write(out / f"over_{view.name}.png",
                          img.overlay(reference, edge, (1.0, 0.25, 0.1), 0.95))
        rows.append((view.name, float(frame.mask.mean()),
                     float(np.nanmin(frame.depth)) if np.isfinite(frame.depth).any()
                     else float("nan")))

    print(f"{mesh.triangle_count:,} triangles; wrote {out}/")
    low, high = mesh.bounds()
    print(f"  bounds  x {low[0]:+7.2f} .. {high[0]:+7.2f}    "
          f"y {low[1]:+7.2f} .. {high[1]:+7.2f}    "
          f"z {low[2]:+7.2f} .. {high[2]:+7.2f}   (metres, Y up, Z south)")
    for name, coverage, nearest in rows:
        print(f"  {name:14s} covers {coverage * 100:5.2f}% of frame, "
              f"nearest surface {nearest:7.2f} m")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="kit", description=__doc__)
    sub = parser.add_subparsers(dest="tool", required=True)

    c = sub.add_parser("check", help="the acceptance gates")
    c.add_argument("--submission", default="submission")
    c.add_argument("--site", default="site.json")
    c.add_argument("--triangles", type=int, default=300_000)
    c.add_argument("--megabytes", type=float, default=64.0)
    c.add_argument("--json", action="store_true")
    c.set_defaults(func=check)

    p = sub.add_parser("preview", help="render through the given cameras")
    p.add_argument("--submission", default="submission")
    p.add_argument("--cameras", default="cameras.json")
    p.add_argument("--views", default="views")
    # NOT "preview": the wrapper script is called ./preview and mkdir would
    # collide with it. Found by the lane test, which is the point of running
    # the kit the way the agent runs it.
    p.add_argument("--out", default="previews")
    p.add_argument("--only", nargs="*", default=None)
    p.set_defaults(func=preview)

    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
