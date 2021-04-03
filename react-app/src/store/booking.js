const LOAD_BOOKINGS = 'bookings/loadBookings'
const SET_BOOKING = 'bookings/setBooking'
const REMOVE_BOOKING = 'bookings/removeBooking'
const LOAD_BIZ_BY_DATE = "aircrafts/loadBizByDate";

export const loadBookings = (bookings) => {
  return {
    type: LOAD_BOOKINGS,
    payload: bookings,
  }
}

export const setBooking = (booking) => {
  return {
    type: SET_BOOKING,
    payload: booking
  }
}

export const removeBooking = (booking) => {
  return {
    type: REMOVE_BOOKING,
    payload: booking
  }
}

export const loadBizByDate = (biz) => {
  return {
      type: LOAD_BIZ_BY_DATE,
      payload: biz,
  }
}
export const getBookings = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/bookings/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const bookings = await response.json()
  dispatch(loadBookings(bookings))
  return bookings
}

export const submitBooking = (bookDate, bookStartTime=null, bookEndTime=null, userId, serviceId) => async (
  dispatch
) => {
  console.log(bookDate, bookStartTime, bookEndTime, userId, serviceId)
  const response = await fetch(`/api/users/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      book_date: bookDate,
      book_start_time: bookStartTime,
      book_end_time: bookEndTime,
      user_id: userId,
      service_id: serviceId
    }),
  });
  const booking = await response.json()
  dispatch(setBooking(booking))
  return booking
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  const response = await fetch(`/api/users/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  })
  const booking = await response.json()
  dispatch(removeBooking(booking))
  return {}
}

export const getDateBiz = (date) => async (dispatch) => {
  const response = await fetch(`api/services/search/${date}`, {
      headers: {
          "Content-Type": "application/json",
      }
  })
  const filtered_biz = await response.json();
  dispatch(loadBizByDate(filtered_biz))
  return filtered_biz;
}

const bookingReducer = (state = { profile: null, datesearch: {} }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_BOOKINGS:
      newState = action.payload
      return newState;
    case SET_BOOKING:
      newState[action.payload.id] = action.payload
      return newState;
    case REMOVE_BOOKING:
      delete newState[action.payload.id]
      return newState;
    case LOAD_BIZ_BY_DATE:
      newState.datesearch = action.payload;
      return newState;
    default:
      return state

  }
}
export default bookingReducer
