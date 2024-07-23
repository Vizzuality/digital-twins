from typing import Callable

import xarray as xr


def georef_nextgems_dataset(ds: xr.Dataset) -> xr.Dataset:
    return ds.rio.write_crs(4326).rename(lon="x", lat="y")


def split_by_timestep(ds: xr.Dataset) -> dict[str, Callable[[], xr.DataArray]]:
    return {
        f"{ts.item()}": lambda: ds.sel(time=ts).to_dataarray().squeeze(drop=True)
        for ts in ds.coords["time"].data
    }
