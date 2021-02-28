const SET_LOCATION = 'location/setLocation'
const SEARCH_MAP = 'location/searchMapDisplay'

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    payload: location,
  }
}

export const searchMapDisplay = (search) => {
  return {
    type: SEARCH_MAP,
    payload: search
  }
}

export const searchLocation = (location) => async (dispatch) => {
  await dispatch(setLocation(location))
  return location
}

export const searchMap = (search) => async (dispatch) => {
  await dispatch(searchMapDisplay(search))
  return search
}

const locationReducer = (state = { location: null }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case SET_LOCATION:
      newState.location = action.payload
      return newState
    case SEARCH_MAP:
      newState.location = action.payload
      return newState
    default:
      return state
  }
}
export default locationReducer
