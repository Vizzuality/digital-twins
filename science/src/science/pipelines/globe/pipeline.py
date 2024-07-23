from kedro.pipeline import Pipeline, node, pipeline

from science.pipelines.globe.node import georef_nextgems_dataset, split_by_timestep


def create_pipeline(**kwargs) -> Pipeline:
    return pipeline(
        [
            node(
                func=georef_nextgems_dataset,
                inputs="wind-speed-global-100km",
                outputs="wind-speed-global-100km-georef",
            ),
            node(
                func=split_by_timestep,
                inputs="wind-speed-global-100km-georef",
                outputs="wind-speed-global-100km-parts",
            ),
            node(
                func=georef_nextgems_dataset,
                inputs="wind-speed-global-10km",
                outputs="wind-speed-global-10km-georef",
            ),
            node(
                func=split_by_timestep,
                inputs="wind-speed-global-10km-georef",
                outputs="wind-speed-global-10km-parts",
            ),
        ]
    )
