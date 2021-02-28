import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as serviceActions from '../../store/aircraft'
import * as reviewActions from '../../store/review'
import StarRatingComponent from "react-star-rating-component";
import Bookings from '../Bookings'
import ReviewForm from '../ReviewForm'
import './styleshow.css'

function ServiceShow() {
  const dispatch = useDispatch()
  const {craft_id} = useParams()
  const service = useSelector(state => state.biz.current)
  const reviews = useSelector(state => state.review)
  const sessionUser = useSelector(state => state.session.user)
  const [toggle, setToggle] = useState(false)
  const [myId, setId] = useState(0)
  console.log(reviews)
  const reviewsArr = Object.values(reviews)

  const deleteReview = (review_id) => {

    dispatch(reviewActions.deleteReview(review_id))
  }
  useEffect(() => {
    dispatch(serviceActions.getOneBiz(craft_id))
    .then(dispatch(reviewActions.getReviews(craft_id)))
  }, [dispatch, craft_id, reviewsArr.length])

  useEffect(() => {
    console.log('alsdkjflksjdlfdslkjf')
    console.log(myId)
  }, [myId])

  return (
    <div className="service_main">
      {service && (
        <div>
          <div className="service_main_container">
            <div className="service_main_header">
              <h1>{service.business_name}</h1>
              <h4>{`${service.city}, ${service.state}, United States`}</h4>
            </div>
            <div>
              <img
                className="service_main_image"
                src={service.biz_image}
                alt="aircraft"
              />
            </div>
            <div className="service_main_description">
              <div>
                <span>Supercrafts</span>
                <p>
                  Supercrafts are experienced, highly rated hosts who are
                  committed to providing great stays for guests.
                </p>
                <span>Entire Aircraft</span>
                <p>You'll have the aircraft all to yourself.</p>
                <span>Enhanced clean</span>
                <p>
                  This business is commited to Airgng's 5-step cleaning process.
                </p>
                <span>Cancellation policy</span>
                <p>Free to cancel within 30 days of booking</p>
                <span>Aircraft rules</span>
                <p>The business does not allow smoking</p>
                <div>{service.description}</div>
                <div>{service.phone_number}</div>
              </div>
              <Bookings />
            </div>
            <div className="service_main_reviews">
              <h2>Reviews </h2>
              <ul className="service_main_reviewlist">
                {reviewsArr &&
                  reviewsArr.map((review) => (
                    <li key={review.id}>
                      <h3>{review.username}</h3>
                      <div>{review.title}</div>
                      <div>{review.comment}</div>
                      <div className="star-delete-wrap">
                        <StarRatingComponent
                          name="reviewRating"
                          editing={false}
                          renderStarIcon={() => <span>⭐</span>}
                          starCount={review.rate}
                          value={review.rate}
                        />
                        {sessionUser && review.user_id === sessionUser.id && (
                          <button
                            id={review.id}
                            className="delete-review"
                            onClick={(e) => deleteReview(e.target.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="service_main_review_form">
                <label for="leave-review" className="leave-review-btn">
                  Leave a review
                  <button
                    id="leave-review"
                    className="leave-review-btn"
                    onClick={() => setToggle(!toggle)}
                  >
                    Review
                  </button>
                </label>
                {toggle && (
                  <div>
                    <ReviewForm />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceShow
