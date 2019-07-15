import numpy as np
from flask_socketio import SocketIO
import time 

socketio = SocketIO(message_queue='redis://')

f = int(1000)
dt = 1/f
t_n = int(f)
spc = int(t_n)
w = 0
t_series = np.linspace(0,1,t_n)
socketio.emit("timeseriesChange", list(t_series))
while True:
    w+=1
    t_series = np.linspace(0,8,t_n)
    data = np.sin(t_series)
    emit=[]
    for j in range(13):
        noise = np.random.rand(len(data))/100
        emit.append([data[i]+noise[i] for i in range(len(data))])

    socketio.emit('newTrace',emit)
    time.sleep(1/20)
