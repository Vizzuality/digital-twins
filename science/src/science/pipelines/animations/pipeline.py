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

    zoom_in_base_pipeline = pipeline(
        [
            node(
                func=georef_nextgems_dataset,
                inputs="raw",
                outputs="georef",
            ),
            node(
                func=clip_to_boundary,
                inputs=["georef", "params:bbox"],
                outputs="clipped",
            ),
            node(
                func=get_min_max,
                inputs=["clipped", "params:video"],
                outputs="minmax",
            ),
            node(
                func=split_by_timestep,
                inputs="clipped",
                outputs="local_parts",
            ),
            node(
                func=split_by_timestep,
                inputs="georef",
                outputs="global_parts",
            ),
            node(
                func=parts_to_video,
                inputs=["local_parts", "params:video", "minmax"],
                outputs="video",
            ),
            node(
                func=parts_to_video,
                inputs=["global_parts", "params:video", "minmax"],
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
        namespace="cloud_cover_10km",
        parameters={
            "bbox": "params:hurricane_10km_render_params.bbox",
            "video": "params:hurricane_10km_render_params",
        },
        tags=["hurricane", "zoomin", "high_resoltuion"],
    )

    amazonia_precipitation_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        namespace="total_precipitation_10km",
        parameters={
            "bbox": "params:amazonia_10km_render_params.bbox",
            "video": "params:amazonia_10km_render_params",
        },
        tags=["amazonia", "zoomin", "high_resoltuion"],
    )

    temp_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        namespace="temp_10km",
        parameters={
            "bbox": "params:temperature_10km_render_params.bbox",
            "video": "params:temperature_10km_render_params",
        },
        tags=["temperature", "zoomin", "high_resolution"],
    )

    sst_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        namespace="sst_10km",
        parameters={
            "bbox": "params:sst_10km_render_params.bbox",
            "video": "params:sst_10km_render_params",
        },
        tags=["sst", "zoomin", "high_resolution"],
    )

    # ------ Scenarios --------------

    europe_plus2k_pipe = pipeline(
        pipe=scenarios_base_pipeline,
        namespace="europe_plus2k",
        parameters={"video": "params:scenarios"},
        tags=["scenarios"],
    )
    europe_hist_pipe = pipeline(
        pipe=scenarios_base_pipeline,
        namespace="europe_hist",
        parameters={"video": "params:scenarios"},
        tags=["scenarios"],
    )

    europe_diff_scenarios = pipeline(
        [
            node(
                diff, ["europe_plus2k.raw", "europe_hist.raw"], "europe_scenarios_diff"
            ),
            node(split_by_timestep, "europe_scenarios_diff", "europe_diff_parts"),
            node(
                func=get_min_max,
                inputs=["europe_scenarios_diff", "params:diff_video"],
                outputs="minmax",
            ),
            node(
                parts_to_video,
                ["europe_diff_parts", "params:diff_video", "minmax"],
                "europe_diff.video",
            ),
        ],
        tags=["scenarios", "diff", "europe"],
    )

    iberia_plus2k_pipe = pipeline(
        pipe=scenarios_base_pipeline,
        namespace="iberia_plus2k",
        parameters={"video": "params:scenarios"},
        tags=["scenarios", "iberia"],
    )
    iberia_hist_pipe = pipeline(
        pipe=scenarios_base_pipeline,
        namespace="iberia_hist",
        parameters={"video": "params:scenarios"},
        tags=["scenarios", "iberia"],
    )

    iberia_diff_scenarios = pipeline(
        [
            node(
                diff, ["iberia_plus2k.raw", "iberia_hist.raw"], "iberia_scenarios_diff"
            ),
            node(split_by_timestep, "iberia_scenarios_diff", "iberia_diff_parts"),
            node(
                parts_to_video,
                ["iberia_diff_parts", "params:diff_video"],
                "iberia_diff.video",
            ),
        ],
        tags=["scenarios", "diff", "iberia"],
    )

    return (
        global_wind_10km_pipe
        + global_wind_100km_pipe
        + hurricane_cloud_pipe
        + amazonia_precipitation_pipe
        + temp_pipe
        + sst_pipe
        + europe_plus2k_pipe
        + europe_hist_pipe
        + europe_diff_scenarios
        + iberia_plus2k_pipe
        + iberia_hist_pipe
        + iberia_diff_scenarios
    )
