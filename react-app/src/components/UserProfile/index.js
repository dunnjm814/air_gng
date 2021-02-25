import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as profileActions from '../../store/profile'
import AboutUserForm from './AboutUserForm'
import {useParams} from 'react-router-dom'
import './profile.css'


function UserProfile({sessionUser}) {
  // const profileData = await
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.profile);
  const [info, setInfo] = useState(false)
  const {userId} = useParams()

  function toggle() {
    setInfo(!info)
  }

  useEffect(() => {
    // console.log("****", sessionUser.id)
      dispatch(profileActions.getProfile(userId))
    console.log("####", userProfile)
  },[dispatch])


  return (
    <>
      <div id="profile-wrapper">
        <div id="wish-list"></div>
        <div id="user-info">
          <div id="user-card">
            {sessionUser && sessionUser.profilePic &&
            <img src={sessionUser.profilePic} alt='Avatar'></img>
            }
          </div>
          <div id="about-user">
            <div id="user-header">
              <h1>Hey, its {sessionUser && sessionUser.first_name}</h1>
              {/* <p>joined in {year}</p> stretch goal */}
              <button
              onClick={toggle}
              >Edit profile</button>
            </div>
            <div id='profile-info&form-component'>
              <div id='component-wrapper' className={info ? '' : "hidden"}>
                <AboutUserForm userProfile={userProfile}
                  info={info}
                  setInfo={setInfo}
                />
              </div>
              {!info && <div id='profile-info' >
                {userProfile.about && (
                  <div>
                    <h2>About</h2>
                    <p>{userProfile.about}</p>
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
              </div>}
            </div>
          </div>
          <div id="user-reviews">
            <h6>Heres where I would put my reviews...</h6>
            <h1>IF I HAD ANY!!!</h1>
          </div>
        </div>
        <div id="profile-blank"></div>
      </div>
    </>
  );
}

export default UserProfile
