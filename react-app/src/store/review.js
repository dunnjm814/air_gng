const LOAD_REVIEW = 'review/loadProfile'
const SET_REVIEW = 'review/setProfile'

export const loadReview = (reviews) => {
  return {
    type: LOAD_REVIEW,
    payload: reviews,
  }
}

export const setReview = (review) => {
  return {
    type: SET_REVIEW,
    payload: review
  }
}

export const getUserReviews = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/users/reviews/${user_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const reviews = await response.json()
  console.log('getreviews')
  console.log(reviews)
  dispatch(loadReview(reviews))
  return reviews
}

export const getReviews = (craft_id) => async (dispatch) => {
  const response = await fetch(`/api/services/reviews/${craft_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const reviews = await response.json()
  dispatch(loadReview(reviews))
  return reviews
}

export const submitReview = (rate, title, comment, userId, serviceId) => async (
  dispatch
) => {
  const response = await fetch(`/api/users/reviews/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rate,
      title,
      comment,
      user_id: userId,
      service_id: serviceId
    }),
  });
  const review = await response.json()
  dispatch(setReview(review))
  return review
};

const reviewReducer = (state = { }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_REVIEW:
      newState = action.payload
      return newState;
    case SET_REVIEW:
      newState = action.payload
      return newState;
    default:
      return state

  }
}
export default reviewReducer;
