#!/usr/bin/env python3
"""Turn every picked submission in cache/glb into a page-sized cache/slim/<run>.glb.gz:
textures at most 512 px (JPEG q80 where opaque), tangents dropped, vertices welded, floats rounded.
Idempotent: an existing output is kept unless --force."""
import json, os, sys, gzip, time, concurrent.futures as cf
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
sys.path.insert(0, HERE)
from slimglb import slim
from geomslim import parse, slim_geometry, pack
force = '--force' in sys.argv
picks = json.load(open('data/picks.json'))
os.makedirs('cache/slim', exist_ok=True)
def work(p):
    name = p['run'].replace('+', '_'); src = 'cache/glb/%s.glb' % name; dst = 'cache/slim/%s.glb.gz' % name
    if not os.path.exists(src): return (name, 'MISSING raw', 0)
    if os.path.exists(dst) and not force: return (name, os.path.getsize(src), os.path.getsize(dst))
    try:
        b = slim(src, None, 512, 80)
        j, binc = parse(b); j, binc = slim_geometry(j, binc); b = pack(j, binc)
    except Exception as e:
        return (name, 'ERR ' + repr(e), 0)
    g = gzip.compress(b, 9); open(dst, 'wb').write(g)
    return (name, os.path.getsize(src), len(g))
t = time.time()
with cf.ThreadPoolExecutor(4) as ex: res = list(ex.map(work, picks))
bad = [r for r in res if isinstance(r[1], str)]
for r in bad: print('!!', r)
ok = [r for r in res if not isinstance(r[1], str)]
print('%d ok, %d failed · raw %.1f MB -> slim+gz %.1f MB · %.0fs' % (len(ok), len(bad), sum(r[1] for r in ok) / 1e6, sum(r[2] for r in ok) / 1e6, time.time() - t))
print('largest:', *['%s %.2f MB' % (r[0][:45], r[2] / 1e6) for r in sorted(ok, key=lambda r: -r[2])[:5]], sep='\n  ')
