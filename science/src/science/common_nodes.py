"""
This is a boilerplate pipeline 'globe_compact'
generated using Kedro 0.19.6
"""

import logging
from typing import Any, Callable

import cartopy  # noqa: F401
import cmocean
import matplotlib
import matplotlib.colors
import numpy as np
import xarray as xr
from kedro_datasets.video.video_dataset import SequenceVideo
from matplotlib.colors import LinearSegmentedColormap
from PIL import Image
from skimage.transform import rescale

log = logging.getLogger(__name__)


def register_cmaps():
    GLOBAL_WIND_ATLAS_CMAP = [
        (153, 51, 102),
        (165, 47, 90),
        (176, 43, 77),
        (188, 39, 65),
        (199, 35, 52),
        (211, 31, 40),
        (226, 63, 40),
        (232, 78, 41),
        (238, 92, 41),
        (245, 106, 41),
        (246, 137, 53),
        (247, 160, 63),
        (248, 184, 73),
        (249, 208, 82),
        (250, 232, 92),
        (212, 221, 87),
        (178, 211, 83),
        (145, 202, 79),
        (111, 192, 75),
        (73, 181, 70),
        (73, 173, 99),
        (73, 165, 124),
        (72, 158, 148),
        (72, 150, 173),
        (72, 142, 202),
        (90, 158, 212),
        (106, 173, 220),
        (123, 187, 229),
        (141, 204, 238),
        (178, 226, 249),
        (197, 233, 250),
    ]
    normalized_colors = np.array(GLOBAL_WIND_ATLAS_CMAP) / 255.0
    cmap = LinearSegmentedColormap.from_list("GWA", normalized_colors)
    cmap = cmap.reversed()
    matplotlib.colormaps.register(cmap, force=True)
    log.info(f"Registered colormap '{cmap.name}'")


def georef_nextgems_dataset(ds: xr.Dataset) -> xr.Dataset:
    return ds.rio.write_crs(4326).rename(lon="x", lat="y")


def clip_to_boundary(raster: xr.Dataset, bbox: dict[str, float]) -> xr.Dataset:
    """Clip the raster to the boundary area"""
    log.info(f"Clipping to {bbox=}")
    return raster.rio.clip_box(**bbox)


def get_min_max(ds: xr.Dataset, params: dict[str, Any]) -> tuple[float, float]:
    _min = params.get("vmin") or float(ds.min().to_array().values[0])
    _max = params.get("vmax") or float(ds.max().to_array().values[0])
    log.info(f"Min max is: {_min=}, {_max=}")
    return _min, _max


def split_by_timestep(ds: xr.Dataset) -> dict[str, xr.DataArray]:
    return {
        f"{ts.item()}": ds.sel(time=ts).to_dataarray().squeeze(drop=True)
        for ts in ds.coords["time"].data
    }


def parts_to_video(
    parts: dict[str, Callable[[], xr.DataArray]],
    params: dict[str, Any],
    min_max: tuple[float, float] | None = None,
) -> SequenceVideo:
    register_cmaps()
    cmap_name = params["cmap"]
    cmap = matplotlib.colormaps.get(cmap_name) or cmocean.cm.cmap_d.get(cmap_name)
    if cmap is None:
        raise ValueError(f"cmap '{cmap_name}' not found")
    cmap_lut = cmap(range(256))
    cmap_lut = (cmap_lut[..., 0:3] * 255).astype(np.uint8)
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
        # scale the values to 0-255
        if params.get("cmap") == "RdBu_r":
            grey = (
                matplotlib.colors.TwoSlopeNorm(vmin=_min, vcenter=0, vmax=_max)(grey)
                * 255
            )
            grey = np.clip(grey, a_min=0, a_max=255)
            grey = grey.astype(np.uint8)
        else:
            grey = (grey.astype(float) - _min) * 255 / (_max - _min)
            grey = np.clip(grey, a_min=0, a_max=255)

        grey = np.nan_to_num(grey)
        grey = grey.astype(np.uint8)
        result = np.zeros((*grey.shape, 3), dtype=np.uint8)
        np.take(cmap_lut, grey, axis=0, out=result)
        imgs.append(Image.fromarray(result))

    return SequenceVideo(imgs, fps=params.get("fps") or 20)


def diff(a: xr.Dataset, b: xr.Dataset) -> xr.Dataset:
    return a - b
