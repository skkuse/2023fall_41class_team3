 # 2023fall_41class_team3

 ### DB setting
 MySQL 버전: 8.0.34

 # MySQL 실행
 sudo mysql
 또는
 sudo /etc/init.d/mysql restart (실행 안될 경우)

# database 생성
create database codeco;

# database 사용할 유저 생성 및 권한 부여
create user 'admin'@'localhost' identified by 'password'; // password는 사용할 비밀번호로 변경
grant all privileges on codeco.* to 'admin'@'localhost';
flush privileges;


# 가상환경 생성
cd backend
sudo apt install python3.9-venv
python3 -m venv venv
source venv/bin/activate

# mysql 연결 및 orm에 필요한 라이브러리 설치
pip install flask flask-sqlalchemy flask-migrate python-dotenv pymysql

# .env (보안 설정)
pip install python-dotenv

# .env configuration
.env파일 생성 및 작성 (각자 환경에 맞게 변경)

FLASK_APP=run.py
FLASK_ENV=development

DB_USER=admin
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=codeco

# 마이그레이션 초기화
flask db init

# 마이그레이션 파일 생성
flask db migrate -m "Initial migration."

# 데이터베이스에 마이그레이션 적용
flask db upgrade

# DB schema 수정 시
flask db migrate 
flask db upgrade