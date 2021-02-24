from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Profile

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/profile/<int:user_id>')
@login_required
def user_profile(user_id):
    profile = Profile.query.filter_by(user_id=user_id).first()
    return profile.to_dict()

@user_routes.route('/profile/<int:id>', methods=['POST'])
def profile_form_submit(id):
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        pass
