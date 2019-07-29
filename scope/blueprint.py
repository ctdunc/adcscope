
from flask import Blueprint, render_template

oscope = Blueprint(
        "oscope", 
        __name__,
        static_folder='./view/dist',
        template_folder='./view'
        )

@oscope.route("/")
def render():
    return render_template('index.html')

