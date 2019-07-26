
from flask import Blueprint, render_template

oscope = Blueprint(
        "oscope", 
        __name__,
        static_folder='./view/scope/dist',
        template_folder='./view/scope'
        )

@oscope.route("/")
def render():
    return render_template('scope.html')

