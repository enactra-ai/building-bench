#!/usr/bin/env python3
"""Assemble the BuildingBench demo page from the board data and the slimmed submissions.

    python3 build.py            # writes out/buildingbench-demo.html (self-contained, opens from disk)
                                #    and buildingbench{,-evolution}/{index.html,assets/} (for static hosting)
    python3 build.py --no-demo  # the two hostable editions only (what publish.sh deploys)

Also writes data/fingerprint.json: a hash of everything the page shows except the snapshot date,
the counts it shows, and what catalog.py lacks for the models on it. publish.sh deploys only
when the hash changes.

Inputs (all under this folder):
  template.html      the page's head, CSS and HTML (derived from the design prototype)
  engine.js          the three.js viewer over the submitted glTFs
  app.js             the page logic
  three-bundle.js    three r182 + GLTFLoader/OrbitControls/RoomEnvironment as a classic script
  data/board.json    the board's own JSON (rowsSame = the shared-set table)
  data/picks.json    one blind-tier run per model x building (median by overall), from extract.py
  data/runs.json     the runs ledger (run id -> model series, cost, state)
  data/img/          gthumb_<site>.jpg (tiles thumbnail) and ref_<site>_orbit_045.jpg
  cache/slim/        <run>.glb.gz, produced by slim_all.py
"""
import base64, json, os, re, shutil, hashlib, sys
HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)
import catalog

board = json.load(open('data/board.json'))
picks = json.load(open('data/picks.json'))
meta = json.load(open('data/meta.json'))

SITES = [  # id, board site, display name, strip name
    # the board's license-clean release set (CC BY 4.0 imagery, enhanced PNG inputs); names from OpenStreetMap
    ('helsinki_cathedral', 'helsinki_cathedral_enhanced_v1', 'Helsingin tuomiokirkko (Helsinki Cathedral)', 'Helsinki Cathedral'),
    ('pikkuparlamentti', 'helsinki_122886734_enhanced_v1', 'Pikkuparlamentti (Parliament Annex)', 'Pikkuparlamentti'),
    ('hietalahti', 'helsinki_122954081_enhanced_v1', 'Hietalahden kauppahalli (Hietalahti Market Hall)', 'Hietalahti Market Hall'),
    ('johanneskyrkan', 'helsinki_123901485_enhanced_v1', 'Johanneskyrkan (St. John’s Church)', 'Johanneskyrkan'),
    ('ateneum', 'helsinki_8033120_enhanced_v1', 'Ateneum', None),
    ('st_patricks', 'melbourne_155809136_enhanced_v1', 'Saint Patrick’s Cathedral, Melbourne', 'St Patrick’s Cathedral'),
    ('state_library', 'melbourne_22820458_enhanced_v1', 'State Library Victoria', None),
    ('government_house', 'melbourne_25422768_enhanced_v1', 'Government House, Melbourne', 'Government House'),
    ('victoria_point', 'melbourne_296368687_enhanced_v1', 'Victoria Point', None),
    ('crowne_plaza', 'melbourne_33106429_enhanced_v1', 'Crowne Plaza Melbourne', 'Crowne Plaza'),
    ('acca', 'melbourne_45461060_enhanced_v1', 'Australian Centre for Contemporary Art', 'ACCA'),
    ('royal_exhibition', 'melbourne_4817059_enhanced_v1', 'Royal Exhibition Building', None),
]
GROUP = lambda site: 'clean' if site.endswith('_enhanced_v1') else 'shared'
# One family per company, in the leaderboard figures' palette (bar + Pareto), so a model wears
# the same colour everywhere on the page. Which company a board row belongs to is catalog.py's.
FAMILIES = {
    'OpenAI':            {'label': 'OpenAI',            'color': '#10A37F'},
    'Anthropic':         {'label': 'Anthropic',         'color': '#D97757'},
    'Google':            {'label': 'Google',            'color': '#7b1fa2'},
    'xAI':               {'label': 'SpaceXAI',          'color': '#111111'},   # xAI, now part of SpaceX
    'Meta':              {'label': 'Meta',              'color': '#42a5f5'},
    'DeepSeek':          {'label': 'DeepSeek',          'color': '#3f51e0'},
    'Z.ai':              {'label': 'Z.ai',              'color': '#96650b'},
    'Moonshot':          {'label': 'Moonshot',          'color': '#9ab832'},
    'StepFun':           {'label': 'StepFun',           'color': '#01c4b8'},   # the figures' #01f4e6, darkened to read as text
    'Cognition':         {'label': 'Cognition',         'color': '#d94a7b'},
    'Undisclosed':       {'label': 'Undisclosed',       'color': '#a8a29e'},
    'Thinking Machines': {'label': 'Thinking Machines', 'color': '#686868'},
    'All':               {'label': 'All families',      'color': '#315d50'},
}
FAMILY_ORDER = [f for f in FAMILIES if f != 'All']
NEW_FAMILY_COLOR = '#8a8f98'   # a company with no colour of its own yet (add it to FAMILIES)

def display_name(label):
    """'claude-fable-5-1 (max)' -> ('Claude Fable 5.1', 'max', 'claude-fable-5-1');
    'z-ai/glm-5.3-flashx (max) · Claude Code' -> ('GLM‑5.3 FlashX', 'max', 'glm-5.3-flashx')."""
    base, effort = catalog.parse(label)
    return catalog.name(base), effort or 'none', base

RELEASE = catalog.RELEASE
EFFORT_RANK = {'low': 0, 'none': 1, 'high': 1, 'thinking': 2, 'max': 2, 'xhigh': 2, 'ultra': 3}
# Left off the page: Claude Haiku 4.5 (Oct 2025) sits eight months before everything else and
# stretched the time axis into empty space; Gemini 3.1 Pro (Feb 2026) would do the same, and has
# run only 2 of the 12 buildings.
EXCLUDE = {'claude-haiku-4-5', 'gemini-3.1-pro'}

def data_uri(path, mime):
    return 'data:%s;base64,%s' % (mime, base64.b64encode(open(path, 'rb').read()).decode())

# ---- models: every ranked row, one variant per base model -----------------------
# The variant kept is the highest reasoning effort among those that ran at least five of the
# page's buildings (else the highest effort at all), so "Kimi K3 (max)" with no run here does
# not hide the Kimi K3 that ran everywhere.
import collections
covered = collections.defaultdict(set)
for p in picks: covered[p['series']].add(p['site'])
page_sites = {site for _, site, _, _ in SITES}
same_series = {r['series']: r for r in board['rowsSame']}
by_base = collections.defaultdict(list)
for row in board['rows']:
    name, effort, key = display_name(row['label'])
    by_base[key].append((row, name, effort))
EFFORT_LABEL = {'none': 'default effort', 'high': 'high effort', 'max': 'max effort', 'low': 'low effort', 'ultra': 'ultra effort', 'xhigh': 'xhigh effort', 'thinking': 'thinking'}
models = []; series_to_model = {}; series_effort = {}
for key, variants in by_base.items():
    if key in EXCLUDE: continue
    def rank(t):
        row, name, effort = t; cov = len(covered[row['series']] & page_sites)
        return (cov >= 5, EFFORT_RANK.get(effort, 1), cov, row['values']['cells'])
    row, name, effort = max(variants, key=rank)      # the variant whose board figures stand for the model
    v = row['values']; fam = catalog.company(key, row['org'])
    if fam not in FAMILIES:
        FAMILIES[fam] = {'label': fam, 'color': NEW_FAMILY_COLOR}; FAMILY_ORDER.append(fam)
    same = same_series.get(row['series'])
    models.append({
        'id': key, 'label': row['label'], 'name': name, 'base': name,
        'family': fam, 'org': FAMILIES[fam]['label'], 'effort': effort, 'effortLabel': EFFORT_LABEL.get(effort, effort), 'date': catalog.release(key),
        'tags': [t['text'] for t in row.get('tags', [])],
        'variants': [{'series': r['series'], 'label': r['label'], 'effort': e, 'cells': r['values']['cells']} for r, _, e in sorted(variants, key=lambda t: -EFFORT_RANK.get(t[2], 1))],
        'board': {k: v.get(k) for k in ('overall', 'f', 'geometry', 'appearance', 'cost', 'minutes', 'turns', 'place', 'takes', 'cells')},
        'shared': {k: same['values'].get(k) for k in ('overall', 'cost', 'minutes')} if same else None,
    })
    # The license-clean board's figures for this model: its variant on that board (they were swept at max).
    clean_rows = meta.get('cleanBoard', {}).get('rows', {})
    cv = [clean_rows[r['series']] for r, _, _ in variants if r['series'] in clean_rows]
    cv.sort(key=lambda c: -(c['cells'] or 0))
    models[-1]['clean'] = {k: cv[0].get(k) for k in ('overall', 'f', 'cost', 'minutes', 'cells', 'place', 'label')} if cv else None
    for r, _, e in variants: series_to_model[r['series']] = key; series_effort[r['series']] = e
models.sort(key=lambda m: -(m['board']['overall'] or 0))
undated = [m['label'] for m in models if not m['date']]
if undated: print('WARNING: no release date for', undated)
model_ids = {m['id'] for m in models}

# ---- buildings ---------------------------------------------------------------
# The board still labels its own imagery "Google 3D Tiles" and describes the photographs as
# rendered from Google's photorealistic tiles. That provenance is wrong — the benchmark runs
# on licensed clean data — so the label is replaced here rather than trusted, and a refetch
# by extract.py cannot put it back. (The board's own wording is worth fixing at source.)
SOURCE_LABEL = {'Google 3D Tiles': 'licensed 3D city data'}
site_meta = meta['sites']
buildings = []
for bid, site, name, short in SITES:
    sm = site_meta[site]
    buildings.append({
        'id': bid, 'short': site, 'name': name, 'shortName': short or name,
        'image': data_uri('data/img/gthumb_%s.jpg' % site, 'image/jpeg'),
        'photo': data_uri('data/img/ref_%s_orbit_045.jpg' % site, 'image/jpeg'), 'photoView': 'orbit_045',
        'source': SOURCE_LABEL.get(sm['source'], sm['source']), 'union': sm['union'], 'submissions': sm['n'], 'group': GROUP(site),
    })
bid_of = {site: bid for bid, site, _, _ in SITES}

# ---- results: one blind-tier run per model x building, at the highest effort that ran it ----------
# Per building, the model's variant with the highest reasoning effort among those that actually ran
# that building (the shared set was swept at max/ultra for some models and default for others; the
# license-clean set was swept at max throughout).
results, assets, missing = [], {}, []
best = {}
for p in picks:
    mid = series_to_model.get(p['series'])
    if not mid or p['site'] not in bid_of: continue
    k = (mid, p['site']); e = EFFORT_RANK.get(series_effort[p['series']], 1)
    if k not in best or e > best[k][0]: best[k] = (e, p)
for (mid, site), (_, p) in best.items():
    key = hashlib.sha1(p['run'].encode()).hexdigest()[:12]
    src = 'cache/slim/%s.glb.gz' % p['run'].replace('+', '_')
    if not os.path.exists(src):
        missing.append(p['run']); continue
    assets[key] = src
    eff = series_effort[p['series']]
    results.append({
        'id': '%s/%s' % (bid_of[site], mid), 'buildingId': bid_of[site], 'modelId': mid, 'series': p['series'], 'runId': p['run'],
        'effort': eff, 'effortLabel': EFFORT_LABEL.get(eff, eff),
        'score': p['overall'], 'surfaceF': p.get('surface_f'), 'costUSD': p.get('cost'), 'minutes': p.get('minutes'), 'turns': p.get('turns'),
        'nruns': p['nruns'], 'allRuns': p['allruns'], 'triangles': p.get('triangles'), 'heightM': p.get('height_m'), 'ran': p['ran'],
        'assetKey': key,
    })
# Only models that actually ran the page's buildings.
ran = {r['modelId'] for r in results}
models = [m for m in models if m['id'] in ran]
FAMILY_ORDER = [f for f in FAMILY_ORDER if FAMILIES[f]['color'] != NEW_FAMILY_COLOR or any(m['family'] == f for m in models)]
board_org = {display_name(r['label'])[2]: r['org'] for r in board['rows']}
incomplete = {m['id']: catalog.missing(m['id'], board_org.get(m['id'])) for m in models}
incomplete = {k: v for k, v in incomplete.items() if v}
# A model catalog.py has no date for is dated automatically (catalog.release: OpenRouter's listing
# day, else its first day on the page); record those dates with the page, so they stay put, and
# name them in the publish commit.
catalog.save_auto_record([m['id'] for m in models])
dated = catalog.auto_dated([m['id'] for m in models])
RELEASE = dict(RELEASE, **{m['id']: m['date'] for m in models if m['id'] in dated})
if missing:
    print('WARNING: %d picked runs have no slimmed asset:' % len(missing), *missing[:5], sep='\n  ')

# Featured: the license-clean board's leader on Helsinki Cathedral.
FEATURED_BUILDING = 'helsinki_cathedral'
on_featured = {r['modelId'] for r in results if r['buildingId'] == FEATURED_BUILDING}
featured_model = max((m for m in models if m['id'] in on_featured and m['date'] and m.get('clean')), key=lambda m: m['clean']['overall'] or 0)['id']
clean_board = meta.get('cleanBoard')
DATA = {
    'snapshot': meta['snapshot'], 'tier': 'blind', 'sameSet': meta['sameSet'], 'runsScored': meta['runsScored'], 'modelsRanked': meta['modelsRanked'],
    'rig': meta['rig'], 'buildings': buildings, 'models': models, 'results': results,
    'families': FAMILIES, 'familyOrder': FAMILY_ORDER, 'featured': {'buildingId': FEATURED_BUILDING, 'modelId': featured_model},
    'release': RELEASE, 'cleanBoard': {k: v for k, v in (clean_board or {}).items() if k != 'rows'},
}

# ---- the Enactra pitch blocks --------------------------------------------------------
# Blocks lifted from the Enactra pitch page by extract_enactra.py, then edited here: the Task
# Format case (Johanneskyrkan, GPT-6 Astra) and the leaderboard (bar chart, Pareto frontier,
# table). They keep their own markup, CSS and scripts; the CSS is scoped under `.ea` by the
# extractor so it cannot reach this page's own styles, and the markup is wrapped in that class here.
EA = 'data/enactra'
ea = {n: open('%s/%s.html' % (EA, n), encoding='utf-8').read() for n in
      ('flagship', 'case', 'leaderboard')}
# The leaderboard's bar chart and Pareto frontier are inline SVG (hoverable, see plot.js), generated
# outside this repo -- see README -- and dropped in at their markers.
for fig in ('bar', 'pareto'):
    ea['leaderboard'] = ea['leaderboard'].replace('<!--FIG:%s-->' % fig, open('%s/fig_%s.svg' % (EA, fig), encoding='utf-8').read())
ea_css = open(EA + '/style.css', encoding='utf-8').read()
ea_board_json = open(EA + '/board.json', encoding='utf-8').read()
ea_js = '\n'.join(open('%s/%s.js' % (EA, n), encoding='utf-8').read() for n in ('thumbs', 'board', 'plot'))

# BuildingBench styles bare elements — table, th, td, td:nth-child(4), img, a, h1-h3, p.
# Those rules reach inside the pitch blocks and restyle them (the leaderboard's fourth
# column came out tinted). Each such declaration is reverted within `.ea`, so the pitch
# CSS lands on the browser's own defaults exactly as it does on its own page. Derived from
# the template rather than listed, so it stays right when this page's CSS changes.
CSS_COMMENT = re.compile(r'/\*.*?\*/', re.S)

def ea_neutralise(bb_css, scope='.ea'):
    bb_css = CSS_COMMENT.sub('', bb_css)
    rules, i = [], 0
    while i < len(bb_css):
        b = bb_css.find('{', i)
        if b < 0: break
        sel = bb_css[i:b]
        if sel.lstrip().startswith('@'):                 # step over @media/@supports bodies
            depth, j = 1, b + 1
            while depth and j < len(bb_css):
                depth += bb_css[j] == '{'; depth -= bb_css[j] == '}'; j += 1
            i = j; continue
        end = bb_css.find('}', b)
        props = [d.split(':', 1)[0].strip() for d in bb_css[b + 1:end].split(';') if ':' in d]
        for one in sel.split(','):
            one = ' '.join(one.split())
            # only bare-element selectors leak: anything with a class or id cannot match
            # inside the pitch blocks, and the page-level ones are not worth reverting
            if not one or '.' in one or '#' in one or not props: continue
            if one in ('*', 'html', 'body', ':root', 'main'): continue
            rules.append('%s %s{%s}' % (scope, one, ';'.join('%s:revert' % p for p in props)))
        i = end + 1
    return ''.join(rules)

MIME = {'.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
        '.gif': 'image/gif', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.glb': 'model/gltf-binary'}

# The Task Format case is GPT-6 Astra on Johanneskyrkan, a run the explorer already carries, so
# its viewer reuses that submission's slimmed asset rather than shipping a second copy.
EA_CASE_RUN = 'helsinki_123901485_enhanced_v1-blind-gpt-6-astra-ultra-20260905T053213'
EA_CASE_KEY = hashlib.sha1(EA_CASE_RUN.encode()).hexdigest()[:12]
# The Task Format block quotes this run's scores, so it keeps this run's model even when a later
# run on Johanneskyrkan becomes the explorer's median pick and the run drops out of `results`.
if EA_CASE_KEY not in assets:
    src = 'cache/slim/%s.glb.gz' % EA_CASE_RUN.replace('+', '_')
    if not os.path.exists(src) and os.path.exists('buildingbench/assets/%s.glb.gz' % EA_CASE_KEY):
        shutil.copyfile('buildingbench/assets/%s.glb.gz' % EA_CASE_KEY, src)
    assert os.path.exists(src), 'the Task Format run has no slimmed asset: ' + EA_CASE_RUN
    assets[EA_CASE_KEY] = src

ea_files = sorted(f for f in os.listdir(EA + '/assets') if not f.endswith('.gz'))
def ea_rewrite(text, inline):
    """/assets/<name> -> a data URI (self-contained) or assets/<name> (split copy)."""
    for name in ea_files:
        ext = os.path.splitext(name)[1].lower()
        repl = data_uri('%s/assets/%s' % (EA, name), MIME.get(ext, 'application/octet-stream')) if inline else 'assets/' + name
        text = text.replace('/assets/' + name, repl)
    return text

def ea_html(inline):
    pitch = ('<div class="ea"><div class="container">' + ea['flagship']
             + '<div class="flagship-shell">' + ea['case'] + ea['leaderboard']
             + '</div></div></div>')
    return ea_rewrite(pitch, inline)

def js_string_safe(s):
    return s.replace('</script', '<\\/script')

template = open('template.html').read()
engine = open('engine.js').read()
app = open('app.js').read()
three = open('three-bundle.js').read()
assert '</script' not in three and '</script' not in engine and '</script' not in app

# The page ships in two editions from one source. `buildingbench` is the full release page;
# `buildingbench-evolution` is the explorer on its own — the model-progress-over-release-date
# view without the pitch blocks, which is what the site served before they were merged in.
def page(asset_src, inline, pitch_blocks=True):
    if not pitch_blocks:
        body = template.replace('<!--ENACTRA:pitch-->', '')
        return ''.join([body,
            '<script>window.BB_DATA=%s;</script>\n' % js_string_safe(json.dumps(DATA, separators=(',', ':'))),
            '<script>window.BB_ASSETS=%s;</script>\n' % js_string_safe(json.dumps(asset_src, separators=(',', ':'))),
            '<script>\n%s\n</script>\n' % three,
            '<script>\n%s\n</script>\n' % engine,
            '<script>\n%s\n</script>\n' % app,
            '</body>\n</html>\n'])
    body = template.replace('<!--ENACTRA:pitch-->', ea_html(inline))
    # The pitch page centres its blocks in a 1180 px .container of its own. Here they sit
    # inside this page's <main>, which already sets the width (1440 px less 40 px a side),
    # so the inner cap is dropped and every block runs the same width as the explorer.
    EA_WIDTH = '.ea .container{width:100%;max-width:none;margin:0}'
    body = body.replace('</style>', ea_neutralise(re.search(r'<style>(.*?)</style>', template, re.S).group(1)) + '\n' + ea_rewrite(ea_css, inline) + '\n' + EA_WIDTH + '\n</style>', 1)
    parts = [body,
             '<script>window.BB_DATA=%s;</script>\n' % js_string_safe(json.dumps(DATA, separators=(',', ':'))),
             '<script>window.BB_ASSETS=%s;</script>\n' % js_string_safe(json.dumps(asset_src, separators=(',', ':'))),
             '<script>\n%s\n</script>\n' % three,
             '<script>\n%s\n</script>\n' % engine,
             '<script>\n%s\n</script>\n' % app,
             '<script type="application/json" id="boardData">%s</script>\n' % js_string_safe(ea_board_json),
             '<script>\n%s\n</script>\n' % ea_rewrite(ea_js, inline),
             '<script>if(window.GLBViewer)new GLBViewer(document.getElementById("eaCaseCanvas"),{assetKey:"%s",rotationX:.34,rotationY:-.7,zoom:.98,speed:.11});</script>\n' % EA_CASE_KEY,
             '</body>\n</html>\n']
    return ''.join(parts)

SITES = {'buildingbench': True, 'buildingbench-evolution': False}   # folder -> carries the pitch blocks

# 1. the self-contained release page: opens from disk, no server, no CDN
if '--no-demo' not in sys.argv:
    os.makedirs('out', exist_ok=True)
    inline = {k: base64.b64encode(open(v, 'rb').read()).decode() for k, v in assets.items()}
    html = page(inline, True)
    open('out/buildingbench-demo.html', 'w').write(html)
    print('out/buildingbench-demo.html  %.1f MB  (%d submissions, %d models, %d buildings)' % (
        len(html) / 1e6, len(results), len(models), len(buildings)))

# 2. the two hostable editions, each index.html + assets/ and nothing else
for folder, pitch_blocks in SITES.items():
    adir = '%s/assets' % folder
    os.makedirs(adir, exist_ok=True)
    for f in os.listdir(adir):
        os.remove(os.path.join(adir, f))
    split = {}
    for k, v in assets.items():
        shutil.copyfile(v, '%s/%s.glb.gz' % (adir, k)); split[k] = 'assets/%s.glb.gz' % k
    if pitch_blocks:
        for name in ea_files:
            shutil.copyfile('%s/assets/%s' % (EA, name), os.path.join(adir, name))
    out = page(split, False, pitch_blocks)
    open('%s/index.html' % folder, 'w').write(out)
    print('%-26s %.1f MB + %d assets (%.1f MB)' % (
        folder + '/index.html', len(out) / 1e6, len(os.listdir(adir)),
        sum(os.path.getsize(os.path.join(adir, f)) for f in os.listdir(adir)) / 1e6))

# 3. what publish.sh compares: both editions as built, less what changes without the page changing --
# the snapshot date, and the board-wide run and model counts DATA carries but the page never shows.
# An asset is named by its run, so the pages pin the submissions; the pitch media are hashed as files.
DATA = dict(DATA, snapshot='', runsScored=None, modelsRanked=None, cleanBoard=None)
ea_board_json = re.sub(r'"snapshot":\s*"[^"]*"', '"snapshot": ""', ea_board_json)
h = hashlib.sha256()
for folder, pitch_blocks in SITES.items():
    h.update(page({k: 'assets/%s.glb.gz' % k for k in sorted(assets)}, False, pitch_blocks).encode())
for name in ea_files:
    h.update(name.encode() + open('%s/assets/%s' % (EA, name), 'rb').read())
json.dump({'fingerprint': h.hexdigest(), 'snapshot': meta['snapshot'], 'buildings': len(buildings), 'results': len(results),
           'models': [m['name'] + ('' if m['effort'] == 'none' else ' (%s)' % m['effort']) for m in models],
           'incomplete': incomplete, 'dated': dated}, open('data/fingerprint.json', 'w'), indent=1, ensure_ascii=False)
for mid, what in incomplete.items():
    print('WARNING: catalog.py has no %s for %s' % (', '.join(what), mid))
