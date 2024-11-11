import logging
from io import BytesIO
from typing import Any, Callable

import httpx
import matplotlib
import matplotlib.colors
import numpy as np
import xarray as xr
from kedro_datasets.video.video_dataset import SequenceVideo
from PIL import Image
from skimage.transform import rescale

log = logging.getLogger(__name__)

RAIN_CMAP_RAW = [
    [0, [40, 16, 158, 0]],
    [3, [40, 16, 158, 20]],
    [8, [40, 16, 158, 100]],
    [14, [0, 101, 154, 180]],
    [20, [0, 144, 147, 220]],
    [26, [0, 179, 125, 240]],
    [32, [117, 208, 89, 255]],
    [36, [220, 220, 30, 255]],
    [40, [244, 202, 8, 255]],
    [44, [245, 168, 24, 255]],
    [48, [236, 130, 63, 255]],
    [52, [205, 75, 75, 255]],
    [56, [182, 45, 100, 255]],
    [60, [156, 16, 109, 255]],
    [64, [125, 0, 108, 255]],
    [68, [92, 0, 100, 255]],
    [100, [0, 0, 0, 255]],
    [101, [0, 0, 0, 0]],
    [255, [0, 0, 0, 0]],
]


RAIN_CMAP = np.asarray([x[1] for x in RAIN_CMAP_RAW])
RAIN_CMAP_IDX = np.asarray([x[0] for x in RAIN_CMAP_RAW])


def clip_to_boundary(
    raster: xr.Dataset, bbox: dict[str, float] | None = None
) -> tuple[xr.Dataset, tuple[int, int]]:
    """Clip the raster to the boundary area"""
    log.info(f"Clipping to {bbox=}")
    if not bbox:
        return raster, (raster.sizes["x"], raster.sizes["y"])
    clipped_raster = raster.rio.clip_box(**bbox)
    return clipped_raster, (clipped_raster.sizes["x"], clipped_raster.sizes["y"])


def get_basemap(
    credentials: dict, shape: tuple[int, int], params: dict[str, Any]
) -> Image.Image:
    bbox_flat = [v for _, v in params["bbox"].items()]
    w = shape[0] * params["scale"]
    h = shape[1] * params["scale"]
    url = f"https://api.mapbox.com/styles/v1/bielstela/{params['basemap_style']}/static/{bbox_flat}/{w}x{h}"
    log.info(f"Downloading basemap from: {url}")
    res = httpx.get(url, params={"access_token": credentials["token"]})
    assert res.status_code == httpx.codes(
        200
    ), f"Failed request with {res.status_code}, {res.content}"
    return Image.open(BytesIO(res.content)).convert("RGB")


def parts_to_video_with_basemap(
    parts: dict[str, Callable[[], xr.DataArray]],
    params: dict[str, Any],
    basemap: Image.Image,
    min_max: tuple[float, float] | None = None,
) -> SequenceVideo:
    cmap = matplotlib.colors.LinearSegmentedColormap.from_list(
        "rain", RAIN_CMAP / 255, N=256
    )
    cmap_lut = cmap(range(256))
    cmap_lut = (cmap_lut * 255).astype(np.uint8)
    imgs = []
    for _, dataset in parts.items():
        if callable(dataset):
            # This comes from a partition dataset which is a callable only if reading files.
            # When it is a memoryfile it is not a callable
            dataset = dataset()[0]  # noqa: PLW2901
        # flip array to make the 0,0 origin of the image at the upper corner for PIL
        grey = np.flipud(dataset.values)
        scale_factor = params.get("scale")
        if scale_factor and scale_factor > 1:
            grey = rescale(grey, scale_factor)

        _min = min_max[0] if min_max is not None else np.nanmin(grey)
        _max = min_max[1] if min_max is not None else np.nanmax(grey)

        # # scale the values to 0-255
        # grey = (grey.astype(float) - _min) * 255 / (_max - _min)
        # grey = np.clip(grey, a_min=0, a_max=255)
        norm = matplotlib.colors.PowerNorm(0.7, _min, _max, clip=True)
        grey = (norm(grey) * 255).astype(np.uint8)
        result = np.zeros((*grey.shape, 4), dtype=np.uint8)
        np.take(cmap_lut, grey, axis=0, out=result)
        foreground_image = Image.fromarray(result, mode="RGBA")
        background_image = basemap.copy().convert("RGBA")
        imgs.append(
            Image.alpha_composite(background_image, foreground_image).convert("RGB")
        )
    log.info(f"Videos has {len(imgs)} frames")
    return SequenceVideo(imgs, fps=24)
