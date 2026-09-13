"""The twelve cases, and a check that their bytes are the ones released."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "cases"
MANIFEST = CASES / "SHA256SUMS"


def catalogue() -> dict[str, dict]:
    body = json.loads((CASES / "cases.json").read_text())
    return {case["key"]: case for case in body["cases"]}


def names() -> list[str]:
    return sorted(catalogue())


def path(key: str) -> Path:
    folder = CASES / key
    if not (folder / "task.json").is_file():
        raise SystemExit(f"no case {key!r}; the cases are: {', '.join(names())}")
    return folder


def verify() -> list[str]:
    """Every way the case files differ from the manifest; empty when intact."""
    listed: dict[str, str] = {}
    for line in MANIFEST.read_text().splitlines():
        digest, rel = line.split("  ", 1)
        listed[rel] = digest
    problems = []
    for rel, digest in listed.items():
        file = CASES / rel
        if not file.is_file():
            problems.append(f"missing  {rel}")
        elif hashlib.sha256(file.read_bytes()).hexdigest() != digest:
            problems.append(f"changed  {rel}")
    present = {str(p.relative_to(CASES)) for p in CASES.rglob("*")
               if p.is_file() and p not in (MANIFEST, CASES / "cases.json")}
    problems += [f"unlisted {rel}" for rel in sorted(present - set(listed))]
    return problems


def main() -> int:
    problems = verify()
    for line in problems:
        print(line)
    print(f"{len(catalogue())} cases, "
          + ("all files match cases/SHA256SUMS" if not problems
             else f"{len(problems)} files differ from cases/SHA256SUMS"))
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
