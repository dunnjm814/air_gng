import React, { useState } from "react"
import { useDispatch } from "react-redux";
import {submitProfile} from '../../store/profile'



function AboutUserForm({ userProfile, info, setInfo }) {
  const dispatch = useDispatch()
  function toggle() {
    setInfo(!info);
  }
  const [about, setAbout] = useState(userProfile.about);
  const [location, setLocation] = useState(userProfile.location);
  const [work, setWork] = useState(userProfile.work);
  const [language, setLanguage] = useState(userProfile.language)

  const onSubmit = async () => {
    const userId = userProfile.userId
    await dispatch(submitProfile(about, location, work, language, userId))
  }
  const languages = [
    {value: 'English', label: 'English'},
    {value: 'French', label: 'French'},
    {value: 'Russian', label: 'Russian'},
    {value: 'Italian', label: 'Italian'},
    {value: 'German', label: 'German'},
    {value: 'Chinese', label: 'Chinese'},
    {value: 'Spanish', label: 'Spanish'},
    {value: 'Sign Language', label: 'Sign Language'},
  ]
  return (
    <>
      <form id="about-user-form-wrap" onSubmit={onSubmit}>
        <h1>hey its a form</h1>
        <label>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></input>
        </label>
        <label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </label>
        <label>
          <input
            type="text"
            value={work}
            onChange={(e) => setWork(e.target.value)}
          ></input>
        </label>
        <label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((language) => {
              return <option key={language.value} value={language.value}>{language.label}</option>
            })}
          </select>
        </label>
        <div>
          <button onClick={toggle}>cancel</button>
          <button type="submit">submit</button>
        </div>
      </form>
    </>
  );
}
export default AboutUserForm
