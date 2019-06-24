import numpy as np
from flask_socketio import SocketIO
import time 
socketio = SocketIO(message_queue='redis://')

f = int(1000)
dt = 1/f
t_n = int(f)
spc = int(t_n)


for i in range(1,5000):
    print(i)
    t_series = np.linspace(0,8,t_n)
    data = np.sin(t_series*i)
    emit = [{'volt': data[i], 'time': t_series[i]} for i in range(len(data))]
    socketio.emit('trace',emit)
    time.sleep(0.1)
