"""Generate registered balloon inflation frames from one canonical image."""

from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/images/balloon-canonical.png"
DEFLATED_SOURCE = ROOT / "assets/images/balloon-inflation-sprite.png"
OUTPUT_DIR = ROOT / "assets/images"

CANVAS_WIDTH = 384
CANVAS_HEIGHT = 512
CENTER_X = 160.0
BODY_TOP = 20.0
KNOT_Y = 323.0
STATIC_START_Y = 316
DEFLATED_OFFSET_X = -60

# Breath one is intentionally restrained. Later steps add progressively more air.
AIR_LEVELS = (0.0, 0.08, 0.17, 0.28, 0.41, 0.55, 0.70, 0.85, 1.0)
CANONICAL_BLEND = (0.0, 0.0, 0.12, 0.32, 0.58, 0.82, 1.0, 1.0, 1.0)


def bilinear_sample(source: np.ndarray, x_map: np.ndarray, y_map: np.ndarray) -> np.ndarray:
    height, width = source.shape[:2]
    valid = (x_map >= 0) & (x_map <= width - 1) & (y_map >= 0) & (y_map <= height - 1)

    x0 = np.floor(np.clip(x_map, 0, width - 1)).astype(np.int32)
    y0 = np.floor(np.clip(y_map, 0, height - 1)).astype(np.int32)
    x1 = np.minimum(x0 + 1, width - 1)
    y1 = np.minimum(y0 + 1, height - 1)

    dx = (x_map - x0)[..., None]
    dy = (y_map - y0)[..., None]
    top = source[y0, x0] * (1.0 - dx) + source[y0, x1] * dx
    bottom = source[y1, x0] * (1.0 - dx) + source[y1, x1] * dx
    sampled = top * (1.0 - dy) + bottom * dy
    sampled[~valid] = 0
    return sampled


def row_spans(alpha: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    left = np.full(alpha.shape[0], np.nan, dtype=np.float32)
    right = np.full(alpha.shape[0], np.nan, dtype=np.float32)
    for y in range(alpha.shape[0]):
        columns = np.flatnonzero(alpha[y] > 20)
        if columns.size:
            left[y] = columns[0]
            right[y] = columns[-1]
    return left, right


def warp_deflated_body(deflated: np.ndarray, target: np.ndarray) -> np.ndarray:
    source_alpha = deflated[..., 3].copy()
    target_alpha = target[..., 3].copy()
    source_alpha[STATIC_START_Y:] = 0
    target_alpha[STATIC_START_Y:] = 0

    source_left, source_right = row_spans(source_alpha)
    target_left, target_right = row_spans(target_alpha)
    source_rows = np.flatnonzero(~np.isnan(source_left))
    target_rows = np.flatnonzero(~np.isnan(target_left))
    if not source_rows.size or not target_rows.size:
        raise ValueError("Balloon body is missing from a source frame")

    source_top, source_bottom = int(source_rows[0]), int(source_rows[-1])
    target_top, target_bottom = int(target_rows[0]), int(target_rows[-1])
    x_map = np.full((CANVAS_HEIGHT, CANVAS_WIDTH), -1.0, dtype=np.float32)
    y_map = np.full((CANVAS_HEIGHT, CANVAS_WIDTH), -1.0, dtype=np.float32)

    for target_y in range(target_top, target_bottom + 1):
        vertical = (target_y - target_top) / max(target_bottom - target_top, 1)
        source_y = source_top + vertical * (source_bottom - source_top)
        source_row = int(round(source_y))
        if np.isnan(source_left[source_row]) or np.isnan(target_left[target_y]):
            continue

        target_width = max(target_right[target_y] - target_left[target_y], 1.0)
        source_width = source_right[source_row] - source_left[source_row]
        x_map[target_y] = source_left[source_row] + (
            (np.arange(CANVAS_WIDTH, dtype=np.float32) - target_left[target_y]) / target_width
        ) * source_width
        y_map[target_y] = source_y

    warped = bilinear_sample(deflated, x_map, y_map)
    warped[..., 3] = target_alpha
    warped[target_alpha == 0] = 0
    return warped


def use_deflated_static(body: np.ndarray, deflated: np.ndarray) -> np.ndarray:
    frame = body.copy()
    frame[STATIC_START_Y:] = deflated[STATIC_START_Y:]
    return frame


def surface_blend(deflated: np.ndarray, canonical: np.ndarray, amount: float) -> np.ndarray:
    frame = deflated * (1.0 - amount) + canonical * amount
    frame[..., 3] = canonical[..., 3]
    return frame


def generate_frame(source: np.ndarray, air_level: float) -> np.ndarray:
    if air_level == 1.0:
        return source.astype(np.uint8).copy()

    progress = air_level ** 0.85
    height_scale = 0.86 + 0.14 * progress
    base_width_scale = 0.56 + 0.44 * progress

    y_grid, x_grid = np.mgrid[0:CANVAS_HEIGHT, 0:CANVAS_WIDTH].astype(np.float32)
    source_y = KNOT_Y - (KNOT_Y - y_grid) / height_scale
    vertical = np.clip((KNOT_Y - source_y) / (KNOT_Y - BODY_TOP), 0.0, 1.0)

    # Fixed-phase compression creates folds that relax as air enters. The centerline
    # and knot never move, so every frame remains registered to the same balloon.
    fold_amount = (1.0 - progress) * 0.105
    row_scale = base_width_scale * (
        1.0
        + fold_amount * np.sin(vertical * np.pi * 3.2 + 0.35)
        + fold_amount * 0.45 * np.sin(vertical * np.pi * 7.0 + 1.1)
    )
    source_x = CENTER_X + (x_grid - CENTER_X) / row_scale

    frame = bilinear_sample(source, source_x, source_y)
    body_region = (y_grid < KNOT_Y) & (source_y >= BODY_TOP)
    frame[~body_region] = 0

    # The nozzle, knot, and string are copied from the canonical image unchanged.
    # A short overlap hides the body/nozzle seam without shifting the anchor.
    static = source.copy()
    static[:STATIC_START_Y] = 0
    static_alpha = static[..., 3:4] / 255.0
    frame = static + frame * (1.0 - static_alpha)
    return np.clip(frame, 0, 255).astype(np.uint8)


def main() -> None:
    source_image = Image.open(SOURCE).convert("RGBA")
    if source_image.size != (CANVAS_WIDTH, CANVAS_HEIGHT):
        raise ValueError(f"Expected {CANVAS_WIDTH}x{CANVAS_HEIGHT}, got {source_image.size}")

    deflated_sheet = Image.open(DEFLATED_SOURCE).convert("RGBA")
    deflated = deflated_sheet.crop((0, 0, CANVAS_WIDTH, CANVAS_HEIGHT))
    registered_deflated = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT))
    registered_deflated.alpha_composite(deflated, dest=(DEFLATED_OFFSET_X, 0))

    source = np.asarray(source_image, dtype=np.float32)
    deflated_source = np.asarray(registered_deflated, dtype=np.float32)
    for index, (air_level, blend) in enumerate(zip(AIR_LEVELS, CANONICAL_BLEND), start=1):
        output = OUTPUT_DIR / f"balloon-stage-{index}.png"
        canonical = generate_frame(source, air_level)
        deflated_body = warp_deflated_body(deflated_source, canonical)
        frame = surface_blend(deflated_body, canonical, blend)
        frame = use_deflated_static(frame, deflated_source)
        Image.fromarray(np.clip(frame, 0, 255).astype(np.uint8), "RGBA").save(output)


if __name__ == "__main__":
    main()
