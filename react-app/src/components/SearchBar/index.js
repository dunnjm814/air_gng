import "./SearchBar.css";
import React, { useState } from "react";
import search_button from "../../img/airgng-search-button.png";
import DatePickerExample from "./dates";

const Search = () => {
  const [showCal, setShowCal] = useState(false);

  const openCal = () => {
    if (showCal) return;
    setShowCal(true);
  };

  return (
    <>
      <form className="search">
        <div className="search-location">
          <div>
            <b>Location</b>
          </div>
          <input placeholder="Where are you going?"></input>
        </div>
        <div>
          <div>Flying Date</div>
          <DatePickerExample />
        </div>
        <div>
          <div>Aircraft Type</div>
          <select placeholder="What are you flying?">
            <option value="">Helicopter</option>
          </select>
        </div>
        <div>
          <div>Guests</div>
          <input placeholder="Add dates"></input>
        </div>
        <button>
          <img className="search-button" src={search_button} />
        </button>
      </form>
    </>
  );
};

export default Search;
