import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import { signUp } from '../../store/session';

const SignUpForm = ({setShowSignModal }) => {
  const dispatch = useDispatch()
const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("")
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUp(username, email, password, profilePic));
    if (user.errors) {
      setErrors([...user.errors]);
    }
    } else {
      setErrors(['Please confirm password'])
    }
    setShowSignModal(false)
    history.push("/");
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfilePic = (e) => {
    const pic = e.target.files[0];
    if (pic) setProfilePic(pic)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <form onSubmit={onSignUp}>
      <span>Sign Up</span>
      <div>
        <ul>
          {errors.map((error, i) => (
            <li key={i} style={{ color:'red' }}>{error}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          placeholder="Username"
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          placeholder="Email"
        ></input>
      </div>
      <div>
        <input
          type="file"
          onChange={updateProfilePic}
          value={profilePic}
          accept="image/png, image/jpeg"
          placeholder="Profile Picture"
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          placeholder="Password"
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder="Confirm Password"
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
