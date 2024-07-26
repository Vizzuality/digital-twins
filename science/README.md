# Digital Twins visual communication data processing

## Overview

This is your new Kedro project with Kedro-Viz setup, which was generated using `kedro 0.19.6`.

Take a look at the [Kedro documentation](https://docs.kedro.org) to get started.

## Pipelines

The project contains one pipeline for now: `globe`

### `lowvshigh`

Pipeline to generate the comparisson between low and high resolution simulations. Currently it has:

- splits nextgems global datasets into a set of tiffs (one per timestep) to use in blender to render a rotating globe.
- video generation pipeline for a regions defined in `conf/parameters.yml`


## How to install dependencies

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
I recomend use the `ParallelRunner` to run the nodes in parallel 

```
kedro run --runner=ParallelRunner
```

### Run a subset of the pipeline

Kedro allows run subsets by selecting only nodes, pipelines or tags. Check the tags in the pipeline code or in kedro viz.
For example to run only the detailed videos pipelines use

```
kedro run --runner=ParallelRunner --tags zoomin
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