import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionReducer from "../../store/session";
import LogoutButton from '../auth/LogoutButton';
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { Modal } from "../../context/Modal";
import { NavLink } from "react-router-dom";


function ProfileMenu({ setAuthenticated, authenticated, sessionUser }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);


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
  // useEffect(() =>{}, [authenticated])

  //   const logout = (e) => {
  //     e.preventDefault();
  //     dispatch(sessionReducer.logout());
  //   };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>

      {showLogModal && (
        <Modal onClose={() => setShowLogModal(false)}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Modal>
      )}

      {showSignModal && (
        <Modal onClose={() => setShowSignModal(false)}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Modal>
      )}

      {showMenu && (
        <ul className="profile-dropdown">
          {!sessionUser.id && <>
            <li>
              <button onClick={() => setShowLogModal(true)}>Log in</button>
            </li>
            <li>
              <button onClick={() => setShowSignModal(true)}>Sign Up</button>
            </li>
          </>
          }
          {sessionUser.id && <>
            <li>
              <NavLink to={`/users/profile/${sessionUser.id}`}>Profile</NavLink>
            </li>
            <li>
              <LogoutButton
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </li>
          </>
          }
        </ul>
      )}
    </>
  );
}

export default ProfileMenu;
