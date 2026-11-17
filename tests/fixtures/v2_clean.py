# Fixture: v1.1.0 rules, clean Python (must produce ZERO findings).
import hmac
import json
import ssl
from flask import Flask, request, make_response, render_template_string
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
CSRFProtect(app)
app.config["SESSION_COOKIE_HTTPONLY"] = True

ctx = ssl.create_default_context()


@app.route("/page")
def page():
    return render_template_string("<h1>Hello {{ name }}</h1>",
                                  name=request.args.get("name"))


@app.route("/c")
def cookies():
    resp = make_response("ok")
    resp.set_cookie("session", "abc123", httponly=True, secure=True,
                    samesite="Lax")
    resp.headers["X-Frame-Options"] = "DENY"
    return resp


@app.route("/login", methods=["POST"])
def login():
    if hmac.compare_digest(request.form["token"], expected_token):
        data = json.loads(request.data)
        return "in"
    return "no"
