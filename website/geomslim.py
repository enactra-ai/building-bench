"""Geometry trims for embedding (pure Python, no numpy):
  - drop TANGENT attributes (three.js derives tangents from the normal map when they are absent),
  - weld duplicate vertices into an index buffer,
  - mask float mantissas so gzip has something to bite on: positions keep 14 bits
    (about a centimetre on a 200 m building), normals 8, UVs 12.
Nothing here moves a vertex by more than that rounding; triangles, materials and textures are untouched."""
import struct, json
from array import array

CT_SIZE = {5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}

def parse(b):
    off = 12; chunks = []
    while off < len(b):
        cl, ct = struct.unpack('<II', b[off:off + 8]); chunks.append((ct, b[off + 8:off + 8 + cl])); off += 8 + cl
    return json.loads(chunks[0][1]), (chunks[1][1] if len(chunks) > 1 else b'')

def pack(j, binc):
    jb = json.dumps(j, separators=(',', ':')).encode(); jb += b' ' * ((4 - len(jb) % 4) % 4)
    binc = bytes(binc) + b'\x00' * ((4 - len(binc) % 4) % 4)
    return (struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(jb) + 8 + len(binc)) +
            struct.pack('<II', len(jb), 0x4E4F534A) + jb + struct.pack('<II', len(binc), 0x004E4942) + binc)

def read_rows(j, binc, ai):
    """Accessor -> list of per-element byte strings (tightly packed)."""
    a = j['accessors'][ai]; bv = j['bufferViews'][a['bufferView']]
    isz = CT_SIZE[a['componentType']] * NC[a['type']]; cnt = a['count']
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0); stride = bv.get('byteStride') or isz
    mv = memoryview(binc)
    return [bytes(mv[off + i * stride: off + i * stride + isz]) for i in range(cnt)], a

def mask_floats(rows, bits):
    keep = 0xFFFFFFFF ^ ((1 << (23 - bits)) - 1)
    a = array('I'); a.frombytes(b''.join(rows))
    for i in range(len(a)): a[i] &= keep
    raw = a.tobytes(); n = len(rows[0]) if rows else 0
    return [raw[i * n:(i + 1) * n] for i in range(len(rows))]

def slim_geometry(j, binc, drop_tangent=True, weld=True, pos_bits=14, nrm_bits=8, uv_bits=12):
    if any(k in j for k in ('skins', 'animations')): raise RuntimeError('unsupported: skins/animations')
    out = bytearray(); views = []; accs = []
    def add(rows, proto, minmax=False, target=None):
        while len(out) % 4: out.append(0)
        data = b''.join(rows)
        views.append({'buffer': 0, 'byteOffset': len(out), 'byteLength': len(data), **({'target': target} if target else {})})
        out.extend(data)
        a = {'bufferView': len(views) - 1, 'componentType': proto['componentType'], 'count': len(rows), 'type': proto['type']}
        if proto.get('normalized'): a['normalized'] = True
        if minmax and proto['componentType'] == 5126:
            n = NC[proto['type']]; vals = [struct.unpack('<%df' % n, r) for r in rows]
            a['min'] = [min(v[i] for v in vals) for i in range(n)]; a['max'] = [max(v[i] for v in vals) for i in range(n)]
        accs.append(a); return len(accs) - 1
    prims = [p for m in j.get('meshes', []) for p in m.get('primitives', [])]
    for p in prims:
        if 'targets' in p: raise RuntimeError('unsupported: morph targets')
        if drop_tangent: p['attributes'].pop('TANGENT', None)
    # An accessor shared by several primitives (one vertex buffer, many materials) is emitted once.
    uses = {}
    for p in prims:
        for ai in p['attributes'].values(): uses[ai] = uses.get(ai, 0) + 1
    def masked(rows, k, a):
        if a['componentType'] != 5126 or not rows: return rows
        if k == 'POSITION': return mask_floats(rows, pos_bits)
        if k == 'NORMAL': return mask_floats(rows, nrm_bits)
        if k.startswith('TEXCOORD'): return mask_floats(rows, uv_bits)
        return rows
    acc_cache = {}
    def emit_attr(k, ai):
        if ai not in acc_cache:
            rows, a = read_rows(j, binc, ai)
            acc_cache[ai] = add(masked(rows, k, a), a, minmax=(k == 'POSITION'), target=34962)
        return acc_cache[ai]
    idx_cache = {}
    def emit_index(ai):
        if ai not in idx_cache:
            rows, a = read_rows(j, binc, ai)
            idx_cache[ai] = add(rows, a, target=34963)
        return idx_cache[ai]
    for p in prims:
        attrs = p['attributes']; names = sorted(attrs)
        private = all(uses[ai] == 1 for ai in attrs.values())
        if weld and 'indices' not in p and p.get('mode', 4) == 4 and private and names:
            cols = {}; protos = {}
            for k in names:
                rows, a = read_rows(j, binc, attrs[k]); protos[k] = a; cols[k] = masked(rows, k, a)
            nverts = len(cols['POSITION'])
            packed = [b''.join(cols[k][i] for k in names) for i in range(nverts)]
            first = {}; remap = [0] * nverts; keep = []
            for i, v in enumerate(packed):
                q = first.get(v)
                if q is None: q = first[v] = len(keep); keep.append(i)
                remap[i] = q
            if len(keep) < nverts * 0.98:
                for k in names: cols[k] = [cols[k][i] for i in keep]
                wide = len(keep) > 65535
                p['attributes'] = {k: add(cols[k], protos[k], minmax=(k == 'POSITION'), target=34962) for k in names}
                p['indices'] = add([struct.pack('<I' if wide else '<H', i) for i in remap], {'componentType': 5125 if wide else 5123, 'type': 'SCALAR'}, target=34963)
                continue
            p['attributes'] = {k: add(cols[k], protos[k], minmax=(k == 'POSITION'), target=34962) for k in names}
            continue
        p['attributes'] = {k: emit_attr(k, attrs[k]) for k in names}
        if 'indices' in p: p['indices'] = emit_index(p['indices'])
    for im in j.get('images', []):
        if 'bufferView' not in im: continue
        bv = j['bufferViews'][im['bufferView']]; data = binc[bv.get('byteOffset', 0): bv.get('byteOffset', 0) + bv['byteLength']]
        while len(out) % 4: out.append(0)
        views.append({'buffer': 0, 'byteOffset': len(out), 'byteLength': len(data)}); out.extend(data); im['bufferView'] = len(views) - 1
    j['bufferViews'] = views; j['accessors'] = accs
    while len(out) % 4: out.append(0)
    j['buffers'] = [{'byteLength': len(out)}]
    return j, bytes(out)

if __name__ == '__main__':
    import sys, gzip, os, time
    tot = 0; raw = 0
    for f in sys.argv[1:]:
        t = time.time()
        b = gzip.decompress(open(f, 'rb').read()) if f.endswith('.gz') else open(f, 'rb').read()
        j, binc = parse(b); j2, b2 = slim_geometry(j, binc); o = pack(j2, b2); g = gzip.compress(o, 6)
        raw += len(gzip.compress(b, 6)); tot += len(g)
        print(os.path.basename(f)[:55], round(len(b) / 1e6, 2), '->', round(len(o) / 1e6, 2), 'gz', round(len(g) / 1e6, 2), '%.1fs' % (time.time() - t))
    print('TOTAL gz before', round(raw / 1e6, 2), 'after', round(tot / 1e6, 2))
