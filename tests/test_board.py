"""The board over the published reference runs."""
from harness import board


def test_the_board_ranks_only_full_coverage():
    lines = board.board(board.load(board.REFERENCE))
    ranked = [l for l in lines if l["ranked"]]
    assert ranked and all(l["cases"] == 12 for l in ranked)
    assert [l["overall"] for l in ranked] == sorted((l["overall"] for l in ranked),
                                                    reverse=True)


def test_one_run_per_model_and_case():
    rows = board.load(board.REFERENCE)
    seen = [(r["model"], r["case"]) for r in rows if r.get("status") == "complete"]
    assert len(seen) == len(set(seen))
