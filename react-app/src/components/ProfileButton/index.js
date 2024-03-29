import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { Modal } from "../../context/Modal";
import { NavLink } from "react-router-dom";
import login from "../../img/login-menu.png"
import { IconContext } from "react-icons";
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import "./ProfileButton.css"



function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [active, setActive] = useState('')
  const [open, setOpen] = useState('')

  const sessionUser = useSelector((state) => state.session.user);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    setActive('active')
    setOpen('open')
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
      setActive("");
      setOpen('')
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, sessionUser]);

  return (
    <>
      <div className={`profile-btn-wrapper`}>
        <button className={`nav-button ${active}`} onClick={openMenu}>
          <IconContext.Provider value={{ color: "white", size: "30px" }}>
            <div className="icon-wrapper">
              <GiHamburgerMenu />
              <FaUserCircle />
            </div>
          </IconContext.Provider>
        </button>
        {showLogModal && (
          <Modal onClose={() => setShowLogModal(false)}>
            <LoginForm setShowLogModal={setShowLogModal} />
          </Modal>
        )}

        {showSignModal && (
          <Modal onClose={() => setShowSignModal(false)}>
            <SignUpForm setShowSignModal={setShowSignModal} />
          </Modal>
        )}

        {showMenu && (
          <div className={`profile-dropdown ${open}`}>
            {!sessionUser && (
              <>
                <div className="menu-links">
                  <button onClick={() => setShowLogModal(true)}>Log in</button>
                  <button onClick={() => setShowSignModal(true)}>
                    Sign Up
                  </button>
                </div>
              </>
            )}
            {sessionUser && (
              <>
                <NavLink to={`/users/profile/${sessionUser.id}`}>
                  <span>Profile</span>
                </NavLink>
                <LogoutButton className="logout-button" />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileMenu;
