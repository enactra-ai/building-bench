"""The 12-building same-set board (license clean, blind tier) for the Pareto frontier.

From `rowsSame` in the embedded boardData of http://ds-serv12.ucsd.edu:8870/license-clean.html,
read from $BB_BOARD_JSON (leaderboard.py points it at extract.py's data/clean_board.json), else
from boardData.json beside this file.  Names and companies come from website/catalog.py, so a
model new to the board is placed without editing this file.  Left out:
  inkling:free -- removed from the Pareto figures at the user's request
  any row the board has no price for -- there is no x to place it at

Website edition (enactra.ai/buildingbench, 2026-09-23): a standing board, not the
arrivals story of the video this was forked from -- every row is stage 0 (no "+ arrival"
list, no boxed names) -- and SWE-2 is back at the user's request, in the $0 lane of its
own that axis_domain() opens for a free row.  At $0 it sits on the frontier, as it does
on the board's own chart.
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
import catalog                                            # noqa: E402

BOARD = os.environ.get("BB_BOARD_JSON") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "boardData.json")

# One colour per company -- the bar figure's palette (bar-gpt6/build.py COLOUR), so
# the two figures agree: Grok is black here too.
COMPANY = {
    "Anthropic": "#D97757",
    "OpenAI":    "#10A37F",
    "Google":    "#7b1fa2",
    "Meta":      "#42a5f5",
    "xAI":       "#111111",
    "DeepSeek":  "#3f51e0",
    "Moonshot":  "#9ab832",
    "Z.ai":      "#96650b",
    "StepFun":     "#01f4e6",
    "Undisclosed": "#a8a29e",
    "Cognition":   "#d94a7b",   # the bar figure's rose for Devin
}
NEW_COMPANY = "#a8a29e"         # a company new to the board, until it is given a colour above

EXCLUDE = {"inkling:free"}

# Names here are shorter than the bar figure's: no "Claude", efforts capitalised.
EFFORT = {"xhigh": "xHigh"}
SHORT = {"deepseek-v4.1-flash:wafer": "DeepSeek v4.1 Flash"}


def short_name(label):
    model, effort = catalog.parse(label)
    name = SHORT.get(model) or catalog.name(model).replace("‑", "-")
    if name.startswith("Claude "):
        name = name[len("Claude "):]
    return name + (" (%s)" % EFFORT.get(effort, effort.capitalize()) if effort else "")


# key (the board's label), cost ($ per run, estimated where the board says so), overall score, company, stage
MODELS, DISPLAY = [], {}
for _r in json.load(open(BOARD))["rowsSame"]:
    _model = catalog.parse(_r["label"])[0]
    if _model in EXCLUDE:
        continue
    if _r["values"].get("cost") is None:
        print("pareto: no price on the board for %s; left off" % _r["label"], file=sys.stderr)
        continue
    MODELS.append((_r["label"], _r["values"]["cost"], _r["values"]["overall"], catalog.company(_model, _r["org"]), 0))
    DISPLAY[_r["label"]] = short_name(_r["label"])
    COMPANY.setdefault(MODELS[-1][3], NEW_COMPANY)


def colour(org):
    return COMPANY[org]


# Where a name should look for room first (see the Pareto video's models.py).
PREFER = {
    "gpt-5.6-terra (max)": ("right", "below-right", "above-right"),
    # the two GPT-6 Sol dots all but coincide ($1.89 / $1.92, 0.696 / 0.698), and their
    # boxed names need room: one goes up and right, the other down and right
    "gpt-6-sol (ultra)": ("right", "above-right"),
    "gpt-6-sol (max)": ("below-right", "below", "right"),
    # with the Sol (Max) box below-right of the cluster, FlashX goes further down on
    # the same side, its leader passing left of that box instead of through DeepSeek's name
    "z-ai/glm-5.3-flashx (max) · Claude Code": ("below-right", "below"),
}


def frontier(models):
    """Labels on the frontier, dearest first.  Strict: nothing cheaper scores higher."""
    best, keep = None, []
    for m in sorted(models, key=lambda m: m[1]):
        if best is None or m[2] > best:
            keep.append(m)
            best = m[2]
    return list(reversed(keep))
