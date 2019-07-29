from flask import Blueprint, render_template

control = Blueprint(
        "control",
        __name__,
        static_folder="./view/dist",
        template_folder='./view'
        )

@control.route("/")
def render():
    return render_template("index.html")

