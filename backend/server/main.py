from flask import Flask, request
from run import run_code

app = Flask(__name__)


@app.post("/api/runtime")
def runtime():
    code = request.get_json()
    results = run_code(code)
    return results


if __name__ == "__main__":
    app.run(debug=True)
