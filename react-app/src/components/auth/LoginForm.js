import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";


const LoginForm = ({ authenticated, setAuthenticated, setShowLogModal }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password));
    if (!user.errors) {
      setAuthenticated(true);

    } else {
      setErrors(user.errors);
    }
    setShowLogModal(false)
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <span>Welcome Back!</span>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
