const LOAD_REVIEW = 'review/loadReview'
const SET_REVIEW = 'review/setReview'
const DELETE_REVIEW = 'review/deleteReview'
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

export const removeReview = (review) => {
  return {
    type: DELETE_REVIEW,
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
  const response = await fetch(`/api/services/reviews`, {
    method: "POST",
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

export const deleteReview = (review_id) => async (dispatch) => {
  const response = await fetch(`/api/services/reviews/${review_id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  }
  )
 const review = await response.json()
 dispatch(removeReview(review))
 return {}

}

const reviewReducer = (state = { }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_REVIEW:
      newState = action.payload
      return newState;
    case SET_REVIEW:
      newState[action.payload.id] = action.payload
      return newState;
    case DELETE_REVIEW:
      delete newState[action.payload.id]
      return newState
    default:
      return state

  }
}
export default reviewReducer;
