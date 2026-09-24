#!/usr/bin/env python3
"""Pull everything the demo needs from the Enactra bench/building board into data/.

    python3 extract.py            # refresh data/*.json and data/img/ from http://ds-serv12.ucsd.edu:8870

Produces
  data/board.json         the board's embedded JSON (index.html#boardData); rowsSame is the shared-set table
  data/runs.json          the runs ledger (runs.html): run id -> series, model, state, overall, cost, surface F
  data/gallery_cells.json per building: every submission card on renders/<site>.html (glb path, scores)
  data/picks.json         one blind-tier run per (model in rowsSame) x (building on the page): the median run by overall
  data/meta.json          snapshot date, shared set, run/model counts, light rig, per-site source and counts
  data/img/               gthumb_<site>.jpg and ref_<site>_orbit_045.jpg
Raw submissions are cached in cache/glb/<run>.glb (see slim_all.py for the page-sized versions)."""
import json, os, re, html, sys, subprocess, concurrent.futures as cf
B = 'http://ds-serv12.ucsd.edu:8870/'
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
os.makedirs('data/img', exist_ok=True); os.makedirs('cache/glb', exist_ok=True)
SITES = ['geisel', 'flatiron', 'allegiant_stadium', 'epcot_sphere', 'beinecke', 'lax_theme', 'aon_center_chicago', 'one_liberty_plaza', 'salk_institute', 'twa_flight_center', 'udvar_hazy']  # the board's shared set
# The board's "license clean" release view: 12 CC BY 4.0 cases (five from the Helsinki 3D city
# model, seven from the City of Melbourne 2020 photomesh), run with enhanced PNG inputs. They have
# no render pages or gthumb/refshot stills; their photographs live on the Choose page and their
# submissions under bench-runs/<run>/submission/building.glb like everything else.
CLEAN_SITES = {  # enhanced site id -> (photo key on /validated/shot, source)
    'helsinki_122886734_enhanced_v1': ('helsinki_122886734', 'Helsinki 3D city model'),
    'helsinki_122954081_enhanced_v1': ('helsinki_122954081', 'Helsinki 3D city model'),
    'helsinki_123901485_enhanced_v1': ('helsinki_123901485', 'Helsinki 3D city model'),
    'helsinki_8033120_enhanced_v1': ('helsinki_8033120', 'Helsinki 3D city model'),
    'helsinki_cathedral_enhanced_v1': ('helsinki_cathedral', 'Helsinki 3D city model'),
    'melbourne_155809136_enhanced_v1': ('melbourne_155809136', 'City of Melbourne 2020 photomesh'),
    'melbourne_22820458_enhanced_v1': ('melbourne_22820458', 'City of Melbourne 2020 photomesh'),
    'melbourne_25422768_enhanced_v1': ('melbourne_25422768', 'City of Melbourne 2020 photomesh'),
    'melbourne_296368687_enhanced_v1': ('melbourne_296368687', 'City of Melbourne 2020 photomesh'),
    'melbourne_33106429_enhanced_v1': ('melbourne_33106429', 'City of Melbourne 2020 photomesh'),
    'melbourne_45461060_enhanced_v1': ('melbourne_45461060', 'City of Melbourne 2020 photomesh'),
    'melbourne_4817059_enhanced_v1': ('melbourne_4817059', 'City of Melbourne 2020 photomesh'),
}

def get(path, binary=False):
    r = subprocess.run(['curl', '-s', '-m', '120', '--fail', B + path], capture_output=True)
    if r.returncode: raise SystemExit('fetch failed: ' + path)
    return r.stdout if binary else r.stdout.decode('utf-8', 'replace')

def num(x):
    if x is None: return None
    m = re.match(r'\$?([0-9][0-9.,]*)', str(x).strip())
    return float(m.group(1).replace(',', '')) if m else None

def text(s):
    s = re.sub(r'<script.*?</script>', '', s, flags=re.S); s = re.sub(r'<style.*?</style>', '', s, flags=re.S)
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', s)))

# ---- board -------------------------------------------------------------------
index = get('index.html')
board = json.loads(re.search(r'<script type="application/json" id="boardData">(.*?)</script>', index, re.S).group(1))
json.dump(board, open('data/board.json', 'w'), indent=1)
it = text(index)
snapshot = re.search(r'Snapshot (\d{4}-\d{2}-\d{2})', it).group(1)
runs_scored = int(re.search(r'([\d,]+) runs scored here', it).group(1).replace(',', ''))
models_ranked = int(re.search(r'(\d+) models ranked', it).group(1))
same = re.search(r'Scored on the same \d+ buildings, which these \d+ rows have all run: (.*?)\. ', it).group(1)
same_set = [s.strip() for s in same.split(',')]
print('board: snapshot', snapshot, '| shared set', len(same_set), '| rowsSame', len(board['rowsSame']))

# ---- gallery: per-site source and counts ------------------------------------
gallery = get('gallery.html')
sites = {}
for m in re.finditer(r'<a href="renders/([^"]+)\.html" data-site="([^"]+)" data-union="([01])" data-n="(\d+)" data-src="([^"]+)"', gallery):
    sites[m.group(2)] = {'union': m.group(3) == '1', 'n': int(m.group(4)), 'source': html.unescape(m.group(5))}

# ---- runs ledger --------------------------------------------------------------
runs_html = get('runs.html')
runs = {}
for t in re.findall(r'<table[^>]*>.*?</table>', runs_html, re.S):
    hdr = [re.sub('<[^>]+>', '', h).strip() for h in re.findall(r'<th[^>]*>(.*?)</th>', t, re.S)]
    if not hdr or hdr[0] != 'run': continue
    for tr in re.findall(r'<tr[^>]*>.*?</tr>', t, re.S):
        tds = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.S)
        if len(tds) != len(hdr): continue
        d = dict(zip(hdr, [html.unescape(re.sub('<[^>]+>', '', x)).strip() for x in tds]))
        ms = re.search(r'--series-([a-z0-9]+)', tds[3]); mf = re.search(r'<em class="moved">(.*?)</em>', tds[3])
        runs[d['run']] = dict(run=d['run'], state=d['state'], tier=d['tier'], series=ms.group(1) if ms else None,
                              full=html.unescape(mf.group(1)) if mf else None, overall=d['overall'], cost=d['cost'],
                              surface_f=d['surface F'], turns=d['turns'], code=d['code'])
json.dump(runs, open('data/runs.json', 'w'))
print('ledger:', len(runs), 'runs')

# ---- render pages: every submission card, with its glb --------------------------
cells = {}; rig = None
for site in SITES:
    page = get('renders/%s.html' % site)
    d = json.loads(re.search(r'<script id="gallery-data" type="application/json">(.*?)</script>', page, re.S).group(1))
    cells[site] = {'cells': d['cells'], 'earth': d.get('earth'), 'ref': d.get('ref'),
                   'sites': {k: {'cameras': v['cameras'], 'held': v['held']} for k, v in d['sites'].items()}}
    rig = rig or d.get('rig')
    open('data/img/gthumb_%s.jpg' % site, 'wb').write(get('gthumb/%s.jpg' % site, True))
    open('data/img/ref_%s_orbit_045.jpg' % site, 'wb').write(get('refshot/%s/orbit_045.jpg' % site, True))
json.dump(cells, open('data/gallery_cells.json', 'w'))

# A re-score appends a ledger row ("<run>+cost") that may carry the price the original row lacks.
def cost_for(run, r):
    c = num(r['cost'])
    if c is not None: return c
    stem = run.split('+')[0]
    for k, rr in runs.items():
        if k.startswith(stem) and num(rr['cost']) is not None: return num(rr['cost'])
    return None

# ---- picks: the median blind-tier run per shared-set model per building ----------
series_ok = {r['series'] for r in board['rows']}   # every ranked row, not just the shared set (GPT-6 Astra has run 1 of the 11)
picks = []
for site, d in cells.items():
    byseries = {}
    for cid, c in d['cells'].items():
        if not c['site'].endswith('-blind'): continue
        r = runs.get(c['run'])
        if not r or r['state'] != 'complete' or r['series'] not in series_ok: continue
        ov = num(r['overall'])
        if ov is None: ov = c.get('overall')
        if ov is None: continue
        byseries.setdefault(r['series'], []).append((c, r, ov))
    for s, lst in byseries.items():
        lst.sort(key=lambda x: x[2])
        c, r, ov = lst[(len(lst) - 1) // 2]
        ts = re.search(r'-(\d{8}T\d{6})', c['run']).group(1)
        sf = num(r['surface_f'])
        picks.append(dict(site=site, series=s, run=c['run'], overall=ov, surface_f=sf if sf is not None else c.get('surface_f'),
                          chamfer_m=c.get('chamfer_m'), height_m=c.get('height_m'), triangles=c.get('triangles'), glb=c['glb'], page=c['page'],
                          cost=cost_for(c['run'], r), turns=num(r['turns']), nruns=len(lst), allruns=[x[2] for x in lst],
                          ran='%s-%s-%s' % (ts[:4], ts[4:6], ts[6:8])))
    miss = sorted(series_ok - set(byseries))
    print('%-20s %2d models%s' % (site, len(byseries), (' · missing ' + ', '.join(miss)) if miss else ''))
# ---- the license-clean sites: straight off the ledger, since they have no render pages --------
def glb_exists(stem):
    r = subprocess.run(['curl', '-s', '-m', '20', '-o', '/dev/null', '-w', '%{http_code}', B + 'bench-runs/%s/submission/building.glb' % stem], capture_output=True, text=True)
    return r.stdout.strip() == '200'
for site, (photo, source) in CLEAN_SITES.items():
    byseries = {}
    for run, r in runs.items():
        if not run.startswith(site + '-blind-') or r['state'] != 'complete' or r['series'] not in series_ok: continue
        ov = num(r['overall'])
        if ov is None: continue
        byseries.setdefault(r['series'], []).append((run, r, ov))
    for s_, lst in byseries.items():
        lst.sort(key=lambda x: x[2])
        run, r, ov = lst[(len(lst) - 1) // 2]
        stem = run.split('+')[0]
        if not glb_exists(stem):
            alt = [x for x in lst if glb_exists(x[0].split('+')[0])]
            if not alt: print('  no glb for', run); continue
            run, r, ov = alt[len(alt) // 2]; stem = run.split('+')[0]
        ts = re.search(r'-(\d{8}T\d{6})', run).group(1)
        picks.append(dict(site=site, series=s_, run=run, overall=ov, surface_f=num(r['surface_f']), chamfer_m=None, height_m=None, triangles=None,
                          glb='../bench-runs/%s/submission/building.glb' % stem, page=None, cost=cost_for(run, r), turns=num(r['turns']),
                          nruns=len(lst), allruns=[x[2] for x in lst], ran='%s-%s-%s' % (ts[:4], ts[4:6], ts[6:8])))
    sites[site] = {'union': False, 'clean': True, 'n': sum(len(v) for v in byseries.values()), 'source': source}
    for kind in ('gthumb', 'ref'):
        out = 'data/img/%s_%s%s.jpg' % (kind, site, '' if kind == 'gthumb' else '_orbit_045')
        if not os.path.exists(out): open(out, 'wb').write(get('validated/shot/%s/orbit_000/photo.jpg' % photo, True))
    print('%-34s %2d models (license-clean set)' % (site, len(byseries)))
# ---- GPT-6 Astra: the board's astra page (astra.html -> astra/manifest.json) is the source of record.
# It lists every gpt-6-astra run with the scores, cost and wall clock copied from that run's row.json,
# and its glb path is the same bench-runs/<run>/submission/building.glb. Replace the ledger-derived
# picks for those cells with the manifest's, one per site at each effort.
astra = json.loads(get('astra/manifest.json'))
page_sites = set(SITES) | set(CLEAN_SITES)
# Only the ultra-effort runs are loaded; the max/high duplicates on Geisel, Flatiron and the older cases stay on the astra page.
astra_runs = [r for r in astra['runs'] if r['site'] in page_sites and r['status'] == 'complete' and r['scores'].get('overall') is not None and r['effort'] == 'ultra']
by_cell = {}
for r in astra_runs:
    key = (r['site'], r['effort']); by_cell.setdefault(key, []).append(r)
# The ledger now carries the astra runs too, rescored with today's weighting (the manifest's scores
# are as filed), so the manifest only fills cells the ledger lacks. Other gpt6* series (GPT-6 Sol) are
# the ledger's alone.
have = {(p['site'], p['series']) for p in picks}
for (site, effort), lst in by_cell.items():
    if (site, 'gpt6astra' + effort) in have: continue
    lst.sort(key=lambda r: r['scores']['overall']); r = lst[(len(lst) - 1) // 2]
    series = 'gpt6astra' + effort
    if series not in series_ok: print('  astra effort not on the board:', series); continue
    ts = re.search(r'-(\d{8}T\d{6})', r['run_id']).group(1)
    picks.append(dict(site=site, series=series, run=r['run_id'], overall=r['scores']['overall'], surface_f=r['scores'].get('surface_f'),
                      chamfer_m=r['scores'].get('chamfer_m'), height_m=r['scores'].get('height_m'), triangles=r['scores'].get('triangles'),
                      glb='../' + r['glb'], page=r.get('cell'), cost=r.get('cost_usd'), turns=r.get('turns'), nruns=len(lst), allruns=[x['scores']['overall'] for x in lst],
                      ran='%s-%s-%s' % (ts[:4], ts[4:6], ts[6:8]), minutes=round((r.get('seconds') or 0) / 60, 2) or None, source='astra.html'))
print('astra page: %d gpt-6-astra runs, %d on this page' % (len(astra['runs']), len(astra_runs)))
json.dump(picks, open('data/picks.json', 'w'), indent=0)

# ---- minutes per run: the ledger does not carry them, the trajectory page does ----
def minutes_for(p):
    """'82m 27s wall clock' on the run's trajectory page."""
    try:
        t = text(get('traj/%s.html' % p['run'].replace('+', '%2B')))
    except SystemExit:
        return None
    m = re.search(r'((?:\d+h\s*)?(?:\d+m\s*)?(?:\d+s)?)\s*wall clock', t)
    if not m or not m.group(1).strip(): return None
    secs = 0
    for n, u in re.findall(r'(\d+)([hms])', m.group(1)): secs += int(n) * {'h': 3600, 'm': 60, 's': 1}[u]
    return round(secs / 60, 2) or None
try:
    cached = {p['run']: p.get('minutes') for p in json.load(open('data/picks.json')) if p.get('minutes')}
except Exception:
    cached = {}
todo = [p for p in picks if p['run'] not in cached and not p.get('minutes')]
with cf.ThreadPoolExecutor(8) as ex:
    for p, mins in zip(todo, ex.map(minutes_for, todo)): p['minutes'] = mins
for p in picks:
    if p['run'] in cached: p['minutes'] = cached[p['run']]
json.dump(picks, open('data/picks.json', 'w'), indent=0)
print('picks:', len(picks), '| with minutes:', sum(1 for p in picks if p['minutes']), '| with cost:', sum(1 for p in picks if p['cost'] is not None))

# ---- the license-clean board: the board's own release view over the 12 CC BY 4.0 cases ----------
clean_html = get('license-clean.html')
clean_board = json.loads(re.search(r'<script type="application/json" id="boardData">(.*?)</script>', clean_html, re.S).group(1))
ct = text(clean_html)
clean_meta = {'runsScored': int(re.search(r'([\d,]+) runs scored here', ct).group(1).replace(',', '')),
              'modelsRanked': int(re.search(r'(\d+) models ranked', ct).group(1)),
              'buildings': int(re.search(r'(\d+) buildings', ct).group(1)),
              'rows': {r['series']: dict(label=r['label'], **{k: r['values'].get(k) for k in ('overall', 'f', 'geometry', 'appearance', 'cost', 'minutes', 'cells', 'place')}) for r in clean_board['rows']}}
json.dump(clean_board, open('data/clean_board.json', 'w'), indent=1)
print('license-clean board:', clean_meta['modelsRanked'], 'models,', clean_meta['buildings'], 'buildings,', clean_meta['runsScored'], 'runs')

json.dump({'snapshot': snapshot, 'sameSet': same_set, 'runsScored': runs_scored, 'modelsRanked': models_ranked, 'rig': rig, 'cleanBoard': clean_meta, 'cleanBoard': clean_meta,
           'sites': {s: sites[s] for s in list(SITES) + list(CLEAN_SITES)}}, open('data/meta.json', 'w'), indent=1)

# ---- raw submissions into the cache ---------------------------------------------
def fetch_glb(p):
    if p['site'] not in CLEAN_SITES: return False          # the page shows the license-clean twelve only
    out = 'cache/glb/%s.glb' % p['run'].replace('+', '_')
    if os.path.exists('cache/slim/%s.glb.gz' % p['run'].replace('+', '_')): return False
    if os.path.exists(out) and os.path.getsize(out) > 0: return False
    open(out, 'wb').write(get(p['glb'].replace('../', ''), True)); return True
with cf.ThreadPoolExecutor(6) as ex:
    n = sum(ex.map(fetch_glb, picks))
print('cache/glb: %d fetched, %d already present' % (n, len(picks) - n))
