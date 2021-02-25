import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUp(username, firstName, lastName, phoneNumber, email, password, profilePic));
      if (!user.errors) {
        setAuthenticated(true);
      } else {
        setErrors(user.errors)
      }
    } else {
      setErrors(['Please confirm password'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

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

  if (authenticated) {

    return <Redirect to="/" />;
  }

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
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
          placeholder="First Name"
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          onChange={updateLastName}
          value={lastName}
          placeholder="Last Name"
        ></input>
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
          type="tel"
          name="phone"
          onChange={updatePhoneNumber}
          value={phoneNumber}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
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
