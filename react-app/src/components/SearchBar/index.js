import "./SearchBar.css"
import React from "react"
import search_button from "../../img/airgng-search-button.png"

const Search = () => {
    return (
        <div className="search">
          <div className="search-location">
            <div><b>Location</b></div>
            <div>Where are you going?</div>
          </div>
          <div>
            <div><b>Check In</b></div>
            <div>Add Dates</div>
          </div>
          <div>
            <div>Aircraft Carrier</div>
            <div>What are you flying?</div>
          </div>
          <div>
            <div>Guests</div>
            <div>Add dates</div>
          </div>
          <button>
              <img className="search-button" src={search_button}/>
          </button>
        </div>
    );
  };

  export default Search;
