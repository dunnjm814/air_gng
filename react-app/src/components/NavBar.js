import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginModal';
import SignUpFormModal from './SignUpModal';
import ProfileMenu from './ProfileButton';

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <ProfileMenu />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;