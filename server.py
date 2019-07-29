from flask import Flask
from flask_socketio import SocketIO
from celery import Celery
from celery.contrib.abortable import AbortableTask
import numpy as np
import datetime
<<<<<<< HEAD
import eventlet
import time
=======
from gevent import monkey
from scope_blueprint import oscope
from control_blueprint import control
>>>>>>> 0ef9a8d631c5af5ffb017d646fd9ce0a0849bf69

monkey.patch_all()
app = Flask(__name__)
app.register_blueprint(oscope, url_prefix='/scope')
app.register_blueprint(control, url_prefix='/control')
app.config['SECRET_KEY'] = 'secret'

app.config['CELERY_BROKER_URL'] = 'redis://'
app.config['CELERY_RESULT_BACKEND'] = 'redis://'
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

socketio = SocketIO()
@app.route("/scope")
def render():
    return render_template('scope/scope.html')

if __name__ == '__main__':
    socketio.run(app)
