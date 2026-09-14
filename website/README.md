# BuildingBench explorer — real submissions from the board

The designer's prototype (`prototype-preview9.html`, from `~/Downloads/preview (9).html`)
wired to the Enactra bench/building board at http://ds-serv12.ucsd.edu:8870. Every 3D
canvas is the `building.glb` an agent handed in; every number is the board's.

## Outputs

Two editions from one source, plus a self-contained copy of the full one.

| Output | What |
|---|---|
| `buildingbench/` | **The release page.** `index.html` (~2.7 MB) + `assets/`. The explorer with the Enactra pitch blocks merged in. Upload the folder to static hosting. |
| `buildingbench-evolution/` | **The explorer on its own** — model progress over release date, without the pitch blocks. Same shape, `index.html` (~2.6 MB) + `assets/`. |
| `out/buildingbench-demo.html` | The release page self-contained (~67 MB). Opens from disk: no server, no CDN. Not committed — rebuild it. |

`SITES` at the foot of `build.py` maps each folder to whether it carries the pitch blocks;
`page(..., pitch_blocks=False)` emits the evolution edition. Everything else — data, models,
submissions, scores — is identical between them.

## Rebuild for a new board snapshot

```bash
python3 extract.py          # board JSON, runs ledger, render pages, thumbnails, per-run minutes → data/; raw glbs → cache/glb
python3 slim_all.py         # page-sized copies → cache/slim (textures ≤512 px JPEG, tangents dropped, vertices welded, floats rounded)
python3 extract_enactra.py  # the four Enactra pitch blocks → data/enactra/ (only when the pitch page changes)
python3 build.py            # assembles both outputs from template.html + engine.js + app.js + three-bundle.js + data/enactra/
```

`slim_all.py` is idempotent (`--force` to redo). `extract.py` refetches ~50 MB of pages but
only downloads glbs it does not already have.

## What the page shows, and the choices behind it

- **Models**: every row the board ranks (`rows`, 36 at the last snapshot), reduced to **one row per
  model at its highest reasoning effort** that ran at least five of the page's buildings (so
  "Kimi K3 (max)", which never ran them, does not hide the Kimi K3 that did). The other efforts
  stay on the board. Claude Haiku 4.5 is left off (`EXCLUDE` in `build.py`): released eight months
  before everything else, it stretched the time axis into empty space. GPT‑6 Astra is included even though it has run only 2 of the 11 buildings.
- **Chart**: score against **model release date**, one family curve per organisation with an
  arrow from each release to the next. Outputs are drawn large (124 px, 100 px with every family
  shown), so they are laid out near their true point and, when they had to move aside, tethered
  to it by a dotted line with a dot at the true point. Price and month sit under each output.
- **Release dates** are the public launch dates, kept in the `RELEASE` table in `build.py`:
  Claude Haiku 4.5 2025‑10‑15 · Gemini 3.1 Pro 2026‑02‑19 · Gemini 3.5 Flash 2026‑05‑19 ·
  Claude Fable 5 2026‑06‑09 · Claude Sonnet 5 2026‑06‑30 · GPT‑5.6 Sol/Terra/Luna 2026‑07‑09 ·
  Muse Spark 1.1 2026‑07‑09 · Inkling 2026‑07‑15 · Kimi K3 2026‑07‑16 · Claude Opus 5 2026‑07‑24 ·
  Muse Spark 1.2 2026‑08‑05 · Grok 4.6 2026‑08‑12 · Gemini 3.7 Flash 2026‑08‑13 · GLM‑5.3 Flash
  2026‑08‑26 · Claude Fable 5.1 2026‑09‑01 · Gemini 3.8 Flash 2026‑09‑02 · Muse Spark 1.3
  2026‑09‑02 · GPT‑6 Astra 2026‑09‑03. A model missing from the table is kept in the table view
  and left off the chart, and the chart says how many.
- **Buildings**: the board's **license-clean release set only** — 12 CC BY 4.0 cases (five from the
  Helsinki 3D city model, seven from the City of Melbourne 2020 photomesh), run with enhanced PNG
  inputs by every model family. They have no render pages on the board, so `extract.py` takes their
  runs from the ledger, their glTFs from `bench-runs/<run>/submission/`, their photographs from the
  Choose page (`validated/shot/<site>/orbit_000/photo.jpg`) and their names as the board has them.
- **GPT‑6 Astra** cells come from the board's astra page (`astra.html` → `astra/manifest.json`), the
  source of record for that model; only its **ultra** runs are loaded.
- **Scopes**: *This building* (one run per model) and *License-clean board · 12 buildings* (that
  board's own per-model figures, where GPT‑6 Astra ranks first).
- **Case score** = one blind-tier run per model × building: the *median* run by overall where a
  cell was run more than once (the inspector says how many runs there were). Scores come from
  the runs ledger, which recomputes overall with today's weighting.
- **Board overall** (the other scope) = the board's own per-model overall / cost / minutes over
  the buildings that model has run — ragged coverage, labelled as such.
- **Cost / run** is the ledger's price for that run (a few runs have none and show "—"); **minutes**
  is the wall clock on the run's trajectory page.
- **Reference stills** come from the licensed 3D city data: `gthumb/<site>.jpg` in the strip
  and `refshot/<site>/orbit_045.jpg` (a scored benchmark camera) in the reference dialog.
- **Provenance**: the board still calls its own imagery "Google 3D Tiles" and says the
  photographs are rendered from Google's photorealistic tiles. That is wrong — the benchmark
  runs on licensed clean data. `SOURCE_LABEL` in `build.py` rewrites the label so a refetch
  by `extract.py` cannot put it back, and the methodology copy says "licensed 3D city data".
  The board's own wording is worth fixing at source.
- **Light rig** is the benchmark's `city_bench.building_light/1`, as the board's own renders use.
- The board serves no CORS headers, so nothing is fetched live; a snapshot date is on the page.

## Backups, and the Cloudflare trap

`_backups/pre-merge-2026-09-13/` holds the page exactly as buildingbench.enactra.ai served it
on 2026-09-13, captured from the live site. It is a record of what was deployed — **not** the
way to get that page back. `buildingbench-evolution/` rebuilds the same thing from source,
with the provenance wording corrected. Keep `_backups/` out of the two site folders: every
file uploaded to Pages becomes a public URL.

**Never promote a fetched copy into a deployable folder.** A page fetched from the live host
is Cloudflare's rendering of it, not the file that was uploaded, and the difference is not
cosmetic:

- both `mailto:contact@enactra.ai` links are rewritten to `/cdn-cgi/l/email-protection#<hex>`
  with an `email-decode.min.js` loader injected. Off Cloudflare that loader 404s, so the
  contact links are simply **dead** — from disk, from any other static host, anywhere but the
  live domain;
- a `/cdn-cgi/challenge-platform/` bot script is injected too.

Both editions built here come from `template.html`, so they carry the plain `mailto:` links
and no `/cdn-cgi/` references at all — portable from disk, from any host, and behind
Cloudflare, which re-applies its own rewrites when serving. Verify after any change:

```bash
grep -c /cdn-cgi/ buildingbench/index.html buildingbench-evolution/index.html   # must be 0
```

## The Enactra pitch blocks

The release page is a merge: BuildingBench's own hero and explorer with four blocks lifted
from the Enactra pitch page, in this order —

| # | Block | From |
|---|---|---|
| 1 | Header, hero, featured reconstruction | BuildingBench |
| 2 | Flagship task — the Geisel case, end to end | Enactra |
| 3 | Leaderboard + cost/score frontier plot | Enactra |
| 4 | Evaluation breakdown | Enactra |
| 5 | The explorer — building strip, chart, inspector, table | BuildingBench |
| 6 | "Meanwhile, coding agents are starting to build worlds" | Enactra |

`extract_enactra.py` lifts the Enactra half out of that page's **split** copy and writes it to
`data/enactra/`; `build.py` injects it at the `<!--ENACTRA:pitch-->` and
`<!--ENACTRA:momentum-->` markers in `template.html`. Re-run the extractor only to pick up a
change on the pitch page.

```bash
python3 extract_enactra.py                                   # default: the Anthropic cut
python3 extract_enactra.py ~/Documents/Enactra/site-openai    # a different cut
```

**The cut decides the Geisel panel.** It is the one thing that differs between the pitch
page's cuts, and the panel's model, score and run facts come with it: the Anthropic cut gives
Claude Opus at 0.731, the OpenAI cut GPT-6 Astra at 0.572, the Google cut gemini-3.8-flash at
0.499. `manifest.json` records which was used.

Things that took a try to get right, and will bite again if the pieces are rebuilt:

- **The pitch CSS is scoped, not merged.** `scope_css()` rewrites every selector to sit under
  `.ea`, and `:root` becomes `.ea` so the pitch palette (`--accent: #2d5bff` and the rest)
  still cascades to the blocks. Without it the two stylesheets collide on `.case-card`,
  `.panel`, `.metric` and every bare element.
- **Strip CSS comments before scoping.** A comment sitting before a `{` is parsed as a
  selector, and one containing commas gets split and prefixed into garbage — a comment
  mentioning `<body>` produced a fake `<body` in the middle of the stylesheet.
- **Scoping only stops leaks one way.** This page styles bare elements (`table`, `th`, `td`,
  `td:nth-child(4)`, `img`, `a`, `h1`-`h3`, `p`), and those rules reach *into* `.ea` — the
  leaderboard's Surface F column came out tinted green. `ea_neutralise()` in `build.py` reads
  those rules straight out of `template.html` and reverts each declaration within `.ea`, so
  the pitch CSS lands on the browser's defaults exactly as it does on its own page. It is
  derived, not listed, so it stays correct when this page's CSS changes.
- **The case's 3D viewer was `<model-viewer>` off unpkg.** The extractor swaps it for a
  `<canvas class="feature-model-viewer" id="eaCaseCanvas">` that `build.py` mounts a
  `GLBViewer` on — same drag-to-orbit, scroll-to-zoom and auto-rotate, on the renderer this
  page already has, and no CDN (the self-contained file must open from disk with no network).
  The submission is gzipped and registered as the asset key `ea-case`, so it inlines and
  splits like any other mesh. `.feature-model-viewer` already sizes a block element, so the
  pitch CSS is untouched.
- **Geisel is not one of the license-clean twelve** in the explorer's strip. It is the pitch
  page's flagship case, carried in as the worked example; it is not part of the CC BY 4.0
  release the explorer is built on.
- The news strip's five citations are the **only** outbound links on the page, as on the
  pitch page. Everything else is self-contained.

## Files

- `template.html` — head, CSS and HTML from the prototype with the placeholder copy replaced,
  carrying the `<!--ENACTRA:pitch-->` and `<!--ENACTRA:momentum-->` injection markers
- `engine.js` — one shared WebGL renderer, one scene per submission, a `GLBViewer` per canvas
  with the prototype viewer's interface (rotationX/Y, zoom, group camera, draw, destroy)
- `app.js` — the page logic (selection state, chart, inspector, dialogs, CSV/PNG export, share hash)
- `three-bundle.js` — three r182 + GLTFLoader/OrbitControls/RoomEnvironment as a classic script
  (lifted from the Enactra pitch page)
- `slimglb.py`, `geomslim.py`, `glbinfo.py` — the re-encoders and an inspector for what makes a glb heavy
- `extract_enactra.py` — lifts the four pitch blocks, their scripts and their CSS into `data/enactra/`
- `data/enactra/` — the extracted markup, scoped CSS, board JSON, scripts and media
