import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileMenu from './ProfileButton';
import "./NavBar.css"
import airgng_logo from "../img/airbnb-logo.png"


const NavBar = ({ setAuthenticated, authenticated, sessionUser }) => {
  return (
    <nav>
      <div>
        <img className="airgng-logo" src={airgng_logo}/>
        <NavLink to="/" exact={true} activeClassName="active" className="home-button">
          airgng
        </NavLink>
      </div>
      <ProfileMenu
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        sessionUser={sessionUser}
      />
    </nav>
  );
}

export default NavBar;
