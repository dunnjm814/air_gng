import "./SearchBar.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import search_button from "../../img/airgng-search-button.png";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "react-nice-dates/build/style.css";
import "@reach/combobox/styles.css";
import { searchLocation } from "../../store/location";

// const libraries = ["places"];

function DatePickerExample() {
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
  const dispatch = useDispatch();

  const [showCal, setShowCal] = useState(false);
  const [location, setLocation] = useState("");
  const [aircraft, setAircraft] = useState("");
  setLocation(location = useSelector((state) => state.location))

  const openCal = () => {
    if (showCal) return;
    setShowCal(true);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(showCal, location, aircraft);
    return <Redirect to="/map" />;
  };
  return (
    <>
      <div>
        <form className="search" onSubmit={onSubmit}>
          <div className="search-location">
            <label>
              {/* <div>
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
              </div> */}
              <PlacesSearch />
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
              <option value={""}>pick an aircraft</option>
              <option value={"HangGlider"}>Hang glider </option>
              <option value={"Helicopter"}>Helicopter</option>
              <option value={"HotAirBalloon"}>Hot air balloon</option>
              <option value={"JetPack"}>Jet pack</option>
              <option value={"LiteAircraft"}>Lite aircraft</option>
              <option value={"PrivateJet"}>Private Jet</option>
              <option value={"SkyDiving"}>Sky Diving</option>
              <option value={"WingSuit"}>Wing suit</option>
            </select>
            <div>What are you flying?</div>
          </div>
          <div>
            <div>Guests</div>
          </div>
          <button type="submit">
            <img className="search-button" src={search_button} />
          </button>
        </form>
      </div>
    </>
  );
};



function PlacesSearch() {
  const dispatch = useDispatch()
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  //   libraries
  // });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      radius: 200 * 1000,
      // debounce: 300,
    }
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    const choice = setValue(address, false);
    dispatch(searchLocation(choice))
    clearSuggestions();

  }

  // if (loadError) return "Error";
  // if (!isLoaded) return "Loading...";

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          id='place-search'
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );

}
export default Search;
