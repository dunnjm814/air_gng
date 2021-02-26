import "./SearchBar.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom"
import {useDispatch} from 'react-redux'
import search_button from "../../img/airgng-search-button.png";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";

function DatePickerExample() {
  const [startDate, setStartDate] = useState();
  const [date, setDate] = useState();
  const currentDate = new Date();

  return (
    <DatePicker
      date={date}
      format="MM-dd-yyy"
      onDateChange={setDate}
      minimumDate={currentDate}
      locale={enGB}
    >
      {({ inputProps, focused }) => (
        <input
          id="datebox"
          className={"input" + (focused ? " -focused" : "")}
          {...inputProps}
        />
      )}
    </DatePicker>
  );
}

const Search = () => {
  const dispatch = useDispatch()
  const [showCal, setShowCal] = useState(false);
  const [location, setLocation] = useState('');
  const [aircraft, setAircraft] = useState('');

  const openCal = () => {
    if (showCal) return;
    setShowCal(true);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch()
    return <Redirect to='/map'/>

  }
  return (
    <>
      <div>
        <form className="search" onSubmit={onSubmit}>
          <div className="search-location">
            <label for="local-search">
              <div>
                <input
                  id="locationBox"
                  name="local-search"
                  type="text"
                  value={location}
                  placeholder="Enter a city"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                ></input>
              </div>
              Where are you going?
            </label>
          </div>
          <div>
            <DatePickerExample />
            <div>Flying Date</div>
          </div>
          <div>
            <select
              id="select-field"
              value={aircraft}
              onChange={(e) => setAircraft(e.target.value)}
            >
              <option
              value={''}
              >pick an aircraft</option>
              <option
              value={'HangGlider'}
              >Hang glider </option>
              <option
              value={'Helicopter'}
              >Helicopter</option>
              <option
              value={'HotAirBalloon'}
              >Hot air balloon</option>
              <option
              value={'JetPack'}
              >
                Jet pack
              </option>
              <option
              value={'LiteAircraft'}
              >
                Lite aircraft
              </option>
              <option
              value={'PrivateJet'}
              >
                Private Jet
              </option>
              <option
                value={'SkyDiving'}
              >
                Sky Diving
              </option>
              <option
              value={"WingSuit"}
              >
                Wing suit
              </option>
            </select>
            <div>What are you flying?</div>
          </div>
          <div>
            <div>Guests</div>
          </div>
          <button type='submit'>
            <img className="search-button" src={search_button} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
