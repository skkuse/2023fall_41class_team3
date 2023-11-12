from pathlib import Path

from api import construct_blueprint as api
from config import Config
from flask import Flask
from flask_migrate import Migrate
from utils import get_server_information, setup_docker

from db import db


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
