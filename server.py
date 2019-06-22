from flask import Flask, render_template
from flask_socketio import SocketIO
import nidaqmx as ni
import numpy as np
import bson
import datetime
import eventlet

app = Flask(__name__, static_folder='./view/dist', template_folder='./view')
app.config['SECRET_KEY'] = 'secret'

socketio = SocketIO()
socketio.init_app(app,async_mode='eventlet',message_queue="redis://")
eventlet.monkey_patch()
@app.route("/")
def render():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)
    print('addd')
