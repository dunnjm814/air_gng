import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionReducer from "../../store/session";
import LoginFormModal from '../LoginModal';
import SignUpFormModal from '../SignUpModal';
import LogoutButton from '../auth/LogoutButton';


function ProfileMenu({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionReducer.logout());
//   };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>

      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <LoginFormModal />
          </li>
          <li>
            <SignUpFormModal />
          </li>
          <li>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileMenu;