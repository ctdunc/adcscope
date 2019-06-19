from flask import Flask, render_template
from flask_socketio import SocketIO

import nidaqmx as ni
import numpy as np

app = Flask(__name__, static_folder='./view/dist', template_folder='./view')
app.config['SECRET_KEY'] = 'secret'

socketio = SocketIO(app)

t = ni.Task()

freq = int(1000)
spc = int(freq)
trig_num = int(10*spc)
t.ai_channels.add_ai_voltage_chan('Dev1/ai0')
time_arr = np.linspace(0, spc/freq, spc)

def every_n_cb(task_handle, every_n_samples_event_type,
		number_of_samples, callback_data):
	samples = t.read(number_of_samples_per_channel=spc)
	data = []
	for i in range(len(samples)):
		data.append({
		'volt':samples[i],
		'time':time_arr[i]
		})
	socketio.emit('trace', data)
	return 0

t.timing.cfg_samp_clk_timing(
		spc,
		sample_mode=ni.constants.AcquisitionType.CONTINUOUS,
		samps_per_chan=trig_num
		)
t.register_every_n_samples_acquired_into_buffer_event(spc,every_n_cb)

@app.route("/")
def render():
    return render_template('index.html')

if __name__ == '__main__':
    t.start()
    socketio.run(app)
