import numpy as np
import nidaqmx as ni
from flask_socketio import SocketIO

socketio = SocketIO(message_queue='redis://')
t = ni.Task()

freq = int(30000)
trig_num = int(freq/60)
spc = int(trig_num)
t.ai_channels.add_ai_voltage_chan('Dev1/ai0')
timeseries = np.linspace(0,trig_num,spc)

def every_n_cb(task_handle, every_n_samples_event_type,
		number_of_samples, callback_data):
	data = t.read(number_of_samples_per_channel=spc)
	emit = [{'volt': data[i], 'time': timeseries[i]} for i in range(len(data))]
	socketio.emit('trace',emit)
	return 0

t.timing.cfg_samp_clk_timing(
		freq,
		sample_mode=ni.constants.AcquisitionType.CONTINUOUS,
		samps_per_chan=int(spc)
		)
t.register_every_n_samples_acquired_into_buffer_event(trig_num,every_n_cb)

t.start()
input('waiiiit for it')
