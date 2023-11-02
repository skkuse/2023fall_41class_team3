import os
import pathlib
import subprocess
from multiprocessing import Process


def _run_container(code: str, pwd: str):
    try:
        container_run_info = subprocess.check_output(
            f"docker run \
                -it --rm \
                -v {pwd}/container/exec_results.txt:/app/exec_results.txt\
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
