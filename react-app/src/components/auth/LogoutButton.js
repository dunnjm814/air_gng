import React from "react";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import {Redirect} from "react-router-dom";

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    setAuthenticated(false);
    <Redirect to='/'></Redirect>
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
