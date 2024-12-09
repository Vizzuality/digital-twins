import io
from typing import Any

import matplotlib
import numpy as np
import xarray as xr
from matplotlib import pyplot as plt
from PIL import Image
from skimage.transform import rescale

from science.pipelines.common_nodes import get_cmap_lut


def select_by_date(da: xr.Dataset, params: dict) -> xr.DataArray:
    return da.sel(time=params["date"]).max(dim="time").to_dataarray().squeeze()


def array_to_image(da: xr.DataArray, min_max: tuple[int, int], params: dict[str, Any]):
    cmap_name = params["cmap"]
    cmap_lut = get_cmap_lut(cmap_name)
    grey = np.flipud(da.values)
    if params["scale"] and params["scale"] > 1:
        grey = rescale(grey, params["scale"], order=3)
    vmin = min_max[0] if min_max is not None else np.nanmin(grey)
    vmax = min_max[1] if min_max is not None else np.nanmax(grey)
    norm = matplotlib.colors.Normalize(vmin=vmin, vmax=vmax, clip=True)
    grey = (norm(grey) * 255).astype(np.uint8)
    img_array = np.zeros((*grey.shape, 3), dtype=np.uint8)
    np.take(cmap_lut, grey, axis=0, out=img_array)
    return Image.fromarray(img_array)


def plot_array(da: xr.DataArray, min_max: tuple[int, int], params: dict[str, Any]):
    cmap_name = params["cmap"]
    values = np.flipud(da.values)
    if params["scale"] and params["scale"] > 1:
        values = rescale(values, params["scale"], order=3)
    fig, ax = plt.subplots()
    ax.imshow(values, cmap=cmap_name, vmin=min_max[0], vmax=min_max[1])
    ax.contour(
        values, levels=[308.15], linestyles="-", linewidths=0.3, colors="k"
    )  # contour at 35°C
    ax.contour(
        values, levels=[315.15], linestyles="-.", linewidths=0.3, colors="k"
    )  # contour at 42°C
    ax.set_axis_off()
    buf = io.BytesIO()
    fig.savefig(buf, dpi=300, pad_inches=0, bbox_inches="tight")
    buf.seek(0)
    return Image.open(buf)
