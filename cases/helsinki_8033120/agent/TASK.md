# Reconstruct this building

You are given photographs of one real building, taken from cameras whose
positions are stated exactly. Produce a 3D model of that building.

How you do it is up to you: write geometry by hand, generate it with a script,
author it in three.js and export, fit primitives, produce textures
procedurally or paint them from the photographs. Nothing about the method is
graded. The model is.

## What you hand in

    submission/building.glb     binary glTF 2.0, self-contained
    submission/manifest.json    at least {"method": "..."}

**This is not a massing study.** The model is imported into Unreal Engine and
into three.js, lit on a stated stage, and rendered. What you author into the
glTF PBR channels is what shows up there — base colour (as a texture where a flat colour cannot say what
you mean, which for a facade is nearly always), metallic and roughness, and
normal maps where a surface has relief. Concrete, glass and metal behave
differently under light and a building made of one grey is a building made of
one grey.

You may generate textures however you like: paint them from the photographs,
synthesise them procedurally, write the pixels. Embed them in the .glb.

**Units are metres. glTF is Y-up.** The axes are:

    +X  east          +Y  up          +Z  south   (so north is -Z)

The origin (0, 0, 0) is **the centroid of the building's footprint, at ground level**. Build the
building around it — a model that is the right shape in the wrong place is the
wrong model.

Constraints: at most 300,000 triangles and 64 MB. The file has to be
self-contained (no external images or .bin), and must not need Draco, meshopt
or KTX2 — a submission that needs them is rejected.

## What you are given

    views/*.png       4 photographs
    cameras.json      the pose and lens of every one of them
    site.json         the ground origin, and nothing else. The height is not given; read it off the photographs.

`cameras.json` gives, per view: the camera position in metres in the same
frame your model lives in (`east`, `north`, `up`), the direction it looks
(`heading_deg` clockwise from north, `pitch_deg` up from level), the
horizontal field of view, and the image size. That is enough to project any
point of your model into any photograph, and doing exactly that is the most
direct way to check yourself.

The photographs are renders of a photogrammetric 3D mesh.

## Two tools, in this directory

    ./preview

Renders `submission/building.glb` through every camera you were given and
writes `previews/over_<view>.png` — your model's outline drawn on the
photograph. That overlay is the fastest feedback available to you; a
silhouette that hugs the building and one that is a storey too tall look
identical without it.

    ./check

The acceptance checks a submission has to pass: whether the file parses, is
in metres, is the right way up, is self-contained, and is within budget. It
does **not** tell you your score. It exits 0 when the submission is
admissible.

Both are thin wrappers over `bench/building/`, which is here for you to
import: `glb.write(...)` will produce a conforming file from vertex and face
arrays with normals, UVs and materials if you would rather not write the
container yourself, and `raster.render(...)` is the renderer `./preview` uses.
Note that `./preview` shows **unlit base colour** — it is a check of the
geometry, not a picture of the lit model.
