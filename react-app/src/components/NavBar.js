import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileMenu from './ProfileButton';
import "./NavBar.css"
import airgng_logo from "../img/airbnb-logo.png"


const NavBar = () => {
  return (
    <nav>
      <div>
        <img alt='logo' className="airgng-logo" src={airgng_logo}/>
        <NavLink to="/" exact={true} activeClassName="active" className="home-button">
          airgng
        </NavLink>
      </div>
      <ProfileMenu/>
    </nav>
  );
}

export default NavBar;
