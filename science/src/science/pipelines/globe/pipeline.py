"""
This is a boilerplate pipeline 'globe_compact'
generated using Kedro 0.19.6
"""
from pydoc import cli

from kedro.pipeline import Pipeline, node
from kedro.pipeline.modular_pipeline import pipeline

from science.pipelines.globe.nodes import (
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
        tags=["windspeed", "global", "high_resolution"],
    )

    global_wind_100km_pipe = pipeline(
        pipe=global_base_pipeline,
        namespace="wind_speed_global_100km",
        tags=["windspeed", "global", "low_resolution"],
    )

    hurricane_precipitation_pipe = pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "params:bbox": "params:hurricane_video.bbox",
            "params:video": "params:hurricane_video",
        },
        namespace="total_precipitation_10km",
        tags=["hurricane", "zoomin", "high_resoltuion"],
    ) + pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "params:bbox": "params:hurricane_video.bbox",
            "params:video": "params:hurricane_video",
        },
        namespace="total_precipitation_100km",
        tags=["hurricane", "zoomin", "low_resoltuion"],
    )

    amazonia_cloud_cover_pipe = pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "params:bbox": "params:amazonia_video.bbox",
            "params:video": "params:amazonia_video",
        },
        namespace="cloud_cover_10km",
        tags=["amazonia", "zoomin", "high_resoltuion"],
    ) + pipeline(
        pipe=crop_base_pipeline,
        parameters={
            "params:bbox": "params:amazonia_video.bbox",
            "params:video": "params:amazonia_video",
        },
        namespace="cloud_cover_100km",
        tags=["amazonia", "zoomin", "low_resoltuion"],
    )

    return (
        global_wind_10km_pipe
        + global_wind_100km_pipe
        + hurricane_precipitation_pipe
        + amazonia_cloud_cover_pipe
    )
