# Digital Twins visual communication data processing

## Overview

This is your new Kedro project with Kedro-Viz setup, which was generated using `kedro 0.19.6`.

Take a look at the [Kedro documentation](https://docs.kedro.org) to get started.

## Pipelines

The project contains one pipeline for now: `globe`

### `global`

Generates global videos of wind and so


### `scenarios`

Scenario comparison, image and videos

### `zooms`

Zoomed in videos for the globe visualization

##  Dependencies

Declare any dependencies in `requirements.txt` for `pip` installation.

To install them, run:

```
pip install -r requirements.txt
```

## How to run your Kedro pipeline

You can run your Kedro project with:

```
kedro run
```

### Run a single pipeline

Kedro allows run subsets by selecting only nodes, pipelines or tags. Check the tags in the pipeline code or in kedro viz.
For example to run only the detailed videos pipelines use

```
kedro run --pipeline zoomms --tags precipitation
```


## Kedro viz

Visualize the pipeline with

```
kedro viz
```


## Rules and guidelines

In order to get the best out of the template:

* Don't remove any lines from the `.gitignore` file we provide
* Make sure your results can be reproduced by following a [data engineering convention](https://docs.kedro.org/en/stable/faq/faq.html#what-is-data-engineering-convention)
* Don't commit data to your repository
* Don't commit any credentials or your local configuration to your repository. Keep all your credentials and local configuration in `conf/local/`
