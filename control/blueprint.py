from flask import Blueprint, render_template, jsonify, request
from rejson import Client
import tesdaq.command as daq_cmd
import tesdaq.query as query

r = Client(decode_responses=True)
control = Blueprint(
        "control",
        __name__,
        static_folder="./view/dist",
        template_folder='./view'
        )


@control.route("/")
def render():
    return render_template("index.html")

@control.route("/devices")
def return_active():
    res = query.get_existing_devices(r)
    return jsonify(res)

@control.route("/devices/<dev>", methods=["GET"])
def return_device(dev):
    restriction = query.get_device_restriction(r, dev)
    return jsonify(restriction)

# TODO: Fix this
@control.route("/devices/<dev>/<task>", methods=["GET"])
def return_task(dev=None, task=None):
    state = query.get_task_type(r,dev, task)
    return jsonify(state)

@control.route("/configure", methods=["POST"])
def configure():
    # Get data from form
    data = request.get_json()
    device = data['device'] 
    task_type = data['task']
    options = data['options']
    daq_cmd.configure(r, device, {task_type: options})
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
