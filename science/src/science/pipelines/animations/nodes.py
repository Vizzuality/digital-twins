"""
This is a boilerplate pipeline 'globe_compact'
generated using Kedro 0.19.6
"""
import logging
from math import isnan
from typing import Any, Callable

import cartopy  # noqa: F401
import cartopy.crs as ccrs
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import xarray as xr
from kedro_datasets.video.video_dataset import SequenceVideo
from PIL import Image
from skimage.transform import rescale

log = logging.getLogger(__name__)


def georef_nextgems_dataset(ds: xr.Dataset) -> xr.Dataset:
    return ds.rio.write_crs(4326).rename(lon="x", lat="y")


def clip_to_boundary(raster: xr.Dataset, bbox: dict[str, float]) -> xr.Dataset:
    """Clip the raster to the boundary area"""
    log.info(f"Clipping to {bbox=}")
    return raster.rio.clip_box(**bbox)


def split_by_timestep(ds: xr.Dataset) -> dict[str, xr.DataArray]:
    return {
        f"{ts.item()}": ds.sel(time=ts).to_dataarray().squeeze(drop=True)
        for ts in ds.coords["time"].data
    }


def parts_to_video(
    parts: dict[str, Callable[[], xr.DataArray]], params: dict[Any:Any]
) -> SequenceVideo:
    cmap_lut = matplotlib.colormaps.get_cmap(params.get("cmap"))(range(256))
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

        # scale the values to 0-255
        if params.get("cmap") == "RdBu_r":
            grey = matplotlib.colors.CenteredNorm(halfrange=10)(grey) * 255
            grey = grey.astype(np.uint8)
        else:
            _min = params.get("vmin") or np.nanmin(grey)
            _max = params.get("vmax") or np.nanmax(grey)
            grey = (grey.astype(float) - _min) * 255 / (_max - _min)

        grey = np.nan_to_num(grey)
        grey = grey.astype(np.uint8)
        result = np.zeros((*grey.shape, 3), dtype=np.uint8)
        np.take(cmap_lut, grey, axis=0, out=result)
        imgs.append(Image.fromarray(result))

    return SequenceVideo(imgs, fps=params.get("fps") or 20, fourcc="h264")


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
