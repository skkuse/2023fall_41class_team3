 # 2023fall_41class_team3

 ## DB setting
 MySQL 버전: 8.0.34

 ### MySQL 실행
 sudo mysql<br/>
 또는<br/>
 sudo /etc/init.d/mysql restart (실행 안될 경우)<br/>

### database 생성 및 유저 권한 부여
create database codeco; <br/>
create user 'admin'@'localhost' identified by 'password'; // password는 사용할 비밀번호로 변경<br/>
grant all privileges on codeco.* to 'admin'@'localhost';<br/>
flush privileges;<br/>
<br/>

### 가상환경 생성

cd db <br/>
sudo apt install python3.9-venv<br/>
python3 -m venv venv<br/>
source venv/bin/activate<br/>

### mysql 연결 및 orm에 필요한 라이브러리 설치
pip install flask flask-sqlalchemy flask-migrate python-dotenv pymysql<br/>
pip install python-dotenv // 보안 설정(.env파일)<br/>

### .env configuration
.env파일 생성 및 작성 (각자 환경에 맞게 변경)<br/>
<br/>
FLASK_APP=run.py<br/>
FLASK_ENV=development<br/>
DB_USER=admin<br/>
DB_PASSWORD=password<br/>
DB_HOST=localhost<br/>
DB_PORT=3306<br/>
DB_NAME=codeco<br/>

### 마이그레이션 설정
flask db init // 초기화<br/>
flask db migrate -m "Initial migration." //마이그레이션 파일 생성<br/>
flask db upgrade // 데이터베이스에 마이그레이션 적용<br/>
<br/>

### DB schema 수정 시
flask db migrate <br/>
flask db upgrade <br/>

### 서버 실행
flask run

### api test
curl -X POST -H "Content-Type: application/json" -d '{"username": "newuser", "email": "newuser@example.com"}' http://localhost:5000/user/add
