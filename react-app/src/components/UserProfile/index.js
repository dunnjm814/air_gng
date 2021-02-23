import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as profileActions from '../../store/profile'

function UserProfile({sessionUser}) {
  // const profileData = await
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.profile.profile);
  console.log(userProfile.id)

  useEffect(() => {
    dispatch(profileActions.getProfile(sessionUser.id))
  },[dispatch])
  return (
    <>
      <div id='profile-wrapper'>
        <div id='wish-list'></div>
        <div id='user-info'>
          <div id='user-card'></div>
          <div id='about-user'>
            <div id='user-header'>
              <h1>{sessionUser.first_name}</h1>
              {/* <p>joined in {year}</p> stretch goal */}
              <button>Edit profile</button>
            </div>
            {userProfile.about && <div>
              <h2>About</h2>
              <p>{userProfile.about}</p>
            </div>}
            {userProfile.location && <div>
              <h2>Location</h2>
              <p>{userProfile.location }</p>
            </div>}
            {userProfile.work && <div>
              <h2>Work</h2>
              <p>{userProfile.work }</p>
            </div>}
            {userProfile.language && <div>
              <h2>Language</h2>
              <p>{userProfile.language }</p>
            </div>}
          </div>
        </div>
        <div id='profile-blank'></div>
      </div>
      </>
  )
}

export default UserProfile
