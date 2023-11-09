# app/routes.py
from flask import request, jsonify
from app import app, db
from app.models import CodeSubmission, RefactoringStatistics
from datetime import datetime

@app.route('/')
def index():
    return "Welcome to the homepage!"

@app.route('/submit_code', methods=['POST'])
def submit_code():
    data = request.json
    code = data.get('code','')
    #
   
    #

    new_submission = CodeSubmission(
        submission_date=data.get('submission_date', datetime.utcnow()),
        refactoring_status=data.get('refactoring_status', False)
    )
    db.session.add(new_submission)
    db.session.commit()
    return jsonify({
        'submission_id': new_submission.submission_id,
        'submission_date': new_submission.submission_date.isoformat(),
        'refactoring_status': new_submission.refactoring_status,
        'code': code # DB에 저장하지 않은 코드 내용 포함
    }), 201

@app.route('/submit_reduction', methods=['POST'])
def submit_reduction():
    data = request.json
    new_statistic = RefactoringStatistics(
        refactoring_date=data.get('refactoring_date', datetime.utcnow()),
        reduction_amount=data.get('reduction_amount')
    )
    db.session.add(new_statistic)
    db.session.commit()
    return jsonify(new_statistic.to_json()), 201

@app.route('/total_reduction', methods=['GET'])
def total_reduction():
    total = db.session.query(db.func.sum(RefactoringStatistics.reduction_amount)).scalar() or 0
    return jsonify({'total_reduction': total}), 200

