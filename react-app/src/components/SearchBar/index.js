import "./SearchBar.css";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import search_button from "../../img/airgng-search-button.png";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
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

  // const incomingSearch = useSelector((state) => state.location.location)
  // useEffect(() => {
  //   setLocation(incomingSearch)
  // },[incomingSearch])


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

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      radius: 200 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    // const choice = value
    // dispatch(searchLocation(choice));
    clearSuggestions();
  }

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
