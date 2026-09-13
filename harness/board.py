"""The leaderboard over the twelve cases: ours, yours, or both.

    python -m harness.board                              # the reference runs
    python -m harness.board --ranked                     # only the models that ran them all
    python -m harness.board --runs runs/index.jsonl      # yours beside them
    python -m harness.board --markdown

One run per model per case: the first complete one, so running a model again
never replaces an earlier, worse run. A model's score is the mean over the
cases it has run; it is ranked only once it has run all twelve, because a
mean over a different set of buildings is a different measurement. ``± SE`` is the standard error over
the twelve buildings -- which building it is moves a score far more than
running the same one again does.
"""
from __future__ import annotations

import argparse
import json
import statistics
from pathlib import Path
from typing import Any

from harness import agents, cases

REFERENCE = cases.ROOT / "results" / "reference_runs.jsonl"


def load(path: str | Path) -> list[dict[str, Any]]:
    rows = []
    for line in Path(path).read_text().splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def first_complete(rows: list[dict[str, Any]]) -> dict[tuple[str, str], dict]:
    chosen: dict[tuple[str, str], dict] = {}
    for row in sorted(rows, key=lambda r: r.get("recorded", "")):
        if row.get("status") != "complete":
            continue
        if (row.get("scores") or {}).get("overall") is None:
            continue
        chosen.setdefault((row["model"], row["case"]), row)
    return chosen


def board(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    everything = set(cases.names())
    by_model: dict[str, list[dict]] = {}
    for (model, case), row in first_complete(rows).items():
        if case in everything:
            by_model.setdefault(model, []).append(row)
    lines = []
    for model, picked in by_model.items():
        def mean(column: str) -> float | None:
            values = [r["scores"].get(column) for r in picked]
            values = [v for v in values if v is not None]
            return statistics.fmean(values) if values else None
        overall = [r["scores"]["overall"] for r in picked]
        costs = [r["cost_usd"] for r in picked if r.get("cost_usd") is not None]
        minutes = [r["seconds"] / 60 for r in picked if r.get("seconds")]
        lines.append({
            "model": model, "label": agents.label(model), "cases": len(picked),
            "ranked": {r["case"] for r in picked} == everything,
            "overall": statistics.fmean(overall),
            "se": (statistics.stdev(overall) / len(overall) ** 0.5
                   if len(overall) > 1 else None),
            "surface_f": mean("surface_f"), "geometry": mean("geometry"),
            "appearance": mean("appearance"),
            "cost_usd": statistics.median(costs) if costs else None,
            "minutes": statistics.median(minutes) if minutes else None,
        })
    lines.sort(key=lambda l: (not l["ranked"], -l["overall"]))
    for place, line in enumerate(lines, 1):
        line["place"] = place if line["ranked"] else None
    return lines


def _f(value: float | None, digits: int = 3) -> str:
    return "–" if value is None else f"{value:.{digits}f}"


def render(lines: list[dict[str, Any]], markdown: bool = False,
           ranked_only: bool = False) -> str:
    # with the partial rows gone every row has run all twelve, so the column
    # saying so carries nothing
    head = ["#", "Model", "Overall", "± SE", "Surface F", "Geometry",
            "Appearance"] + ([] if ranked_only else ["Cases"]) + ["$ / run", "min / run"]
    body = []
    for l in lines:
        body.append([str(l["place"] or "–"), l["label"], _f(l["overall"]), _f(l["se"]),
                     _f(l["surface_f"]), _f(l["geometry"]), _f(l["appearance"])]
                    + ([] if ranked_only else [f"{l['cases']}/12"])
                    + [_f(l["cost_usd"], 2), _f(l["minutes"], 0)])
    if markdown:
        out = ["| " + " | ".join(head) + " |",
               "|" + "|".join("---" if i == 1 else "---:" for i in range(len(head))) + "|"]
        out += ["| " + " | ".join(row) + " |" for row in body]
        return "\n".join(out)
    widths = [max(len(r[i]) for r in [head] + body) for i in range(len(head))]
    fmt = lambda row: "  ".join(c.ljust(w) if i == 1 else c.rjust(w)
                                for i, (c, w) in enumerate(zip(row, widths)))
    return "\n".join([fmt(head), fmt(["-" * w for w in widths])] + [fmt(r) for r in body])


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--runs", action="append", default=[],
                    help="a runs/index.jsonl to put on the board (repeatable)")
    ap.add_argument("--no-reference", action="store_true",
                    help="leave the reference runs off")
    ap.add_argument("--ranked", action="store_true",
                    help="leave off the models that have not run all twelve")
    ap.add_argument("--markdown", action="store_true")
    args = ap.parse_args(argv)
    rows = [] if args.no_reference else load(REFERENCE)
    for path in args.runs:
        rows += load(path)
    lines = board(rows)
    if args.ranked:
        lines = [l for l in lines if l["ranked"]]
    print(render(lines, markdown=args.markdown, ranked_only=args.ranked))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
