from datetime import datetime

from db import db


class CodeSubmission(db.Model):
    submission_id = db.Column(db.String(100), primary_key=True)
    submission_date = db.Column(db.Time, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False)
    code = db.Column(db.Text)

    def __init__(self, submission_id, status, code):
        self.submission_id = submission_id
        self.submission_date = datetime.utcnow()
        self.status = status
        self.code = code

    def to_json(self):
        return {
            "submission_id": self.submission_id,
            "submission_date": self.submission_date.isoformat(),
            "status": self.status,
            "code": self.code,
        }

    def __repr__(self):
        return f"<CodeSubmission {self.submission_id}>"


class RefactoringStatistics(db.Model):
    static_id = db.Column(db.Integer, primary_key=True)
    refactoring_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    reduction_amount = db.Column(db.Float, nullable=False)

    def to_json(self):
        return {
            "static_id": self.static_id,
            "refactoring_date": self.refactoring_date,
            "reduction_amount": self.reduction_amount,
        }

    def __repr__(self):
        return f"<RefactoringStatistics {self.static_id}>"
