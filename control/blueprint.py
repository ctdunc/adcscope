from flask import Blueprint, render_template
import redis
r = redis.Redis()
control = Blueprint(
        "control",
        __name__,
        static_folder="./view/dist",
        template_folder='./view'
        )
@control.route("/get-dev")
def get_dev():
    print(r.keys())
    return("hell")
@control.route("/")
def render():
    return render_template("index.html")

