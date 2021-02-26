import React, {useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as serviceActions from '../../store/aircraft'
import * as reviewActions from '../../store/review'
import StarRatingComponent from "react-star-rating-component";

import './styleshow.css'

function ServiceShow() {
  const dispatch = useDispatch()
  const {craft_id} = useParams()
  const service = useSelector(state => state.biz.current)
  const reviews = useSelector(state => state.review)
  console.log(reviews)
  const reviewsArr = Object.values(reviews)
  useEffect(() => {
    dispatch(serviceActions.getOneBiz(craft_id))
    .then(dispatch(reviewActions.getReviews(craft_id)))
  }, [dispatch, craft_id])
  return (
    <>
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
              </div>
            </div>
            <div className="service_main_reviews">
              <span>Reviews will go here</span>
              <ul className="service_main_reviewlist">
                {reviewsArr &&
                  reviewsArr.map((review) => (
                    <li key={review.id}>
                      <div key={review.title}>{review.username}</div>
                      <div key={review.title}>{review.title}</div>
                      <div key={review.comment}>{review.comment}</div>
                      {/* <div key={review.rate}>{review.rate}</div> */}
                      <StarRatingComponent
                        name="reviewRating"
                        editing={false}
                        renderStarIcon={() => <span>⭐</span>}
                        starCount={review.rate}
                        value={review.rate}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceShow
