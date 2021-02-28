from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Profile, db, Review, Booking, Aircraft
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

def to_service(review):
    join_review = {
      'id': review.id,
      'rate': review.rate,
      'title': review.title,
      'comment': review.comment,
      'user_id': review.user_id,
      'service_id': review.service_id,
      'business_name': review.service.business_name,
      'aircraft': review.service.aircraft,
    }
    return join_review

@user_routes.route('/profile/reviews/<int:user_id>')
def get_user_reviews(user_id):
    reviews = Review.query.filter_by(user_id=user_id).join(Aircraft).all()
    if reviews:
        return {review.id: to_service(review) for review in reviews}
    else:
        return {}

def to_booking(booking):
    join_booking = {
      "id": booking.id,
      "book_date": booking.book_date,
      "book_start_time": booking.book_start_time,
      "book_end_time": booking.book_end_time,
      "user_id": booking.user_id,
      "service_id": booking.service_id,
      "business_name": booking.service.business_name,
      "aircraft": booking.service.aircraft,
    }
    return join_booking

@user_routes.route('/bookings/<int:user_id>')
def get_bookings(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).join(Aircraft).all()
    return {booking.id: to_booking(booking) for booking in bookings}

@user_routes.route('/bookings', methods=["POST"])
def create_booking():
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print()
    if form.validate_on_submit():
            booking = Booking(
                book_date=form.data['book_date'],
                book_start_time=form.data['book_start_time'],
                book_end_time=form.data['book_end_time'],
                user_id=form.data['user_id'],
                service_id=form.data['service_id']
        )
    db.session.add(booking)
    db.session.commit()
    return booking.to_dict()
