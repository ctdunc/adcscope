from flask import Blueprint, render_template

control = Blueprint(
        "control",
        __name__,
        static_folder="./view/control/dist",
        template_folder='./view/control'
        )

@control.route("/")
def render():
    return render_template("control.html")

