import os
import subprocess
import threading
import time

import psutil


class JavaThread(threading.Thread):
    def __init__(self, code: str, max_time: int) -> None:
        super(JavaThread, self).__init__()
        self.code = code
        self.max_time = max_time
        self.cpu_percent = [100]
        self.results = {}

    def run(self):
        os.system(f"tee -a main.java << EOF\n{self.code}\n")
        os.system("javac main.java")
        with open("results.txt", "w") as fd:
            command = "java Main"
            killed = False

            start = time.time()
            process = subprocess.Popen(command.split(" "), stdout=fd)
            pid = process.pid
            proc_info = psutil.Process(process.pid)

            while True:
                if process.poll() is not None:
                    break

                try:
                    self.cpu_percent.append(proc_info.cpu_percent(interval=1))

                except psutil.NoSuchProcess:
                    break

            end = time.time()

        if killed:
            result = "Timeout, process killed."
        else:
            with open("results.txt", "r") as f:
                result = f.read()

        self.results = {
            "result": result,
            "runtime": (end - start),
            "cpu_percent": sum(self.cpu_percent),
        }
        os.system("rm main.java Main.class results.txt")


def run_code(code: str):
    thread = JavaThread(code, 100)
    thread.start()
    thread.join(timeout=60)
    return thread.results
