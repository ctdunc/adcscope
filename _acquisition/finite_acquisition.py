import numpy as np
import nidaqmx as ni
from flask_socketio import SocketIO

socketio = SocketIO(message_queue='redis://')
