import "./SearchBar.css";
import React, { useState } from "react";
import search_button from "../../img/airgng-search-button.png";
import CalendarApp from "./calendar";
import DatePickerExample from "./dates";

const Search = () => {
  const [showCal, setShowCal] = useState(false);

  const openCal = () => {
    if (showCal) return;
    setShowCal(true);
  };

  return (
    <>
      <div className="search">
        <div className="search-location">
          <div>
            <b>Location</b>
          </div>
          <div>Where are you going?</div>
        </div>
        <div>
          <DatePickerExample />
          <div>Flying Date</div>
        </div>
        <div>
          <div>Aircraft Type</div>
          <div>What are you flying?</div>
        </div>
        <div>
          <div>Guests</div>
          <div>Add dates</div>
        </div>
        <button>
          <img className="search-button" src={search_button} />
        </button>
      </div>
    </>
  );
};

export default Search;
