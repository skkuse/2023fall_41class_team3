import pathlib
import subprocess
from typing import Dict

import pandas as pd
import yaml

__all__ = ["setup_docker", "get_server_information"]


def setup_docker(container_path: pathlib.Path) -> int:
    """Set up docker for running the server

    Args:
        continer_path (pathlib.Pah): Path to the docker container path
            Should include a Dockerfile
    Returns:
        An error code indicating whether the docker image build was
        successful or not.
        1 means that the build was successful.
        0 means that the build was not successful.
    """
    try:
        docker_info = subprocess.check_output("docker info", shell=True)
        print(docker_info.decode())
    except subprocess.CalledProcessError as e:
        print(f"Docker not setup: {e}")
        return 0

    try:
        is_image_built = (
            subprocess.check_output(
                "docker inspect --type=image ecoder:latest",
                shell=True,
            )
            .decode()
            .find("Error")
            == -1
        )

    except Exception as e:
        is_image_built = False

    if is_image_built:
        return 1

    try:
        image_build_info = subprocess.check_output(
            f"docker build -t ecoder:latest {container_path}", shell=True
        )
        print(image_build_info.decode())

    except Exception as e:
        print(f"Docker image build failed: {e}")
        return 0

    return 1


def get_server_information(config_file: pathlib.Path) -> Dict:
    with open(config_file, "r") as f:
        config_data = yaml.safe_load(f)

    return {
        "PUE": get_PUE(config_data),
        "PSF": get_PSF(config_data),
        "CI": get_CI(config_data),
        "CORE_POWER": get_CORE_POWER(config_data),
        "MEMORY_POWER": get_MEMORY_POWER(config_data),
    }


def get_PUE(config_data: Dict) -> float:
    provider = config_data["provider"]
    df_PUE = pd.read_csv("./constants/pue.csv")
    if provider not in df_PUE["provider"].values:
        print("Location does not exist! Defaulting to Unknown...")
        provider = "Unknown"

    return df_PUE.loc[df_PUE["provider"] == provider, "PUE"].values[0]


def get_PSF(config_data: Dict) -> float:
    return 1


def get_CI(config_data: Dict) -> float:
    location = config_data["location"]
    df_CI = pd.read_csv("./constants/carbon_intensity.csv")
    if location not in df_CI["area_code"].values:
        print("Location does not exist! Defaulting to WORLD...")
        location = "WORLD"

    return df_CI.loc[df_CI["area_code"] == location, "CI"].values[0]


def get_CORE_POWER(config_data: Dict) -> float:
    model = config_data["cpu_model"]
    df_CPU_TDP = pd.read_csv("./constants/cpu_tdp.csv")
    if model not in df_CPU_TDP["model"].values:
        print("Model does not exist! Defaulting to DEFAULT...")
        model = "DEFAULT"

    return df_CPU_TDP.loc[df_CPU_TDP["model"] == model, "TDP"].values[0]


def get_MEMORY_POWER(config_data: Dict) -> float:
    return 1
