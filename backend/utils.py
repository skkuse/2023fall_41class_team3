import pathlib
import subprocess


def setup_app(container_path: pathlib.Path) -> int:
    """Initialize essential tools for running the server

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
        image_build_info = subprocess.check_output(
            f"docker build -t ecoder:latest {container_path}", shell=True
        )
        print(image_build_info.decode())

    except Exception as e:
        print(f"Docker image build failed: {e}")
        return 0

    return 1
