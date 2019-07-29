from flask import Flask, render_template
from flask_socketio import SocketIO
from celery import Celery
from celery.contrib.abortable import AbortableTask
import numpy as np
import datetime
import eventlet
import time

app = Flask(__name__, static_folder='./view/dist', template_folder='./view')
app.config['SECRET_KEY'] = 'secret'

app.config['CELERY_BROKER_URL'] = 'redis://'
app.config['CELERY_RESULT_BACKEND'] = 'redis://'
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

socketio = SocketIO()
socketio.init_app(app, async_mode="eventlet", message_queue="redis://")
eventlet.monkey_patch()

@celery.task(bind=True,base=AbortableTask)
def long_run(self):
    while True:
        if not self.is_aborted():
            print("helll")
        else: break
    print("broken")
    return "k" 

@app.route("/")
def render():
    return render_template('index.html')

@app.route("/long")
def do():
    res = long_run.delay()
    print(res)
    time.sleep(1)
    res.abort()
    return("usa")

if __name__ == '__main__':
    socketio.run(app)
