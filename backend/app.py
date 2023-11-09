import os
import uuid
from pathlib import Path

from flask import Flask, request
from run import run_code
from utils import get_server_information, setup_docker


def create_app():
    app = Flask(__name__)

    if setup_docker(container_path=Path("./container")) == 0:
        print("Docker setup not successful")
        exit(1)

    server_information = get_server_information(Path("./server_config.yaml"))

    @app.post("/api/runtime")
    def runtime():
        session_id = uuid.uuid4()

        request_body = request.get_json()
        code = request_body["code"]

        return run_code(code, session_id, os.getcwd())

    @app.post("/api/refactor")
    def refactor():
        return ""

    return app
