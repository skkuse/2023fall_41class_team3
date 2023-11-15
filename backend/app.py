from pathlib import Path

from api import construct_blueprint as api
from celery import Celery
from config import Config
from db import db
from flask import Flask
from flask_migrate import Migrate
from utils import get_server_information, setup_docker

celery = Celery(
    __name__,
    backend=Config.CELERY["CELERY_RESULT_BACKEND"],
    broker=Config.CELERY["CELERY_BROKER_URL"],
)


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate = Migrate(app, db)

    if setup_docker(container_path=Path("./container")) == 0:
        print("Docker setup not successful")
        exit(1)

    server_information = get_server_information(Path("./data/server_info.yaml"))

    app.register_blueprint(api(db, server_information), url_prefix="/api")

    return app
