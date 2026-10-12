#!/usr/bin/env python3
"""Animate the advance of the Pareto frontier on the 12-building same-set board.

Draws the leaderboard's own frontier chart frame by frame with cairo, then
`make_video.sh` hands the frames to ffmpeg.  The axes are the page's axes: the
cost axis is log, reversed (dearer left, cheaper right), with a slot of its own
on the right for the model that costs nothing, and the score axis runs 0 to
0.96 with a line every 0.24.  Nothing zooms; the board only gains dots.

Usage: render.py OUTDIR [--width N] [--height N] [--fps N] [--stages N]
"""

import argparse
import math
import os
import sys

import cairo

import svgmark

from models import MODELS, COMPANY, DISPLAY, PREFER, frontier
try:
    from models import FIRST          # names placed ahead of their score order
except ImportError:
    FIRST = ()

# ---- the page's palette ------------------------------------------------------
PAPER = "#f4f2ec"
SURFACE_1 = "#fffefb"
LINE = "#dfdcd2"
LINE_STRONG = "#c8c4b7"
TEXT_PRIMARY = "#17201d"
TEXT_SECONDARY = "#4a544f"
TEXT_MUTED = "#7d857f"
TEXT_FAINT = "#9aa19b"
ACCENT = "#2b3531"   # the frontier line; neutral, since OpenAI now wears green

FONT = "Noto Sans"

# ---- the cost axis ----------------------------------------------------------
# u = -log10(cost), so u grows as the run gets cheaper and the axis reads
# dearer-left, as on the page.  The page fixes its own domain because it has a
# model that costs nothing and needs a lane for it; this board does not, so the
# domain is taken from the board and the empty decades to the right are not
# drawn.  A free model would bring its lane back -- see axis_domain().
U_PAD = 0.30
COST_TICKS = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]
SCORE_TICKS = [0.0, 0.24, 0.48, 0.72, 0.96]
SCORE_MAX = 0.96


def axis_domain(models):
    """(u_lo, u_hi, u_zero).  `u_zero` is None unless something is free."""
    us = [-math.log10(m[1]) for m in models if m[1] > 0]
    lo, hi = min(us) - U_PAD, max(us) + U_PAD
    if any(m[1] <= 0 for m in models):
        hi += 0.46                      # a lane of its own, past the last tick
        return lo, hi, hi - 0.23
    return lo, hi, None


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def to_hsl(r, g, b):
    mx, mn = max(r, g, b), min(r, g, b)
    l = (mx + mn) / 2
    if mx == mn:
        return 0.0, 0.0, l
    d = mx - mn
    s = d / (2 - mx - mn) if l > 0.5 else d / (mx + mn)
    if mx == r:
        h = ((g - b) / d) % 6
    elif mx == g:
        h = (b - r) / d + 2
    else:
        h = (r - g) / d + 4
    return h / 6, s, l


def to_rgb(h, s, l):
    if s == 0:
        return l, l, l
    q = l * (1 + s) if l < 0.5 else l + s - l * s
    p = 2 * l - q

    def f(t):
        t %= 1
        if t < 1 / 6:
            return p + (q - p) * 6 * t
        if t < 1 / 2:
            return q
        if t < 2 / 3:
            return p + (q - p) * (2 / 3 - t) * 6
        return p
    return f(h + 1 / 3), f(h), f(h - 1 / 3)


def _lum(c):
    def f(v):
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (f(x) for x in c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(c, bg):
    a, b = _lum(c) + 0.05, _lum(bg) + 0.05
    return max(a, b) / min(a, b)


PALE_TARGET = 2.90     # a name off the frontier, against the paper
INK_TARGET = 4.60      # a name on it


def _solve(c, want, bg, smax):
    """The same hue, at the lightness that hits `want` against `bg`."""
    h, s, l = to_hsl(*c)
    s = min(s, smax)
    lo, hi = 0.0, 1.0
    for _ in range(26):                 # contrast falls as lightness rises
        mid = (lo + hi) / 2
        if contrast(to_rgb(h, s, mid), bg) > want:
            lo = mid
        else:
            hi = mid
    return to_rgb(h, s, (lo + hi) / 2)


def ink(c, bg=None, smax=0.92):
    """A colour dark enough to set a name in, without leaving its hue.

    Dots wear the company's real colour; names cannot always afford to.  Clay
    at #D97757 is a fine dot and a poor word -- 3.1:1 on this paper, and these
    names are the labels a reader actually navigates by.  So a name is set in
    its dot's hue, darkened only when the colour itself is too light, and left
    exactly as it is when it already carries.
    """
    bg = rgb(SURFACE_1) if bg is None else bg
    return c if contrast(c, bg) >= INK_TARGET else _solve(c, INK_TARGET, bg, smax)


def pale(c, bg=None, smax=0.55):
    """The same hue, quietened to one weight for every company.

    A name off the frontier has to stay under the line and under the names on
    it, while still saying which dot it belongs to.  Neither blending towards
    the paper nor fixing an HSL lightness does that: these hues start at wildly
    different lightnesses, and at one lightness the violets come out four times
    heavier than the greens.  Solving each for a fixed contrast instead gives
    every pale name the same weight and leaves the hue to do the pointing.
    """
    bg = rgb(SURFACE_1) if bg is None else bg
    return _solve(c, PALE_TARGET, bg, smax)


def mix(a, b, t):
    return tuple(x + (y - x) * t for x, y in zip(a, b))


def clamp(v, lo=0.0, hi=1.0):
    return lo if v < lo else hi if v > hi else v


def ease_out(t):
    return 1 - (1 - clamp(t)) ** 3


def ease_in_out(t):
    t = clamp(t)
    return 4 * t * t * t if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2


def ease_back(t):
    """Overshoots a little on the way in, so a new dot lands rather than fades."""
    t = clamp(t)
    c = 1.70158 + 1
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2


class Scene:
    """Geometry and drawing for one frame.  Every size is a share of the frame,
    so 480p and 1080p are the same picture at two resolutions."""

    def __init__(self, w, h):
        self.w, self.h = w, h
        self.u_lo, self.u_hi, self.u_zero = axis_domain(MODELS)
        # With a free lane, u_hi runs 0.46 past the priced range; a tick out there
        # would land beside (or past) the $0 lane, so priced ticks stop where the
        # priced range does.
        u_top = self.u_hi - (0.46 if self.u_zero is not None else 0)
        self.ticks = [c for c in COST_TICKS
                      if self.u_lo < -math.log10(c) < u_top]
        s = self.s = h / 720.0           # one scale for type and stroke weights

        self.card = (0.018 * w, 0.022 * h, 0.982 * w, 0.978 * h)
        self.px0 = 0.085 * w             # plot box: room at the left for score ticks
        self.px1 = 0.968 * w
        self.py0 = 0.250 * h   # the arrivals stack under the title above it
        self.py1 = 0.845 * h
        if OPTS["section"]:    # title drawn by the host page, arrivals in one row: the plot moves up
            self.py0 = 0.105 * h
            self.py1 = 0.700 * h
        elif not any(m[4] > 0 for m in MODELS):   # a still board: nothing arrives, no list to leave room for
            self.py0 = 0.165 * h

        self.chip = 13.0 * s             # the square dot, as on the page
        self.ring = 10.8 * s             # the frontier ring around it
        self.front_w = 3.4 * s
        self.halo_w = 15.0 * s
        self.f_title = 31.0 * s
        self.f_sub = 16.5 * s
        self.f_tick = 13.0 * s
        self.f_axis = 19.0 * s
        self.f_cap = 13.5 * s
        self.f_name_on = 16.0 * s        # a name on the frontier
        self.f_name_off = 12.5 * s       # every other name
        self.halo_t = 3.6 * s            # the white stroke behind a name

        self.labels = None               # filled by place_labels()

    # -- axes -----------------------------------------------------------------
    def x_of(self, cost):
        u = self.u_zero if cost <= 0 else -math.log10(cost)
        return self.px0 + (u - self.u_lo) / (self.u_hi - self.u_lo) * (self.px1 - self.px0)

    def y_of(self, score):
        return self.py1 - clamp(score / SCORE_MAX) * (self.py1 - self.py0)

    def name_of(self, label):
        return DISPLAY.get(label, label)

    # -- text helpers ---------------------------------------------------------
    def font(self, cr, size, bold=False):
        cr.select_font_face(
            FONT, cairo.FONT_SLANT_NORMAL,
            cairo.FONT_WEIGHT_BOLD if bold else cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(size)

    def text(self, cr, x, y, s, size, colour, bold=False, anchor="l", alpha=1.0,
             halo=None):
        if alpha <= 0.002:
            return
        self.font(cr, size, bold)
        xb, yb, tw, th, _, _ = cr.text_extents(s)
        if anchor == "c":
            x -= tw / 2 + xb
        elif anchor == "r":
            x -= tw + xb
        cr.move_to(x, y)
        if halo is not None:
            cr.text_path(s)
            cr.set_source_rgba(*halo, alpha)
            cr.set_line_width(self.halo_t)
            cr.set_line_join(cairo.LINE_JOIN_ROUND)
            cr.stroke()
            cr.move_to(x, y)
        cr.set_source_rgba(*colour, alpha)
        cr.show_text(s)

    def measure(self, cr, s, size, bold=False):
        self.font(cr, size, bold)
        xb, yb, tw, th, _, _ = cr.text_extents(s)
        return tw, th

    # -- labels ---------------------------------------------------------------
    def place_labels(self, cr):
        """One position per model, chosen once and kept for the whole video.

        Positions that move between stages read as the board jittering rather
        than as the frontier advancing, so the placement is solved on the full
        15-model board and every name that is ever on the frontier reserves the
        larger box it will need when it gets there.  Names are then free to
        change colour and size in place.

        Every dot is an obstacle as well as every name already placed: a name
        laid over another model's square is worse than a name sitting two lines
        out from its own.
        """
        ever = set()
        for st in range(4):
            for m in frontier([x for x in MODELS if x[4] <= st]):
                ever.add(m[0])

        gap = 5.0 * self.s
        pad = 2.5 * self.s
        r = max(self.ring, self.chip / 2)

        # The dots go in first, so nothing is ever written across one.
        boxes = []
        for label, cost, score, org, stage in MODELS:
            cx, cy = self.x_of(cost), self.y_of(score)
            boxes.append((cx - r, cy - r, cx + r, cy + r))

        # Every frontier the video ever draws, as a thin band of obstacles, so
        # no name is written along the line.  Sampled near a model's own dot it
        # would forbid the slot directly above that dot, which is exactly where
        # a frontier name belongs, so each name discounts the stretch of line
        # running through its own point.
        band = self.front_w * 1.6
        line_pts = []
        for st in range(4):
            pts = [(self.x_of(m[1]), self.y_of(m[2]))
                   for m in frontier([x for x in MODELS if x[4] <= st])]
            for a, b in zip(pts, pts[1:]):
                n = max(2, int(math.hypot(b[0] - a[0], b[1] - a[1]) / (5 * self.s)))
                for i in range(n + 1):
                    f = i / n
                    line_pts.append((a[0] + (b[0] - a[0]) * f,
                                     a[1] + (b[1] - a[1]) * f))
        out = {}

        # Frontier names first and highest score first: the top-left of this
        # plot is where the story is, and those names should get the plain slot
        # directly above the dot whenever it is free.
        order = sorted(MODELS, key=lambda m: (m[0] not in ever, m[0] not in FIRST, -m[2]))
        for label, cost, score, org, stage in order:
            big = label in ever
            name = self.name_of(label)
            size = self.f_name_on if big else self.f_name_off
            tw, th = self.measure(cr, name, size, big)
            # a highlighted name carries a filled box: its slots sit further out by the
            # box's padding, and it collides as the box that will be drawn
            boxed = stage > 0
            gx = gap + (BOX_PX * self.s if boxed else 0)
            gy = gap + (BOX_PY * self.s if boxed else 0)
            cx, cy = self.x_of(cost), self.y_of(score)
            up, dn = r + gy, r + gy + th

            cands = []
            for k in (0, 1, 2, 3):
                lift = k * th * 1.55
                cands += [
                    (0, -(up + lift), "c", "above"),
                    (0, dn + lift, "c", "below"),
                    (r + gx, th * 0.40 - lift, "l", "right"),
                    (-(r + gx), th * 0.40 - lift, "r", "left"),
                    (r + gx, th * 0.40 + lift, "l", "right"),
                    (-(r + gx), th * 0.40 + lift, "r", "left"),
                    (r * 0.6, -(up * 0.82 + lift), "l", "above-right"),
                    (-r * 0.6, -(up * 0.82 + lift), "r", "above-left"),
                    (r * 0.6, dn * 0.90 + lift, "l", "below-right"),
                    (-r * 0.6, dn * 0.90 + lift, "r", "below-left"),
                ]
            want = PREFER.get(label)
            if want:   # a stable sort, so the usual order survives inside each tag
                cands.sort(key=lambda c: want.index(c[3]) if c[3] in want
                           else len(want))

            # First clean slot in preference order wins.  When the board is too
            # crowded for any of them -- which the middle of this plot is, at
            # 480p -- the least-bad one is taken rather than the first, so a
            # name is never simply written across a dot it does not belong to.
            near = r * 2.4
            # a boxed name's own dot is not an obstacle: its slots are laid out to clear
            # it, and the box's safety margin would otherwise graze its own ring
            own = next(i for i, x in enumerate(MODELS) if x[0] == label) if boxed else None
            keep = boxes if own is None else boxes[:own] + boxes[own + 1:]
            hard = keep + [(p[0] - band, p[1] - band, p[0] + band, p[1] + band)
                            for p in line_pts
                            if math.hypot(p[0] - cx, p[1] - cy) > near]
            best, best_cost = None, None
            for i, (dx, dy, anchor, _tag) in enumerate(cands):
                tx, ty = cx + dx, cy + dy
                x0 = tx if anchor == "l" else tx - tw / 2 if anchor == "c" else tx - tw
                if boxed:
                    m_ = 1.5 * self.s
                    box = (x0 - BOX_PX * self.s - m_, ty - 0.80 * size - BOX_PY * self.s - m_,
                           x0 + tw + BOX_PX * self.s + m_, ty + 0.24 * size + BOX_PY * self.s + m_)
                else:
                    box = (x0 - pad, ty - th - pad, x0 + tw + pad, ty + pad)
                cost_ = i * 0.6
                if box[0] < self.card[0] + 0.012 * self.w:
                    cost_ += 400 + (self.card[0] + 0.012 * self.w - box[0])
                if box[2] > self.card[2] - 0.012 * self.w:
                    cost_ += 400 + (box[2] - (self.card[2] - 0.012 * self.w))
                if box[1] < self.py0 - 0.10 * self.h:
                    cost_ += 400 + (self.py0 - 0.10 * self.h - box[1])
                if box[3] > self.py1 + 0.004 * self.h:
                    cost_ += 400 + (box[3] - (self.py1 + 0.004 * self.h))
                over = 0.0
                for b in hard:
                    ow = min(box[2], b[2]) - max(box[0], b[0])
                    oh = min(box[3], b[3]) - max(box[1], b[1])
                    if ow > 0 and oh > 0:
                        over += ow * oh
                cost_ += over * 4.0
                if best_cost is None or cost_ < best_cost:
                    best, best_cost = (dx, dy, anchor, box), cost_
                if over == 0 and cost_ < 400:
                    break
            boxes.append(best[3])
            out[label] = (best[0], best[1], best[2], best[3])
        self.labels = out

    # -- primitives -----------------------------------------------------------
    def rounded(self, cr, x0, y0, x1, y1, r):
        cr.new_sub_path()
        cr.arc(x1 - r, y0 + r, r, -math.pi / 2, 0)
        cr.arc(x1 - r, y1 - r, r, 0, math.pi / 2)
        cr.arc(x0 + r, y1 - r, r, math.pi / 2, math.pi)
        cr.arc(x0 + r, y0 + r, r, math.pi, 3 * math.pi / 2)
        cr.close_path()


# ---- the frontier path, and how it moves ------------------------------------
def path_points(sc, models):
    """The frontier as pixels, left (dearest) to right (cheapest)."""
    return [(sc.x_of(m[1]), sc.y_of(m[2])) for m in frontier(models)]


def eval_at(pts, x):
    """y on a polyline at x, held flat beyond either end."""
    if x <= pts[0][0]:
        return pts[0][1]
    if x >= pts[-1][0]:
        return pts[-1][1]
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        if x0 <= x <= x1:
            return y0 if x1 == x0 else y0 + (y1 - y0) * (x - x0) / (x1 - x0)
    return pts[-1][1]


def morph(a, b, t):
    """`a` lifted and stretched into `b`.

    Both frontiers are single-valued in x, so the move is done in y at fixed x
    and the line lifts rather than sliding sideways -- which is the thing being
    claimed when a model arrives.  The drawn extent travels at the same time,
    so a frontier that reaches further left grows out to the new dot instead of
    appearing under it.  Knots from both paths are kept, so t=0 and t=1 are the
    exact polylines and no corner is rounded off by sampling.
    """
    if t <= 0:
        return list(a)
    if t >= 1:
        return list(b)
    x0 = a[0][0] + (b[0][0] - a[0][0]) * t
    x1 = a[-1][0] + (b[-1][0] - a[-1][0]) * t
    xs = {x0, x1}
    for p in list(a) + list(b):
        if x0 < p[0] < x1:
            xs.add(p[0])
    return [(x, eval_at(a, x) + (eval_at(b, x) - eval_at(a, x)) * t)
            for x in sorted(xs)]


def stroke_path(cr, pts, colour, width, alpha):
    if len(pts) < 2 or alpha <= 0.002:
        return
    cr.move_to(*pts[0])
    for p in pts[1:]:
        cr.line_to(*p)
    cr.set_source_rgba(*colour, alpha)
    cr.set_line_width(width)
    cr.set_line_join(cairo.LINE_JOIN_ROUND)
    cr.set_line_cap(cairo.LINE_CAP_ROUND)
    cr.stroke()


# ---- timeline ---------------------------------------------------------------
INTRO = 1.15          # dots land
DRAW = 1.25           # opening frontier draws itself in
SETTLE = 1.05         # a beat before the first arrival
# Paced for a quick story and a long look at the result (2026-09-23): each arrival
# lands and lifts the frontier in about 1.2 s, a 1 s beat between them, and the
# rest of the time holds the final frontier.
ANNOUNCE = 0.40       # the new name appears in the header
POP = 0.40            # the new dot lands
LIFT = 0.80           # the frontier is pushed up to it
HOLD = 1.00           # a beat before the next arrival
OUTRO = 5.0           # the final frontier, held (standalone; a loop holds for whatever is left)

# Options for the merged figure (bar chart above, this below); set from main().
#   intro:   False -> open on the board with its frontier already drawn
#   section: True  -> white, no card, no logo, headed just "Pareto Frontier"
#   loop:    the story's total length, pauses stretched to fill it
OPTS = {"intro": True, "section": False, "loop": None, "arrivals_x": None}
LEAD = 1.2            # no intro: how long the opening frontier holds before the first arrival


def build_timeline(stages):
    """(events, duration).  One event per arriving model."""
    t = INTRO + DRAW * 0.55 + SETTLE if OPTS["intro"] else LEAD
    hold, outro = HOLD, OUTRO
    events = []
    for st in range(1, stages + 1):
        events.append({"stage": st, "announce": t,
                       "pop": t + ANNOUNCE * 0.45,
                       "lift": t + ANNOUNCE * 0.45 + POP * 0.62})
        t = events[-1]["lift"] + LIFT + hold
    if OPTS["loop"]:
        # a loop: the story as paced, then the final frontier held for the rest
        assert t - hold < OPTS["loop"], "the story does not fit the loop"
        return events, OPTS["loop"]
    return events, t - hold + outro


def state(t, events, stages):
    """What the board looks like at time `t`."""
    intro = ease_out(t / INTRO) if OPTS["intro"] else 1.0
    draw = ease_in_out((t - INTRO * 0.55) / DRAW) if OPTS["intro"] else 1.0

    stage, lift_t = 0, 0.0
    pops = {}
    announce = []
    for e in events:
        pops[e["stage"]] = ease_back((t - e["pop"]) / POP)
        if t >= e["announce"]:
            announce.append((e["stage"], ease_out((t - e["announce"]) / ANNOUNCE)))
        p = clamp((t - e["lift"]) / LIFT)
        if p > 0:
            stage, lift_t = e["stage"], ease_in_out(p)
    return {"intro": intro, "draw": draw, "stage": stage, "lift": lift_t,
            "pops": pops, "announce": announce}


_MARK = None


def mark():
    """The Enactra app icon, read once from the file vendored beside this one."""
    global _MARK
    if _MARK is None:
        here = os.path.dirname(os.path.abspath(__file__))
        _MARK = svgmark.Mark(os.path.join(here, "assets", "enactra-mark.svg"))
    return _MARK


def draw_logo(sc, cr, x_right, y_top):
    """The mark, the wordmark and the url, set into the top right corner.

    The wordmark and the url share a left edge -- the url hangs under the name
    rather than being flushed to the same right margin, which with two strings
    of different lengths reads as a ragged column.
    """
    s = sc.s
    side = 38 * s
    f_name, f_url = 21.0 * s, 15.0 * s
    gap = 12 * s

    nw, nh = sc.measure(cr, "Enactra AI", f_name, True)
    y_name = y_top + nh
    y_url = y_name + f_url * 1.42
    tx = x_right - nw
    my0 = (y_top + y_url) / 2 - side / 2

    mark().draw(cr, tx - gap - side, my0, side)
    sc.text(cr, tx, y_name, "Enactra AI", f_name, rgb(TEXT_PRIMARY), bold=True)
    sc.text(cr, tx, y_url, "enactra.ai", f_url, rgb(TEXT_MUTED))


# The models this animation introduces: their names sit in a filled box of their own
# colour, so the new arrivals read as new at a glance.
HIGHLIGHT = {m[0] for m in MODELS if m[4] > 0}
BOX_PX, BOX_PY = 8.0, 4.5            # box padding around the name, in units (x s)


def name_box(sc, cr, x, y, s, size, bold, anchor):
    """The box a highlighted name sits in: (x0, y0, x1, y1) around its text at (x, y)."""
    sc.font(cr, size, bold)
    xb, yb, tw, th, _, _ = cr.text_extents(s)
    x0 = x if anchor == "l" else x - tw / 2 if anchor == "c" else x - tw
    return (x0 - BOX_PX * sc.s, y - 0.80 * size - BOX_PY * sc.s,
            x0 + tw + BOX_PX * sc.s, y + 0.24 * size + BOX_PY * sc.s)


# ---- one frame --------------------------------------------------------------
def draw_frame(sc, cr, st):
    paper, surf = rgb(PAPER), rgb(SURFACE_1)
    accent = rgb(ACCENT)
    muted, faint, secondary = rgb(TEXT_MUTED), rgb(TEXT_FAINT), rgb(TEXT_SECONDARY)

    x0, y0, x1, y1 = sc.card
    if OPTS["section"]:                # part of a larger white figure: no paper, no card
        cr.set_source_rgb(1, 1, 1)
        cr.paint()
    else:
        cr.set_source_rgb(*paper)
        cr.paint()
        sc.rounded(cr, x0, y0, x1, y1, 16 * sc.s)
        cr.set_source_rgb(*surf)
        cr.fill_preserve()
        cr.set_source_rgb(*rgb(LINE))
        cr.set_line_width(1.2 * sc.s)
        cr.stroke()

    # -- header ------------------------------------------------------------
    hx, ty = x0 + 0.030 * sc.w, y0 + 0.075 * sc.h
    # The name carries the weight; what the chart is showing sits beside it at
    # the same size, unbolded and grey, so it reads as a qualifier rather than
    # as a second title.
    if OPTS["section"]:
        # the host page sets the "Pareto Frontier" title in its own serif; this panel
        # draws nothing there, and lines up with the page's left margin
        hx = 0.0333 * sc.w
    else:
        sc.text(cr, hx, ty, "BuildingBench", sc.f_title, rgb(TEXT_PRIMARY), bold=True)
        tw, _ = sc.measure(cr, "BuildingBench", sc.f_title, True)
        sc.text(cr, hx + tw + sc.f_title * 0.45, ty, "Pareto Frontier",
                sc.f_title, muted)
        draw_logo(sc, cr, x1 - 0.030 * sc.w, y0 + 0.030 * sc.h)

    # The arrivals, listed under the title as they happen -- in section mode as one
    # row, so the header stays one title line and one line of arrivals.
    ry, rx = y0 + 0.113 * sc.h, hx
    if OPTS["section"]:
        # on the title's own baseline (64 px down), starting past the host page's title
        ry, rx = 0.0593 * sc.h, OPTS["arrivals_x"] or hx
    for stage, a in st["announce"]:
        m = next(x for x in MODELS if x[4] == stage)
        label = "+ " + sc.name_of(m[0])
        sc.text(cr, rx, ry, label, sc.f_sub, ink(rgb(COMPANY[m[3]])), bold=True, alpha=a)
        if OPTS["section"]:
            rx += sc.measure(cr, label, sc.f_sub, True)[0] + 30 * sc.s
        else:
            ry += 0.032 * sc.h

    # -- grid --------------------------------------------------------------
    cr.set_line_width(1.1 * sc.s)
    for v in SCORE_TICKS:
        y = sc.y_of(v)
        cr.move_to(sc.px0, y)
        cr.line_to(sc.px1, y)
        cr.set_source_rgb(*rgb(LINE))
        cr.stroke()
        sc.text(cr, sc.px0 - 9 * sc.s, y + sc.f_tick * 0.34, "%.2f" % v,
                sc.f_tick, faint, anchor="r")
    for c in sc.ticks:
        x = sc.x_of(c)
        cr.move_to(x, sc.py0)
        cr.line_to(x, sc.py1)
        cr.set_source_rgb(*rgb(LINE))
        cr.stroke()
        lab = ("$%g" % c) if c >= 1 else ("$%g" % c)
        sc.text(cr, x, sc.py1 + 0.042 * sc.h, lab, sc.f_tick, faint, anchor="c")
    if sc.u_zero is not None:
        # The free lane gets its own tick and a wall, so it never reads as $0.03.
        xz, xw = sc.x_of(0), (sc.x_of(sc.ticks[-1]) + sc.x_of(0)) / 2
        cr.save()
        cr.set_dash([3 * sc.s, 4 * sc.s])
        cr.set_line_width(1.1 * sc.s)
        cr.move_to(xw, sc.py0)
        cr.line_to(xw, sc.py1)
        cr.set_source_rgb(*rgb(LINE_STRONG))
        cr.stroke()
        cr.restore()
        sc.text(cr, xz, sc.py1 + 0.042 * sc.h, "$0", sc.f_tick, faint, anchor="c")

    sc.text(cr, (sc.px0 + sc.px1) / 2, sc.py1 + 0.075 * sc.h,
            "Median Cost per Task (USD)", sc.f_axis, muted, anchor="c")
    cr.save()
    cr.translate(x0 + 0.015 * sc.w, (sc.py0 + sc.py1) / 2)
    cr.rotate(-math.pi / 2)
    sc.text(cr, 0, 0, "Simulation Quality", sc.f_axis, muted, anchor="c")
    cr.restore()

    # -- who is here, and who is on the line -------------------------------
    stage, lift = st["stage"], st["lift"]
    shown = [m for m in MODELS if m[4] == 0 or st["pops"].get(m[4], 0) > 0.001]
    prev_set = [m for m in MODELS if m[4] <= stage - 1] if stage else \
               [m for m in MODELS if m[4] == 0]
    next_set = [m for m in MODELS if m[4] <= stage]
    on_prev = {m[0] for m in frontier(prev_set)}
    on_next = {m[0] for m in frontier(next_set)}

    pts = morph(path_points(sc, prev_set), path_points(sc, next_set), lift)

    # Opening draw-on: the line is revealed left to right, as on the page.
    if st["draw"] < 1:
        k = st["draw"]
        if k <= 0:
            pts = []
        else:
            total = sum(math.dist(a, b) for a, b in zip(pts, pts[1:]))
            want, acc, cut = total * k, 0.0, [pts[0]]
            for a, b in zip(pts, pts[1:]):
                d = math.dist(a, b)
                if acc + d >= want:
                    f = (want - acc) / d if d else 0
                    cut.append((a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f))
                    break
                acc += d
                cut.append(b)
            pts = cut
    stroke_path(cr, pts, accent, sc.halo_w, 0.13)
    stroke_path(cr, pts, accent, sc.front_w, 1.0)

    # -- dots ---------------------------------------------------------------
    def weight(label):
        """0 off the frontier, 1 on it, mid-move in between."""
        a = 1.0 if label in on_prev else 0.0
        b = 1.0 if label in on_next else 0.0
        return a + (b - a) * lift

    def appear(m):
        if m[4] == 0:
            return clamp(st["intro"] * 1.0), clamp(st["intro"])
        p = st["pops"].get(m[4], 0.0)
        return clamp(p), clamp(p / 0.6)

    order = sorted(shown, key=lambda m: weight(m[0]))
    for m in order:
        label, cost, score, org, _ = m
        colour = COMPANY[org]
        grow, alpha = appear(m)
        if alpha <= 0.002:
            continue
        cx, cy = sc.x_of(cost), sc.y_of(score)
        w = weight(label)
        k = 0.55 + 0.45 * grow                      # lands rather than fades
        if w > 0:
            cr.set_source_rgba(*accent, w * alpha)
            cr.set_line_width(1.8 * sc.s)
            cr.arc(cx, cy, sc.ring * k, 0, 2 * math.pi)
            cr.stroke()
        half = sc.chip / 2 * k
        sc.rounded(cr, cx - half, cy - half, cx + half, cy + half, half * 0.46)
        cr.set_source_rgba(*rgb(colour), alpha)
        cr.fill_preserve()
        # A white rim holds the chip off the frontier line; a hairline of its
        # own darkened hue inside that keeps the lighter companies' dots from
        # dissolving into the paper.
        cr.set_source_rgba(*surf, alpha)
        cr.set_line_width(2.4 * sc.s)
        cr.stroke_preserve()
        cr.set_source_rgba(*ink(rgb(colour)), 0.9 * alpha)
        cr.set_line_width(1.0 * sc.s)
        cr.stroke()

    # -- leaders ------------------------------------------------------------
    # A name that had to be pushed clear of the crowd is tied back to its dot
    # with a hairline, so the middle of this plot stays readable when four
    # names are stacked between two dots.
    for m in shown:
        label, cost, score, org, _ = m
        colour = COMPANY[org]
        grow, alpha = appear(m)
        if alpha <= 0.002:
            continue
        dx, dy, anchor, lbox = sc.labels[label]
        cx, cy = sc.x_of(cost), sc.y_of(score)
        nx = min(max(cx, lbox[0]), lbox[2])
        ny = min(max(cy, lbox[1]), lbox[3])
        d = math.hypot(nx - cx, ny - cy)
        r = max(sc.ring, sc.chip / 2)
        if d <= r * 1.55:
            continue
        ux, uy = (nx - cx) / d, (ny - cy) / d
        cr.move_to(cx + ux * r * 0.95, cy + uy * r * 0.95)
        cr.line_to(nx - ux * 1.5 * sc.s, ny - uy * 1.5 * sc.s)
        cr.set_source_rgba(*pale(rgb(colour)), 0.9 * alpha)
        cr.set_line_width(1.15 * sc.s)
        cr.stroke()

    # -- names --------------------------------------------------------------
    # A pale tint of the company hue and small off the line, the company hue
    # (darkened only if too light to read) and larger on it, and
    # the change is continuous so a model joining or leaving the frontier is
    # read as the same dot rather than a new one.
    for m in sorted(shown, key=lambda m: weight(m[0])):
        label, cost, score, org, _ = m
        colour = COMPANY[org]
        grow, alpha = appear(m)
        if alpha <= 0.002:
            continue
        w = weight(label)
        dx, dy, anchor, lbox = sc.labels[label]
        cx, cy = sc.x_of(cost), sc.y_of(score)
        size = sc.f_name_off + (sc.f_name_on - sc.f_name_off) * w
        col = mix(pale(rgb(colour)), ink(rgb(colour)), w)
        if label in HIGHLIGHT:
            # new: white on a box of its own colour (the readable step of it), fading in with the dot
            bx0, by0, bx1, by1 = name_box(sc, cr, cx + dx, cy + dy, sc.name_of(label), size, w > 0.5, anchor)
            sc.rounded(cr, bx0, by0, bx1, by1, 6 * sc.s)
            cr.set_source_rgba(*ink(rgb(colour)), alpha)
            cr.fill()
            sc.text(cr, cx + dx, cy + dy, sc.name_of(label), size, (1, 1, 1),
                    bold=w > 0.5, anchor=anchor, alpha=alpha)
        else:
            sc.text(cr, cx + dx, cy + dy, sc.name_of(label), size, col,
                    bold=w > 0.5, anchor=anchor, alpha=alpha, halo=surf)

    # -- caption ------------------------------------------------------------
    sc.text(cr, hx, (sc.py1 + 0.112 * sc.h) if OPTS["section"] else (y1 - 0.020 * sc.h),
            "Solid: the frontier — nothing cheaper scores higher."
            "  One dot per model, at the effort it was run at."
            + ("  SWE-2's price is the board's estimate of $0.00." if sc.u_zero is not None else ""),
            sc.f_cap, secondary)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("outdir")
    ap.add_argument("--width", type=int, default=854)
    ap.add_argument("--height", type=int, default=480)
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--stages", type=int, default=1)
    ap.add_argument("--no-intro", action="store_true", help="open with the frontier already drawn")
    ap.add_argument("--section", action="store_true", help="white, no card/logo: a panel of a larger figure")
    ap.add_argument("--loop", type=float, default=None, help="stretch the story to exactly this many seconds")
    ap.add_argument("--arrivals-x", type=float, default=None,
                    help="section mode: x (px) where the row of arrivals starts, past the page's title")
    ap.add_argument("--frame", type=float, default=None,
                    help="render only the frame at this time, as still.png")
    a = ap.parse_args()
    OPTS.update(intro=not a.no_intro, section=a.section, loop=a.loop, arrivals_x=a.arrivals_x)

    os.makedirs(a.outdir, exist_ok=True)
    sc = Scene(a.width, a.height)
    events, dur = build_timeline(a.stages)

    surface = cairo.ImageSurface(cairo.FORMAT_RGB24, a.width, a.height)
    cr = cairo.Context(surface)
    sc.place_labels(cr)

    if a.frame is not None:
        draw_frame(sc, cr, state(a.frame, events, a.stages))
        surface.write_to_png(os.path.join(a.outdir, "still.png"))
        print("still at t=%.2f (duration %.2fs)" % (a.frame, dur))
        return

    n = int(round(dur * a.fps))
    for i in range(n):
        cr.save()
        draw_frame(sc, cr, state(i / a.fps, events, a.stages))
        cr.restore()
        surface.write_to_png(os.path.join(a.outdir, "f%05d.png" % i))
    print("%d frames, %.2fs at %dfps -> %s" % (n, dur, a.fps, a.outdir))


if __name__ == "__main__":
    main()
