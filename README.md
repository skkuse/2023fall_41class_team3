# CodEco (Code + Eco)
## 2023-2 SKKU Software Engineering Team 3 Project

Web application for carbon footprint calculation of user inputted code.




## DB setting

MySQL 버전: 8.0.34

### MySQL 실행

sudo mysql<br/>
또는<br/>
sudo /etc/init.d/mysql restart (실행 안될 경우)<br/>

### database 생성 및 유저 권한 부여

create database codeco; <br/>
create user 'admin'@'localhost' identified by 'password'; // password는 사용할 비밀번호로 변경<br/>
grant all privileges on codeco.\* to 'admin'@'localhost';<br/>
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

### API test

1. 코드 제출 테스트 <br/>
   curl -X POST http://127.0.0.1:5000/submit_code \
    -H "Content-Type: application/json" \
    -d '{"refactoring_status": false, "code": "public class Main { public static void main(String[] args) { System.out.println(\"Hello, World!\"); } }"}'

=> {"code":"public class Main { public static void main(String[] args) { System.out.println(\"Hello, World!\"); } }","refactoring_status":false,"submission_date":"2023-11-09","submission_id":1}

2. 리팩토링 통계 제출 테스트<br/>
   curl -X POST http://127.0.0.1:5000/submit_reduction \
    -H "Content-Type: application/json" \
    -d '{"reduction_amount": 5.25}'

=> {"reduction_amount":5.25,"refactoring_date":"Thu, 09 Nov 2023 00:00:00 GMT","static_id":1}

curl -X POST http://127.0.0.1:5000/submit_reduction \
 -H "Content-Type: application/json" \
 -d '{"reduction_amount": 1.5}'

=> {"reduction_amount":1.5,"refactoring_date":"Thu, 09 Nov 2023 00:00:00 GMT","static_id":2}

3. 총 탄소배출 절감량 계산 테스트 <br/>
   curl -X GET http://127.0.0.1:5000/total_reduction

=> {"total_reduction":6.75}
