"""The metered lane Muse Spark runs in.

Meta's CLI reports no tokens and Meta serves no usage endpoint, so a Muse run
has no cost anywhere unless something counts it -- and this board plots cost.
``runner.py`` starts ``meter.py`` on the lane's loopback, points the CLI at it,
and lets the traffic through: every response's provider ``usage`` is recorded
and priced from Meta's published rates, and a request whose body would exceed
the provider's size limit has its superseded preview images dropped rather than
being refused outright.

One transform is not pass-through, and it is why the reference Muse row reads
``(max)``. Muse Code's highest client posture is ``ultra``, but the ``ultra``
reasoning effort is gated off -- the CLI says so and falls back -- so an
unmodified request reaches Meta as ``xhigh``. ``--wire-effort max`` rewrites the
selected root model's ``xhigh`` requests to ``max``; auxiliary reminder-agent
requests keep the effort Muse chose. ``client.json`` in the lane's meter
directory records which of the two a run did.

Both files are bound into the lane at the paths the runner looks for, the same
way the `muse` binary itself is; see ``access`` in ``harness/agents.py``.
"""
