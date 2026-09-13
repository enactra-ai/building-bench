"""A z-buffer in numpy: the renderer ``./preview`` draws your model with.

It rasterises with integer pixel centres and an explicit depth test, so the
same model renders to the same pixels on any machine, with no GPU. Shading is
unlit by default -- base colour times texture -- with a lambert term available
for pictures.

It follows glTF's culling rule: a single-sided material shows only its front
faces, so a model exported with reversed winding renders inside out here, as
it would in any engine.
"""
from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass

import numpy as np

from bench.building.frame import Origin, View, enu_to_gltf
from bench.building.glb import Material, Mesh

NEAR_M = 0.05


@dataclass
class Frame:
    alpha: np.ndarray          # (H, W) float32, 1 where the model covers
    colour: np.ndarray         # (H, W, 3) float32, unlit base colour
    depth: np.ndarray          # (H, W) float32, metres along the view axis, inf empty
    #: (H, W, 3) unit face normal in ENU, zero where nothing was drawn.
    normal: np.ndarray | None = None
    triangles_drawn: int = 0
    triangles_culled_back: int = 0
    triangles_behind: int = 0

    @property
    def mask(self) -> np.ndarray:
        return self.alpha > 0.5

    @property
    def coverage(self) -> float:
        return float(self.mask.mean())


def camera_matrix(view: View, origin: Origin) -> tuple[np.ndarray, np.ndarray]:
    """(eye, R) in glTF coordinates, with R mapping world -> camera.

    The camera looks down its own -Z, which is OpenGL's convention and three's,
    so a render here and the photograph from the same camera line up.
    """
    forward, up, right = view.basis()
    eye = np.asarray(enu_to_gltf(view.east, view.north, view.up), np.float64)
    rows = np.asarray([enu_to_gltf(*right), enu_to_gltf(*up),
                       [-c for c in enu_to_gltf(*forward)]], np.float64)
    return eye, rows


def _clip_near(triangle: np.ndarray, uvs: np.ndarray) -> list[tuple[np.ndarray, np.ndarray]]:
    """Sutherland-Hodgman against z = -NEAR in camera space."""
    inside = triangle[:, 2] < -NEAR_M
    if inside.all():
        return [(triangle, uvs)]
    if not inside.any():
        return []
    poly_v, poly_uv = [], []
    for i in range(3):
        a, b = i, (i + 1) % 3
        if inside[a]:
            poly_v.append(triangle[a])
            poly_uv.append(uvs[a])
        if inside[a] != inside[b]:
            t = (-NEAR_M - triangle[a, 2]) / (triangle[b, 2] - triangle[a, 2])
            poly_v.append(triangle[a] + t * (triangle[b] - triangle[a]))
            poly_uv.append(uvs[a] + t * (uvs[b] - uvs[a]))
    return [(np.asarray([poly_v[0], poly_v[i], poly_v[i + 1]]),
             np.asarray([poly_uv[0], poly_uv[i], poly_uv[i + 1]]))
            for i in range(1, len(poly_v) - 1)]


def _sample(texture: np.ndarray, u: np.ndarray, v: np.ndarray) -> np.ndarray:
    height, width = texture.shape[:2]
    # glTF's UV origin is top-left; wrap is the default sampler.
    x = np.clip((np.mod(u, 1.0) * width).astype(np.int32), 0, width - 1)
    y = np.clip((np.mod(v, 1.0) * height).astype(np.int32), 0, height - 1)
    return texture[y, x]


def render(mesh: Mesh, view: View, origin: Origin, *,
           lambert: bool = False,
           sun: Sequence[float] = (0.35, 0.8, 0.45)) -> Frame:
    """Rasterise ``mesh`` from ``view``. Coordinates are glTF; see frame.py."""
    height, width = view.height, view.width
    alpha = np.zeros((height, width), np.float32)
    colour = np.zeros((height, width, 3), np.float32)
    depth = np.full((height, width), np.inf, np.float32)
    normal_buffer = np.zeros((height, width, 3), np.float32)
    if not mesh.triangle_count:
        return Frame(alpha, colour, depth, normal=normal_buffer)

    eye, rotation = camera_matrix(view, origin)
    fx, fy, cx, cy = view.intrinsics()
    camera_space = (np.asarray(mesh.vertices, np.float64) - eye) @ rotation.T

    materials = mesh.materials or [Material()]
    uv = mesh.uv if mesh.uv is not None else np.zeros((len(mesh.vertices), 2), np.float32)
    light = np.asarray(sun, np.float64)
    light = light / (np.linalg.norm(light) or 1.0)

    drawn = culled = behind = 0
    for face_index in range(mesh.triangle_count):
        indices = mesh.faces[face_index]
        tri = camera_space[indices]
        if (tri[:, 2] >= -NEAR_M).all():
            behind += 1
            continue
        material_index = int(mesh.face_material[face_index])
        material = materials[material_index] if 0 <= material_index < len(materials) \
            else Material()

        for piece, piece_uv in _clip_near(tri, uv[indices]):
            inverse_z = -1.0 / piece[:, 2]
            sx = fx * piece[:, 0] * inverse_z + cx
            sy = cy - fy * piece[:, 1] * inverse_z
            area = ((sx[1] - sx[0]) * (sy[2] - sy[0]) -
                    (sx[2] - sx[0]) * (sy[1] - sy[0]))
            if abs(area) < 1e-12:
                continue
            # Screen-space winding: with y down, a front face is clockwise on
            # screen, which is a negative signed area here.
            if area > 0 and not material.double_sided:
                culled += 1
                continue
            x0 = max(0, int(np.floor(sx.min())))
            x1 = min(width - 1, int(np.ceil(sx.max())))
            y0 = max(0, int(np.floor(sy.min())))
            y1 = min(height - 1, int(np.ceil(sy.max())))
            if x1 < x0 or y1 < y0:
                continue
            xs = np.arange(x0, x1 + 1) + 0.5
            ys = np.arange(y0, y1 + 1) + 0.5
            gx, gy = np.meshgrid(xs, ys)
            w0 = ((sx[1] - sx[0]) * (gy - sy[0]) - (gx - sx[0]) * (sy[1] - sy[0])) / area
            w1 = ((gx - sx[0]) * (sy[2] - sy[0]) - (sx[2] - sx[0]) * (gy - sy[0])) / area
            inside = (w0 >= 0) & (w1 >= 0) & (w0 + w1 <= 1)
            if not inside.any():
                continue
            b1, b2 = w1[inside], w0[inside]
            b0 = 1.0 - b1 - b2
            recip = b0 * inverse_z[0] + b1 * inverse_z[1] + b2 * inverse_z[2]
            z = 1.0 / np.maximum(recip, 1e-12)
            rows, cols = np.nonzero(inside)
            rows = rows + y0
            cols = cols + x0
            nearer = z < depth[rows, cols]
            if not nearer.any():
                continue
            rows, cols, z = rows[nearer], cols[nearer], z[nearer]
            b0, b1, b2 = b0[nearer], b1[nearer], b2[nearer]
            recip = recip[nearer]

            rgb = np.asarray(material.base_colour[:3], np.float64)
            pixel = np.tile(rgb, (len(rows), 1))
            if material.texture is not None:
                # Perspective-correct: interpolate uv/z and divide by 1/z.
                pu = (b0 * piece_uv[0, 0] * inverse_z[0] + b1 * piece_uv[1, 0] * inverse_z[1]
                      + b2 * piece_uv[2, 0] * inverse_z[2]) / recip
                pv = (b0 * piece_uv[0, 1] * inverse_z[0] + b1 * piece_uv[1, 1] * inverse_z[1]
                      + b2 * piece_uv[2, 1] * inverse_z[2]) / recip
                pixel = pixel * _sample(material.texture, pu, pv)
            pixel = pixel + np.asarray(material.emissive, np.float64)
            edge1 = mesh.vertices[indices[1]] - mesh.vertices[indices[0]]
            edge2 = mesh.vertices[indices[2]] - mesh.vertices[indices[0]]
            face_normal = np.cross(edge1, edge2)
            norm = float(np.linalg.norm(face_normal))
            unit = face_normal / norm if norm else np.zeros(3)
            if lambert:
                shade = 0.35 + 0.65 * abs(float(unit @ light)) if norm else 1.0
                pixel = pixel * shade

            # glTF axes back to ENU, so the fitted sun is stated in the same
            # frame as everything else the task talks about.
            normal_buffer[rows, cols] = (unit[0], -unit[2], unit[1])
            depth[rows, cols] = z
            colour[rows, cols] = np.clip(pixel, 0.0, 1.0)
            alpha[rows, cols] = 1.0
            drawn += 1

    return Frame(alpha, colour, depth, normal_buffer, drawn, culled, behind)


def render_all(mesh: Mesh, views: Sequence[View], origin: Origin,
               **kw) -> dict[str, Frame]:
    return {view.name: render(mesh, view, origin, **kw) for view in views}


