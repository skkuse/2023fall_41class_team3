#  앱 초기화, SQLAlchemy 및 Migrate 설정

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

import os

app = Flask(__name__)

# 환경 변수에서 설정을 불러옵니다.
app.config.from_object('config.Config')

# 데이터베이스 초기화
db = SQLAlchemy(app)

# 마이그레이션 초기화
migrate = Migrate(app, db)

from app import routes, models  # 모델과 라우트를 임포트합니다.
