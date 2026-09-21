"""Draw docs/assets/pareto.gif: score against price, with models arriving one by one.

    python3 docs/pareto_film.py

The numbers are the board's own (`harness.board` over results/), so the film
cannot disagree with the table. Which models arrive, and in what order, is the
one editorial choice here: ARRIVALS, in release order. Every other ranked model
is on the chart from the first frame. A model that ran for free has no place on
a logarithmic price axis and is left off, as the static price figure's "free"
column is the only place it can go.
"""
from __future__ import annotations

import io
import math
import re
import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                   # noqa: E402
from matplotlib.patches import FancyBboxPatch                     # noqa: E402
from matplotlib.path import Path as MPath                         # noqa: E402
from matplotlib.patches import PathPatch                          # noqa: E402
from PIL import Image                                             # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from harness import board                                         # noqa: E402

OUT = ROOT / "docs" / "assets" / "pareto.gif"
ARRIVALS = ["fable51max", "gpt-6-astra-ultra", "deepseek-v41-flash-claude-code",
            "z-ai-glm-5.3-flashx-claude-code", "grok47xhigh",
            "step-5-preview-claude-code"]

FPS = 12
W, H, DPI = 1920, 1080, 100
PAPER, PANEL, INK, INK2, GRID = "#f3f1ea", "#fbfaf5", "#1d1d1b", "#8a8a84", "#e4e2da"
VENDOR = [("fable", "#d9765f"), ("opus", "#d9765f"), ("sonnet", "#d9765f"),
          ("haiku", "#d9765f"), ("gpt", "#1f9e89"), ("grok", "#b3202e"),
          ("muse", "#4f93d8"), ("kimi", "#8fb13b"), ("gemini", "#7b3fc4"),
          ("deepseek", "#4b4fd6"), ("glm", "#a36b12"), ("inkling", "#555555")]
X_TICKS = [50, 20, 10, 5, 2, 1, 0.5, 0.2]
Y_MAX = 0.96

# Liberation Sans is Arial's metrics under a free licence: without it a Linux
# box falls through to DejaVu, whose wider glyphs push labels into each other.
plt.rcParams["font.family"] = ["Arial", "Liberation Sans", "DejaVu Sans"]


def short(label: str) -> str:
    """The film's names: no maker prefix, no runner suffix, effort capitalised."""
    s = re.sub(r"^Claude ", "", label).replace(" · Claude Code", "")
    s = re.sub(r"\((\w+)\)", lambda m: "(" + ("xHigh" if m[1] == "xhigh"
                                              else m[1].capitalize()) + ")", s)
    return s.replace("GLM 5.3", "GLM-5.3").replace("DeepSeek V4.1", "DeepSeek v4.1")


def colour(model: str) -> str:
    return next((c for k, c in VENDOR if k in model.lower()), INK2)


def frontier(points: list[dict]) -> list[dict]:
    """Cheapest first; keep each one that scores above everything cheaper."""
    best, keep = -1.0, []
    for p in sorted(points, key=lambda p: (p["cost"], -p["overall"])):
        if p["overall"] > best:
            keep.append(p)
            best = p["overall"]
    return keep


# ------------------------------------------------------------------ layout

L, R, B, T = 0.075, 0.965, 0.155, 0.70        # the plot box inside the figure


def xpos(cost: float) -> float:
    lo, hi = math.log(55), math.log(0.16)
    return (math.log(cost) - lo) / (hi - lo)


def ypos(score: float) -> float:
    return score / Y_MAX


def label_offsets(points: list[dict], line: list[dict] = ()) -> dict[str, tuple[float, float, str]]:
    """Where each label sits relative to its dot, in axes fractions.

    Greedy: try a few slots per label, take the first that overlaps no dot and
    no label already placed. Frontier labels go first so they get the best seats.
    """
    slots = [(0.012, 0.0, "left"), (-0.012, 0.0, "right"), (0.0, 0.035, "center"),
             (0.0, -0.045, "center"), (0.012, 0.03, "left"), (-0.012, 0.03, "right"),
             (0.012, -0.035, "left"), (-0.012, -0.035, "right"), (0.0, 0.07, "center"),
             (0.0, -0.08, "center")]
    placed, out = [], {}
    dots = [(xpos(p["cost"]), ypos(p["overall"])) for p in points]
    # the frontier is an obstacle too: sample it so no label sits on the line
    for a, b in zip(line, line[1:]):
        (x0, y0), (x1, y1) = ((xpos(q["cost"]), ypos(q["overall"])) for q in (a, b))
        dots += [(x0 + (x1 - x0) * k / 40, y0 + (y1 - y0) * k / 40) for k in range(1, 40)]
    order = sorted(points, key=lambda p: (not p.get("front"), -p["overall"]))
    for p in order:
        x, y = xpos(p["cost"]), ypos(p["overall"])
        w = (0.0068 if p.get("front") else 0.0056) * len(p["name"])
        h = 0.042 if p.get("front") else 0.034
        for dx, dy, ha in slots:
            if p.get("front") and dy == 0:
                dx *= 1.6      # clear the frontier dot's ring
            x0 = x + dx - (w if ha == "right" else w / 2 if ha == "center" else 0)
            y0 = y + dy - h / 2
            box = (x0, y0, x0 + w, y0 + h)
            if box[0] < 0 or box[2] > 1.0 or box[1] < 0.02 or box[3] > 1.0:
                continue
            hit = any(not (box[2] < a[0] or box[0] > a[2] or box[3] < a[1] or box[1] > a[3])
                      for a in placed)
            hit = hit or any(box[0] - 0.006 < dx_ < box[2] + 0.006 and
                             box[1] - 0.01 < dy_ < box[3] + 0.01
                             for (dx_, dy_) in dots if (dx_, dy_) != (x, y))
            if not hit:
                placed.append(box)
                out[p["model"]] = (dx, dy, ha)
                break
        else:
            out[p["model"]] = slots[0]
    return out


# ------------------------------------------------------------------ drawing

def ease(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def draw(points: list[dict], shown: dict[str, float], fronts: list[tuple[list[dict], float]],
         added: list[tuple[str, str, float]], fresh: dict[str, float]) -> Image.Image:
    fig = plt.figure(figsize=(W / DPI, H / DPI), dpi=DPI, facecolor=PAPER)
    card = FancyBboxPatch((0.012, 0.02), 0.976, 0.96, boxstyle="round,pad=0,rounding_size=0.012",
                          transform=fig.transFigure, fc=PANEL, ec="#e2dfd4", lw=1.2, zorder=-10)
    fig.patches.append(card)
    head = fig.text(0.04, 0.905, "BuildingBench", fontsize=30, fontweight="bold", color=INK)
    box = head.get_window_extent(renderer=fig.canvas.get_renderer())
    fig.text(0.04 + box.width / W + 0.008, 0.905, "Pareto Frontier", fontsize=30, color="#6f6f69")
    for i, (name, col, a) in enumerate(added):
        fig.text(0.04, 0.868 - i * 0.03, f"+ {name}", fontsize=15, fontweight="bold",
                 color=col, alpha=a)
    # brand, top right
    fig.text(0.955, 0.925, "Enactra AI", fontsize=17, fontweight="bold", color=INK, ha="right")
    fig.text(0.955 - 0.066, 0.9, "enactra.ai", fontsize=12, color=INK2, ha="left")
    mark = fig.add_axes([0.852, 0.888, 0.03, 0.055])
    mark.set_axis_off()
    mark.add_patch(FancyBboxPatch((0.04, 0.04), 0.92, 0.92,
                                  boxstyle="round,pad=0,rounding_size=0.2", fc=INK, ec="none"))
    e = [(193, 55), (84, 115), (84, 286), (202, 337), (283, 301), (144, 248), (144, 115),
         (231, 152), (306, 113), (193, 55)]
    g = [(168, 166), (168, 211), (228, 240), (294, 210), (294, 166), (231, 195), (168, 166)]
    for poly in (e, g):
        xy = [(0.5 + (px - 195) / 470, 0.5 - (py - 196) / 470) for px, py in poly]
        mark.add_patch(PathPatch(MPath(xy), fc=PANEL, ec="none"))
    mark.set_xlim(0, 1)
    mark.set_ylim(0, 1)

    ax = fig.add_axes([L, B, R - L, T - B])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_facecolor("none")
    for s in ax.spines.values():
        s.set_visible(False)
    ax.set_xticks([xpos(c) for c in X_TICKS])
    ax.set_xticklabels([f"${c:g}" for c in X_TICKS], fontsize=12, color=INK2)
    ax.set_yticks([ypos(v) for v in (0, 0.24, 0.48, 0.72, 0.96)])
    ax.set_yticklabels([f"{v:.2f}" for v in (0, 0.24, 0.48, 0.72, 0.96)], fontsize=12, color=INK2)
    ax.tick_params(length=0, pad=10)
    ax.grid(color=GRID, lw=1.1)
    ax.set_axisbelow(True)
    ax.set_xlabel("Median Cost per Task (USD)", fontsize=17, color="#55554f", labelpad=12)
    ax.set_ylabel("Simulation Quality", fontsize=17, color="#55554f", labelpad=14)
    fig.text(0.04, 0.045, "Solid: the frontier — nothing cheaper scores higher.   "
             "One dot per model, at the effort it was run at.", fontsize=12.5, color="#55554f")

    for line, a in fronts:
        xs = [xpos(p["cost"]) for p in line]
        ys = [ypos(p["overall"]) for p in line]
        ax.plot(xs, ys, color="#c9c8c1", lw=11, alpha=0.55 * a, solid_capstyle="round", zorder=2)
        ax.plot(xs, ys, color="#2b2b29", lw=3.2, alpha=a, solid_capstyle="round", zorder=3)

    final_front = {p["model"] for p in fronts[-1][0]} if fronts else set()
    offs = label_offsets([dict(p, front=p["model"] in final_front) for p in points
                          if shown.get(p["model"], 0) > 0], fronts[-1][0] if fronts else [])
    for p in points:
        a = shown.get(p["model"], 0.0)
        if a <= 0:
            continue
        x, y = xpos(p["cost"]), ypos(p["overall"])
        col = colour(p["model"])
        on = p["model"] in final_front
        pop = fresh.get(p["model"], 1.0)
        scale = 1.0 + 0.9 * math.sin(math.pi * min(pop, 1.0)) if pop < 1.0 else 1.0
        if on:
            ax.scatter([x], [y], s=330 * scale, facecolor="white", edgecolor="#2b2b29",
                       lw=2.4, alpha=a, zorder=5)
            ax.scatter([x], [y], s=95 * scale, marker="s", color=col, alpha=a, zorder=6)
        else:
            ax.scatter([x], [y], s=120 * scale, marker="s", color=col, alpha=a,
                       edgecolor="white", lw=1, zorder=4)
        if pop < 1.0:
            ring = min(pop * 1.4, 1.0)
            ax.scatter([x], [y], s=300 + 2600 * ring, facecolor="none", edgecolor=col,
                       lw=2.5, alpha=(1 - ring) * 0.8, zorder=4)
        dx, dy, ha = offs.get(p["model"], (0.012, 0, "left"))
        ax.text(x + dx, y + dy, p["name"], fontsize=15.5 if on else 12.5,
                fontweight="bold" if on else "normal", color=col, ha=ha, va="center",
                alpha=a * (1.0 if on else 0.9), zorder=7)

    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=DPI, facecolor=PAPER)
    plt.close(fig)
    buf.seek(0)
    return Image.open(buf).convert("RGB")


def main() -> int:
    lines = [l for l in board.board(board.load(board.REFERENCE))
             if l["ranked"] and l["cost_usd"]]
    points = [{"model": l["model"], "name": short(l["label"]), "overall": l["overall"],
               "cost": l["cost_usd"]} for l in lines]
    by = {p["model"]: p for p in points}
    missing = [m for m in ARRIVALS if m not in by]
    if missing:
        sys.exit(f"not on the board: {missing}")
    base = [p for p in points if p["model"] not in ARRIVALS]

    frames, durations = [], []

    def emit(img, n):
        frames.append(img)
        durations.append(round(1000 / FPS) * n)

    # 1. the field fades in, then its frontier
    for i in range(10):
        a = ease((i + 1) / 10)
        emit(draw(points, {p["model"]: a for p in base}, [], [], {}), 1)
    front = frontier(base)
    for i in range(8):
        emit(draw(points, {p["model"]: 1 for p in base}, [(front, ease((i + 1) / 8))], [], {}), 1)
    emit(frames[-1], 10)

    # 2. each arrival: its name, its dot, and the frontier moving to take it in
    here = list(base)
    added: list[tuple[str, str, float]] = []
    for model in ARRIVALS:
        p = by[model]
        old = frontier(here)
        here.append(p)
        new = frontier(here)
        for i in range(14):
            t = (i + 1) / 14
            shown = {q["model"]: 1 for q in here}
            shown[model] = ease(t * 2)
            ann = added + [(p["name"], colour(model), ease(t * 2))]
            fronts = [(old, 1 - ease(t)), (new, ease(t))] if old != new else [(new, 1)]
            emit(draw(points, shown, fronts, ann, {model: t}), 1)
        added.append((p["name"], colour(model), 1))
        emit(frames[-1], 12)
    emit(frames[-1], 24)

    # one palette for the whole film, no dithering: flat colours stay flat
    strip = Image.new("RGB", (W, H * 4))
    for k, f in enumerate((frames[4], frames[9], frames[len(frames) // 2], frames[-1])):
        strip.paste(f, (0, H * k))
    pal = strip.quantize(colors=255, method=Image.MEDIANCUT, dither=Image.NONE)
    out = [f.quantize(palette=pal, dither=Image.NONE) for f in frames]
    out[0].save(OUT, save_all=True, append_images=out[1:], duration=durations, loop=0,
                optimize=True, disposal=1)
    print(f"{OUT.relative_to(ROOT)}  {len(frames)} frames, "
          f"{sum(durations) / 1000:.1f}s, {OUT.stat().st_size / 1e6:.1f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
