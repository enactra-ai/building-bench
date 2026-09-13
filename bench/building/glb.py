"""Read and write glTF 2.0 binary, with no glTF library on the box.

The submission format is one ``.glb``. That choice is not neutral and it is
worth stating why, because "let the agent hand in whatever it likes" was the
obvious alternative:

  * three.js exports it (``GLTFExporter``), Blender exports it, Unreal imports
    it, and a browser can show it. So an agent may author in a three.js module,
    in Python, in a modelling tool or by writing the bytes, and the task does
    not have to know which.
  * it is self-describing and self-contained, so the thing rendered is the
    thing delivered. A submission that is "a script plus whatever was in the
    author's node_modules" cannot be re-rendered a month later.
  * it carries materials and textures, which the task asks for.

What this module will NOT do is decode Draco or KTX2. A submission that needs
them is rejected with that as the reason rather than silently losing geometry —
see contract.py. Nothing in the task requires compression.
"""
from __future__ import annotations

import json
import struct
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import numpy as np

MAGIC = 0x46546C67
CHUNK_JSON = 0x4E4F534A
CHUNK_BIN = 0x004E4942

COMPONENT = {5120: ("<i1", 1), 5121: ("<u1", 1), 5122: ("<i2", 2),
             5123: ("<u2", 2), 5125: ("<u4", 4), 5126: ("<f4", 4)}
COUNT = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4, "MAT4": 16}
TRIANGLES = 4


class UndecodableTexture(Exception):
    """A bound image no decoder here can read. Not fatal to reading the geometry."""


class GlbError(ValueError):
    """The file is not a glTF this task accepts, and why."""


@dataclass
class Material:
    """A glTF PBR material, with its whole metallic-roughness set.

    The task asks for materials, not just colours, so the reader keeps every
    channel and which of them arrive as TEXTURES rather than as single numbers.
    """

    name: str = ""
    base_colour: tuple[float, float, float, float] = (1.0, 1.0, 1.0, 1.0)
    metallic: float = 1.0
    roughness: float = 1.0
    #: Decoded baseColorTexture as float RGB in [0, 1], or None.
    texture: Any = None
    double_sided: bool = False
    emissive: tuple[float, float, float] = (0.0, 0.0, 0.0)
    #: Which channels arrived as images. Their presence is what separates a
    #: painted building from a coloured one.
    has_base_texture: bool = False
    has_metallic_roughness_texture: bool = False
    has_normal_texture: bool = False
    has_occlusion_texture: bool = False
    has_emissive_texture: bool = False
    #: Base-colour texture size, so "textured" can be told from "one grey pixel".
    texture_size: tuple[int, int] = (0, 0)
    #: The other two maps, decoded, because a channel that is BOUND is not the
    #: same as a channel that DOES anything: a normal map of flat (128,128,255)
    #: and a metallic-roughness map of one constant colour both earn channel
    #: credit while changing no pixel of any render. Kept as float RGB in
    #: [0, 1] or None, the same as ``texture``.
    normal_map: Any = None
    metallic_roughness_map: Any = None
    #: KHR_materials_* names the file declared on this material.
    extensions: tuple[str, ...] = ()
    alpha_mode: str = "OPAQUE"


@dataclass
class Mesh:
    """Every triangle in the file, in one array, in glTF axes (X east, Y up, Z south)."""

    vertices: np.ndarray                      # (V, 3) float32
    faces: np.ndarray                         # (F, 3) int32
    face_material: np.ndarray                 # (F,) int32, -1 for none
    uv: np.ndarray | None = None              # (V, 2) float32
    #: Per-vertex normals when the file carried them. Unreal shades from these
    #: and warns about "degenerate tangent bases" when they are absent — glTF
    #: says a client must then compute flat normals, and Unreal does, but the
    #: tangent basis a normal map needs is gone. So their presence is reported.
    normals: np.ndarray | None = None         # (V, 3) float32
    materials: list[Material] = field(default_factory=list)
    #: Extensions the file declared. Kept so the contract can complain about
    #: the ones that change what the geometry means.
    extensions_used: list[str] = field(default_factory=list)
    extensions_required: list[str] = field(default_factory=list)
    node_count: int = 0

    @property
    def triangle_count(self) -> int:
        return int(self.faces.shape[0])

    def bounds(self) -> tuple[np.ndarray, np.ndarray]:
        if not len(self.vertices):
            zero = np.zeros(3, np.float32)
            return zero, zero
        return self.vertices.min(axis=0), self.vertices.max(axis=0)

    def geometry_hash(self) -> str:
        """A digest of shape alone — position and topology, not materials.

        Used to answer "did the build command reproduce this file", which is a
        question about the model rather than about PNG encoders: two runs of a
        texture baker can differ in a few bytes of zlib and still be the same
        building.
        """
        import hashlib
        h = hashlib.sha256()
        h.update(np.ascontiguousarray(self.vertices.astype("<f4")).tobytes())
        h.update(np.ascontiguousarray(self.faces.astype("<i4")).tobytes())
        return h.hexdigest()[:32]


# --------------------------------------------------------------------------- #
# reading
# --------------------------------------------------------------------------- #

def _chunks(blob: bytes) -> tuple[dict[str, Any], bytes]:
    if len(blob) < 12:
        raise GlbError("the file is too short to be a GLB")
    magic, version, total = struct.unpack_from("<III", blob, 0)
    if magic != MAGIC:
        raise GlbError("not a GLB: the file does not start with 'glTF'. "
                       "A .gltf + .bin pair is not accepted; export binary.")
    if version != 2:
        raise GlbError(f"glTF version {version}; this task reads glTF 2.0")
    if total != len(blob):
        raise GlbError(f"the header says {total} bytes and the file is {len(blob)}")
    offset, meta, binary = 12, None, b""
    while offset + 8 <= len(blob):
        length, kind = struct.unpack_from("<II", blob, offset)
        payload = blob[offset + 8: offset + 8 + length]
        if kind == CHUNK_JSON and meta is None:
            # glTF says pad the JSON chunk with SPACES; writers that use
            # NULs are common, and handing the padding to json.loads
            # rejects a valid file with "Extra data". No meaningful glTF
            # document ends in whitespace or NUL, so stripping it is
            # unambiguous and strictly more permissive.
            meta = json.loads(
                payload.decode("utf-8").rstrip(" \t\r\n\x00"))
        elif kind == CHUNK_BIN and not binary:
            binary = payload
        offset += 8 + length + (-length % 4)
    if meta is None:
        raise GlbError("the GLB has no JSON chunk")
    return meta, binary


def _buffer(meta: dict[str, Any], binary: bytes, index: int) -> bytes:
    spec = meta["buffers"][index]
    uri = spec.get("uri")
    if uri is None:
        return binary
    if uri.startswith("data:"):
        import base64
        return base64.b64decode(uri.split(",", 1)[1])
    raise GlbError(f"buffer {index} points at an external file ({uri!r}); "
                   "the submission has to be one self-contained .glb")


def _view_bytes(meta: dict[str, Any], binary: bytes, index: int) -> tuple[bytes, int]:
    view = meta["bufferViews"][index]
    data = _buffer(meta, binary, view.get("buffer", 0))
    start = view.get("byteOffset", 0)
    return data[start:start + view["byteLength"]], view.get("byteStride", 0)


def _accessor(meta: dict[str, Any], binary: bytes, index: int) -> np.ndarray:
    spec = meta["accessors"][index]
    if "sparse" in spec:
        raise GlbError("sparse accessors are not supported")
    dtype, size = COMPONENT[spec["componentType"]]
    per = COUNT[spec["type"]]
    count = spec["count"]
    if "bufferView" not in spec:
        return np.zeros((count, per), np.float32)
    raw, stride = _view_bytes(meta, binary, spec["bufferView"])
    start = spec.get("byteOffset", 0)
    element = size * per
    if stride and stride != element:
        rows = [np.frombuffer(raw, dtype=dtype, count=per,
                              offset=start + i * stride) for i in range(count)]
        out = np.stack(rows)
    else:
        out = np.frombuffer(raw, dtype=dtype, count=count * per,
                            offset=start).reshape(count, per)
    out = np.asarray(out)
    if spec.get("normalized") and spec["componentType"] in (5121, 5123):
        out = out.astype(np.float32) / (255.0 if spec["componentType"] == 5121 else 65535.0)
    return out


def _matrix(node: dict[str, Any]) -> np.ndarray:
    if "matrix" in node:
        return np.asarray(node["matrix"], np.float64).reshape(4, 4).T
    out = np.eye(4)
    if "rotation" in node:
        x, y, z, w = node["rotation"]
        out[:3, :3] = np.array([
            [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
            [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
            [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]])
    if "scale" in node:
        out[:3, :3] = out[:3, :3] @ np.diag(node["scale"])
    if "translation" in node:
        out[:3, 3] = node["translation"]
    return out


def _texture(meta: dict[str, Any], binary: bytes, index: int):
    from io import BytesIO

    from PIL import Image
    texture = meta.get("textures", [])[index]
    source = texture.get("source")
    if source is None:
        ext = texture.get("extensions") or {}
        for _name, body in ext.items():
            if "source" in body:
                source = body["source"]
                break
    if source is None:
        return None
    image = meta.get("images", [])[source]
    if "uri" in image:
        uri = image["uri"]
        if uri.startswith("data:"):
            import base64
            raw = base64.b64decode(uri.split(",", 1)[1])
        else:
            raise GlbError(f"image {source} is an external file ({uri!r}); "
                           "the submission has to be one self-contained .glb")
    else:
        raw, _stride = _view_bytes(meta, binary, image["bufferView"])
    mime = (image.get("mimeType") or "").lower()
    if "ktx" in mime or "basis" in mime:
        raise GlbError("KTX2/Basis textures are not decoded; "
                       "export PNG or JPEG")
    try:
        return np.asarray(Image.open(BytesIO(raw)).convert("RGB"), np.float32) / 255.0
    except Exception as exc:
        # An image PIL cannot identify is not a reason to fail the read: the
        # geometry metrics never touch it. Treat it as no texture -- which is
        # the honest reading, since nothing downstream can display it either --
        # and let the material columns record the absence.
        raise UndecodableTexture(f"{type(exc).__name__}: {exc}") from exc


def read(path: str | Path) -> Mesh:
    """Flatten a GLB into one triangle soup in world coordinates."""
    blob = Path(path).read_bytes()
    meta, binary = _chunks(blob)

    materials: list[Material] = []
    for spec in meta.get("materials", []):
        pbr = spec.get("pbrMetallicRoughness") or {}
        texture = None
        if "baseColorTexture" in pbr:
            try:
                texture = _texture(meta, binary, pbr["baseColorTexture"]["index"])
            except UndecodableTexture:
                texture = None
        size = (0, 0) if texture is None else (int(texture.shape[1]), int(texture.shape[0]))

        def optional(container: dict[str, Any], key: str):
            if key not in container:
                return None
            try:
                return _texture(meta, binary, container[key]["index"])
            except (GlbError, KeyError, IndexError, ValueError):
                return None

        normal_map = optional(spec, "normalTexture")
        metallic_roughness_map = optional(pbr, "metallicRoughnessTexture")
        materials.append(Material(
            name=spec.get("name", ""),
            base_colour=tuple(pbr.get("baseColorFactor", [1, 1, 1, 1])),
            metallic=float(pbr.get("metallicFactor", 1.0)),
            roughness=float(pbr.get("roughnessFactor", 1.0)),
            texture=texture,
            double_sided=bool(spec.get("doubleSided", False)),
            emissive=tuple(spec.get("emissiveFactor", [0.0, 0.0, 0.0])),
            has_base_texture="baseColorTexture" in pbr,
            has_metallic_roughness_texture="metallicRoughnessTexture" in pbr,
            has_normal_texture="normalTexture" in spec,
            has_occlusion_texture="occlusionTexture" in spec,
            has_emissive_texture="emissiveTexture" in spec,
            texture_size=size,
            normal_map=normal_map,
            metallic_roughness_map=metallic_roughness_map,
            extensions=tuple(sorted((spec.get("extensions") or {}).keys())),
            alpha_mode=str(spec.get("alphaMode", "OPAQUE"))))

    vertices: list[np.ndarray] = []
    faces: list[np.ndarray] = []
    face_material: list[np.ndarray] = []
    uvs: list[np.ndarray] = []
    normals: list[np.ndarray] = []
    with_normals = 0
    primitives_seen = 0
    base = 0
    nodes = meta.get("nodes", [])
    node_count = 0

    def walk(index: int, parent: np.ndarray) -> None:
        nonlocal base, node_count, with_normals, primitives_seen
        node = nodes[index]
        world = parent @ _matrix(node)
        node_count += 1
        if "mesh" in node:
            for primitive in meta["meshes"][node["mesh"]].get("primitives", []):
                if primitive.get("mode", TRIANGLES) != TRIANGLES:
                    continue
                attributes = primitive.get("attributes", {})
                if "POSITION" not in attributes:
                    continue
                position = np.asarray(_accessor(meta, binary, attributes["POSITION"]),
                                      np.float64)
                homogeneous = np.concatenate(
                    [position, np.ones((len(position), 1))], axis=1)
                vertices.append((homogeneous @ world.T)[:, :3].astype(np.float32))
                if "TEXCOORD_0" in attributes:
                    uvs.append(np.asarray(_accessor(meta, binary,
                                                    attributes["TEXCOORD_0"]), np.float32))
                else:
                    uvs.append(np.zeros((len(position), 2), np.float32))
                primitives_seen += 1
                if "NORMAL" in attributes:
                    raw_normal = np.asarray(
                        _accessor(meta, binary, attributes["NORMAL"]), np.float64)
                    rotated = raw_normal @ np.linalg.inv(world[:3, :3]).T
                    length = np.linalg.norm(rotated, axis=1, keepdims=True)
                    normals.append((rotated / np.maximum(length, 1e-12)).astype(np.float32))
                    with_normals += 1
                else:
                    normals.append(np.zeros((len(position), 3), np.float32))
                if "indices" in primitive:
                    index_array = np.asarray(
                        _accessor(meta, binary, primitive["indices"])).reshape(-1)
                else:
                    index_array = np.arange(len(position))
                triangles = index_array[:len(index_array) // 3 * 3].reshape(-1, 3)
                faces.append(triangles.astype(np.int64) + base)
                face_material.append(np.full(len(triangles),
                                             primitive.get("material", -1), np.int32))
                base += len(position)
        for child in node.get("children", []):
            walk(child, world)

    scene = meta.get("scene", 0)
    roots = (meta.get("scenes", [{}])[scene].get("nodes")
             if meta.get("scenes") else range(len(nodes)))
    for root in roots or []:
        walk(root, np.eye(4))

    if not faces:
        return Mesh(np.zeros((0, 3), np.float32), np.zeros((0, 3), np.int32),
                    np.zeros(0, np.int32), np.zeros((0, 2), np.float32), None,
                    materials, meta.get("extensionsUsed", []),
                    meta.get("extensionsRequired", []), node_count)
    return Mesh(vertices=np.concatenate(vertices).astype(np.float32),
                faces=np.concatenate(faces).astype(np.int32),
                face_material=np.concatenate(face_material),
                uv=np.concatenate(uvs).astype(np.float32),
                normals=(np.concatenate(normals).astype(np.float32)
                         if with_normals == primitives_seen and primitives_seen else None),
                materials=materials,
                extensions_used=meta.get("extensionsUsed", []),
                extensions_required=meta.get("extensionsRequired", []),
                node_count=node_count)


# --------------------------------------------------------------------------- #
# writing — enough to express a baseline, not a modelling package
# --------------------------------------------------------------------------- #

def flat_shade(vertices: np.ndarray, faces: np.ndarray,
               uv: np.ndarray | None = None
               ) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray | None]:
    """Explode a mesh so every triangle owns its vertices, with a face normal.

    Needed because a building is all creases: sharing a vertex between a wall
    and a roof and averaging their normals rounds the eave. Unreal will compute
    flat normals for a file that has none, but it loses the tangent basis while
    doing it and says so.
    """
    vertices = np.asarray(vertices, np.float32)
    faces = np.asarray(faces, np.int32).reshape(-1, 3)
    corners = vertices[faces.reshape(-1)]
    triangles = corners.reshape(-1, 3, 3)
    normal = np.cross(triangles[:, 1] - triangles[:, 0], triangles[:, 2] - triangles[:, 0])
    length = np.linalg.norm(normal, axis=1, keepdims=True)
    normal = np.where(length > 1e-12, normal / np.maximum(length, 1e-12),
                      np.array([0.0, 1.0, 0.0], np.float32))
    out_normals = np.repeat(normal, 3, axis=0).astype(np.float32)
    out_faces = np.arange(len(corners), dtype=np.int32).reshape(-1, 3)
    out_uv = None if uv is None else np.asarray(uv, np.float32)[faces.reshape(-1)]
    return corners.astype(np.float32), out_faces, out_normals, out_uv


def write(path: str | Path, vertices: np.ndarray, faces: np.ndarray,
          face_material: np.ndarray | None = None,
          materials: list[Material] | None = None,
          uv: np.ndarray | None = None, normals: np.ndarray | None = None,
          name: str = "building") -> Path:
    """One GLB, one node, one primitive per material.

    Deliberately minimal. The baselines and the reference implementation are
    the only callers; an agent writes its own file however it likes.
    """
    vertices = np.ascontiguousarray(np.asarray(vertices, np.float32))
    faces = np.asarray(faces, np.int32).reshape(-1, 3)
    materials = list(materials or [Material(name="default")])
    if face_material is None:
        face_material = np.zeros(len(faces), np.int32)
    face_material = np.asarray(face_material, np.int32)

    blob = bytearray()
    views: list[dict[str, Any]] = []
    accessors: list[dict[str, Any]] = []

    def add_view(payload: bytes, target: int | None = None) -> int:
        while len(blob) % 4:
            blob.append(0)
        offset = len(blob)
        blob.extend(payload)
        view: dict[str, Any] = {"buffer": 0, "byteOffset": offset,
                                "byteLength": len(payload)}
        if target:
            view["target"] = target
        views.append(view)
        return len(views) - 1

    position_view = add_view(vertices.tobytes(), 34962)
    accessors.append({"bufferView": position_view, "componentType": 5126,
                      "count": len(vertices), "type": "VEC3",
                      "min": vertices.min(axis=0).tolist(),
                      "max": vertices.max(axis=0).tolist()})
    normal_accessor = None
    if normals is not None:
        normal_array = np.ascontiguousarray(np.asarray(normals, np.float32))
        normal_accessor = len(accessors)
        accessors.append({"bufferView": add_view(normal_array.tobytes(), 34962),
                          "componentType": 5126, "count": len(normal_array),
                          "type": "VEC3"})
    uv_accessor = None
    if uv is not None:
        uv = np.ascontiguousarray(np.asarray(uv, np.float32))
        uv_accessor = len(accessors)
        accessors.append({"bufferView": add_view(uv.tobytes(), 34962),
                          "componentType": 5126, "count": len(uv), "type": "VEC2"})

    primitives = []
    for index in range(len(materials)):
        selected = faces[face_material == index]
        if not len(selected):
            continue
        indices = np.ascontiguousarray(selected.reshape(-1).astype(np.uint32))
        accessor = len(accessors)
        accessors.append({"bufferView": add_view(indices.tobytes(), 34963),
                          "componentType": 5125, "count": len(indices),
                          "type": "SCALAR"})
        attributes = {"POSITION": 0}
        if normal_accessor is not None:
            attributes["NORMAL"] = normal_accessor
        if uv_accessor is not None:
            attributes["TEXCOORD_0"] = uv_accessor
        primitives.append({"attributes": attributes, "indices": accessor,
                           "material": index, "mode": TRIANGLES})

    images: list[dict[str, Any]] = []
    textures: list[dict[str, Any]] = []
    material_json = []
    for material in materials:
        pbr: dict[str, Any] = {"baseColorFactor": list(material.base_colour),
                               "metallicFactor": material.metallic,
                               "roughnessFactor": material.roughness}
        if material.texture is not None:
            from io import BytesIO

            from PIL import Image
            buffer = BytesIO()
            arr = np.clip(np.asarray(material.texture, np.float32), 0, 1)
            Image.fromarray((arr * 255 + 0.5).astype(np.uint8)).save(buffer, format="PNG")
            images.append({"bufferView": add_view(buffer.getvalue()),
                           "mimeType": "image/png"})
            textures.append({"source": len(images) - 1})
            pbr["baseColorTexture"] = {"index": len(textures) - 1}
        material_json.append({"name": material.name or "material",
                              "pbrMetallicRoughness": pbr,
                              "doubleSided": material.double_sided})

    meta: dict[str, Any] = {
        "asset": {"version": "2.0", "generator": "city-bench/building"},
        "scene": 0, "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0, "name": name}],
        "meshes": [{"name": name, "primitives": primitives}],
        "materials": material_json, "accessors": accessors, "bufferViews": views,
        "buffers": [{"byteLength": len(blob)}],
    }
    if images:
        meta["images"] = images
        meta["textures"] = textures

    json_chunk = json.dumps(meta, separators=(",", ":")).encode()
    json_chunk += b" " * (-len(json_chunk) % 4)
    binary_chunk = bytes(blob) + b"\x00" * (-len(blob) % 4)
    total = 12 + 8 + len(json_chunk) + 8 + len(binary_chunk)

    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("wb") as out:
        out.write(struct.pack("<III", MAGIC, 2, total))
        out.write(struct.pack("<II", len(json_chunk), CHUNK_JSON))
        out.write(json_chunk)
        out.write(struct.pack("<II", len(binary_chunk), CHUNK_BIN))
        out.write(binary_chunk)
    return path


# --------------------------------------------------------------------------- #
# geometry the contract and the baselines both need
# --------------------------------------------------------------------------- #

def signed_volume(vertices: np.ndarray, faces: np.ndarray) -> float:
    """Six times the enclosed volume, positive when normals point outward.

    Cheap, and it answers the question that has bitten this repo three times:
    are the triangles wound the right way round? A hand-built prism gets it
    wrong about half the time and looks fine in a double-sided preview.
    """
    v = np.asarray(vertices, np.float64)
    f = np.asarray(faces, np.int32).reshape(-1, 3)
    if not len(f):
        return 0.0
    a, b, c = v[f[:, 0]], v[f[:, 1]], v[f[:, 2]]
    return float(np.einsum("ij,ij->i", a, np.cross(b, c)).sum() / 6.0)


def orient_outward(vertices: np.ndarray, faces: np.ndarray) -> np.ndarray:
    """Flip every face if the mesh as a whole is inside out."""
    faces = np.asarray(faces, np.int32).reshape(-1, 3)
    if signed_volume(vertices, faces) < 0:
        return faces[:, ::-1].copy()
    return faces
