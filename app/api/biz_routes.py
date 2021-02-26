from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Profile, db, Aircraft, Review

biz_routes = Blueprint('aircrafts', __name__)

@biz_routes.route('/')
# @login_required
def biz():
    services = Aircraft.query.all()
    return {service.id: service.to_dict() for service in services}

@biz_routes.route('/<int:craft_id>')
def one_biz(craft_id):
    service = Aircraft.query.filter_by(id=craft_id).first()
    if service:
        return service.to_dict()
    else:
        return {}

def to_service(review):
    join_review = {
      'id': review.id,
      'rate': review.rate,
      'title': review.title,
      'comment': review.comment,
      'user_id': review.user_id,
      'service_id': review.service_id,
      'username': review.user.username,
      'email': review.user.email,
      'profile_pic': review.user.profile_pic,
    }
    return join_review

@biz_routes.route('/reviews/<int:craft_id>')
def get_reviews(craft_id):
    reviews = Review.query.filter_by(service_id=craft_id).join(User).all()
    print ('ljdsflkajdlfkjsejrwjfsjdfjdsjkfd')
    # return {review.id: review.to_service(comment=review.comment, user=review.user) for review in reviews}
    if reviews:
        return {review.id: to_service(review) for review in reviews}
    else:
        return {}
