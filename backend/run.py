import os
import shutil
import subprocess
from multiprocessing import Process
from typing import Dict
from uuid import UUID


def run_code(code: str, session_id: UUID, pwd: str) -> Dict:
    """Execute the given code and return the execution results

    Executed the given code and execute it in a separate containerized
    directory (directory name given by the session_id). The results of
    the execution is returned.

    Args:
        code (str): The user given code.
        session_id (uuid.UUID): The session_id of the code to be executed.
        pwd (str): The working directory of the main function.

    Returns:
        A dictionary containing information of the code execution
    """
    _copy_code(code, session_id, pwd)

    p = Process(target=_run_container, args=(session_id, pwd))
    p.start()
    p.join()

    results = _read_results(session_id, pwd)
    _clean_up(session_id, pwd)

    return results


def _copy_code(code: str, session_id: UUID, pwd: str) -> None:
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


def _run_container(session_id: UUID, pwd: str):
    container_path = os.path.join(pwd, "container", str(session_id))

    try:
        container_run_info = subprocess.check_output(
            f"docker run \
                -it --rm \
                -v {container_path}:/app/\
                ecoder:latest",
            shell=True,
        )

    except Exception as e:
        print(f"Docker container run failed: {e}")
        return 0


def _read_results(session_id: UUID, pwd: str) -> Dict:
    container_path = os.path.join(pwd, "container", str(session_id))

    with open(os.path.join(container_path, "execution_results.txt"), "r") as f:
        lines = f.readlines()

    code_output = "\n".join(lines[:-11])
    runtime = lines[-11][5:]

    execution_result = {"code_output": code_output, "runtime": runtime}

    return execution_result


def _clean_up(session_id: UUID, pwd: str) -> None:
    container_path = os.path.join(pwd, "container", str(session_id))
    shutil.rmtree(container_path)
