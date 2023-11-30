from pathlib import Path

import routes
from celery import Celery
from config import Config
from db import db
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from utils import get_server_information, setup_docker


def make_celery(app):
    celery = Celery(
        __name__,
        backend=Config.CELERY["CELERY_RESULT_BACKEND"],
        broker=Config.CELERY["CELERY_BROKER_URL"],
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


app = Flask(__name__)
app.config.from_object(Config)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_HEADERS"] = "Content-Type"


db.init_app(app)
migrate = Migrate(app, db)

celery = make_celery(app)

if setup_docker(container_path=Path("./container")) == 0:
    print("Docker setup not successful")
    exit(1)

server_information = get_server_information(Path("./data/server_info.yaml"))


@app.get("/server-info")
@cross_origin()
def get_server_info():
    return server_information


app.register_blueprint(routes.execution(server_information), url_prefix="/execution")
app.register_blueprint(
    routes.refactor(server_information), url_prefix="/refactorization"
)
