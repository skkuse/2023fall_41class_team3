import os
import uuid
from typing import Dict

import db as db
from celery import shared_task
from celery.result import AsyncResult
from flask import Blueprint, request
from flask_sqlalchemy import SQLAlchemy

from .execute import run_code


def construct_blueprint(database: SQLAlchemy, server_information: Dict) -> Blueprint:
    api = Blueprint("api", __name__)

    @api.post("/code")
    def runtime():
        session_id = uuid.uuid4()

        request_body = request.get_json()
        code = request_body["code"]

        database.session.add(
            db.models.CodeSubmission(submission_id=str(session_id), status="pending")
        )
        database.session.commit()

        result = execute.delay(code, session_id, server_information)
        return {"result_id": result.id}

    @api.get("/result/<id>")
    def get_result(id: str):
        result = AsyncResult(id)
        return {
            "ready": result.ready(),
            "successful": result.successful(),
            "value": result.result if result.ready() else None,
        }

    @api.post("/refactor")
    def refactor():
        return ""

    return api


@shared_task(ignore_results=False)
def execute(code: str, session_id: uuid.UUID, server_information: Dict):
    results = run_code(code, session_id, server_information, os.getcwd())
    return results
