from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY')) # API key 문의

app = Flask(__name__)

# OpenAI API 키 설정


@app.route('/refactoring', methods=['POST'])
def refactor_java():
    # 사용자로부터 Java 코드 받기 (형식 주의)
    data = request.json
    java_code = data['java_code']

    # 코드 리팩토링을 위한 프롬프트 생성 (메모리와 성능 관점에서 리팩토링, 코드만 보여주기)
    prompt = f"Here is a Java code snippet:\n{java_code}\n\n\
        Identify any inefficiencies and refactor the code to optimize for memory usage and performance. \
        Please show only the refactored code in the answer, excluding additional explanations, \
        and the code should start with the public class Main and show the entire code"

    # OpenAI API를 사용하여 코드 리팩토링 (GPT-3.5 모델 사용)
    response = client.completions.create(model="text-davinci-003",  # GPT-3.5 모델
    prompt=prompt,
    max_tokens=1024)

    # 전체 리팩토링된 코드
    full_refactored_code = response.choices[0].text.strip()

    # "public" 단어부터 시작하는 리팩토링된 코드 추출
    start_index = full_refactored_code.find("public")
    if start_index != -1:
        refactored_code = full_refactored_code[start_index:]
    else:
        refactored_code = "Refactored code not found."

    # 결과 반환
    return jsonify({"refactored_code": refactored_code})

if __name__ == '__main__':
    app.run(debug=True)
