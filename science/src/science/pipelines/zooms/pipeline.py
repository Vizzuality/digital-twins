from kedro.pipeline import Pipeline, node
from kedro.pipeline.modular_pipeline import pipeline

from science.common_nodes import (
    georef_nextgems_dataset,
    get_min_max,
    parts_to_video,
    split_by_timestep,
)
from science.pipelines.zooms.nodes import (
    clip_to_boundary,
    get_basemap,
    parts_to_video_with_basemap,
)


def create_pipeline(**kwargs) -> Pipeline:
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
                outputs=["clipped", "shape"],
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
                func=parts_to_video,
                inputs=["local_parts", "params:video", "minmax"],
                outputs="video",
            ),
        ]
    )

    amazonia_precipitation_pipe = pipeline(
        [
            node(
                func=georef_nextgems_dataset,
                inputs="total_precipitation_10km.raw",
                outputs="total_precipitation_10km.georef",
            ),
            node(
                func=clip_to_boundary,
                inputs=[
                    "total_precipitation_10km.georef",
                    "params:total_precipitation_10km.bbox",
                ],
                outputs=[
                    "total_precipitation_10km.clipped",
                    "total_precipitation_10km.shape",
                ],
            ),
            node(
                func=get_basemap,
                inputs=[
                    "total_precipitation_10km.mapbox_credentials",
                    "total_precipitation_10km.shape",
                    "params:total_precipitation_10km",
                ],
                outputs="total_precipitation_10km.basemap",
            ),
            node(
                func=get_min_max,
                inputs=[
                    "total_precipitation_10km.clipped",
                    "params:total_precipitation_10km",
                ],
                outputs="total_precipitation_10km.minmax",
            ),
            node(
                func=split_by_timestep,
                inputs="total_precipitation_10km.clipped",
                outputs="total_precipitation_10km.local_parts",
            ),
            node(
                func=parts_to_video_with_basemap,
                inputs=[
                    "total_precipitation_10km.local_parts",
                    "params:total_precipitation_10km",
                    "total_precipitation_10km.basemap",
                    "total_precipitation_10km.minmax",
                ],
                outputs="total_precipitation_10km.video",
            ),
        ],
        tags=["precipitation", "zoomin", "high_resoltuion"],
    )

    hurricane_cloud_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        namespace="cloud_cover_10km",
        parameters={
            "bbox": "params:hurricane_10km_render_params.bbox",
            "video": "params:hurricane_10km_render_params",
        },
        tags=["cloudcover", "zoomin", "high_resoltuion"],
    )

    temperature_pipe = pipeline(
        pipe=zoom_in_base_pipeline,
        namespace="temperature_10km",
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

    return (
        hurricane_cloud_pipe + amazonia_precipitation_pipe + temperature_pipe + sst_pipe
    )
