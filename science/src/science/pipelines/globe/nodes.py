"""
This is a boilerplate pipeline 'globe_compact'
generated using Kedro 0.19.6
"""
import logging
from typing import Callable

import xarray as xr

log = logging.getLogger(__name__)


def georef_nextgems_dataset(ds: xr.Dataset) -> xr.Dataset:
    return ds.rio.write_crs(4326).rename(lon="x", lat="y")


def clip_to_boundary(
    raster: xr.Dataset, boundary_params: dict[str, float]
) -> xr.Dataset:
    """Clip the raster to the boundary area.
    Args:
        raster: Tuple of (data, metadata).
        boundary_params: Dict of boundary parameters. Minx, miny, maxx, maxy.
    Returns:
        Raster with the boundary area clipped.
    """
    log.info(f"Clipping to {boundary_params=}")
    return raster.rio.clip_box(**boundary_params)


def split_by_timestep(ds: xr.Dataset) -> dict[str, Callable[[], xr.DataArray]]:
    return {
        f"{ts.item()}": ds.sel(time=ts).to_dataarray().squeeze(drop=True)
        for ts in ds.coords["time"].data
    }
