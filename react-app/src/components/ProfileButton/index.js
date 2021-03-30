import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { Modal } from "../../context/Modal";
import { NavLink } from "react-router-dom";
import login from "../../img/login-menu.png"
import "./ProfileButton.css"



function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);


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
  }, [showMenu, sessionUser]);

  return (
    <>
      <button className="login-button"onClick={openMenu}>
        <img alt='login-button' className="login-img" src={login} />
      </button>
      {showLogModal && (
        <Modal onClose={() => setShowLogModal(false)}>
          <LoginForm
            setShowLogModal={setShowLogModal}
          />
        </Modal>
      )}

      {showSignModal && (
        <Modal onClose={() => setShowSignModal(false)}>
          <SignUpForm
            setShowSignModal={setShowSignModal}
          />
        </Modal>
      )}

      {showMenu && (
        <div className="profile-dropdown">
          {!sessionUser &&  <>
              <div className="menu-links">
                <button onClick={() => setShowLogModal(true)}>Log in</button>
                <button onClick={() => setShowSignModal(true)}>Sign Up</button>
              </div>
          </>
          }
          {sessionUser && <>
              <NavLink to={`/users/profile/${sessionUser.id}`}>Profile</NavLink>
              <LogoutButton
                className="logout-button"
              />
          </>
          }
        </div>
      )}
    </>
  );
}

export default ProfileMenu;
