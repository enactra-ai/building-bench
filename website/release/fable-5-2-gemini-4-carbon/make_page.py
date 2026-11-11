#!/usr/bin/env python3
"""enactra.ai/buildingbench/fable-5-2-gemini-4-carbon/ -- the Claude Fable 5.2 + Gemini 4 Carbon release page.

    python3 make_page.py [OUT]      # default OUT: ./fable-5-2-gemini-4-carbon

Built from the BuildingBench website's own parts (website/ on the `website` branch): its colours and type,
engine.js + three-bundle.js (the 3D viewer over the submitted glTFs), the slimmed submissions in
cache/slim, picks.json (one run per model x building), clean_board.json (the license-clean board) and
figures/bar/build_site.py (the bar figure), drawn here with the GIF edition's 30 models and arrows.
The input photographs are the four views every agent was given (cases/<case>/agent/views).
"""
import gzip
import html
import json
import os
import shutil
import sys
from pathlib import Path

from PIL import Image

WEB = Path(os.environ.get("BB_WEBSITE", "/data/koe/bb-site/building-bench/website"))
CASES = Path("/data/koe/building-bench-pr64/cases")
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "fable-5-2-gemini-4-carbon").resolve()
sys.path.insert(0, str(WEB))
sys.path.insert(0, str(WEB / "figures" / "bar"))
os.chdir(WEB)
import catalog  # noqa: E402

FABLE, CARBON = "claudefable52max", "gemini4carbonhigh"
LABEL = {FABLE: "claude-fable-5-2 (max)", CARBON: "gemini-4-carbon (high)"}
OLD = {FABLE: "claude-fable-5-1 (max)", CARBON: "gemini-4-argon (high)"}
NAME = {FABLE: "Claude Fable 5.2", CARBON: "Gemini 4 Carbon"}
EFFORT = {FABLE: "max", CARBON: "high"}
COLOUR = {FABLE: "#D97757", CARBON: "#7b1fa2"}
SHOWCASE = "melbourne_45461060_enhanced_v1"           # ACCA, as in the announcement GIF
# the announcement figure's 30 models: the board's 42 less these (catalog ids)
EXCLUDE = {"inkling:free", "ember-1", "union-alpha", "space-bunny-alpha", "nemotron-3.5-super-vl",
           "claude-sonnet-5", "claude-haiku-4-5", "gpt-5.6-terra", "gpt-5.6-luna", "gpt-6-sol", "muse-spark-1.3"}

src = open(WEB / "build.py").read()
SITES = eval(src[src.index("SITES = [") + len("SITES = "):src.index("]\n", src.index("SITES = [")) + 1])
board = json.load(open(WEB / "data" / "clean_board.json"))
rows = {r["label"]: r for r in board["rowsSame"]}
picks = [p for p in json.load(open(WEB / "data" / "picks.json")) if p["series"] in (FABLE, CARBON)]
rig = json.load(open(WEB / "data" / "meta.json"))["rig"]
rank = {lab: 1 + sum(x["values"]["overall"] > r["values"]["overall"] for x in rows.values()) for lab, r in rows.items()}

if OUT.exists():
    shutil.rmtree(OUT)
(OUT / "assets").mkdir(parents=True)

# ---- the bar figure: the announcement's (bar-fc), its arrows, colours and 30 models -------------
# The site's own builder (figures/bar/build_site.py) draws no arrows -- the site's board is a standing
# one -- so the announcement figure is used, cropped to the chart: its title above and its Enactra
# lockup below are the page's own here.
import re  # noqa: E402
bars = json.load(open("/data/koe/bench-figures/bar-fc/out/bars.json"))
assert len(bars) == 30 and [b["name"] for b in bars if b["new"]] == ["Claude Fable 5.2 (max)", "Gemini 4 Carbon (high)"]
bar_svg = open("/data/koe/bench-figures/bar-fc/out/buildingbench_bar.svg").read()
bar_svg = bar_svg[bar_svg.index("<svg"):]
bar_svg = re.sub(r'<svg id="chart" ([^>]*?)width="1200" height="600" viewBox="0 0 1200 600"',
                 r'<svg class="bar-svg" role="img" aria-label="Overall score out of 100 for 30 models, highest first" \1viewBox="-16 125 1216 388"',
                 bar_svg, count=1)
assert 'class="bar-svg"' in bar_svg

# ---- buildings, runs, photographs, submissions --------------------------------------------------
buildings = []
for bid, site, name, short in SITES:
    case = site.replace("_enhanced_v1", "")
    cell = {}
    for s in (FABLE, CARBON):
        p = next(p for p in picks if p["series"] == s and p["site"] == site)
        key = p["run"]
        shutil.copyfile(WEB / "cache" / "slim" / (key + ".glb.gz"), OUT / "assets" / (key + ".glb.gz"))
        cell[s] = {"key": key, "overall": p["overall"], "cost": p.get("cost"), "minutes": p.get("minutes")}
    views = []
    for v in ("orbit_000", "orbit_090", "orbit_180", "orbit_270"):
        im = Image.open(CASES / case / "agent" / "views" / (v + ".png")).convert("RGB")
        im.thumbnail((900, 900), Image.LANCZOS)
        name_ = "%s_%s.jpg" % (bid, v)
        im.save(OUT / "assets" / name_, quality=84, optimize=True, progressive=True)
        views.append("assets/" + name_)
    city = "Helsinki" if site.startswith("helsinki") else "Melbourne"
    buildings.append({"id": bid, "site": site, "name": name, "short": short or name, "city": city,
                      "views": views, "cells": cell})
assets = {b["cells"][s]["key"]: "assets/%s.glb.gz" % b["cells"][s]["key"] for b in buildings for s in (FABLE, CARBON)}
shutil.copyfile(WEB / "engine.js", OUT / "assets" / "engine.js")
shutil.copyfile(WEB / "three-bundle.js", OUT / "assets" / "three-bundle.js")


def model_card(s):
    r, o = rows[LABEL[s]], rows[OLD[s]]
    v = r["values"]
    gain = (v["overall"] - o["values"]["overall"]) * 100
    return {"id": s, "name": NAME[s], "effort": EFFORT[s], "colour": COLOUR[s], "overall": v["overall"],
            "se": (r.get("band") or {}).get("overall"), "rank": rank[LABEL[s]], "of": len(rows), "cost": v["cost"],
            "minutes": v.get("minutes"), "old": OLD[s].split(" (")[0], "old_overall": o["values"]["overall"], "gain": gain,
            "geometry": v.get("geometry"), "surface": v.get("f"), "appearance": v.get("appearance")}


models = [model_card(FABLE), model_card(CARBON)]
old_name = {FABLE: "Claude Fable 5.1", CARBON: "Gemini 4 Argon"}
for m in models:
    m["old"] = old_name[m["id"]]
DATA = {"rig": rig, "showcase": SHOWCASE, "buildings": buildings, "models": models}
esc = html.escape

page = open(Path(__file__).with_name("page.html")).read()
page = (page.replace("/*DATA*/", "window.BB_DATA=%s;window.BB_ASSETS=%s;" % (json.dumps(DATA), json.dumps(assets)))
            .replace("<!--BAR-->", bar_svg)
            .replace("{{SNAPSHOT}}", esc(str(board.get("generated") or board.get("snapshot") or "")[:10] or "2026-11-11")))
(OUT / "index.html").write_text(page)
size = sum(f.stat().st_size for f in OUT.rglob("*") if f.is_file())
print("wrote", OUT, "%.1f MB" % (size / 1e6), len(assets), "submissions")
