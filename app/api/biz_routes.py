from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Profile, db, Aircraft

biz_routes = Blueprint('aircrafts', __name__)

@biz_routes.route('/')
# @login_required
def biz():
    services = Aircraft.query.all()
    return {service.id: service.to_dict() for service in services}

