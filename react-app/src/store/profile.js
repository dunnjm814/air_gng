const LOAD_PROFILE = 'profile/loadProfile'
const SET_PROFILE = 'profile/setProfile'

export const loadProfile = (profile) => {
  return {
    type: LOAD_PROFILE,
    payload: profile,
  }
}

export const setProfile = (profile) => {
  return {
    type: SET_PROFILE,
    payload: profile
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

export const submitProfile = (about, firstName, lastName, phoneNumber, location, work, language, userId) => async (
  dispatch
) => {
  const response = await fetch(`/api/users/profile/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      about,
      firstName,
      lastName,
      phoneNumber,
      location,
      work,
      language
    }),
  });
  const profile = await response.json()
  dispatch(setProfile(profile))
  return profile
};



const profileReducer = (state = { profile: null }, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_PROFILE:
      newState = action.payload
      return newState;
    case SET_PROFILE:
      newState = action.payload
      return newState;
    default:
      return state

  }
}
export default profileReducer
