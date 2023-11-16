import os
import uuid
from typing import Dict

import db as db
from celery import shared_task
from celery.result import AsyncResult
from db.models import SubmittedCode
from flask import Blueprint, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from utils import execution_utils


def construct_blueprint(database: SQLAlchemy, server_information: Dict) -> Blueprint:
    execution = Blueprint("execution", __name__)

    @execution.post("/")
    def submit_code():
        session_id = uuid.uuid4()

        request_body = request.get_json()
        code = request_body.get("code", "")

        database.session.add(SubmittedCode(code=code, submission_id=str(session_id)))
        database.session.commit()

        result = execute_code.delay(code, session_id, server_information)  # type: ignore

        return {"result_id": result.id}

    @execution.get("/result/<id>")
    def get_execution_result(id: str):
        result = AsyncResult(id)
        return {
            "ready": result.ready(),
            "successful": result.successful(),
            "value": result.result if result.ready() else None,
        }

    @execution.get("/queue")
    def get_queue():
        codes = database.session.scalars(select(SubmittedCode))
        return {code.submission_id: str(code.submission_date) for code in codes}

    return execution


@shared_task(ignore_results=False)
def execute_code(code: str, session_id: uuid.UUID, server_information: Dict):
    results = execution_utils.run_code(
        code, session_id, server_information, os.getcwd()
    )
    return results
