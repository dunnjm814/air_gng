const LOAD_BOOKINGS = 'bookings/loadBookings'
const SET_BOOKING = 'bookings/setProfile'

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
  console.log('submit booking thunk')
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



const bookingReducer = (state = { profile: null }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_BOOKINGS:
      newState = action.payload
      return newState;
    case SET_BOOKING:
      newState[action.payload.id] = action.payload
      return newState;
    default:
      return state

  }
}
export default bookingReducer
