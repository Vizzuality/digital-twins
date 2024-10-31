"""
Global videos pipeline
"""

from kedro.pipeline import Pipeline, node
from kedro.pipeline.modular_pipeline import pipeline

from science.common_nodes import (
    georef_nextgems_dataset,
    get_min_max,
    parts_to_video,
    split_by_timestep,
)


def create_pipeline(**kwargs) -> Pipeline:
    global_base_pipeline = pipeline(
        [
            node(
                func=georef_nextgems_dataset,
                inputs="raw",
                outputs="georef",
            ),
            node(
                func=split_by_timestep,
                inputs="georef",
                outputs="parts",
            ),
            node(
                func=get_min_max,
                inputs=["georef", "params:video"],
                outputs="minmax",
            ),
            node(
                func=parts_to_video,
                inputs=["parts", "params:video", "minmax"],
                outputs="video",
            ),
        ]
    )

    global_wind_10km_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="wind_speed_global_10km",
        parameters={"video": "params:global_video_10"},
        tags=["windspeed", "global", "high_resolution"],
    )

    global_wind_100km_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="wind_speed_global_100km",
        parameters={"video": "params:global_video_100"},
        tags=["windspeed", "global", "low_resolution"],
    )
    global_cloud_cover_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="cloud_cover_100km",
        parameters={"video": "params:cloud_cover_100km_global"},
        tags=["cloudcover", "global", "low_resolution"],
    )
    global_total_precipitation_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="total_precipitation_100km",
        parameters={"video": "params:total_precipitation_100km_global"},
        tags=["precipitation", "global", "low_resolution"],
    )
    global_temperature_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="temperature_100km",
        parameters={"video": "params:temperature_100km_global"},
        tags=["temperature", "global", "low_resolution"],
    )
    global_sst_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="sst_100km",
        parameters={"video": "params:sst_100km_global"},
        tags=["sst", "global", "low_resolution"],
    )

    capacity_factor_100 = pipeline(
        pipe=global_base_pipeline,
        namespace="capacity_factor_100",
        parameters={"video": "params:default"},
        tags=["capacity_factor"],
    )

    capacity_factor_10 = pipeline(
        pipe=global_base_pipeline,
        namespace="capacity_factor_10",
        parameters={"video": "params:default"},
        tags=["capacity_factor"],
    )
    return (
        global_wind_10km_pipe
        + global_wind_100km_pipe
        + global_cloud_cover_pipe
        + global_temperature_pipe
        + global_total_precipitation_pipe
        + global_sst_pipe
        + capacity_factor_100
        + capacity_factor_10
    )
