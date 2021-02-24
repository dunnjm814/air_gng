import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileMenu from './ProfileButton';

const NavBar = ({ setAuthenticated, authenticated, sessionUser }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <ProfileMenu
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            sessionUser={sessionUser}
          />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
