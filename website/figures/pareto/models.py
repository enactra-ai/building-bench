"""The 12-building same-set board (license clean, blind tier), 2026-09-22 snapshot (with Opus 5.5),
for the Pareto frontier animation of the GPT-6 Sol arrivals.

From `rowsSame` in the embedded boardData of http://ds-serv12.ucsd.edu:8870/license-clean.html
(saved as boardData.json).  Stage 0 is the opening board; GPT-6 Sol (Max) arrives
at stage 1, GPT-6 Sol (Ultra) at stage 2 and Claude Opus 5.5 (Max) at stage 3 (the
board files it under "Unplaced"; it is Claude, so Anthropic's colour).  Left out:
  thinkingmachines/inkling:free · Claude Code -- removed from the Pareto figures at the user's request
  cognition/swe-2 (max) -- its cost is an estimated $0.00 -- no real price to place it by

Website edition (enactra.ai/buildingbench, 2026-09-23): a standing board, not the
arrivals story -- every row is stage 0 (no "+ arrival" list, no boxed names) -- and
SWE-2 is back at the user's request, in the $0 lane of its own that axis_domain()
opens for a free row.  At $0 it sits on the frontier, as it does on the board's own
chart.
"""

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

# key (the board's label), cost ($ per run, estimated where the board says so), overall score, company, stage
MODELS = [
    ('claude-opus-5-5 (max)', 45.4675335, 0.868, 'Anthropic', 0),
    ('gpt-6-astra (ultra)', 7.045719, 0.8428, 'OpenAI', 0),
    ('claude-fable-5-1 (max)', 32.975917124999995, 0.8136, 'Anthropic', 0),
    ('grok-4.7 (xhigh)', 11.422699999999999, 0.7833, 'xAI', 0),
    ('claude-fable-5 (max)', 39.641364, 0.7555, 'Anthropic', 0),
    ('claude-opus-5 (max)', 46.3759445, 0.7448, 'Anthropic', 0),
    ('gpt-5.6-sol (max)', 7.5439884, 0.7388, 'OpenAI', 0),
    ('stealth/union-alpha (max) · Claude Code', 3.7573204999999996, 0.7307, 'Undisclosed', 0),
    ('deepseek/deepseek-v4.1-flash:wafer (max) · Claude Code', 2.3317245, 0.7288, 'DeepSeek', 0),
    ('gpt-6-sol (ultra)', 1.9185364999999999, 0.698, 'OpenAI', 0),
    ('gpt-6-sol (max)', 1.8870635, 0.6962, 'OpenAI', 0),
    ('grok-4.6 (xhigh)', 10.59285, 0.695, 'xAI', 0),
    ('gpt-5.6-terra (max)', 4.2589282, 0.6848, 'OpenAI', 0),
    ('muse-spark-1.3 (max)', 5.8897540500000005, 0.6823, 'Meta', 0),
    ('z-ai/glm-5.3-flashx (max) · Claude Code', 2.325387, 0.6799, 'Z.ai', 0),
    ('cognition/swe-2 (max)', 0.0, 0.6734, 'Cognition', 0),
    ('gpt-5.6-luna (max)', 0.45029904, 0.6156, 'OpenAI', 0),
    ('gemini-3.8-flash (high)', 3.330324675, 0.5476, 'Google', 0),
    ('claude-sonnet-5 (max)', 15.032763100000004, 0.5436, 'Anthropic', 0),
    ('kimi-k3 (thinking)', 5.844977500000001, 0.5403, 'Moonshot', 0),
    ('step-5-preview (max) · Claude Code', 16.58585, 0.3391, 'StepFun', 0),
    ('glm-5.3-flash (max)', 0.21804560249999994, 0.3302, 'Z.ai', 0),
    ('claude-haiku-4-5', 0.5243465500000001, 0.2668, 'Anthropic', 0),
]


def colour(org):
    return COMPANY[org]


DISPLAY = {
    'claude-opus-5-5 (max)': 'Opus 5.5 (Max)',
    'gpt-6-astra (ultra)': 'GPT-6 Astra (Ultra)',
    'claude-fable-5-1 (max)': 'Fable 5.1 (Max)',
    'grok-4.7 (xhigh)': 'Grok 4.7 (xHigh)',
    'claude-fable-5 (max)': 'Fable 5 (Max)',
    'claude-opus-5 (max)': 'Opus 5 (Max)',
    'gpt-5.6-sol (max)': 'GPT-5.6 Sol (Max)',
    'stealth/union-alpha (max) · Claude Code': 'Union Alpha (Max)',
    'deepseek/deepseek-v4.1-flash:wafer (max) · Claude Code': 'DeepSeek v4.1 Flash (Max)',
    'gpt-6-sol (ultra)': 'GPT-6 Sol (Ultra)',
    'gpt-6-sol (max)': 'GPT-6 Sol (Max)',
    'grok-4.6 (xhigh)': 'Grok 4.6 (xHigh)',
    'gpt-5.6-terra (max)': 'GPT-5.6 Terra (Max)',
    'muse-spark-1.3 (max)': 'Muse Spark 1.3 (Max)',
    'z-ai/glm-5.3-flashx (max) · Claude Code': 'GLM-5.3 FlashX (Max)',
    'gpt-5.6-luna (max)': 'GPT-5.6 Luna (Max)',
    'gemini-3.8-flash (high)': 'Gemini 3.8 Flash (High)',
    'claude-sonnet-5 (max)': 'Sonnet 5 (Max)',
    'kimi-k3 (thinking)': 'Kimi K3 (Thinking)',
    'step-5-preview (max) · Claude Code': 'Step 5 Preview (Max)',
    'glm-5.3-flash (max)': 'GLM-5.3 Flash (Max)',
    'claude-haiku-4-5': 'Haiku 4.5',
    'cognition/swe-2 (max)': 'SWE-2 (Max)',
}

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
