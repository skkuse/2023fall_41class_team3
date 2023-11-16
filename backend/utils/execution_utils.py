import os
import shutil
import subprocess
from typing import Dict, List
from uuid import UUID

from .calculation import calculate_carbon_footprint, calculate_energy_needed


def run_code(code: str, session_id: UUID, server_information: Dict, pwd: str) -> Dict:
    """Execute the given code and return the execution results

    Executed the given code and execute it in a separate containerized
    directory (directory name given by the session_id). The results of
    the execution is returned.

    Args:
        code (str): The user given code.
        session_id (uuid.UUID): The session_id of the code to be executed.
        server_information (Dict): Dictionary of values containing constants for
            carbon footprint calculation.
        pwd (str): The working directory of the main function.

    Returns:
        A dictionary containing information of the code execution
    """
    copy_code(code, session_id, pwd)

    container_run_success = _run_container(session_id, pwd)

    results = (
        {"success": False}
        if container_run_success == 1
        else {"success": True, **read_results(session_id, pwd)}
    )

    clean_up(session_id, pwd)

    if results["success"] == False:
        return results

    cpu_usage = min(results["runtime_user"] / results["runtime_real"], 1.0)
    energy_needed = calculate_energy_needed(
        results["runtime_real"] / 3600,
        server_information["CORE_POWER"],
        cpu_usage,
        server_information["MEMORY_POWER"],
        server_information["PUE"],
        server_information["PSF"],
    )
    carbon_footprint = calculate_carbon_footprint(
        energy_needed, server_information["CI"]
    )

    return {
        **results,
        "cpu_usage": cpu_usage,
        "energy_needed": energy_needed,
        "carbon_footprint": carbon_footprint,
    }


def copy_code(code: str, session_id: UUID, pwd: str) -> None:
    """Copy user given code to a containerized directory

    The user given code is written to a containerized directory. The neccesary
    files required for execution is copied into a directory named by the
    session id.

    Args:
        code (str): The user given code that should be written to the file
        session_id (uuid.UUID): The session_id of the user
        pwd (str): The path to where the main function is called

    Returns:
        None
    """
    path = os.path.join(pwd, "container", str(session_id))
    if not os.path.exists(path):
        os.makedirs(path)

    with open(f"{pwd}/container/{str(session_id)}/Main.java", "x") as f:
        f.write(code)

    open(f"{pwd}/container/{str(session_id)}/execution_results.txt", "x")


def _run_container(session_id: UUID, pwd: str) -> int:
    """Run the container

    The directory named by the session_id will be connected to a docker container
    via a bind mount. If the execution succeeds, the container will write the
    execution results to the file 'execution_results.txt'.

    Args:
        session_id (uuid.UUID): The session_id of the user
        pwd (str): The path to where the main function is called

    Returns:
        None

    Exitcode:
        1: The docker container failed to run.
    """

    container_path = os.path.join(pwd, "container", str(session_id))

    try:
        subprocess.check_output(
            f"docker run \
                -it --rm \
                -v {container_path}:/app/\
                ecoder:latest",
            shell=True,
        )

    except Exception as e:
        print(f"Docker container run failed: {e}")
        return 1

    return 0


def read_results(session_id: UUID, pwd: str) -> Dict:
    container_path = os.path.join(pwd, "container", str(session_id))

    with open(os.path.join(container_path, "execution_results.txt"), "r") as f:
        lines = f.readlines()

    code_output = "\n".join(lines[:-3])
    runtime = parse_time(lines[-3:])

    return {
        **runtime,
        "code_output": code_output,
    }


def clean_up(session_id: UUID, pwd: str) -> None:
    container_path = os.path.join(pwd, "container", str(session_id))
    shutil.rmtree(container_path)


def parse_time(times: List[str]) -> Dict[str, float]:
    """Parse time for execution results

    The execution results are calculated using the bash function 'time'. The
    results of this function are given as formatted strings. This function
    transforms the output ot the time function to floating point numbers as
    seconds.

    Args:
        times (List[str]): The result of the time function, should consist of
        'real', 'user', 'sys'.

    Returns:
        The same list of values parsed into a dictionary of floating point numbers.
    """
    split_times = [
        time.replace("m", " ").replace("s", " ").strip().split("\t")[1].split(" ")
        for time in times
    ]

    result_times = []
    for min, sec in split_times:
        result_times.append(float(min) * 60 + float(sec))

    return {
        "runtime_real": result_times[0],
        "runtime_user": result_times[1],
        "runtime_sys": result_times[2],
    }
