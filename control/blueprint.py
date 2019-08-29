from flask import Blueprint, render_template, jsonify, request
from rejson import Client
from tesdaq.command import DAQCommander
r = Client(decode_responses=True)
control = Blueprint(
        "control",
        __name__,
        static_folder="./view/dist",
        template_folder='./view'
        )

daq_cmd = DAQCommander(r)

@control.route("/")
def render():
    return render_template("index.html")

@control.route("/devices")
def return_active():
    return jsonify(daq_cmd.get_existing_devices())

@control.route("/devices/<dev>", methods=["GET"])
def return_device(dev):
    return jsonify(daq_cmd.get_device_state(dev))

@control.route("/devices/<dev>/<task>", methods=["GET"])
def return_task(dev=None, task=None):
    return jsonify(daq_cmd.get_device_state(dev)[task])

@control.route("/configure", methods=["POST"])
def configure():
    # Get data from form
    data = request.get_json()
    device = data['device'] 
    task_type = data['task']
    options = data['options']
    daq_cmd.configure(device, {task_type: options})
    return jsonify(0)

@control.route("/start", methods=["POST"])
def start():
    data = request.get_json
    data = request.get_json()
    device = data['device'] 
    task_type = data['task']
    options = data['options']
    daq_cmd.configure(device, {task_type: options})
    daq_cmd.start(device, [task])
    return jsonify(0)
