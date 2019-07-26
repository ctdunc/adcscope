from flask import Flask
from flask_socketio import SocketIO
import numpy as np
import datetime
from gevent import monkey
from scope_blueprint import oscope
from control_blueprint import control

monkey.patch_all()
app = Flask(__name__)
app.register_blueprint(oscope, url_prefix='/scope')
app.register_blueprint(control, url_prefix='/control')
app.config['SECRET_KEY'] = 'secret'

socketio = SocketIO()
socketio.init_app(app, message_queue="redis://")
"""
@app.route("/scope")
def render():
    return render_template('scope/scope.html')
"""

if __name__ == '__main__':
    socketio.run(app)
