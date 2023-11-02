# config.py
import os
from dotenv import load_dotenv

load_dotenv()  # .env 파일에서 환경 변수 로드

# 환경 변수로부터 데이터베이스 설정 값들을 가져옴
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')

# 데이터베이스 URL을 생성
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


class Config(object):
    # 환경 변수로부터 데이터베이스 URI 가져오기
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
