const LOAD_PROFILE = 'profile/loadProfile'

export const loadProfile = (profile) => {
  return {
    type: LOAD_PROFILE,
    payload: profile,
  }
}

export const getProfile = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const profile = await response.json()
  dispatch(loadProfile(profile))
  return profile
}

const profileReducer = (state = { profile: null }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_PROFILE:
      newState.profile = action.payload
      return newState;
    default:
      return state

  }
}
export default profileReducer
