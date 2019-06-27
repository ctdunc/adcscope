import numpy as np
from flask_socketio import SocketIO
import time 

socketio = SocketIO(message_queue='redis://')

f = int(1000)
dt = 1/f
t_n = int(f)
spc = int(t_n)

w = 0
while True:
    w+=1
    t_series = np.linspace(0,8,t_n)
    data = np.sin(t_series*(w%10))
    emit=[]
    for j in range(13):
        emit.append([{'volt': data[i], 'time': t_series[i]+j/4} for i in range(len(data))])

    socketio.emit('trace',emit)
    time.sleep(1/20)
