import os
import subprocess
from multiprocessing import Process
from uuid import UUID


def run_code(code: str, pwd: str):
    print(code)
    print(type(code))
    with open(f"{pwd}/container/Main.java", "w") as f:
        f.write(code)
    p = Process(target=_run_container, args=(code, pwd))
    p.start()
    p.join()

    results = _read_results()
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
        print(container_run_info.decode())

    except Exception as e:
        print(f"Docker container run failed: {e}")
        return 0


def _read_results() -> str:
    # TODO
    return ""
