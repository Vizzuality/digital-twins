"""
This is a boilerplate pipeline 'globe_compact'
generated using Kedro 0.19.6
"""
from kedro.pipeline import Pipeline, node
from kedro.pipeline.modular_pipeline import pipeline

from science.pipelines.animations.nodes import (
    clip_to_boundary,
    diff,
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
    zoom_in_base_pipeline = pipeline(
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
                func=get_min_max, inputs=["clipped", "params:video"], outputs="minmax"
            ),
            node(
                func=split_by_timestep,
                inputs="clipped",
                outputs="parts",
                name="split-by-timestep",
            ),
            node(
                func=parts_to_video,
                inputs=["parts", "params:video", "minmax"],
                outputs="video",
            ),
        ]
    )

    scenarios_base_pipeline = pipeline(
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

    # -------- Globe animations ------------

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

    # -------- Zoom ins -------------
    hurricane_cloud_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        parameters={
            "bbox": "params:hurricane_10km_render_params.bbox",
            "video": "params:hurricane_10km_render_params",
        },
        namespace="cloud_cover_10km",
        tags=["hurricane", "zoomin", "high_resoltuion"],
    )

    amazonia_precipitation_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        parameters={
            "bbox": "params:amazonia_10km_render_params.bbox",
            "video": "params:amazonia_10km_render_params",
        },
        namespace="total_precipitation_10km",
        tags=["amazonia", "zoomin", "high_resoltuion"],
    )

    temp_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        parameters={
            "bbox": "params:temperature_10km_render_params.bbox",
            "video": "params:temperature_10km_render_params",
        },
        namespace="temp_10km",
        tags=["temperature", "zoomin", "high_resolution"],
    )

    sst_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        parameters={
            "bbox": "params:sst_10km_render_params.bbox",
            "video": "params:sst_10km_render_params",
        },
        namespace="sst_10km",
        tags=["sst", "zoomin", "high_resolution"],
    )

    # ------ Scenarios --------------

    plus2k_pipe = pipeline(
        pipe=scenarios_base_pipeline,
        parameters={"video": "params:scenarios"},
        namespace="plus2k",
        tags=["scenarios"],
    )
    hist_pipe = pipeline(
        pipe=scenarios_base_pipeline,
        parameters={"video": "params:scenarios"},
        namespace="hist",
        tags=["scenarios"],
    )

    diff_scenarios = pipeline(
        [
            node(diff, ["plus2k.raw", "hist.raw"], "scenarios_diff"),
            node(split_by_timestep, "scenarios_diff", "diff_parts"),
            node(parts_to_video, ["diff_parts", "params:diff_video"], "diff.video"),
        ],
        tags=["scenarios", "diff"],
    )

    return (
        global_wind_10km_pipe
        + global_wind_100km_pipe
        + hurricane_cloud_pipe
        + amazonia_precipitation_pipe
        + temp_pipe
        + sst_pipe
        + plus2k_pipe
        + hist_pipe
        + diff_scenarios
    )
