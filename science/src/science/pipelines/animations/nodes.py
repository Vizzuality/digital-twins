"""
This is a boilerplate pipeline 'globe_compact'
generated using Kedro 0.19.6
"""
import logging
from typing import Any, Callable

import cartopy  # noqa: F401
import cartopy.crs as ccrs
import cmocean
import matplotlib
import matplotlib.colors
import matplotlib.pyplot as plt
import numpy as np
import xarray as xr
from kedro_datasets.video.video_dataset import SequenceVideo
from PIL import Image
from skimage.transform import rescale

log = logging.getLogger(__name__)


# windy rain radar cmap
RAIN_CMAP_IDX = [
    0,
    3,
    8,
    14,
    20,
    26,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    68,
    100,
    101,
    255,
]

RAIN_CMAP_LUT = np.array(
    [
        [230, 230, 230],
        [215, 213, 224],
        [155, 146, 201],
        [67, 138, 176],
        [31, 155, 158],
        [13, 182, 131],
        [117, 208, 89],
        [220, 220, 30],
        [244, 202, 8],
        [245, 168, 24],
        [236, 130, 63],
        [205, 75, 75],
        [182, 45, 100],
        [156, 16, 109],
        [125, 0, 108],
        [92, 0, 100],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
)


RAIN_CMAP = [
    [0, [230, 230, 230, 255]],
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


RAIN_CMAP = np.asarray([x[1] for x in RAIN_CMAP])


def georef_nextgems_dataset(ds: xr.Dataset) -> xr.Dataset:
    return ds.rio.write_crs(4326).rename(lon="x", lat="y")


def clip_to_boundary(raster: xr.Dataset, bbox: dict[str, float]) -> xr.Dataset:
    """Clip the raster to the boundary area"""
    log.info(f"Clipping to {bbox=}")
    return raster.rio.clip_box(**bbox)


def get_min_max(ds: xr.Dataset, params: dict[Any:Any]) -> tuple[float, float]:
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
    params: dict[Any:Any],
    min_max: tuple[float, float] | None = None,
) -> SequenceVideo:
    cmap = matplotlib.colormaps.get(params.get("cmap")) or cmocean.cm.cmap_d.get(
        params.get("cmap")
    )
    if cmap is not None:
        cmap_lut = cmap(range(256))
        cmap_lut = (cmap_lut[..., 0:3] * 255).astype(np.uint8)
    else:
        cmap = matplotlib.colors.LinearSegmentedColormap.from_list(
            "rain", RAIN_CMAP / 255, N=256
        )
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
        grey = rescale(grey, params.get("scale"))
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
        # if cmap_lut is None:  # do some shittery with the custom LUT
        #     idxs = np.searchsorted(RAIN_CMAP_IDX, grey)
        #     np.take(RAIN_CMAP_LUT[..., 0:3], idxs, axis=0, out=result)
        # else:
        np.take(cmap_lut, grey, axis=0, out=result)
        imgs.append(Image.fromarray(result))

    return SequenceVideo(imgs, fps=params.get("fps") or 20)


# super slow
def parts_to_video_matplotlib(
    parts: dict[str, Callable[[], xr.DataArray]], params: dict[Any:Any]
) -> SequenceVideo:
    imgs = []
    for dataset_id, dataset in parts.items():
        fig = plt.figure(figsize=params.get("figsize"))
        ax = fig.add_subplot(1, 1, 1, projection=ccrs.EqualEarth())
        ax.coastlines()
        ax.imshow(
            dataset,
            transform=ccrs.PlateCarree(),
            # extent=extent,
            origin="upper",
            cmap=params.get("cmap"),
        )
        fig.canvas.draw()  # to initialize the renderer and get the img rgba buffer directly from figure
        imgs.append(
            Image.frombytes(
                "RGBa", fig.canvas.get_width_height(), fig.canvas.buffer_rgba()
            )
        )
        plt.close()  # close the figure, I hate matplotlib
    return SequenceVideo(imgs, fps=20)


def diff(a: xr.Dataset, b: xr.Dataset) -> xr.Dataset:
    return a - b
