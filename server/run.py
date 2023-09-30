import os
import time


def run_code(code: str):
    result = ""

    # Copy code input to "main.java" file
    os.system(f"tee -a main.java << EOF\n{code}\n")

    os.system("javac main.java")

    start = time.time()
    os.system("java Main > results.txt")
    end = time.time()

    with open("results.txt", "r") as f:
        result = f.read()

    os.system("rm main.java Main.class results.txt")

    elpased_time = end - start
    return (result, elpased_time)
