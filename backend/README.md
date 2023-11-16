# CodEco Backend Server

** Assuming Docker and MySQL are installed!

## Create virtual environmnet and install packages
```bash
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
```

## Run MySQL server
```bash
mysql.server start
```

## Run Docker container for Redis
```bash
docker run -p 6379:6379 --name redis-server redis
```

## Run Docker container for RabbitMQ
```bash
docker run -p 8080:15672 -p 5672:5672 --name rabbitmq-server rabbitmq
```

## Run SQL initialization script
```sql
CREATE DATABASE codeco;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON codeco.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```

## Configure .env file
```bash
FLASK_APP=run.py
FLASK_ENV=development
DB_USER=admin
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=codeco
```

## Database configuration
```bash
flask db init # Only run on initialization
flask db migrate -m "Initial migration."
flask db upgrade
```

## Run flask server
```bash
flask run
```

## Run Celery
```bash
celery -A app.celery worker --loglevel INFO
```


