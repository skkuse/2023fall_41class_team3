# 모델 정의
from app import db
from datetime import datetime

class CodeSubmission(db.Model):
    submission_id = db.Column(db.Integer, primary_key=True)
    submission_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    refactoring_status = db.Column(db.Boolean, nullable=False, default=False)
    # reduction_amount = db.Column(db.Float, default=0.0)

    def __repr__(self):
        return f'<CodeSubmission {self.submission_id}>'

    def to_json(self):
        return {
            'submission_id': self.submission_id,
            'submission_date': self.submission_date.isoformat(),
            'refactoring_status': self.refactoring_status,
            # 'reduction_amount': self.reduction_amount
        }


class RefactoringStatistics(db.Model):
    static_id = db.Column(db.Integer, primary_key=True)
    refactoring_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    reduction_amount = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<RefactoringStatistics {self.static_id}>'

    def to_json(self):
        return {
            'static_id': self.static_id,
            'refactoring_date': self.refactoring_date,
            'reduction_amount': self.reduction_amount
        }
    
