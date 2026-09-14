"""Draw the README figures: the header, the board, the price plot, the cases.

    python docs/figures.py

Every number is read from this checkout -- the board from
``results/reference_runs.jsonl`` through ``harness.board``, the buildings from
``cases/cases.json`` -- so a figure cannot drift from the repository it
illustrates. Each figure is laid out as HTML in the Enactra AI house style and
photographed by headless Chrome at 2x, in a light and a dark variant.

Needs Google Chrome, and downloads Schibsted Grotesk (SIL Open Font License
1.1) once into ``docs/.fontcache/``.
"""
from __future__ import annotations

import base64
import json
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from harness import board  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "assets"
FONT_CACHE = ROOT / "docs" / ".fontcache"
FONT_CSS = ("https://fonts.googleapis.com/css2"
            "?family=Schibsted+Grotesk:wght@400;500;600;700&display=swap")
CHROME = ("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/usr/bin/google-chrome", "/usr/bin/chromium",
          "/usr/bin/chromium-browser")

# The house style, lifted from enactra.ai.
THEMES = {
    "light": dict(paper="#f6f7f8", wash="#e2e6e9", ink="#000000",
                  ink2="#5b636b", line="#c9cfd4", signal="#f2c230",
                  track="#dfe3e7"),
    "dark": dict(paper="#17191c", wash="#0d0f11", ink="#ffffff",
                 ink2="#9aa2aa", line="#363c42", signal="#f2c230",
                 track="#282d32"),
}
MARK = ('<svg viewBox="55 40 280 320" class="mark">'
        '<path fill="currentColor" d="M193 55 L84 115 L84 286 L202 337 L283 301'
        ' L144 248 L144 115 L231 152 L306 113 Z"/>'
        '<path fill="currentColor" d="M168 166 L168 211 L228 240 L294 210'
        ' L294 166 L231 195 Z"/></svg>')


# ---------------------------------------------------------------- rendering

def chrome() -> str:
    for path in CHROME:
        if Path(path).exists():
            return path
    found = shutil.which("google-chrome") or shutil.which("chromium")
    if not found:
        raise SystemExit("Google Chrome is needed to draw the figures.")
    return found


def font() -> str:
    """The Schibsted Grotesk variable font, base64, cached on disk."""
    cached = FONT_CACHE / "SchibstedGrotesk.woff2"
    if not cached.exists():
        FONT_CACHE.mkdir(parents=True, exist_ok=True)
        agent = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                 "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36")
        request = urllib.request.Request(FONT_CSS, headers={"User-Agent": agent})
        css = urllib.request.urlopen(request).read().decode()
        block = re.search(r"/\*\s*latin\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S)
        url = re.search(r"url\((https://[^)]+)\)", block.group(1)).group(1)
        cached.write_bytes(urllib.request.urlopen(url).read())
    return base64.b64encode(cached.read_bytes()).decode()


def shoot(html: str, name: str, width: int, theme: str, jpeg: bool = False,
          assets: Path | None = None) -> Path:
    """Photograph one HTML page; trim it to its own panel; write it out."""
    colours = THEMES[theme]
    page = f"""<!doctype html><meta charset="utf-8"><style>
@font-face {{ font-family: SG; font-weight: 100 900; font-style: normal;
  src: url(data:font/woff2;base64,{font()}) format('woff2'); }}
:root {{ --paper:{colours['paper']}; --wash:{colours['wash']}; --ink:{colours['ink']};
  --ink-2:{colours['ink2']}; --line:{colours['line']}; --signal:{colours['signal']};
  --track:{colours['track']}; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; background: transparent; }}
body {{ font-family: SG, "Helvetica Neue", Arial, sans-serif; color: var(--ink);
  -webkit-font-smoothing: antialiased; }}
.num {{ font-variant-numeric: tabular-nums; }}
.panel {{ width: {width}px; background: var(--paper);
  background-image: radial-gradient(120% 90% at 78% 82%, var(--wash) 0%, var(--paper) 62%); }}
.mark {{ display: block; }}
</style><div class="panel">{html}</div>"""

    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        if assets is not None:
            shutil.copytree(assets, work / "img")
        (work / "figure.html").write_text(page)
        shot = work / "shot.png"
        subprocess.run(
            [chrome(), "--headless", "--disable-gpu", "--no-sandbox",
             "--hide-scrollbars", "--default-background-color=00000000",
             "--force-device-scale-factor=2", "--virtual-time-budget=8000",
             f"--window-size={width},6000", f"--screenshot={shot}",
             f"file://{work / 'figure.html'}"],
            check=True, capture_output=True)
        image = Image.open(shot).convert("RGBA")
        image = image.crop(image.getchannel("A").getbbox())
        OUT.mkdir(parents=True, exist_ok=True)
        if jpeg:
            flat = Image.new("RGB", image.size, colours["paper"])
            flat.paste(image, mask=image.getchannel("A"))
            out = OUT / f"{name}-{theme}.jpg"
            flat.save(out, quality=88, optimize=True, progressive=True)
        else:
            # flat ink on a soft gradient: 256 colours are indistinguishable
            # from the full render and about a third of the bytes
            out = OUT / f"{name}-{theme}.png"
            image.convert("RGB").quantize(
                colors=256, method=Image.MEDIANCUT, dither=Image.NONE
            ).save(out, optimize=True)
    print(f"{out.relative_to(ROOT)}  {image.width}x{image.height}"
          f"  {out.stat().st_size / 1024:.0f} KB")
    return out


# ------------------------------------------------------------------ figures

HEADER_CSS = """
.head { padding: 78px 64px 84px; text-align: center; }
.brand { display: inline-flex; align-items: center; gap: 10px;
  font-weight: 600; font-size: 17px; letter-spacing: -0.01em; }
.brand .mark { width: 24px; height: 24px; }
.head h1 { margin: 30px 0 0; font-size: 86px; font-weight: 500;
  line-height: 1.0; letter-spacing: -0.032em; }
.head p { margin: 24px auto 0; max-width: 820px; font-size: 22px;
  line-height: 1.4; color: var(--ink-2); letter-spacing: -0.014em; }
"""


def header(theme: str) -> None:
    body = f"""<style>{HEADER_CSS}</style><div class="head">
  <div class="brand">{MARK}<span>Enactra AI</span></div>
  <h1>Building&nbsp;Bench</h1>
  <p>Reconstruct real buildings as 3D models from aerial imagery,
     using coding agents.</p>
</div>"""
    shoot(body, "header", 1280, theme)


BOARD_CSS = """
.board { padding: 52px 56px 46px; }
.cap { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; }
.cap h2 { margin: 0; font-size: 30px; font-weight: 500; letter-spacing: -0.028em; }
.cap span { font-size: 13px; color: var(--ink-2); letter-spacing: 0.02em; }
table { width: 100%; border-collapse: collapse; margin-top: 30px; }
th { font-size: 10.5px; font-weight: 500; color: var(--ink-2); text-align: right;
  letter-spacing: 0.08em; text-transform: uppercase; padding: 0 0 11px 30px;
  border-bottom: 1px solid var(--line); white-space: nowrap; }
th.l, td.l { text-align: left; }
td { font-size: 16px; padding: 11px 0 11px 30px; text-align: right; white-space: nowrap;
  border-bottom: 1px solid color-mix(in srgb, var(--line) 48%, transparent); }
tr:last-child td { border-bottom: 0; }
td.rank, th.rank { padding-left: 0; color: var(--ink-2); font-size: 13px; }
td.name, th.name { width: 100%; padding-left: 16px; }
td.name { font-weight: 500; letter-spacing: -0.012em; }
td.sub, th.sub { color: var(--ink-2); }
td.sub { font-size: 15px; }
th.se, td.se { padding-left: 12px; }
.bar { display: flex; align-items: center; gap: 12px; justify-content: flex-end; }
.track { width: 152px; height: 7px; background: var(--track); position: relative; }
.fill { position: absolute; inset: 0 auto 0 0; background: var(--ink); }
.lead .fill { background: var(--signal); }
.score { width: 50px; font-weight: 500; letter-spacing: -0.015em; text-align: right; }
td.se { font-size: 13px; color: var(--ink-2); }
.note { margin-top: 26px; font-size: 13px; line-height: 1.6; color: var(--ink-2); }
"""


def leaderboard(theme: str) -> None:
    # only the models that ran all twelve: a mean over a different set of
    # buildings is a different measurement, and not a place on this board
    lines = [l for l in board.board(board.load(board.REFERENCE)) if l["ranked"]]
    head = [("rank", ""), ("l name", "Model"), ("wide", "Overall"), ("se", ""),
            ("sub", "Surface F"), ("sub", "Geometry"), ("sub", "Appearance"),
            ("sub", "$ / run"), ("sub", "min / run")]
    columns = "".join(f'<th class="{css}">{name}</th>' for css, name in head)

    rows = []
    for line in lines:
        lead = " lead" if line["place"] == 1 else ""
        bar = (f'<div class="bar"><div class="track"><div class="fill" '
               f'style="width:{line["overall"] * 100:.1f}%"></div></div>'
               f'<div class="score num">{line["overall"]:.3f}</div></div>')
        rows.append(
            f'<tr class="{lead.strip()}">'
            f'<td class="rank num">{line["place"]}</td>'
            f'<td class="l name">{line["label"]}</td>'
            f'<td class="wide">{bar}</td>'
            f'<td class="se num">± {board._f(line["se"])[1:]}</td>'
            f'<td class="sub num">{board._f(line["surface_f"])}</td>'
            f'<td class="sub num">{board._f(line["geometry"])}</td>'
            f'<td class="sub num">{board._f(line["appearance"])}</td>'
            f'<td class="sub num">{board._f(line["cost_usd"], 2)}</td>'
            f'<td class="sub num">{board._f(line["minutes"], 0)}</td></tr>')

    body = f"""<style>{BOARD_CSS}</style><div class="board">
  <div class="cap"><h2>Reference leaderboard</h2>
    <span>Twelve public buildings &middot; blind tier &middot; one run per model per building</span></div>
  <table><thead><tr>{columns}</tr></thead><tbody>{''.join(rows)}</tbody></table>
  <p class="note">Overall is on 0&ndash;1, averaged over the twelve buildings; &plusmn; is the
    standard error across them. $ / run and min / run are medians.</p>
</div>"""
    shoot(body, "leaderboard", 1280, theme)


CASES_CSS = """
.cases { padding: 50px 56px 46px; }
.cap { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; }
.cap h2 { margin: 0; font-size: 30px; font-weight: 500; letter-spacing: -0.028em; }
.cap span { font-size: 13px; color: var(--ink-2); letter-spacing: 0.02em; }
.grid { margin-top: 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
.tile img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
.tile b { display: block; margin-top: 10px; font-size: 15px; font-weight: 500;
  letter-spacing: -0.012em; }
.tile span { display: block; margin-top: 3px; font-size: 12.5px; color: var(--ink-2); }
"""


def framed(size: tuple[int, int], box: tuple[int, int, int, int] | None,
           margin: float = 1.4) -> tuple[int, int, int, int]:
    """A square crop of the photograph, centred on the building's own mask."""
    width, height = size
    if box is None:
        side = min(size)
        return ((width - side) // 2, (height - side) // 2,
                (width + side) // 2, (height + side) // 2)
    x0, y0, x1, y1 = box
    side = min(min(size), int(max(x1 - x0, y1 - y0) * margin))
    cx = min(max((x0 + x1) // 2, side // 2), width - side // 2)
    cy = min(max((y0 + y1) // 2, side // 2), height - side // 2)
    return (cx - side // 2, cy - side // 2, cx - side // 2 + side, cy - side // 2 + side)


def gallery(theme: str) -> None:
    meta = json.loads((ROOT / "cases" / "cases.json").read_text())["cases"]
    with tempfile.TemporaryDirectory() as tmp:
        pics = Path(tmp)
        tiles = []
        for case in meta:
            folder = ROOT / "cases" / case["key"]
            photo = Image.open(folder / "agent" / "views" / "orbit_000.png").convert("RGB")
            mask = Image.open(folder / "truth" / "alpha" / "orbit_000.png").convert("L")
            box = mask.point(lambda v: 255 if v > 8 else 0).getbbox()
            square = photo.crop(framed(photo.size, box))
            square.thumbnail((580, 580), Image.LANCZOS)
            square.save(pics / f"{case['key']}.jpg", quality=90)
            tiles.append(
                f'<div class="tile"><img src="img/{case["key"]}.jpg">'
                f'<b>{case["name"]}</b>'
                f'<span class="num">{case["city"]} &middot; {case["height_m"]:.0f} m '
                f'&middot; {case["footprint_area_m2"]:,.0f} m²</span></div>')
        body = f"""<style>{CASES_CSS}</style><div class="cases">
  <div class="cap"><h2>The twelve public cases</h2>
    <span>One of the four photographs each agent is given</span></div>
  <div class="grid">{''.join(tiles)}</div>
</div>"""
        shoot(body, "cases", 1280, theme, jpeg=True, assets=pics)



PRICE_CSS = """
.price { padding: 50px 56px 40px; }
.cap { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; }
.cap h2 { margin: 0; font-size: 30px; font-weight: 500; letter-spacing: -0.028em; }
.cap span { font-size: 13px; color: var(--ink-2); letter-spacing: 0.02em; }
.chart { margin-top: 26px; display: block; width: 100%; }
.chart text { font-family: SG, sans-serif; }
.chart .grid { stroke: var(--line); stroke-width: 1; }
.chart .gutter { stroke: var(--line); stroke-width: 1; stroke-dasharray: 2 4; }
.chart .tick { font-size: 12px; fill: var(--ink-2); font-variant-numeric: tabular-nums; }
.chart .axis { font-size: 11.5px; fill: var(--ink-2); letter-spacing: 0.1em;
  text-transform: uppercase; }
.chart .err { stroke: var(--ink-2); stroke-width: 1.2; opacity: 0.55; }
.chart .front { fill: none; stroke: var(--ink); stroke-width: 1.6;
  stroke-linejoin: round; opacity: 0.5; }
.chart .halo { fill: none; stroke: var(--paper); stroke-width: 6; stroke-linejoin: round; }
.chart .dot { fill: var(--ink); stroke: var(--paper); stroke-width: 2.5; }
.chart .dot.on { fill: var(--signal); stroke: var(--ink); stroke-width: 1.6; }
.chart .name { font-size: 12.5px; fill: var(--ink-2); letter-spacing: -0.008em;
  paint-order: stroke fill; stroke: var(--paper); stroke-width: 3.5px;
  stroke-linejoin: round; }
.chart .name.on { fill: var(--ink); font-weight: 500; }
.note { margin-top: 22px; font-size: 13px; line-height: 1.6; color: var(--ink-2); }
"""


def frontier(points: list[dict]) -> list[dict]:
    """The rows nothing else beats on both price and score."""
    keep = [a for a in points
            if not any(b is not a and b["cost"] <= a["cost"]
                       and b["overall"] >= a["overall"] for b in points)]
    return sorted(keep, key=lambda p: p["cost"])


def place(labels: list[dict], bounds: tuple[float, float, float, float]) -> None:
    """Drop each label near its point, in the first slot nothing else holds."""
    x0, y0, x1, y1 = bounds
    # only the dots are obstacles: a whisker is one hairline, and the halo
    # around a label carries it over one without costing any legibility
    taken: list[tuple[float, float, float, float]] = [
        (l["x"] - 9, l["y"] - 9, l["x"] + 9, l["y"] + 9) for l in labels]
    slots = [(0, -15, "middle"), (13, 5, "start"), (-13, 5, "end"),
             (0, 23, "middle"), (13, -9, "start"), (-13, -9, "end"),
             (0, -31, "middle"), (13, 19, "start"), (-13, 19, "end"),
             (0, 39, "middle"), (0, -47, "middle"), (0, 55, "middle")]
    for label in sorted(labels, key=lambda l: -l["overall"]):
        w = len(label["text"]) * 6.45 + 8
        for dx, dy, anchor in slots:
            cx, y = label["x"] + dx, label["y"] + dy
            left = cx if anchor == "start" else cx - w if anchor == "end" else cx - w / 2
            if not (x0 <= left and left + w <= x1 and y0 + 10 < y < y1 - 4):
                continue
            box = (left, y - 11, left + w, y + 3)
            if any(box[0] < t[2] and t[0] < box[2]
                   and box[1] < t[3] and t[1] < box[3] for t in taken):
                continue
            taken.append(box)
            label["lx"], label["ly"], label["anchor"] = cx, y, anchor
            break
        else:
            # nothing was free: take the first slot that at least stays inside
            # the plot, and let the halo carry it over whatever it crosses
            fits = [(dx, dy, a) for dx, dy, a in slots
                    if x0 <= (label["x"] + dx if a == "start" else
                              label["x"] + dx - w if a == "end" else
                              label["x"] + dx - w / 2)
                    and (label["x"] + dx if a == "start" else
                         label["x"] + dx - w if a == "end" else
                         label["x"] + dx - w / 2) + w <= x1]
            dx, dy, anchor = fits[0] if fits else (0, -15, "middle")
            label["lx"], label["ly"], label["anchor"] = (
                label["x"] + dx, label["y"] + dy, anchor)


def price(theme: str) -> None:
    ranked = [l for l in board.board(board.load(board.REFERENCE)) if l["ranked"]]
    # a row whose CLI reports no cost has no place on a price axis; it is named
    # under the plot instead of being drawn at a price it never had
    rows = [l for l in ranked if l["cost_usd"] is not None]
    unpriced = [l["label"] for l in ranked if l["cost_usd"] is None]
    missing = (f" Not drawn: {', '.join(unpriced)}, whose CLI reports no cost."
               if unpriced else "")
    points = [dict(text=l["label"], overall=l["overall"], se=l["se"] or 0.0,
                   cost=l["cost_usd"]) for l in rows]
    best = {id(p) for p in frontier(points)}

    W, H = 1168.0, 560.0
    left, right, top, bottom = 58.0, 10.0, 30.0, 52.0
    gutter, gap = 66.0, 22.0                       # the free models sit off the log axis
    x1, x0 = W - right - gutter - gap, left        # cheaper right: the axis runs backwards
    y0, y1 = top, H - bottom
    decades = [50, 20, 10, 5, 2, 1, 0.5, 0.2]
    import math
    lo, hi = math.log10(0.19), math.log10(52)
    def sx(cost: float) -> float:
        return x1 - (math.log10(cost) - lo) / (hi - lo) * (x1 - x0)
    top_score = 0.88
    def sy(score: float) -> float:
        return y1 - score / top_score * (y1 - y0)
    free_x = W - right - gutter / 2

    art = []
    for value in (0.0, 0.2, 0.4, 0.6, 0.8):
        y = sy(value)
        art.append(f'<line class="grid" x1="{left}" y1="{y:.1f}" x2="{W - right}" y2="{y:.1f}"/>')
        art.append(f'<text class="tick" x="{left - 10}" y="{y + 4:.1f}" '
                   f'text-anchor="end">{value:.1f}</text>')
    for value in decades:
        x = sx(value)
        art.append(f'<line class="grid" x1="{x:.1f}" y1="{y0}" x2="{x:.1f}" y2="{y1}" '
                   f'opacity="0.45"/>')
        money = f"${value:g}" if value >= 1 else f"${value:.2f}".rstrip("0")
        art.append(f'<text class="tick" x="{x:.1f}" y="{y1 + 21:.0f}" '
                   f'text-anchor="middle">{money}</text>')
    art.append(f'<line class="gutter" x1="{W - right - gutter:.1f}" y1="{y0}" '
               f'x2="{W - right - gutter:.1f}" y2="{y1}"/>')
    art.append(f'<text class="tick" x="{free_x:.1f}" y="{y1 + 21:.0f}" '
               f'text-anchor="middle">free</text>')
    art.append(f'<text class="axis" x="{left}" y="{y0 - 12:.0f}">Overall</text>')
    art.append(f'<text class="axis" x="{W - right}" y="{H - 8:.0f}" text-anchor="end">'
               f'Median cost of one run &#8212; dearer left, cheaper right</text>')

    for point in points:
        point["x"] = free_x if point["cost"] <= 0 else sx(point["cost"])
        point["y"] = sy(point["overall"])
        point["top"] = sy(min(point["overall"] + point["se"], top_score))
        point["foot"] = sy(point["overall"] - point["se"])
    path = " ".join(("M" if i == 0 else "L") + f'{p["x"]:.1f},{p["y"]:.1f}'
                    for i, p in enumerate(sorted((p for p in points if id(p) in best),
                                                 key=lambda p: p["x"])))
    art.append(f'<path class="halo" d="{path}"/><path class="front" d="{path}"/>')

    for point in points:
        x, y = point["x"], point["y"]
        if point["se"]:
            a, b = point["top"], point["foot"]
            art.append(f'<path class="err" d="M{x:.1f},{a:.1f}V{b:.1f}'
                       f'M{x - 3.5:.1f},{a:.1f}H{x + 3.5:.1f}'
                       f'M{x - 3.5:.1f},{b:.1f}H{x + 3.5:.1f}"/>')
    for point in points:
        on = " on" if id(point) in best else ""
        art.append(f'<circle class="dot{on}" cx="{point["x"]:.1f}" '
                   f'cy="{point["y"]:.1f}" r="5.5"/>')

    place(points, (left + 4, y0, W - right - 4, y1))
    for point in points:
        on = " on" if id(point) in best else ""
        art.append(f'<text class="name{on}" x="{point["lx"]:.1f}" y="{point["ly"]:.1f}" '
                   f'text-anchor="{point["anchor"]}">{point["text"]}</text>')

    body = f"""<style>{PRICE_CSS}</style><div class="price">
  <div class="cap"><h2>Score against price</h2>
    <span>Twelve public buildings &middot; blind tier &middot; one run per model per building</span></div>
  <svg class="chart" viewBox="0 0 {W:.0f} {H:.0f}" role="img"
       aria-label="overall score against the cost of one run, on a logarithmic price axis">
    {''.join(art)}
  </svg>
  <p class="note">Cost is the median of the twelve runs, on a logarithmic axis; whiskers are
    &plusmn; one standard error of the mean over the buildings. The line joins the rows nothing
    else beats on both price and score &mdash; up and to the right is better.{missing}</p>
</div>"""
    shoot(body, "price", 1280, theme)


def main() -> int:
    for theme in ("light", "dark"):
        header(theme)
        price(theme)
        leaderboard(theme)
        gallery(theme)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
