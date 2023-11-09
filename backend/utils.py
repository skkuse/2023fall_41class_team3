import pathlib
import subprocess
from typing import Dict

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
        data = yaml.safe_load(f)

    return data
