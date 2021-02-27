const SET_LOCATION = 'location/setLocation'

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    payload: location,
  }
}

export const searchLocation = (location) => async (dispatch) => {
  await dispatch(setLocation(location))
  return location
}

const locationReducer = (state = { location: null }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case SET_LOCATION:
      newState = action.payload
      return newState
    default:
      return state
  }
}
export default locationReducer
