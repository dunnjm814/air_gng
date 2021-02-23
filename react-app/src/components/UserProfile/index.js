import React from 'react'


function UserProfile({sessionUser}) {

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

          </div>
        </div>
        <div id='profile-blank'></div>
      </div>
      </>
  )
}

export default UserProfile
