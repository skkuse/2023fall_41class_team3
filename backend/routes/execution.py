import os
import uuid
from typing import Dict

import db as db
from celery import shared_task
from celery.result import AsyncResult
from celery.signals import worker_init
from config import Config
from db.models import SubmittedCode
from flask import Blueprint, request
from flask_cors import cross_origin
from sqlalchemy import NullPool, create_engine, delete, orm, select, update
from utils import execution_utils

Session = orm.scoped_session(orm.sessionmaker(autoflush=True))
Session.configure(
    bind=create_engine(Config.SQLALCHEMY_DATABASE_URI, poolclass=NullPool)
)
session = Session()


def construct_blueprint(server_information: Dict) -> Blueprint:
    execution = Blueprint("execution", __name__)

    @execution.post("")
    @cross_origin()
    def submit_code():
        session_id = uuid.uuid4()

        request_body = request.get_json()
        code = request_body.get("code", "")

        session.add(
            SubmittedCode(code=code, submission_id=str(session_id), status="pending")
        )
        session.commit()

        result = execute_code.apply_async(
            (code, session_id, server_information), task_id=str(session_id)
        )  # type: ignore

        return {"result_id": result.id}

    @execution.get("result/<id>")
    @cross_origin()
    def get_execution_result(id: str):
        row = session.execute(select(SubmittedCode)).first()
        code_status = "error" if row is None else row[0].status

        result = AsyncResult(id)
        return {
            "status": code_status,
            "successful": result.successful(),
            "value": result.result if result.ready() else None,
        }

    @execution.get("queue")
    @cross_origin()
    def get_queue():
        codes = session.scalars(select(SubmittedCode))

        return {
            str(index): {
                "submission_id": code.submission_id,
                "submission_date": str(code.submission_date),
                "status": code.status,
            }
            for (index, code) in enumerate(codes)
        }

    return execution


@worker_init.connect
def initialize_session(*args, **kwargs):
    Session.configure(bind=create_engine(Config.SQLALCHEMY_DATABASE_URI))


@shared_task(ignore_results=False)
def execute_code(code: str, session_id: uuid.UUID, server_information: Dict):
    # Change the record status from 'pending' to 'running'
    session.execute(
        update(SubmittedCode)
        .where(SubmittedCode.submission_id == str(session_id))
        .values(status="running")
    )
    session.commit()

    results = execution_utils.run_code(
        code, session_id, server_information, os.getcwd()
    )

    # Delete the record
    session.execute(
        delete(SubmittedCode).where(SubmittedCode.submission_id == str(session_id))
    )
    session.commit()

    return results
