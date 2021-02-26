from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Profile, db, Review, Booking
from app.forms import ProfileForm, BookingForm

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
    # add no profile
    profile = Profile.query.filter_by(user_id=user_id).first()
    return profile.to_dict()

@user_routes.route('/profile/<int:user_id>', methods=['PUT'])
def profile_form_submit(user_id):
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        profile = Profile.query.filter_by(user_id=user_id).first()
        if profile:
            profile.about=form.data['about'],
            profile.first_name=form.data['first_name'],
            profile.last_name=form.data['last_name'],
            profile.phone_number=form.data['phone_number'],
            profile.location=form.data['location'],
            profile.work=form.data['work'],
            profile.language=form.data['language'],
        else:
            profile = Profile(
                about=form.data['about'],
                first_name=form.data['first_name'],
                last_name=form.data['last_name'],
                phone_number=form.data['phone_number'],
                location=form.data['location'],
                work=form.data['work'],
                language=form.data['language'],
                user_id=user_id
            )

        db.session.add(profile)
        db.session.commit()
        return profile.to_dict()

@user_routes.route('/bookings/<int:user_id>')
def get_bookings():
    bookings = Booking.query.filter_by(user_id=user_id)
    return {booking.id: [booking.to_dict() for booking in bookings]}

@user_routes.route('/bookings', methods=["POST"])
def create_booking():
   form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        booking = Booking(
            book_date=form.data['book_date']
            book_start_time=form.data['book_start_time']
            book_end_time=form.data['book_end_time']
            user_id=form.data['user_id']
            service_id=['service_id']
        )
    else:
        return {}
