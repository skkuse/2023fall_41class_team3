import argparse
import json
import os
import uuid

from flask import Flask, request
from run import run_code
from utils import setup_app

app = Flask(__name__)


@app.post("/api/runtime")
def runtime():
    session_id = uuid.uuid4()

    # TODO: Error handling when code is empty
    request_body = request.get_json()
    code = request_body["code"]

    return run_code(code, session_id, os.getcwd())


if __name__ == "__main__":
    # TODO: Make the setup to another function
    # TODO: Make the setup run only once, or at least check if the docker image is built
    setup_app("./container")

    app.run(debug=True)
