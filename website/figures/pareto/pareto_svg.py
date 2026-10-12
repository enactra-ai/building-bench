#!/usr/bin/env python3
"""The Pareto frontier as an interactive SVG for enactra.ai/buildingbench (Leaderboard section).

The same board, palette, frontier rule and name placement as render.py's still -- the names are
placed by render.py's own solver, measured in Noto Sans, and the SVG embeds Noto Sans so they land
where the solver put them -- but drawn as markup instead of pixels, with no title, card or Enactra
lockup (the page supplies those), and every dot a focusable node carrying its figures in `data-tip`
for the page's tooltip script (the node structure of the board's own plot: g.node[.opt] > .ring,
.chip, text).

    python3 pareto_svg.py OUT.svg
"""
import base64
import html
import json
import math
import os
import sys

import cairo

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import render as R                                        # noqa: E402
from models import MODELS, COMPANY, DISPLAY, frontier     # noqa: E402

W, H = 1200, 560
FONT = "BB Noto Sans"            # named apart, so the page's own text keeps its font
FONTS = os.path.join(HERE, "..", "bar", "assets", "fonts")
ORGNAME = {"xAI": "SpaceXAI", "Undisclosed": "undisclosed"}


def hexc(c):
    return "#%02x%02x%02x" % tuple(int(round(v * 255)) for v in c)


def esc(s):
    return html.escape(s, quote=True)


def board_rows():
    d = json.load(open(os.path.join(HERE, "boardData.json")))
    return {r["label"]: r for r in d["rowsSame"]}


def usd(c):
    if c is None:
        return "—"
    return "$%.2f" % c if c < 10 else "$%.1f" % c


def main(out):
    R.OPTS.update(intro=False, section=True)
    sc = R.Scene(W, H)
    # the plot fills the panel: no title above it, and the caption is the page's
    sc.px0, sc.px1 = 0.080 * W, 0.975 * W
    sc.py0, sc.py1 = 0.045 * H, 0.845 * H
    surface = cairo.ImageSurface(cairo.FORMAT_RGB24, W, H)
    cr = cairo.Context(surface)
    sc.place_labels(cr)
    s = sc.s
    rows = board_rows()
    on = {m[0] for m in frontier(MODELS)}

    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" class="lbf-svg lbf-pareto" role="group" '
         'aria-label="Score against the median cost of one run, dearer runs on the left, log scale">' % (W, H)]
    faces = "".join("@font-face{font-family:'%s';font-weight:%d;src:url(data:font/woff2;base64,%s) format('woff2')}" % (
        FONT, wt, base64.b64encode(open(os.path.join(FONTS, f), "rb").read()).decode())
        for wt, f in ((400, "noto-sans-latin-400-normal.woff2"), (700, "noto-sans-latin-700-normal.woff2")))
    o.append("<style>%s</style>" % faces)
    o.append('<g font-family="%s, \'Noto Sans\', Arial, sans-serif">' % FONT)

    # -- grid and axes
    for v in R.SCORE_TICKS:
        y = sc.y_of(v)
        o.append('<line class="grid" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"/>' % (sc.px0, y, sc.px1, y))
        o.append('<text class="tick" x="%.1f" y="%.1f" text-anchor="end" font-size="%.1f">%.2f</text>'
                 % (sc.px0 - 9 * s, y + sc.f_tick * 0.34, sc.f_tick, v))
    for c in sc.ticks:
        x = sc.x_of(c)
        o.append('<line class="grid" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"/>' % (x, sc.py0, x, sc.py1))
        o.append('<text class="tick" x="%.1f" y="%.1f" text-anchor="middle" font-size="%.1f">$%g</text>'
                 % (x, sc.py1 + 0.042 * H, sc.f_tick, c))
    if sc.u_zero is not None:
        xz, xw = sc.x_of(0), (sc.x_of(sc.ticks[-1]) + sc.x_of(0)) / 2
        o.append('<line class="wall" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke-dasharray="%.1f %.1f"/>'
                 % (xw, sc.py0, xw, sc.py1, 3 * s, 4 * s))
        o.append('<text class="tick" x="%.1f" y="%.1f" text-anchor="middle" font-size="%.1f">$0</text>'
                 % (xz, sc.py1 + 0.042 * H, sc.f_tick))
    o.append('<text class="axis" x="%.1f" y="%.1f" text-anchor="middle" font-size="%.1f">Median Cost per Task (USD)</text>'
             % ((sc.px0 + sc.px1) / 2, sc.py1 + 0.100 * H, sc.f_axis))
    o.append('<text class="axis" transform="translate(%.1f,%.1f) rotate(-90)" text-anchor="middle" font-size="%.1f">Simulation Quality</text>'
             % (0.022 * W, (sc.py0 + sc.py1) / 2, sc.f_axis))

    # -- the frontier
    pts = [(sc.x_of(m[1]), sc.y_of(m[2])) for m in sorted(frontier(MODELS), key=lambda m: sc.x_of(m[1]))]
    d = "M" + " L".join("%.1f,%.1f" % p for p in pts)
    o.append('<path class="halo" d="%s" stroke-width="%.1f"/>' % (d, sc.halo_w))
    o.append('<path class="front" d="%s" stroke-width="%.1f"/>' % (d, sc.front_w))

    # -- one node per model: dot, ring if on the frontier, leader, name
    r_ = max(sc.ring, sc.chip / 2)
    for m in sorted(MODELS, key=lambda m: m[0] in on):
        label, cost, score, org, _ = m
        colour = R.rgb(COMPANY[org])
        opt = label in on
        cx, cy = sc.x_of(cost), sc.y_of(score)
        name = sc.name_of(label)
        row = rows[label]
        tags = [t["text"] for t in row.get("tags", [])]
        se = (row.get("band") or {}).get("overall")
        tip = [["score", "%.3f" % score + (" ± %.3f" % se if se else "")],
               ["cost / run", ("$0.00 (estimated)" if cost <= 0 else usd(cost) + (" (est.)" if "est. price" in tags else ""))],
               ["family", ORGNAME.get(org, org)], ["effort", row["facets"].get("effort", "")],
               ["frontier", "yes" if opt else "no"]]
        o.append('<g class="node%s" tabindex="0" role="img" data-name="%s" data-tip="%s" aria-label="%s">'
                 % (" opt" if opt else "", esc(name), esc(json.dumps(tip)),
                    esc("%s: %.3f at %s" % (name, score, "$0" if cost <= 0 else usd(cost)))))
        # a generous invisible hit area: the chips are small
        o.append('<circle class="hit" cx="%.1f" cy="%.1f" r="%.1f"/>' % (cx, cy, r_ * 1.6))
        if opt:
            o.append('<circle class="ring" cx="%.1f" cy="%.1f" r="%.1f" stroke-width="%.1f"/>' % (cx, cy, sc.ring, 1.8 * s))
        half = sc.chip / 2
        o.append('<rect class="chip" x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s" stroke="#fff" stroke-width="%.1f"/>'
                 % (cx - half, cy - half, 2 * half, 2 * half, half * 0.46, hexc(colour), 2.4 * s))
        o.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="none" stroke="%s" stroke-opacity=".9" stroke-width="%.1f"/>'
                 % (cx - half, cy - half, 2 * half, 2 * half, half * 0.46, hexc(R.ink(colour)), 1.0 * s))
        dx, dy, anchor, lbox = sc.labels[label]
        nx, ny = min(max(cx, lbox[0]), lbox[2]), min(max(cy, lbox[1]), lbox[3])
        dist = math.hypot(nx - cx, ny - cy)
        if dist > r_ * 1.55:
            ux, uy = (nx - cx) / dist, (ny - cy) / dist
            o.append('<line class="leader" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="%.2f"/>'
                     % (cx + ux * r_ * 0.95, cy + uy * r_ * 0.95, nx - ux * 1.5 * s, ny - uy * 1.5 * s,
                        hexc(R.pale(colour)), 1.15 * s))
        size = sc.f_name_on if opt else sc.f_name_off
        col = R.ink(colour) if opt else R.pale(colour)
        o.append('<text class="name" x="%.1f" y="%.1f" text-anchor="%s" font-size="%.1f" font-weight="%d" fill="%s" stroke-width="%.1f">%s</text>'
                 % (cx + dx, cy + dy, {"l": "start", "c": "middle", "r": "end"}[anchor], size, 700 if opt else 400,
                    hexc(col), sc.halo_t, esc(name)))
        o.append("</g>")
    o.append("</g></svg>")
    open(out, "w").write("".join(o))
    print(out, len("".join(o)), "bytes;", len(MODELS), "models,", len(on), "on the frontier")


if __name__ == "__main__":
    main(sys.argv[1])
