"""
This is a boilerplate pipeline 'globe_compact'
generated using Kedro 0.19.6
"""
from kedro.pipeline import Pipeline, node
from kedro.pipeline.modular_pipeline import pipeline

from science.pipelines.lowvshigh.nodes import (
    clip_to_boundary,
    georef_nextgems_dataset,
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
                name="georeferenciate-dataset",
            ),
            node(
                func=split_by_timestep,
                inputs="georef",
                outputs="parts",
                name="split-by-timestep",
            ),
            node(
                func=parts_to_video,
                inputs=["parts", "params:video"],
                outputs="video",
            ),
        ]
    )
    crop_base_pipeline = pipeline(
        [
            node(
                func=georef_nextgems_dataset,
                inputs="raw",
                outputs="georef",
                name="georeferenciate-dataset",
            ),
            node(
                func=clip_to_boundary,
                inputs=["georef", "params:bbox"],
                outputs="clipped",
                name="clip-dataset",
            ),
            node(
                func=split_by_timestep,
                inputs="clipped",
                outputs="parts",
                name="split-by-timestep",
            ),
            node(
                func=parts_to_video,
                inputs=["parts", "params:video"],
                outputs="video",
            ),
        ]
    )

    global_wind_10km_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="wind_speed_global_10km",
        parameters={"video": "params:global_video"},
        tags=["windspeed", "global", "high_resolution"],
    )

    global_wind_100km_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="wind_speed_global_100km",
        parameters={"video": "params:global_video"},
        tags=["windspeed", "global", "low_resolution"],
    )

    hurricane_cloud_pipe = pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "bbox": "params:hurricane_10km_render_params.bbox",
            "video": "params:hurricane_10km_render_params",
        },
        namespace="cloud_cover_10km",
        tags=["hurricane", "zoomin", "high_resoltuion"],
    )

    amazonia_precipitation_pipe = pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "bbox": "params:amazonia_10km_render_params.bbox",
            "video": "params:amazonia_10km_render_params",
        },
        namespace="total_precipitation_10km",
        tags=["amazonia", "zoomin", "high_resoltuion"],
    )

    temp_pipe = pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "bbox": "params:temperature_10km_render_params.bbox",
            "video": "params:temperature_10km_render_params",
        },
        namespace="temp_10km",
        tags=["pyrines", "zoomin", "high_resolution"],
    )

    sst_pipe = pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "bbox": "params:sst_10km_render_params.bbox",
            "video": "params:sst_10km_render_params",
        },
        namespace="sst_10km",
        tags=["sst", "zoomin", "high_resolution"],
    )

    return (
        global_wind_10km_pipe
        + global_wind_100km_pipe
        + hurricane_cloud_pipe
        + amazonia_precipitation_pipe
        + temp_pipe
        + sst_pipe
    )
