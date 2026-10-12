"""Just enough SVG to put a logo file onto a cairo surface.

Not a renderer: it covers what icon exports actually contain -- a `viewBox`,
nested `<g transform>`, `<rect>` with `rx`, `<path>` with the line and curve
commands, `<polygon>`, `<circle>`.  Anything outside that raises, rather than
drawing a wrong logo quietly.
"""

import re
import xml.etree.ElementTree as ET

import cairo

NS = "{http://www.w3.org/2000/svg}"
_NUM = re.compile(r"[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?")
_CMD = re.compile(r"([MmZzLlHhVvCcSsQqTtAa])")


class Unsupported(Exception):
    pass


def _nums(s):
    return [float(x) for x in _NUM.findall(s or "")]


def _colour(v, inherited):
    v = (v or "").strip()
    if not v or v == "inherit":
        return inherited
    if v == "none":
        return None
    if v.startswith("#"):
        h = v[1:]
        if len(h) == 3:
            h = "".join(c * 2 for c in h)
        return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    named = {"black": (0, 0, 0), "white": (1, 1, 1)}
    if v in named:
        return named[v]
    raise Unsupported("fill %r" % v)


def _matrix(spec):
    m = cairo.Matrix()
    for name, args in re.findall(r"(\w+)\s*\(([^)]*)\)", spec or ""):
        a = _nums(args)
        if name == "translate":
            m = cairo.Matrix(1, 0, 0, 1, a[0], a[1] if len(a) > 1 else 0) * m
        elif name == "scale":
            sx = a[0]
            m = cairo.Matrix(sx, 0, 0, a[1] if len(a) > 1 else sx, 0, 0) * m
        elif name == "matrix":
            m = cairo.Matrix(*a[:6]) * m
        elif name == "rotate":
            r = cairo.Matrix()
            if len(a) == 3:
                r.translate(a[1], a[2])
            r.rotate(a[0] * 3.141592653589793 / 180)
            if len(a) == 3:
                r.translate(-a[1], -a[2])
            m = r * m
        else:
            raise Unsupported("transform %r" % name)
    return m


def _path(cr, d):
    """Walk a `d` string onto the current cairo path."""
    parts = [p for p in _CMD.split(d) if p.strip()]
    x = y = 0.0
    sx = sy = 0.0            # where the current subpath started
    px = py = None           # the last control point, for S and T
    cmd = None
    i = 0
    while i < len(parts):
        if _CMD.fullmatch(parts[i]):
            cmd = parts[i]
            i += 1
            if i >= len(parts) or _CMD.fullmatch(parts[i]):
                a = []
            else:
                a = _nums(parts[i])
                i += 1
        else:
            a = _nums(parts[i])
            i += 1
        up = cmd.isupper()
        c = cmd.upper()
        if c == "Z":
            cr.close_path()
            x, y, px, py = sx, sy, None, None
            continue
        k = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6, "S": 4, "Q": 4, "T": 2,
             "A": 7}[c]
        if c == "A":
            raise Unsupported("elliptical arcs")
        for j in range(0, len(a) - k + 1, k):
            v = a[j:j + k]
            if c in ("M", "L"):
                nx, ny = (v[0], v[1]) if up else (x + v[0], y + v[1])
                if c == "M":
                    cr.move_to(nx, ny)
                    sx, sy = nx, ny
                    cmd = "L" if up else "l"     # further pairs are line-tos
                else:
                    cr.line_to(nx, ny)
                x, y, px, py = nx, ny, None, None
            elif c in ("H", "V"):
                if c == "H":
                    nx, ny = (v[0] if up else x + v[0]), y
                else:
                    nx, ny = x, (v[0] if up else y + v[0])
                cr.line_to(nx, ny)
                x, y, px, py = nx, ny, None, None
            elif c in ("C", "S"):
                if c == "C":
                    c1 = (v[0], v[1]) if up else (x + v[0], y + v[1])
                    c2 = (v[2], v[3]) if up else (x + v[2], y + v[3])
                    nx, ny = (v[4], v[5]) if up else (x + v[4], y + v[5])
                else:
                    c1 = (2 * x - px, 2 * y - py) if px is not None else (x, y)
                    c2 = (v[0], v[1]) if up else (x + v[0], y + v[1])
                    nx, ny = (v[2], v[3]) if up else (x + v[2], y + v[3])
                cr.curve_to(c1[0], c1[1], c2[0], c2[1], nx, ny)
                x, y, px, py = nx, ny, c2[0], c2[1]
            elif c in ("Q", "T"):
                if c == "Q":
                    q = (v[0], v[1]) if up else (x + v[0], y + v[1])
                    nx, ny = (v[2], v[3]) if up else (x + v[2], y + v[3])
                else:
                    q = (2 * x - px, 2 * y - py) if px is not None else (x, y)
                    nx, ny = (v[0], v[1]) if up else (x + v[0], y + v[1])
                # a quadratic is a cubic with the control point two-thirds out
                cr.curve_to(x + 2 / 3 * (q[0] - x), y + 2 / 3 * (q[1] - y),
                            nx + 2 / 3 * (q[0] - nx), ny + 2 / 3 * (q[1] - ny),
                            nx, ny)
                x, y, px, py = nx, ny, q[0], q[1]


def _rounded(cr, x, y, w, h, rx, ry):
    import math
    rx, ry = min(rx, w / 2), min(ry, h / 2)
    if rx <= 0 or ry <= 0:
        cr.rectangle(x, y, w, h)
        return
    cr.save()
    cr.translate(x + rx, y + ry)
    cr.scale(rx, ry)
    cr.arc(0, 0, 1, math.pi, 1.5 * math.pi)
    cr.restore()
    cr.line_to(x + w - rx, y)
    cr.save()
    cr.translate(x + w - rx, y + ry)
    cr.scale(rx, ry)
    cr.arc(0, 0, 1, 1.5 * math.pi, 2 * math.pi)
    cr.restore()
    cr.line_to(x + w, y + h - ry)
    cr.save()
    cr.translate(x + w - rx, y + h - ry)
    cr.scale(rx, ry)
    cr.arc(0, 0, 1, 0, 0.5 * math.pi)
    cr.restore()
    cr.line_to(x + rx, y + h)
    cr.save()
    cr.translate(x + rx, y + h - ry)
    cr.scale(rx, ry)
    cr.arc(0, 0, 1, 0.5 * math.pi, math.pi)
    cr.restore()
    cr.close_path()


class Mark:
    def __init__(self, path):
        root = ET.parse(path).getroot()
        vb = _nums(root.get("viewBox") or "")
        if len(vb) != 4:
            raise Unsupported("no viewBox")
        self.x0, self.y0, self.w, self.h = vb
        self.root = root

    def draw(self, cr, x, y, w, h=None):
        """Paint the mark into the box at (x, y), scaled to fit."""
        h = w if h is None else h
        cr.save()
        cr.translate(x, y)
        cr.scale(w / self.w, h / self.h)
        cr.translate(-self.x0, -self.y0)
        self._node(cr, self.root, (0, 0, 0))
        cr.restore()

    def _node(self, cr, node, fill):
        for el in node:
            tag = el.tag.replace(NS, "")
            if tag in ("metadata", "title", "desc", "defs"):
                continue
            cr.save()
            t = el.get("transform")
            if t:
                cr.transform(_matrix(t))
            f = _colour(el.get("fill"), fill)
            rule = (cairo.FILL_RULE_EVEN_ODD
                    if el.get("fill-rule") == "evenodd"
                    else cairo.FILL_RULE_WINDING)
            if tag == "g":
                self._node(cr, el, f)
            elif tag in ("path", "rect", "circle", "ellipse", "polygon"):
                cr.new_path()
                if tag == "path":
                    _path(cr, el.get("d") or "")
                elif tag == "rect":
                    rx = float(el.get("rx") or el.get("ry") or 0)
                    ry = float(el.get("ry") or el.get("rx") or 0)
                    _rounded(cr, float(el.get("x") or 0), float(el.get("y") or 0),
                             float(el.get("width")), float(el.get("height")), rx, ry)
                elif tag in ("circle", "ellipse"):
                    import math
                    cx, cy = float(el.get("cx") or 0), float(el.get("cy") or 0)
                    rx = float(el.get("r") or el.get("rx"))
                    ry = float(el.get("r") or el.get("ry"))
                    cr.save()
                    cr.translate(cx, cy)
                    cr.scale(rx, ry)
                    cr.arc(0, 0, 1, 0, 2 * math.pi)
                    cr.restore()
                elif tag == "polygon":
                    pts = _nums(el.get("points") or "")
                    for n in range(0, len(pts) - 1, 2):
                        (cr.move_to if n == 0 else cr.line_to)(pts[n], pts[n + 1])
                    cr.close_path()
                if f is not None:
                    cr.set_fill_rule(rule)
                    cr.set_source_rgb(*f)
                    cr.fill()
            else:
                raise Unsupported("element <%s>" % tag)
            cr.restore()
