"""The cases are the released bytes, blind, and their agent half holds no answer."""
import json

from bench.building.spec import Task
from harness import cases

AGENT_FILES = {"TASK.md", "cameras.json", "site.json"}


def test_every_case_file_matches_the_manifest():
    assert cases.verify() == []


def test_twelve_blind_cases_with_their_own_identity():
    catalogue = cases.catalogue()
    assert len(catalogue) == 12
    for key, entry in catalogue.items():
        task = json.loads((cases.path(key) / "task.json").read_text())
        assert (task["footprint"], task["height"], task["cameras"]) == ("none", "none", "given")
        assert Task.load(cases.path(key) / "task.json").identity() == task["identity"]
        assert entry["identity"] == task["identity"]
        assert entry["licence"] == "CC BY 4.0"


def test_the_agent_half_holds_no_answer():
    for key in cases.names():
        folder = cases.path(key)
        agent = folder / "agent"
        top = {p.name for p in agent.iterdir() if p.is_file()}
        assert top == AGENT_FILES, key
        held = set(json.loads((folder / "truth" / "held_out.json").read_text())["held_out"])
        shown = {p.stem for p in (agent / "views").iterdir()}
        given = {v["name"] for v in json.loads((agent / "cameras.json").read_text())["views"]}
        assert shown == given and not (shown & held), key
        site = json.loads((agent / "site.json").read_text())
        # blind: the origin and the axes, never the footprint or the height
        assert "footprint_m" not in site and "height_m" not in site, key


def test_the_agent_is_not_told_where_the_answer_is():
    # The network is open. What must not be handed over is the pointer to the
    # dataset the photographs were rendered from: an agent that is told it can
    # go and download the answer, and in the reference runs one did.
    for key, entry in cases.catalogue().items():
        agent = cases.path(key) / "agent"
        seen = " ".join(p.read_text(errors="replace") for p in agent.rglob("*")
                        if p.suffix in (".md", ".json", ".txt"))
        for clue in (entry["source"], entry["attribution"], entry["source_url"],
                     "CC BY", "Google", "Photomesh", "3D city model",
                     "hel.fi", "melbourne.vic.gov"):
            assert clue not in seen, (key, clue)
