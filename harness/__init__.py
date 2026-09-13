"""Run an agent on a case the way the reference runs did, collect what it hands
in, and read the reference board.

  cases.py   the twelve cases, and a check that their bytes are the released ones
  lane.py    the working directory an agent gets, and the container around it
  agents.py  the reference configurations: CLI, model, effort, prompt
  run.py     python -m harness.run    -- agent -> lane -> submission
  board.py   python -m harness.board  -- the reference board
  muse/      the metered lane Muse Spark runs in
"""
