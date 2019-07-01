import celery
import numpy as np
import nidaqmx as ni

# no good way to have individual time scales.
class AnalogDAQTask(celery.Task):
    def __init__(
            self,
            device_arr,     # list of ni channels to add 
            sample_rate,    # samples/second
            frame_rate,     # how many traces to take per second
            trace_length,   # how many samples to take per trace
            socket,         # socketio instance on which to emit events
        ):

        self.dr = device_arr
        self.sr = sample_rate
        self.fr = frame_rate
        self.tr = trace_length
        self.sk = socket
        
        self.ni_task = ni.Task()
        return 0 

    def reconfigure(self, device_arr, sample_rate, frame_rate, trace_length):
        
        # close task before reconfiguration
        if not self.ni_task.is_task_done():
            self.ni_task.close()

        self.dr = device_arr
        self.sr = sample_rate
        self.fr = frame_rate
        self.tr = trace_length

        self.ni_task = ni.Task()
        for chan in self.dr:
            try:
                self.ni_task.ai_channels.add_ai_voltage_chan(chan)
            except e:
                print(e)
                continue
        self.ni_task.cfg_samp_clk_timing(self.sr)
        t.start()

        return 0
    def measure():
         
        return 0

