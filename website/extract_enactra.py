#!/usr/bin/env python3
"""Pull the four Enactra pitch-page blocks the release page merges in, into data/enactra/.

    python3 extract_enactra.py [path-to-enactra-split-copy]   # default: the Anthropic cut

The Enactra page is a 65 MB artifact with no build pipeline of its own (see the
`enactra-demo` skill), so the blocks are lifted out of the *split* copy — same markup,
but with media as /assets/<sha>.<ext> files rather than inline base64.

Written out:
  data/enactra/case.html  flagship.html  leaderboard.html  evaluation.html  momentum.html
  data/enactra/board.json          the [data-board] JSON the leaderboard renders from
  data/enactra/*.js                the three scripts that make those blocks work
  data/enactra/style.css           the pitch page's CSS, every selector scoped under .ea
  data/enactra/assets/             every file the blocks reference
  data/enactra/manifest.json       what came from where
"""
import json, os, re, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Documents/Enactra/site-anthropic')
src = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()
OUT = 'data/enactra'
os.makedirs(OUT + '/assets', exist_ok=True)

# ---------------------------------------------------------------- html ranges
TAG = re.compile(r'<(/?)([a-zA-Z][-\w]*)([^>]*?)(/?)>')
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

def block(start):
    """The element opening at `start`, up to and including its matching close tag."""
    m = TAG.match(src, start)
    assert m, src[start:start+80]
    name = m.group(2); depth = 0; pos = start
    while True:
        m = TAG.search(src, pos)
        if not m: raise ValueError('unclosed <%s> from %d' % (name, start))
        pos = m.end()
        if m.group(2).lower() != name.lower(): continue
        if m.group(1) == '/':
            depth -= 1
            if depth == 0: return src[start:m.end()]
        elif not m.group(4) and m.group(2).lower() not in VOID:
            depth += 1

def at(marker, occurrence=0):
    idx = [m.start() for m in re.finditer(re.escape(marker), src)]
    return idx[occurrence]

def dedent(html):
    lines = html.split('\n')
    pad = min((len(l) - len(l.lstrip()) for l in lines[1:] if l.strip()), default=0)
    return '\n'.join([lines[0]] + [l[pad:] if l[:pad].isspace() else l.lstrip() for l in lines[1:]])

# The flagship section's heading, then the case itself. flagship-shell also wraps the
# evaluation and leaderboard subsections, so the case is taken piece by piece instead.
# the heading is picked by its own text: several sections carry a .section-heading
flagship_heading = next(b for b in (block(m.start()) for m in re.finditer(re.escape('<div class="section-heading">'), src))
                        if 'Flagship task' in b)
case_parts = []
for marker in ('<div class="case-toolbar">', '<div class="demo-grid">', '<p class="case-takeaway">'):
    case_parts.append(block(at(marker)))
thumbs_js = re.search(r'<script>(.*?)</script>', src[at('<p class="case-takeaway">'):], re.S).group(1)

# the evaluation breakdown is a plain .subsection: walk back to the div that opens it
i = src.rfind('<div class="subsection">', 0, at('<h3>Evaluation breakdown'))
evaluation = block(i)
leaderboard = block(at('<div class="subsection" id="leaderboard">'))
momentum = block(at('<div class="momentum-strip">'))

board_json = re.search(r'<script type="application/json" id="boardData">(.*?)</script>', src, re.S).group(1)

def script_containing(needle):
    i = src.index(needle)
    a = src.rfind('<script>', 0, i)
    return src[a + len('<script>'):src.index('</script>', i)]

board_js = script_containing('// The leaderboard, live')
plot_js  = script_containing('// The score-against-price frontier plot, live')

# ----------------------------------------------------------------- css scope
style = re.search(r'<style>(.*?)</style>', src, re.S).group(1)

COMMENT = re.compile(r'/\*.*?\*/', re.S)   # '*' is not in the base64 alphabet, so data: URIs are safe

def scope_css(css, scope='.ea', _top=True):
    """Prefix every selector with `scope` so the pitch page's CSS cannot reach the rest
    of the page. `:root` becomes the scope itself, so its custom properties still cascade
    to everything inside; html/body rules are dropped."""
    if _top: css = COMMENT.sub('', css)   # a comment before a '{' would be parsed as a selector
    out, i = [], 0
    def fix(sel):
        parts = []
        for one in sel.split(','):
            one = one.strip()
            if not one: continue
            if one in (':root', 'html', 'body', ':root,html', 'html,body'):
                parts.append(scope); continue
            if one.startswith(':root'): one = one[len(':root'):].strip()
            for lead in ('html ', 'body '):
                if one.startswith(lead): one = one[len(lead):].strip()
            if one in ('*', '*,*::before,*::after'):
                parts.append('%s,%s *' % (scope, scope)); continue
            parts.append('%s %s' % (scope, one) if not one.startswith(scope) else one)
        return ','.join(parts)
    while i < len(css):
        brace = css.find('{', i)
        if brace < 0: out.append(css[i:]); break
        sel = css[i:brace]
        stripped = sel.strip()
        if stripped.startswith('@'):
            name = stripped.split()[0].lower()
            # nested blocks keep their own selectors, which are scoped in turn
            if name in ('@media', '@supports', '@layer', '@container'):
                depth, j = 1, brace + 1
                while depth and j < len(css):
                    if css[j] == '{': depth += 1
                    elif css[j] == '}': depth -= 1
                    j += 1
                out.append(sel + '{' + scope_css(css[brace + 1:j - 1], scope, False) + '}')
                i = j; continue
            end = css.find('}', brace) + 1          # @font-face, @keyframes, @page…
            if name == '@keyframes':
                depth, j = 1, brace + 1
                while depth and j < len(css):
                    if css[j] == '{': depth += 1
                    elif css[j] == '}': depth -= 1
                    j += 1
                end = j
            out.append(css[i:end]); i = end; continue
        end = css.find('}', brace)
        # a declaration block can hold no nested braces at this level
        out.append(fix(sel) + '{' + css[brace + 1:end] + '}')
        i = end + 1
    return ''.join(out)

scoped = scope_css(style)

# ------------------------------------------------------- the case's 3D viewer
# The pitch page drives it with <model-viewer> off unpkg. This page already carries three.js
# and a GLBViewer, and must open from disk with no network, so the element becomes a canvas
# that build.py mounts a GLBViewer on — same drag-to-orbit, scroll-to-zoom and auto-rotate,
# one renderer, no CDN. .feature-model-viewer already sizes it, so the CSS is untouched.
case_html = '\n'.join(dedent(p) for p in case_parts)
mv = re.search(r'<model-viewer\b.*?</model-viewer>', case_html, re.S)
assert mv, 'no <model-viewer> in the case block'
mv_attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', mv.group(0)))
case_glb = mv_attrs['src'].rsplit('/', 1)[-1]
case_html = (case_html[:mv.start()]
             + '<canvas class="feature-model-viewer" id="eaCaseCanvas" tabindex="0" aria-label="%s"></canvas>' % mv_attrs['alt']
             + case_html[mv.end():])

# ------------------------------------------------------------------- assets
blocks = {'flagship': dedent(flagship_heading), 'case': case_html,
          'leaderboard': dedent(leaderboard), 'evaluation': dedent(evaluation), 'momentum': dedent(momentum)}
referenced = set()
for text in list(blocks.values()) + [scoped, board_js, plot_js, thumbs_js, board_json]:
    referenced |= set(re.findall(r'/assets/([A-Za-z0-9_.-]+)', text))
referenced.add(case_glb)   # no longer named in the markup, but build.py registers it as a viewer asset
for f in os.listdir(OUT + '/assets'): os.remove(os.path.join(OUT + '/assets', f))
missing = []
for name in sorted(referenced):
    p = os.path.join(SRC, 'assets', name)
    if os.path.exists(p): shutil.copyfile(p, os.path.join(OUT, 'assets', name))
    else: missing.append(name)

for name, html in blocks.items():
    open('%s/%s.html' % (OUT, name), 'w', encoding='utf-8').write(html)
open(OUT + '/board.json', 'w', encoding='utf-8').write(board_json.strip())
open(OUT + '/board.js', 'w', encoding='utf-8').write(board_js)
open(OUT + '/plot.js', 'w', encoding='utf-8').write(plot_js)
open(OUT + '/thumbs.js', 'w', encoding='utf-8').write(thumbs_js)
open(OUT + '/style.css', 'w', encoding='utf-8').write(scoped)
json.dump({'source': SRC, 'blocks': {k: len(v) for k, v in blocks.items()}, 'caseGLB': case_glb,
           'caseModel': re.search(r'<strong>Agent reconstruction</strong>\s*<span>([^<]*)', case_html).group(1).split('\u00b7')[0].strip(),
           'assets': len(referenced) - len(missing), 'missing': missing},
          open(OUT + '/manifest.json', 'w'), indent=2)
print('blocks:', {k: len(v) for k, v in blocks.items()})
print('css %.1f KB scoped · board.json %.1f KB · board.js %.1f KB · plot.js %.1f KB' %
      (len(scoped)/1e3, len(board_json)/1e3, len(board_js)/1e3, len(plot_js)/1e3))
print('assets: %d copied%s' % (len(referenced) - len(missing), (', MISSING ' + ', '.join(missing)) if missing else ''))
