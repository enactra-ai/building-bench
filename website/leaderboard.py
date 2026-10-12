#!/usr/bin/env python3
"""The Leaderboard block's table and figures, from the board's license-clean same-set view.

    python3 leaderboard.py                         # after extract.py: data/clean_board.json, data/meta.json
    python3 leaderboard.py BOARD.json 2026-09-22   # from a saved boardData and its snapshot date

Writes, under data/enactra/ (build.py inlines all three):
  board.json      the board's `rowsSame`, Overall columns only, each row under the bar figure's name
                  and in the company the figures draw it in (catalog.py), "Surface" for Surface F
  fig_bar.svg     figures/bar/build_site.py
  fig_pareto.svg  figures/pareto/pareto_svg.py
"""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
import catalog

EA = 'data/enactra'
board_path = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else 'data/clean_board.json')
snapshot = sys.argv[2] if len(sys.argv) > 2 else json.load(open('data/meta.json'))['snapshot']
clean = json.load(open(board_path))
assert clean['sameSetSize'] == 12, 'the same set is now %d buildings; the page says twelve' % clean['sameSetSize']

def label(row):
    model, effort = catalog.parse(row['label'])
    return catalog.name(model).replace('‑', '-') + (' (%s)' % effort if effort else '')

# The table spells out a company the figures shorten.
TABLE_LABEL = dict(catalog.COMPANY_LABEL, Moonshot='Moonshot AI')

def company(row):
    c = catalog.company(catalog.parse(row['label'])[0], row['org'])
    return TABLE_LABEL.get(c, c)

rows = []
for r in clean['rowsSame']:
    co = company(r)
    rows.append(dict(r, label=label(r), sub=co, org=co, facets=dict(r['facets'], family=co)))
columns = [dict(c, label='Surface') if c['key'] == 'f' else c for c in clean['columns']]
out = {'columns': columns, 'sameSetSize': clean['sameSetSize'], 'sort': clean['sort'], 'who': clean['who'],
       'noun': clean['noun'], 'page': clean['page'],
       'tracks': [{'id': 'overall', 'label': 'Overall', 'sort': 'overall', 'columns': ['overall', 'f', 'geometry', 'appearance', 'cost']}],
       'rows': rows, 'snapshot': snapshot}
open(EA + '/board.json', 'w').write(json.dumps(out))
print('%s/board.json: %d rows, snapshot %s' % (EA, len(rows), snapshot))

subprocess.run([sys.executable, 'figures/bar/build_site.py', '--board', board_path, '--out', EA + '/fig_bar.svg'],
               check=True, stdout=subprocess.DEVNULL)
subprocess.run([sys.executable, 'figures/pareto/pareto_svg.py', EA + '/fig_pareto.svg'],
               check=True, env=dict(os.environ, BB_BOARD_JSON=board_path))
print('%s/fig_bar.svg, fig_pareto.svg' % EA)
