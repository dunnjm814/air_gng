import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as profileActions from "../../store/profile";
import * as reviewActions from "../../store/review";
import * as bookingActions from "../../store/booking";
import AboutUserForm from "./AboutUserForm";
import { useParams } from "react-router-dom";
import "./profile.css";

function UserProfile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userProfile = useSelector((state) => state.profile);
  const userReviews = useSelector((state) => state.review);
  const userBookings = useSelector((state) => state.booking);

  let userReviewsArr = Object.values(userReviews);
  const userBookingArr = Object.values(userBookings);

  const [info, setInfo] = useState(false);
  const [selectedReview, setSelectedReview] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  const { userId } = useParams();

  function toggle() {
    setInfo(!info);
  }

  let businessTypes = new Set();
  businessTypes.add("Show All");
  userReviewsArr.forEach((review) => {
    businessTypes.add(review.aircraft);
  });

  useEffect(() => {
    dispatch(profileActions.getProfile(userId));
    dispatch(reviewActions.getUserReviews(userId));
    dispatch(bookingActions.getBookings(userId));
  }, [dispatch, userBookings.length, userId]);

  useEffect(() => {
    setFilteredReviews(
      userReviewsArr.filter((review) => review.aircraft === selectedReview)
    );
  }, [selectedReview, userReviewsArr.length]);

  const deleteMyBooking = (bookingId) => {
    dispatch(bookingActions.deleteBooking(bookingId));
  };

  return (
    <>
      <div id="profile-wrapper">
        <div id="wish-list"></div>
        <div id="user-info">
          <div id="user-card">
            {sessionUser && sessionUser.profilePic && (
              <img src={sessionUser.profilePic} alt="Avatar"></img>
            )}
          </div>
          <div id="about-user">
            <div id="user-header">
              <h1>Hey, its {sessionUser && sessionUser.username}</h1>
              {/* <p>joined in {year}</p> stretch goal */}
              <button id="editprofilebutton" onClick={toggle}>
                Edit profile
              </button>
            </div>
            <div id="profile-infoform-component">
              <div id="component-wrapper" className={info ? "" : "hidden"}>
                <AboutUserForm
                  userProfile={userProfile}
                  info={info}
                  setInfo={setInfo}
                />
              </div>
              {!info && (
                <div id="profile-info">
                  {userProfile.about && (
                    <div>
                      <h2>About</h2>
                      <p>{userProfile.about}</p>
                    </div>
                  )}
                  {userProfile.firstName && (
                    <div>
                      <h2>First Name</h2>
                      <p>{userProfile.firstName}</p>
                    </div>
                  )}
                  {userProfile.lastName && (
                    <div>
                      <h2>Last Name</h2>
                      <p>{userProfile.lastName}</p>
                    </div>
                  )}
                  {userProfile.phoneNumber && (
                    <div>
                      <h2>Phone Number</h2>
                      <p>{userProfile.phoneNumber}</p>
                    </div>
                  )}
                  {userProfile.location && (
                    <div>
                      <h2>Location</h2>
                      <p>{userProfile.location}</p>
                    </div>
                  )}
                  {userProfile.work && (
                    <div>
                      <h2>Work</h2>
                      <p>{userProfile.work}</p>
                    </div>
                  )}
                  {userProfile.language && (
                    <div>
                      <h2>Language</h2>
                      <p>{userProfile.language}</p>
                    </div>
                  )}
                </div>
              )}
              <hr id="line"></hr>
            </div>
          </div>
          <div className="user_container_bottom">
            <div id="user-reviews">
              <h1>My Reviews</h1>
              <select
                value={selectedReview}
                onChange={(e) => setSelectedReview(e.target.value)}
              >
                {userReviews &&
                  Array.from(businessTypes).map((aircraft) => (
                    <option value={aircraft}>{aircraft}</option>
                  ))}
              </select>
              {userReviews && filteredReviews.length ? (
                <div className="review_wrapper">
                  {filteredReviews.map((review) => (
                    <NavLink
                      className="review_link"
                      key={review.id}
                      to={`/aircrafts/${review.service_id}`}
                    >
                      <div className="review_container">
                        <div className="review_title">{`${review.aircraft} : ${review.business_name}`}</div>
                        <div className="review_title">{review.title}</div>
                        <div className="review_comment">{review.comment}</div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              ) : (
                <div className="review_wrapper">
                  {userReviewsArr.map((review) => (
                    <NavLink
                      className="review_link"
                      key={review.id}
                      to={`/aircrafts/${review.service_id}`}
                    >
                      <div className="review_container">
                        <div className="review_title">{`${review.aircraft} : ${review.business_name}`}</div>
                        <div className="review_title">{review.title}</div>
                        <div className="review_comment">{review.comment}</div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <div className="bookings_wrapper">
              <h1>My Current Bookings</h1>
              {userBookings && userBookingArr.length && (
                <div>
                  {userBookingArr.map((booking) => {
                    if (booking !== null) {
                      return (
                        <div key={booking.id} className="booking_each">
                          <div>Date: {booking.book_date}</div>
                          <div>{booking.aircraft}</div>
                          <div>{booking.business_name}</div>
                          <button
                            id={booking.id}
                            onClick={(e) => deleteMyBooking(e.target.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="profile-blank"></div>
      </div>
    </>
  );
}

export default UserProfile;
