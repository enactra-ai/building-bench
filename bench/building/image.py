"""Images as arrays: what ``./preview`` reads the photographs with and draws on.

Float RGB in [0, 1] in and out; outlines are a binary mask's edges, dilated so
they read at a glance, laid over the photograph with ``overlay``.
"""
from __future__ import annotations

import math
import os
from pathlib import Path

import numpy as np
from PIL import Image


def read(path: str | Path) -> np.ndarray:
    """An image as float32 RGB in [0, 1], with any alpha dropped."""
    im = Image.open(str(path)).convert("RGB")
    return np.asarray(im, dtype=np.float32) / 255.0


def write(path: str | Path, rgb: np.ndarray) -> Path:
    """Atomically: temp file beside the target, then rename over it.

    A reader never sees a half-written image: a truncated PNG is not a slightly
    wrong picture, it is an exception in whatever opens it next.
    """
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    arr = np.clip(np.asarray(rgb), 0.0, 1.0)
    if arr.ndim == 2:
        arr = np.repeat(arr[..., None], 3, axis=2)
    # Same directory, so the rename is on one filesystem and cannot fall back
    # to a copy -- which would be the non-atomic write this exists to avoid.
    #
    # The temp name must NOT end in the image suffix: a killed process leaves
    # the temp behind, and `Path.glob("*.png")` matches dotfiles. A partial
    # file that nothing can mistake for a finished one is the point of a temp.
    tmp = path.with_name(f".{path.name}.{os.getpid()}.partial")
    try:
        # The format comes from the TARGET's suffix, because the temp has none
        # PIL knows -- deliberately, so nothing can mistake it for an image --
        # and PIL otherwise infers the format from the name it is saving to.
        Image.fromarray((arr * 255.0 + 0.5).astype(np.uint8)).save(
            str(tmp), format=Image.registered_extensions()[path.suffix.lower()])
        os.replace(tmp, path)
    except BaseException:
        tmp.unlink(missing_ok=True)
        raise
    return path


def binary(alpha: np.ndarray, threshold: float = 0.5) -> np.ndarray:
    return alpha >= threshold


def edges(mask: np.ndarray) -> np.ndarray:
    out = np.zeros_like(mask)
    out[:-1, :] |= mask[:-1, :] != mask[1:, :]
    out[1:, :] |= mask[:-1, :] != mask[1:, :]
    out[:, :-1] |= mask[:, :-1] != mask[:, 1:]
    out[:, 1:] |= mask[:, :-1] != mask[:, 1:]
    return out & mask


def dilate(mask: np.ndarray, radius: int) -> np.ndarray:
    out = mask.copy()
    for _ in range(max(0, radius)):
        grown = out.copy()
        grown[:-1, :] |= out[1:, :]
        grown[1:, :] |= out[:-1, :]
        grown[:, :-1] |= out[:, 1:]
        grown[:, 1:] |= out[:, :-1]
        out = grown
    return out


def overlay(base: np.ndarray, mask: np.ndarray, colour=(1.0, 0.2, 0.2),
            strength: float = 0.45) -> np.ndarray:
    out = np.asarray(base, np.float32).copy()
    tint = np.asarray(colour, np.float32)
    m = np.asarray(mask, bool)
    out[m] = out[m] * (1 - strength) + tint * strength
    return out


