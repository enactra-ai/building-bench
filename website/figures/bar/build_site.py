#!/usr/bin/env python3
"""BuildingBench bar figure, website edition: the chart alone (no title, description or Enactra
lockup), every bar a hoverable node for the page's tooltip script.  Forked from build.py.

    python3 build_site.py --board ../../data/clean_board.json --out ../../data/enactra/fig_bar.svg

leaderboard.py runs it on the board extract.py fetched. Names and companies come from
website/catalog.py, so a model new to the board is drawn without editing this file; a company
with no colour here is drawn grey and without a logo until it gets one (COLOUR, LOGO).

The original docstring follows; --refresh and the Grok 4.7 page are gone (extract.py fetches).

BuildingBench bar figure (GPT-6 Sol edition), in the style of Artificial Analysis's index charts.

One bar per model, highest first, the score printed in the bar, the lab's logo
under it and the model's name under that, rotated.  A curved arrow runs from
each new model's predecessor to it, in its colour: GPT-5.6 Sol to both GPT-6 Sol
settings, and Claude Opus 5 to Claude Opus 5.5.

Data: the leaderboard's "Same set only (12 buildings)" view on the blind,
license-clean board (`rowsSame` in its embedded boardData), snapshotted under
data/; `--refresh` fetches it again.

Colours follow the BuildingBench Pareto Frontier video: one colour per company.
Grok is black by request.  Labs the video never showed take the colour the
reference figure gave them; a lab neither of them shows gets a neutral grey.

Layout is solved in the browser, because the wrapping and rotation of the names
depend on real text widths.  build.py writes out/chart.html; headless Chromium
renders it to PNG (2x), PDF and a standalone SVG.

    python3 build.py              # from the snapshot
    python3 build.py --refresh    # fetch the board and the Grok 4.7 page first
"""

import argparse
import base64
import glob
import json
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
sys.path.insert(0, os.path.join(HERE, "..", ".."))
import catalog                                            # noqa: E402

W, H = 1200, 480             # CSS px: the width, and the most height the names may need (the page
                             # sets the figure's own height once it has measured them)


def chrome():
    """Headless Chromium: $BB_CHROME, else the newest Playwright download, else one on PATH."""
    if os.environ.get("BB_CHROME"):
        return os.environ["BB_CHROME"]
    found = sorted(glob.glob(os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux/chrome")),
                   key=lambda p: int(re.search(r"chromium-(\d+)", p).group(1)))
    if found:
        return found[-1]
    for name in ("chromium", "chromium-browser", "google-chrome"):
        if shutil.which(name):
            return shutil.which(name)
    sys.exit("no headless Chromium: set BB_CHROME, or `python3 -m playwright install chromium`")


# ---- who is who ---------------------------------------------------------------
# Names follow the reference: product name, then the reasoning effort in lower case.
# The " · Claude Code" harness suffix on some board labels is not shown, as the
# reference shows no harness.  Both come from catalog.py.
def who(row):
    """Board row -> (name as the reference writes it, company)."""
    model, effort = catalog.parse(row["label"])
    name = catalog.name(model).replace("‑", "-")       # the explorer's no-break hyphens, as plain ones
    return name + (" (%s)" % effort if effort else ""), catalog.company(model, row["org"])


# The website edition (enactra.ai/buildingbench): a standing leaderboard, so no
# arrows from predecessors and no model set in bold as new.
ARROWS = []
NEW = []
SUBTITLE = ("An AI agent reconstructs a real building in 3D from photographs of it, producing a .glb "
            "file ready for downstream architectural workflows. Scored on geometry, surface and appearance.")

# ---- colour -------------------------------------------------------------------
COLOUR = {
    # from the Pareto Frontier video (pareto-video/models.py, COMPANY)
    "Anthropic": "#D97757",
    "OpenAI":    "#10A37F",
    "Google":    "#7b1fa2",
    "Meta":      "#42a5f5",
    "DeepSeek":  "#3f51e0",
    "Moonshot":  "#9ab832",
    "Z.ai":      "#96650b",
    # by request: Grok is black
    "xAI":       "#111111",
    # not in the video: the reference figure's colour, sampled from its bars
    "StepFun":           "#01f4e6",
    "Thinking Machines": "#686868",
    # in neither: a stealth model with no disclosed maker gets a neutral
    "Undisclosed":       "#a8a29e",
    # in neither, and every Devin brand hue collides with a lab already here
    # (blue: Meta, indigo: DeepSeek, teal-green: OpenAI): an unused rose
    "Cognition":         "#d94a7b",
}
NEW_COMPANY = "#a8a29e"      # a company new to the board, until it is given a colour above

# Logo under each bar.  lobehub icon set (@lobehub/icons-static-svg 1.95.1).
# `tile` puts a white glyph on a coloured tile, as the reference does for Grok,
# Z.ai and Kimi (black square) and Step (cyan disc).
LOGO = {
    "Anthropic":   {"icon": "anthropic", "fill": "#141413"},
    "OpenAI":      {"icon": "openai", "fill": "#141413"},
    "Meta":        {"icon": "meta-color"},
    "Google":      {"icon": "google-color"},
    "DeepSeek":    {"icon": "deepseek-color"},
    "xAI":         {"icon": "xai", "tile": "#111111", "shape": "square"},
    "Z.ai":        {"icon": "zai", "tile": "#111111", "shape": "square"},
    "Moonshot":    {"icon": "kimi", "tile": "#111111", "shape": "square"},
    "StepFun":     {"icon": "stepfun", "tile": "#01d9cf", "shape": "circle"},
    "Undisclosed": {"icon": "unionalpha-color"},
    "Cognition":   {"icon": "devin-color"},
    "Thinking Machines": {"wordmark": ["THINKING", "MACHINES"]},
}


def rel_lum(hexc):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (int(hexc[i:i + 2], 16) for i in (1, 3, 5))
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)


def value_ink(bar):
    """White figures where they read, near-black where the bar is too light --
    the reference does the same on its cyan bar."""
    return "#ffffff" if (1.05) / (rel_lum(bar) + 0.05) >= 3.0 else "#111111"


# ---- data ---------------------------------------------------------------------
# The leaderboard's "Same set only (12 buildings)" view: `rowsSame` in the license-clean
# board's embedded boardData (extract.py saves it as data/clean_board.json).
def board_rows(path):
    d = json.load(open(path))
    assert d["sameSetSize"] == 12, d["sameSetSize"]
    return d["rowsSame"]


# Models left off the bar figure.  The website edition keeps SWE-2 (user, 2026-09-23);
# Inkling stays off.
EXCLUDE = {"inkling:free"}


def bars(path):
    out = []
    for r in board_rows(path):
        if catalog.parse(r["label"])[0] in EXCLUDE:
            continue
        name, org = who(r)
        v = r["values"]
        tags = [x["text"] for x in r.get("tags", [])]
        out.append({"name": name, "org": org, "score": v["overall"], "se": (r.get("band") or {}).get("overall"),
                    "cost": v.get("cost"), "est": "est. price" in tags, "effort": r["facets"].get("effort")})
    out.sort(key=lambda b: -b["score"])
    for b in out:
        b["colour"] = COLOUR.get(b["org"], NEW_COMPANY)
        b["ink"] = value_ink(b["colour"])
        b["label"] = "%d" % round(b["score"] * 100 + 1e-9)
        b["new"] = b["name"] in NEW
    return out


# ---- assets ---------------------------------------------------------------------
def icon_inner(name):
    """The drawing inside a lobehub svg: its <title> dropped, viewBox kept."""
    s = open(os.path.join(HERE, "assets", "icons", name + ".svg")).read()
    vb = re.search(r'viewBox="([^"]+)"', s).group(1)
    inner = re.sub(r"<title>.*?</title>", "", s[s.index(">") + 1:s.rindex("</svg>")], flags=re.S)
    rule = re.search(r'fill-rule="([^"]+)"', s[:s.index(">")])
    return vb, inner, rule.group(1) if rule else None


def logos():
    out = {}
    for org, spec in LOGO.items():
        if "icon" in spec:
            vb, inner, rule = icon_inner(spec["icon"])
            spec = dict(spec, viewBox=vb, inner=inner, rule=rule)
        out[org] = spec
    return out


def enactra_mark():
    s = open(os.path.join(HERE, "assets", "enactra-mark.svg")).read()
    s = re.sub(r"<metadata>.*?</metadata>", "", s, flags=re.S)       # C2PA manifest
    vb = re.search(r'viewBox="([^"]+)"', s).group(1)
    return {"viewBox": vb, "inner": s[s.index(">") + 1:s.rindex("</svg>")]}


def font_faces():
    # Inline in the page, an @font-face is global: named "BB ..." so it cannot restyle the page's own text.
    faces = [("BB Inter", 400, "inter-latin-400-normal"),
             ("BB Inter", 500, "inter-latin-500-normal"),
             ("BB Plex Mono", 500, "ibm-plex-mono-latin-500-normal")]
    css = []
    for fam, wt, f in faces:
        data = base64.b64encode(open(os.path.join(HERE, "assets", "fonts", f + ".woff2"), "rb").read()).decode()
        css.append("@font-face{font-family:'%s';font-weight:%d;font-style:normal;"
                   "src:url(data:font/woff2;base64,%s) format('woff2')}" % (fam, wt, data))
    return "\n".join(css)


# ---- page -----------------------------------------------------------------------
PAGE = r"""<!doctype html>
<html><head><meta charset="utf-8"><title>BuildingBench bar figure</title>
<style id="fonts">%(fonts)s</style>
<style>
 @page { size: %(W)dpx %(H)dpx; margin: 0 }
 html, body { margin: 0; padding: 0; background: #ffffff }
 svg { display: block }
</style></head>
<body>
<svg id="chart" xmlns="http://www.w3.org/2000/svg" width="%(W)d" height="%(H)d" viewBox="0 0 %(W)d %(H)d"></svg>
<script>
const DATA = %(data)s;
const LOGOS = %(logos)s;
const MARK = %(mark)s;
const W = %(W)d, H = %(H)d;

const SANS  = "'BB Inter', 'Helvetica Neue', Arial, sans-serif";
const MONO  = "'BB Plex Mono', Menlo, monospace";
const SUBTITLE = %(subtitle)s, ARROWS = %(arrows)s;
function wrapText(str, font, max) {
  const out = []; let line = "";
  for (const word of str.split(" ")) { const next = line ? line + " " + word : word;
    if (width(next, font) > max && line) { out.push(line); line = word; } else line = next; }
  return out.concat(line ? [line] : []);
}

const G = {                        // geometry, CSS px
  left: 40, right: 24,
  top: 16,                         // the 100 gridline
  base: 238,                       // zero
  barFill: 0.78,                   // bar width / pitch, as measured off the reference
  radius: 4.5,                     // rounded top corners
  logo: 18, logoGap: 8,            // logo box, and its gap under the baseline
  nameGap: 9,                      // gap from logo to the end of the name
  nameAngle: -60,                  // degrees
  nameSize: 13, nameLead: 14.5,
  nameOneLine: 97,                 // a name this wide or less stays on one line
  nameLine: 93,                    // otherwise, no wrapped line wider than this
  nameTol: 12,                     // splits this close to the most balanced count as ties
};

const NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("chart");
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  (parent || svg).appendChild(e);
  return e;
}
const ctx = document.createElement("canvas").getContext("2d");
function width(text, font) { ctx.font = font; return ctx.measureText(text).width; }

// Wrap a name the way the reference does: one line when it fits; otherwise the
// fewest lines (2, then 3) that keep every line within nameLine.  Among those,
// the most balanced split wins -- and splits within nameTol of it count as
// equally balanced, the tie going to the longer last line: the lines are
// right-aligned against the logo, so the weight belongs at the end
// ("DeepSeek / V4.1 / Flash (max)", not "... / V4.1 Flash / (max)").
// How many lines a name may take without running into its neighbours'. The names are rotated, so each
// line more moves the block sideways by nameLead, while neighbouring names sit pitch * sin(angle) apart
// across the text: 35 bars on 1200 px leave 32 px a bar, room for one line (2026-10-17: three-line
// names there ran together). 25 bars give two lines, 15 three, as the reference had.
function maxLines(pitch) {
  const across = pitch * Math.sin(Math.abs(G.nameAngle) * Math.PI / 180);
  return Math.max(1, Math.min(3, Math.floor((across - 1) / G.nameLead)));
}

function wrap(name, font, limit) {
  if (limit === 1 || width(name, font) <= G.nameOneLine) return [name];
  const w = name.split(" ");
  const splits = k => {
    const out = [];
    if (k === 2) for (let i = 1; i < w.length; i++) out.push([w.slice(0, i), w.slice(i)]);
    if (k === 3) for (let i = 1; i < w.length; i++) for (let j = i + 1; j < w.length; j++)
      out.push([w.slice(0, i), w.slice(i, j), w.slice(j)]);
    return out.map(p => p.map(x => x.join(" ")));
  };
  for (const k of [2, 3].filter(k => k <= limit)) {
    const c = splits(k).map(lines => {
      const ws = lines.map(l => width(l, font));
      return {lines, worst: Math.max(...ws), last: ws[ws.length - 1]};
    }).filter(o => o.worst <= G.nameLine);
    if (!c.length) continue;
    const floor = Math.min(...c.map(o => o.worst));
    return c.filter(o => o.worst <= floor + G.nameTol).sort((a, b) => b.last - a.last)[0].lines;
  }
  return [name];
}

// The names decide the figure's left margin and its height: with one line each, the first names run
// left of the plot, and the longest runs furthest down. Measured, not guessed, so nothing is cut off.
function layout() {
  const a = Math.abs(G.nameAngle) * Math.PI / 180, n = DATA.length;
  let left = G.left;
  for (let pass = 0; pass < 4; pass++) {
    const pitch = (W - left - G.right) / n, limit = maxLines(pitch);
    let spill = 0, depth = 0;
    DATA.forEach((d, i) => {
      const font = `${d.new ? 700 : 400} ${G.nameSize}px ${SANS}`;
      d.lines = wrap(d.name, font, limit);
      const w = Math.max(...d.lines.map(l => width(l, font))), block = d.lines.length * G.nameLead;
      const ax = left + (i + 0.5) * pitch + 3;
      spill = Math.max(spill, w * Math.cos(a) + block / 2 * Math.sin(a) - ax + 6);
      depth = Math.max(depth, w * Math.sin(a) + block / 2 * Math.cos(a) + 6);
    });
    if (spill <= 0.5) return {left, pitch, height: Math.min(H, Math.ceil(G.base + G.logoGap + G.logo + G.nameGap + depth))};
    left += spill;
  }
  return {left, pitch: (W - left - G.right) / n, height: H};
}

function draw() {
  svg.innerHTML = "";
  const L0 = layout();
  G.left = L0.left;
  svg.setAttribute("height", L0.height);
  svg.setAttribute("viewBox", `0 0 ${W} ${L0.height}`);
  el("style", {}).textContent = document.getElementById("fonts").textContent;

  // -- grid ---------------------------------------------------------------------
  const y = v => G.base - v / 100 * (G.base - G.top);
  for (const v of [25, 50, 75, 100])
    el("line", {x1: G.left - 8, x2: W - G.right, y1: y(v), y2: y(v), stroke: "#cfcfcf",
                "stroke-width": 1.4, "stroke-dasharray": "0.1 4.2", "stroke-linecap": "round"});
  el("line", {x1: G.left - 8, x2: W - G.right, y1: G.base, y2: G.base, stroke: "#e6e6e6", "stroke-width": 1});

  // -- bars ---------------------------------------------------------------------
  const n = DATA.length, pitch = (W - G.left - G.right) / n, bwid = pitch * G.barFill;
  const pos = {};
  const usd = c => c == null ? "—" : "$" + (c >= 10 ? c.toFixed(1) : c.toFixed(2));
  DATA.forEach((d, i) => {
    const node = el("g", {class: "node", tabindex: 0, role: "img", "data-name": d.name,
      "data-tip": JSON.stringify([["score", d.score.toFixed(3) + (d.se ? " ± " + d.se.toFixed(3) : "")],
                                  ["cost / run", usd(d.cost) + (d.est ? " (est.)" : "")],
                                  ["family", ({"xAI": "SpaceXAI", "Undisclosed": "undisclosed"})[d.org] || d.org], ["effort", d.effort]]),
      "aria-label": `${d.name}: ${d.label} out of 100`});
    const cx = G.left + (i + 0.5) * pitch, x0 = cx - bwid / 2, x1 = cx + bwid / 2;
    const top = y(d.score * 100), r = Math.min(G.radius, bwid / 2);
    pos[d.name] = {cx, top, x0, x1};
    el("rect", {x: cx - pitch / 2, y: G.top - 8, width: pitch, height: L0.height - G.top + 8, fill: "transparent"}, node);
    el("path", {d: `M${x0},${G.base} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x1 - r} ` +
                   `Q${x1},${top} ${x1},${top + r} V${G.base} Z`, fill: d.colour, class: "bar"}, node);
    const v = el("text", {x: cx, y: (top + G.base) / 2 + 5.4, "text-anchor": "middle",
                          "font-family": MONO, "font-weight": 500, "font-size": 15.5, fill: d.ink}, node);
    v.textContent = d.label;

    // logo
    // a company with no LOGO entry yet gets its name as a wordmark (the figure kit's rule), not a blank
    const words = d.org.toUpperCase().split(/\s+/);
    const L = LOGOS[d.org] || {wordmark: words.length > 1 ? [words[0], words.slice(1).join(" ")] : words};
    const s = G.logo, lx = cx - s / 2, ly = G.base + G.logoGap;
    if (L.wordmark) {
      L.wordmark.forEach((w, k) => {
        const tw = el("text", {x: cx, y: ly + 7.5 + k * 6.2, "text-anchor": "middle", "font-family": SANS,
                               "font-weight": 500, "font-size": 5.2, "letter-spacing": 0.35, fill: "#4a4a4a"}, node);
        tw.textContent = w;
      });
    } else {
      let pad = 0, fill = L.fill || null;
      if (L.tile) {
        if (L.shape === "circle") el("circle", {cx, cy: ly + s / 2, r: s / 2, fill: L.tile}, node);
        else el("rect", {x: lx, y: ly, width: s, height: s, rx: 3.2, fill: L.tile}, node);
        pad = 3.4; fill = "#ffffff";
      }
      const ic = el("svg", {x: lx + pad, y: ly + pad, width: s - 2 * pad, height: s - 2 * pad, viewBox: L.viewBox}, node);
      if (fill) { ic.setAttribute("fill", fill); ic.setAttribute("color", fill); }
      if (L.rule) ic.setAttribute("fill-rule", L.rule);
      ic.innerHTML = L.inner;
    }

    // name: rotated, right-aligned against the logo, wrapped as layout() decided
    const wt = d.new ? 700 : 400;
    const lines = d.lines;
    const ax = cx + 3, ay = G.base + G.logoGap + G.logo + G.nameGap;
    const g = el("g", {transform: `translate(${ax},${ay}) rotate(${G.nameAngle})`}, node);
    const off = -(lines.length - 1) / 2 * G.nameLead;
    lines.forEach((ln, k) => {
      const tl = el("text", {x: 0, y: off + k * G.nameLead + 4.5, "text-anchor": "end", "font-family": SANS,
                             "font-weight": wt, "font-size": G.nameSize, fill: d.new ? "#000000" : "#262626"}, g);
      tl.textContent = ln;
    });
  });

  document.body.setAttribute("data-done", "1");
}

Promise.all(["400 16px 'BB Inter'", "500 16px 'BB Inter'", "500 16px 'BB Plex Mono'"].map(f => document.fonts.load(f)))
  .then(draw);
</script>
</body></html>
"""


def page(data):
    return PAGE % {"fonts": font_faces(), "W": W, "H": H,
                   "data": json.dumps(data, indent=1), "logos": json.dumps(logos()),
                   "mark": json.dumps(enactra_mark()), "arrows": json.dumps(ARROWS), "subtitle": json.dumps(SUBTITLE)}


def render(html_path):
    base = os.path.join(OUT, "site_bar")
    common = [chrome(), "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
              "--virtual-time-budget=8000", "--window-size=%d,%d" % (W, H)]
    url = "file://" + html_path
    subprocess.run(common + ["--force-device-scale-factor=2", "--screenshot=" + base + ".png", url],
                   check=True, capture_output=True)
    dom = subprocess.run(common + ["--dump-dom", url], check=True, capture_output=True, text=True).stdout
    if 'data-done="1"' not in dom:
        sys.exit("the page did not finish drawing")
    s = dom[dom.index('<svg id="chart"'):dom.rindex("</svg>") + 6]
    # the page's own svg, with its embedded fonts, is a standalone file
    # inline in the page: no id (the page has its own #chart), and the page's figure classes instead
    s = s.replace('<svg id="chart" ', '<svg class="lbf-svg lbf-bar" role="group" aria-label="Overall score out of 100, highest first" ', 1)
    open(base + ".svg", "w").write(s)
    return [base + ext for ext in (".png", ".svg")]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--board", default=os.path.join(HERE, "data", "boardData.json"),
                    help="the license-clean board's boardData JSON (default: data/boardData.json)")
    ap.add_argument("--out", help="also copy the SVG here")
    a = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    data = bars(a.board)
    json.dump(data, open(os.path.join(OUT, "site_bars.json"), "w"), indent=1)
    html_path = os.path.join(OUT, "site_chart.html")
    open(html_path, "w").write(page(data))
    for f in render(html_path):
        print("%-60s %8d bytes" % (f, os.path.getsize(f)))
    if a.out:
        shutil.copyfile(os.path.join(OUT, "site_bar.svg"), a.out)
    for d in data:
        print("  %-26s %-18s %.4f  %s  %s%s" % (d["name"], d["org"], d["score"], d["label"].rjust(3),
                                               d["colour"], "   <- new" if d.get("new") else ""))


if __name__ == "__main__":
    main()
