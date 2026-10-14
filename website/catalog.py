"""Who each board row is: product name, company and release date.

Shared by build.py (the explorer) and leaderboard.py with the figures under figures/, so a model
is named in one place. The board labels a row by model id, then an optional reasoning effort and
harness: 'claude-opus-5-5 (max)', 'deepseek/deepseek-v4.1-flash:wafer (max) · Claude Code'.

Nothing here needs filling in by hand for a new model. One the tables below do not know is
published at once with defaults: a name made from its id, its board organisation's company (else
the maker OpenRouter lists it under, else Undisclosed; grey if that company has no colour yet),
and as its release date the day OpenRouter listed it, else the day it first appears on the page
(see release()). build.py writes which defaults it used for the models it shows to
data/fingerprint.json, and publish.sh puts them in its commit message.
"""
import datetime
import json
import os
import re
import time
import urllib.request
import zoneinfo

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
    'gemini-4-argon': 'Gemini 4 Argon',
}

# Public launch dates, from the announcements (see README for sources), for the models placed by hand
# before 2026-10-14. Nothing is added here any more: a model missing here is dated by release().
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
    # 2026-10-14: Google announced Argon on 09-30 for cyber-defense partners only; the public launch is
    # 10-13, when it reached OpenRouter (16:04 UTC) and Antigravity
    'gemini-4-argon': '2026-10-13',
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
    """The company a model is drawn in, from its id and the board's organisation for its row; for a
    row the board leaves unplaced, the maker OpenRouter lists it under."""
    c = _maker(model, org)
    if c:
        return c
    if org and org != 'Unplaced':
        return org[:1].upper() + org[1:]
    return openrouter_company(model) or 'Undisclosed'


def missing(model, org):
    """The defaults a model the page shows is drawn with, for the publish commit: [] when the tables
    above or OpenRouter describe it. (Its release date always has a value: see release().)"""
    out = []
    if model not in NAMES:
        out.append('name spelled from its id (%r)' % name(model))
    if not _maker(model, org) and not openrouter_company(model):
        out.append('company %r (the board says %r)' % (company(model, org), org))
    return out


# ---- release dates (and makers) without a hand-kept entry -----------------------------------------------
# A model new to the board must not wait on an edit here to join the explorer's time axis. Without a
# RELEASE entry its date is the day OpenRouter listed it, in Pacific time like the dates above (27 of
# the 32 of those that OpenRouter lists fell on that same day); a model OpenRouter does not list is
# dated by the day it first appears on the page. A date set so is recorded in data/release_auto.json,
# committed with the page, so it never moves afterwards. The live catalogue is read at most hourly
# into cache/; a failed read uses that copy.
OPENROUTER_URL = 'https://openrouter.ai/api/v1/models'
_HERE = os.path.dirname(os.path.abspath(__file__))
OPENROUTER_CACHE = os.path.join(_HERE, 'cache', 'openrouter_models.json')
AUTO_RECORD = os.path.join(_HERE, 'data', 'release_auto.json')
OPENROUTER_MAX_AGE = 3600
PACIFIC = zoneinfo.ZoneInfo('America/Los_Angeles')
# OpenRouter's vendor prefix -> company, for a row the board files under "Unplaced". Its own stealth
# listings ("openrouter/...") stay Undisclosed.
VENDOR_COMPANY = {
    'anthropic': 'Anthropic', 'openai': 'OpenAI', 'google': 'Google', 'meta-llama': 'Meta', 'meta': 'Meta',
    'x-ai': 'xAI', 'deepseek': 'DeepSeek', 'z-ai': 'Z.ai', 'moonshotai': 'Moonshot', 'mistralai': 'Mistral AI',
    'stepfun-ai': 'StepFun', 'stepfun': 'StepFun', 'fireworks': 'Fireworks AI', 'cognition': 'Cognition',
    'thinking-machines': 'Thinking Machines', 'thinkingmachines': 'Thinking Machines',
}


def _key(model_id):
    """One spelling for the board's ids and OpenRouter's: vendor and ':variant' dropped, versions
    with points, a trailing '.0' dropped. 'claude-opus-5-5' and 'anthropic/claude-opus-5.5' ->
    'claude-opus-5.5'; 'deepseek-v4.1-flash:wafer' -> 'deepseek-v4.1-flash'."""
    s = model_id.lower().split('/')[-1].split(':')[0]
    s = re.sub(r'(?<=\d)-(?=\d)', '.', s)
    return re.sub(r'(?<=\d)\.0\b', '', s)


def _load(path):
    try:
        with open(path) as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


_catalogue = None


def _openrouter_catalogue():
    """{key: {'id', 'created'}}: the earliest listing of each model OpenRouter has ever shown here."""
    global _catalogue
    if _catalogue is not None:
        return _catalogue
    cache = _load(OPENROUTER_CACHE) or {'fetched': 0, 'models': {}}
    if time.time() - cache.get('fetched', 0) > OPENROUTER_MAX_AGE:
        try:
            req = urllib.request.Request(OPENROUTER_URL, headers={'User-Agent': 'buildingbench-site'})
            with urllib.request.urlopen(req, timeout=20) as r:
                live = json.load(r)['data']
            for m in live:                               # a union: a model OpenRouter drops keeps its date
                if m.get('created'):
                    old = cache['models'].get(m['id'])
                    cache['models'][m['id']] = min(old, m['created']) if old else m['created']
            cache['fetched'] = time.time()
            os.makedirs(os.path.dirname(OPENROUTER_CACHE), exist_ok=True)
            with open(OPENROUTER_CACHE + '.tmp', 'w') as f:
                json.dump(cache, f)
            os.replace(OPENROUTER_CACHE + '.tmp', OPENROUTER_CACHE)
        except Exception as e:                           # offline: the last copy will do
            print('catalog: OpenRouter catalogue not read (%s); using the copy from %s' % (
                e, time.strftime('%Y-%m-%d %H:%M', time.localtime(cache.get('fetched', 0)))))
    _catalogue = {}
    for mid, created in cache['models'].items():
        k = _key(mid)
        if k not in _catalogue or created < _catalogue[k]['created']:
            _catalogue[k] = {'id': mid, 'created': created}
    return _catalogue


def openrouter(model):
    """OpenRouter's earliest listing of a board model id, or None."""
    return _openrouter_catalogue().get(_key(model))


def openrouter_company(model):
    hit = openrouter(model)
    return VENDOR_COMPANY.get(hit['id'].split('/')[0]) if hit else None


_record = None
_taken = {}


def _auto(model):
    """The recorded automatic date of a model, else a new one: OpenRouter's listing day, else today."""
    global _record
    if _record is None:
        _record = _load(AUTO_RECORD) or {}
    if model in _record:
        return _record[model]
    if model not in _taken:
        hit = openrouter(model)
        if hit:
            listed = datetime.datetime.fromtimestamp(hit['created'], datetime.timezone.utc)
            _taken[model] = {'date': listed.astimezone(PACIFIC).date().isoformat(), 'source': 'OpenRouter listing',
                             'openrouter': hit['id'], 'listed': listed.strftime('%Y-%m-%d %H:%M UTC')}
        else:
            _taken[model] = {'date': datetime.datetime.now(PACIFIC).date().isoformat(),
                             'source': 'first day on the page'}
    return _taken[model]


def release(model):
    """The model's release date, never None: RELEASE, else its recorded automatic date, else the day
    OpenRouter listed it, else today -- the day it first appears on the page. A new automatic date
    is recorded by save_auto_record() when the page that shows it is built."""
    return RELEASE[model] if model in RELEASE else _auto(model)['date']


def auto_dated(models):
    """{model: 'date (how)'} for those of `models` dated automatically rather than from RELEASE."""
    return {m: '%s (%s)' % (_auto(m)['date'], _auto(m)['source']) for m in models if m not in RELEASE}


def save_auto_record(models):
    """Record the automatic dates of `models` (the ones the page shows) that are not recorded yet."""
    rec = _load(AUTO_RECORD) or {}
    new = {m: _auto(m) for m in models if m not in RELEASE and m not in rec}
    if new:
        rec.update(new)
        with open(AUTO_RECORD, 'w') as f:
            json.dump(dict(sorted(rec.items())), f, indent=1)
            f.write('\n')
    return new
