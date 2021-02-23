import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import ProfileMenu from './ProfileButton';

const NavBar = ({ setAuthenticated, authenticated }) => {
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
          />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
