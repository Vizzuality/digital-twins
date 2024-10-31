from kedro.pipeline import Pipeline, node
from kedro.pipeline.modular_pipeline import pipeline

from science.common_nodes import (
    diff,
    georef_nextgems_dataset,
    get_min_max,
    parts_to_video,
    split_by_timestep,
)


def create_pipeline(**kwargs) -> Pipeline:
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
        europe_plus2k_pipe
        + europe_hist_pipe
        + europe_diff_scenarios
        + iberia_plus2k_pipe
        + iberia_hist_pipe
        + iberia_diff_scenarios
    )
