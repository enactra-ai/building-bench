# Data licence and attribution

The code in this repository is under the licence in `LICENSE`. The data --
everything under `cases/`, `results/` and `tests/fixtures/` -- is not; this
file says what it is and where it comes from.

## Where the cases come from

The photographs, masks, colour renders and point clouds in `cases/` were
made by rendering two municipal photogrammetric city meshes, both released
under the [Creative Commons Attribution 4.0 International licence
(CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/):

| Cases | Source | Licensor |
|---|---|---|
| `helsinki_cathedral`, `helsinki_8033120`, `helsinki_122954081`, `helsinki_123901485`, `helsinki_122886734` | [Helsinki 3D city model (reality mesh)](https://hri.fi/data/en_GB/dataset/helsingin-3d-kaupunkimalli) -- see also [hel.fi: Helsinki 3D](https://www.hel.fi/en/decision-making/information-on-helsinki/maps-and-geospatial-data/helsinki-3d) | City of Helsinki (Helsingin kaupunki) |
| `melbourne_25422768`, `melbourne_45461060`, `melbourne_33106429`, `melbourne_4817059`, `melbourne_155809136`, `melbourne_22820458`, `melbourne_296368687` | [City of Melbourne 3D Textured Mesh (Photomesh) 2020](https://data.melbourne.vic.gov.au/explore/dataset/city-of-melbourne-3d-textured-mesh-photomesh-2020/) | City of Melbourne |

Attribution, as carried in every case's `truth/ATTRIBUTION.txt` and in
`cases/cases.json` — deliberately not in `agent/`, because the agent is not
told which dataset its photographs were rendered from:

* *Helsinki 3D city model / Helsingin kaupunki*, CC BY 4.0
* *City of Melbourne 3D Textured Mesh (Photomesh) 2020 / City of Melbourne*, CC BY 4.0

**Changes made.** The meshes themselves are not redistributed. From each we
rendered the building at stated camera poses (4608 × 3456 with 8× MSAA,
reduced 2× to 2304 × 1728); isolated the target building with its
OpenStreetMap footprint as a clipping polygon and a horizontal cut above the
measured ground; derived the alpha and cleaned masks and an unlit colour
render from those; sampled point clouds by reading back the renderer's depth
buffer; and measured the ground level and the building's height off the mesh.

## OpenStreetMap

Each building was located by its OpenStreetMap way (`osm_ref` in
`task.json` and `cases/cases.json`), and its footprint polygon -- in
`truth/site.json` -- comes from OpenStreetMap. That data is © OpenStreetMap
contributors and available under the [Open Database Licence
(ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1-0/); see
[openstreetmap.org/copyright](https://www.openstreetmap.org/copyright).

## What applies to what

* The images, masks and point clouds in `cases/` and the reference
  submissions in `tests/fixtures/` are adaptations of the CC BY 4.0 meshes
  and are released under **CC BY 4.0**. Credit the source city as above and
  this benchmark.
* The footprint geometry in `truth/site.json` is **ODbL 1.0**.
* The numbers in `results/` are ours, released under **CC BY 4.0**.

Neither city, nor the OpenStreetMap Foundation, endorses this benchmark. The
data is provided as is, without warranties of any kind; the City of
Melbourne in particular disclaims liability for any loss arising from the
use of its data.
