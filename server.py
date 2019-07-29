from flask import Flask
from flask_socketio import SocketIO
import numpy as np
import datetime
from scope.blueprint import oscope
from control.blueprint import control

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

app.register_blueprint(oscope, url_prefix='/scope')
app.register_blueprint(control, url_prefix='/control')

socketio = SocketIO()
socketio.init_app(app, message_queue="redis://")

if __name__ == '__main__':
    socketio.run(app)
