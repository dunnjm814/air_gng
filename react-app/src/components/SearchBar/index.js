import "./SearchBar.css";
import React, { useState } from "react";
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
