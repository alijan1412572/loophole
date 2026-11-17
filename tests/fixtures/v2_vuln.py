# Fixture: v1.1.0 rules, vulnerable Python.
import ssl
import jsonpickle
from jinja2 import Template
from flask import Flask, request, make_response

app = Flask(__name__)
app.config["SESSION_COOKIE_HTTPONLY"] = False

ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
ctx.verify_mode = ssl.CERT_NONE
ctx.check_hostname = False


@app.route("/page")
def page():
    tpl = Template(request.args.get("tpl"))
    return tpl.render()


@app.route("/c")
def cookies():
    resp = make_response("ok")
    resp.set_cookie("session", "abc123")
    resp.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
    resp.headers["X-User"] = request.args.get("name")
    return resp


@app.route("/login", methods=["POST"])
def login():
    if request.form["token"] == expected_token:
        obj = jsonpickle.decode(request.data)
        return "in"
    return "no"
