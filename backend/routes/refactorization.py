import os
import uuid
from typing import Dict

from flask import Blueprint, request
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # API key 문의
from utils import execution_utils


def construct_blueprint(server_information: Dict) -> Blueprint:
    refactorization = Blueprint("refactor", __name__)

    @refactorization.post("/")
    def refactor_code():
        request_body = request.get_json()
        code = request_body.get("code", "")
        carbon_footprint = request_body.get("carbon_footprint", 0.0)

        response = client.completions.create(
            model="text-davinci-003", prompt=generate_prompt(code), max_tokens=1024
        )
        full_refactored_code = response.choices[0].text.strip()

        # "public" 단어부터 시작하는 리팩토링된 코드 추출
        start_index = full_refactored_code.find("public")
        if start_index != -1:
            refactored_code = full_refactored_code[start_index:]
        else:
            refactored_code = "Refactored code not found."

        session_id = uuid.uuid4()
        refactor_results = execution_utils.run_code(
            refactored_code, session_id, server_information, os.getcwd()
        )

        return {
            "refactored_code": refactored_code,
            "refactor_results": refactor_results,
        }

    return refactorization


def generate_prompt(code: str):
    return f"Here is a Java code snippet:\n{code}\n\nOptimize the code, please show only the refactored code in the answer"
