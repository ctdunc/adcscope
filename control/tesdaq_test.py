from tesdaq.listen.daq_listen import TestListener

test_device ={
    "cfg_analog_input":{
        "channels": ["sample", "device", "for", "type"],
        "max_sample_rate": 100000,
        "min_sample_rate": 100,
        "sr_is_per_chan": False,
        "trigger_opts": []
        },
    "cfg_analog_output":{
        "channels": ["sample", "device", "for", "type"],
        "max_sample_rate": 100000,
        "min_sample_rate": 100,
        "sr_is_per_chan": False,
        "trigger_opts": []
        },
    "cfg_digital_input":{
        "channels": ["sample", "device", "for", "type"],
        "max_sample_rate": 100000,
        "min_sample_rate": 100,
        "sr_is_per_chan": False,
        "trigger_opts": []
        }
    }
test_listener = TestListener("test", test_device)
test_listener.wait() 
