"""Who each board row is: product name, company and release date.

Shared by build.py (the explorer) and leaderboard.py with the figures under figures/, so a model
is named in one place. The board labels a row by model id, then an optional reasoning effort and
harness: 'claude-opus-5-5 (max)', 'deepseek/deepseek-v4.1-flash:wafer (max) · Claude Code'.

A model the tables below do not know is still published -- under a name made from its id, in its
board organisation's company (grey if that company has no colour yet) -- and one with no release
date stays off the explorer's time axis. build.py writes what is missing for the models it shows
to data/fingerprint.json, and publish.sh puts that list in its commit message.
"""
import re

# Names as the leaderboard's bar figure writes them (product name; effort shown separately).
NAMES = {
    'claude-opus-5-5': 'Claude Opus 5.5', 'claude-fable-5-1': 'Claude Fable 5.1', 'claude-fable-5': 'Claude Fable 5',
    'claude-opus-5': 'Claude Opus 5', 'claude-sonnet-5': 'Claude Sonnet 5', 'claude-haiku-4-5': 'Claude Haiku 4.5',
    'gpt-6-astra': 'GPT‑6 Astra', 'gpt-6-sol': 'GPT‑6 Sol', 'gpt-5.6-sol': 'GPT‑5.6 Sol', 'gpt-5.6-luna': 'GPT‑5.6 Luna',
    'gpt-5.6-terra': 'GPT‑5.6 Terra',
    'gemini-3.8-flash': 'Gemini 3.8 Flash', 'gemini-3.7-flash': 'Gemini 3.7 Flash', 'gemini-3.5-flash': 'Gemini 3.5 Flash',
    'gemini-3.1-pro': 'Gemini 3.1 Pro',
    'muse-spark-1.3': 'Muse Spark 1.3', 'muse-spark-1.2': 'Muse Spark 1.2', 'muse-spark-1.1': 'Muse Spark 1.1',
    'grok-4.7': 'Grok 4.7', 'grok-4.6': 'Grok 4.6', 'grok-4.5': 'Grok 4.5',
    'kimi-k3': 'Kimi K3', 'glm-5.3-flash': 'GLM‑5.3 Flash', 'glm-5.3-flashx': 'GLM‑5.3 FlashX',
    'deepseek-v4.1-flash:wafer': 'DeepSeek V4.1 Flash', 'swe-2': 'SWE‑2', 'step-5-preview': 'Step 5 Preview',
    'union-alpha': 'Union Alpha', 'space-bunny-alpha': 'Space Bunny Alpha', 'inkling:free': 'Inkling',
    'gpt-6.1-sol': 'GPT‑6.1 Sol', 'claude-sonnet-5-5': 'Claude Sonnet 5.5', 'claude-haiku-5-5': 'Claude Haiku 5.5',
    'ember-1': 'Ember‑1', 'mistral-large-4-0': 'Mistral Large 4', 'muse-wonder-1.0': 'Muse Wonder 1.0',
}

# Public launch dates, from the announcements (see README for sources). The board carries none.
RELEASE = {
    'claude-haiku-4-5': '2025-10-15', 'gemini-3.1-pro': '2026-02-19', 'gemini-3.5-flash': '2026-05-19',
    'claude-fable-5': '2026-06-09', 'claude-sonnet-5': '2026-06-30',
    'gpt-5.6-sol': '2026-07-09', 'gpt-5.6-terra': '2026-07-09', 'gpt-5.6-luna': '2026-07-09', 'muse-spark-1.1': '2026-07-09',
    'kimi-k3': '2026-07-16', 'claude-opus-5': '2026-07-24', 'muse-spark-1.2': '2026-08-05', 'grok-4.6': '2026-08-12',
    'gemini-3.7-flash': '2026-08-13', 'glm-5.3-flash': '2026-08-26', 'claude-fable-5-1': '2026-09-01',
    'gemini-3.8-flash': '2026-09-02', 'muse-spark-1.3': '2026-09-02', 'gpt-6-astra': '2026-09-03',
    'inkling:free': '2026-07-15',
    # 2026-09-23: vendor announcements, each cross-checked against OpenRouter's catalogue date
    'grok-4.5': '2026-07-08', 'deepseek-v4.1-flash:wafer': '2026-09-10', 'swe-2': '2026-09-10',
    'union-alpha': '2026-09-16',          # stealth: the day OpenRouter listed it (revealed 09-17 as Unbiased's Pareto)
    'glm-5.3-flashx': '2026-09-18', 'step-5-preview': '2026-09-20', 'grok-4.7': '2026-09-21',
    'claude-opus-5-5': '2026-09-22', 'gpt-6-sol': '2026-09-22',
    'space-bunny-alpha': '2026-09-23',    # stealth: listed on OpenRouter that day, maker undisclosed
    # 2026-10-12: vendor announcements, each matching OpenRouter's catalogue date
    'ember-1': '2026-09-23',              # Fireworks' post-trained Kimi K3; OpenRouter 09-24 00:07 UTC
    'claude-sonnet-5-5': '2026-09-28', 'gpt-6.1-sol': '2026-09-29', 'mistral-large-4-0': '2026-10-06',
    'claude-haiku-5-5': '2026-10-07',
    'muse-wonder-1.0': '2026-10-12',      # Meta Superintelligence Labs' announcement; API id muse-wonder-1.0
}

# One company per model, in the leaderboard figures' palette. The board's organisation, as it
# spells it, to the company the page draws it in.
COMPANY_OF_ORG = {
    'Anthropic': 'Anthropic', 'OpenAI': 'OpenAI', 'Google': 'Google', 'Meta': 'Meta', 'xAI': 'xAI',
    'deepseek': 'DeepSeek', 'Z.ai': 'Z.ai', 'Moonshot AI': 'Moonshot', 'cognition': 'Cognition',
    'Undisclosed': 'Undisclosed', 'Thinking Machines': 'Thinking Machines', 'mistralai': 'Mistral AI',
    'fireworks': 'Fireworks AI',
}
# Rows the board files under "Unplaced", by model id; failing that, by the family the id names.
ORG_OF = {'claude-opus-5-5': 'Anthropic', 'step-5-preview': 'StepFun'}
MAKER_OF_PREFIX = {'claude-': 'Anthropic', 'gpt-': 'OpenAI', 'gemini-': 'Google', 'grok-': 'xAI',
                   'muse-': 'Meta'}
# How a company is written where the page names it: xAI is part of SpaceX now.
COMPANY_LABEL = {'xAI': 'SpaceXAI'}
# Written in capitals when a name is spelled from a model id, and joined to a version
# that follows by a no-break hyphen, as in NAMES: 'gpt-6.1-sol' -> 'GPT‑6.1 Sol'.
ACRONYMS = {'gpt': 'GPT', 'glm': 'GLM', 'swe': 'SWE'}

def parse(label):
    """'z-ai/glm-5.3-flashx (max) · Claude Code' -> ('glm-5.3-flashx', 'max');
    'claude-haiku-4-5' -> ('claude-haiku-4-5', None)."""
    s = label.strip().split(' · ')[0]                  # the harness suffix is not part of the model
    m = re.match(r'^(.*?)(?:\s*\((\w+)\))?$', s)
    return m.group(1).split('/')[-1], m.group(2)


def name(model):
    """Product name for a model id. One the table lacks is spelled from its id: version digits the
    id splits with hyphens are joined with points, so 'claude-sonnet-5-5' -> 'Claude Sonnet 5.5'."""
    if model in NAMES:
        return NAMES[model]
    words = []
    for w in model.split(':')[0].split('-'):
        if w.isdigit() and words and words[-1].replace('.', '').isdigit():
            words[-1] += '.' + w
        else:
            words.append(w)
    out = ''
    for i, w in enumerate(words):
        sep = '' if i == 0 else '‑' if words[i - 1] in ACRONYMS and w[:1].isdigit() else ' '
        out += sep + ACRONYMS.get(w, w[:1].upper() + w[1:])
    return out


def _maker(model, org):
    if model in ORG_OF:
        return ORG_OF[model]
    if org in COMPANY_OF_ORG:
        return COMPANY_OF_ORG[org]
    return next((c for p, c in MAKER_OF_PREFIX.items() if model.startswith(p)), None)


def company(model, org):
    """The company a model is drawn in, from its id and the board's organisation for its row."""
    c = _maker(model, org)
    if c:
        return c
    return org[:1].upper() + org[1:] if org and org != 'Unplaced' else 'Undisclosed'


def missing(model, org):
    """What the tables above lack for a model the page shows: [] when it is fully described."""
    out = []
    if model not in NAMES:
        out.append('name (shown as %r)' % name(model))
    if not _maker(model, org):
        out.append('company (the board says %r)' % org)
    if model not in RELEASE:
        out.append('release date')
    return out
