import os
import uuid
from typing import Dict

from flask import Blueprint, request
from flask_sqlalchemy import SQLAlchemy

import db as db

from .execute import run_code


def construct_blueprint(database: SQLAlchemy, server_information: Dict) -> Blueprint:
    api = Blueprint("api", __name__)

    @api.post("/submit_code")
    def runtime():
        session_id = uuid.uuid4()

        request_body = request.get_json()
        code = request_body["code"]

        database.session.add(db.models.CodeSubmission(submission_id=str(session_id)))
        database.session.commit()

        return run_code(code, session_id, server_information, os.getcwd())

    @api.post("/refactor")
    def refactor():
        return ""

    return api
