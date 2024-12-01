from kedro.pipeline import Pipeline, node
from kedro.pipeline.modular_pipeline import pipeline

from science.pipelines.common_nodes import (
    georef_nextgems_dataset,
    get_min_max,
    parts_to_video,
    split_by_timestep,
)
from science.pipelines.scenarios.nodes import plot_array, select_by_date
from science.pipelines.zooms.nodes import clip_to_boundary


def create_pipeline(**kwargs) -> Pipeline:
    scenarios_base_video_pipeline = pipeline(
        [
            node(
                func=georef_nextgems_dataset,
                inputs="raw",
                outputs="georef",
            ),
            node(
                func=clip_to_boundary,
                inputs=["georef", "params:bbox"],
                outputs=["crop", "_"],
            ),
            node(
                func=split_by_timestep,
                inputs="crop",
                outputs="parts",
            ),
            node(
                func=get_min_max,
                inputs=["crop", "params:video"],
                outputs="minmax",
            ),
            node(
                func=parts_to_video,
                inputs=["parts", "params:video", "minmax"],
                outputs="video",
            ),
        ]
    )

    static_image_base_pipeline = pipeline(
        [
            node(
                func=georef_nextgems_dataset,
                inputs="raw",
                outputs="georef",
            ),
            node(
                func=select_by_date,
                inputs=["georef", "params:image"],
                outputs="selection",
            ),
            node(
                func=clip_to_boundary,
                inputs=["selection", "params:bbox"],
                outputs=["crop", "_"],
            ),
            node(
                func=get_min_max,
                inputs=["crop", "params:image"],
                outputs="minmax",
            ),
            node(
                func=plot_array,
                inputs=["crop", "minmax", "params:image"],
                outputs="image",
            ),
        ]
    )

    europe_plus2k_pipe = pipeline(
        pipe=static_image_base_pipeline,
        namespace="europe_plus2k",
        parameters={
            "image": "params:europe_scenario",
            "bbox": "params:europe_scenario.bbox",
        },
        tags=["europe"],
    )
    europe_hist_pipe = pipeline(
        pipe=static_image_base_pipeline,
        namespace="europe_hist",
        parameters={
            "image": "params:europe_scenario",
            "bbox": "params:europe_scenario.bbox",
        },
        tags=["europe"],
    )

    iberia_plus2k_pipe = pipeline(
        pipe=scenarios_base_video_pipeline,
        namespace="iberia_plus2k",
        parameters={"video": "params:scenarios"},
        tags=["iberia"],
    )

    iberia_hist_pipe = pipeline(
        pipe=scenarios_base_video_pipeline,
        namespace="iberia_hist",
        parameters={"video": "params:scenarios"},
        tags=["iberia"],
    )

    observations_pipe = pipeline(
        pipe=scenarios_base_video_pipeline,
        namespace="observations",
        parameters={"video": "params:observations", "bbox": "params:observations.bbox"},
        tags=["obs"],
    )
    return (
        europe_plus2k_pipe
        + europe_hist_pipe
        + iberia_plus2k_pipe
        + iberia_hist_pipe
        + observations_pipe
    )
