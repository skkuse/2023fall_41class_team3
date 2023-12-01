from datetime import datetime

from db import db


class SubmittedCode(db.Model):
    submission_id = db.Column(db.String(100), primary_key=True)
    submission_date = db.Column(db.Time, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(32), nullable=False)
    code = db.Column(db.Text)

    def __init__(self, submission_id, code, status):
        self.submission_id = submission_id
        self.submission_date = datetime.utcnow()
        self.code = code
        self.status = status

    def to_json(self):
        return {
            "submission_id": self.submission_id,
            "submission_date": self.submission_date.isoformat(),
            "code": self.code,
        }

    def __repr__(self):
        return f"[CODE SUBMISSION {self.submission_id} AT {self.submission_date}]"


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
