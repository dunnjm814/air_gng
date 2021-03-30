import "./SearchBar.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
// use the above imports instead if refactor for places search in future
import {
  Listbox,
  ListboxOption,
} from "@reach/listbox";
import "@reach/listbox/styles.css";
import "react-nice-dates/build/style.css";
import { searchLocation, searchMap } from "../../store/location";
import {IoSearchCircle} from 'react-icons/io5'



export function DatePickerExample() {
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
  const history = useHistory()
  const [selectVal, setSelectVal] = useState("Flagstaff")
  // const [showCal, setShowCal] = useState(false);
  const [location, setLocation] = useState("");
  const [aircraft, setAircraft] = useState("");

  // const incomingSearch = useSelector((state) => state.location.location)
  // useEffect(() => {
  //   setLocation(incomingSearch)
  // },[incomingSearch])

  // const openCal = () => {
  //   if (showCal) return;
  //   setShowCal(true);
  // };
  // calendar already has a built in open?
  const handleSelect = (locSelect) => {
    let choiceCoords
    if (locSelect === "Los Angeles") {
      choiceCoords = { lat: 34.05, lng: -118.25 };
      setLocation(choiceCoords);
    }
    if (locSelect === "Flagstaff") {
      choiceCoords = { lat: 35.199167, lng: -111.631111 };
      setLocation(choiceCoords);
    }
    if (locSelect === "Phoenix") {
      choiceCoords = { lat: 33.45, lng: -112.066667 };
      setLocation(choiceCoords);
    }
  }
  useEffect(() => {
    handleSelect(selectVal)
  }, [selectVal])
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(searchMap({location, aircraft}));
    return history.push('/map')
  };
  return (
    <div id="search-wrap">
      <form className="search" onSubmit={onSubmit}>
        <div className="search-location">
          <label>
            <div>
              <Listbox
                id="place-search"
                value={selectVal}
                // onChange={handleInput}
                onChange={setSelectVal}
              >
                <ListboxOption key={'la'} value="Los Angeles">
                  Los Angeles
                </ListboxOption>
                <ListboxOption key={'f'} value="Flagstaff">
                  Flagstaff
                </ListboxOption>
                <ListboxOption key={'p'} value="Phoenix">
                  Phoenix
                </ListboxOption>
              </Listbox>
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
          {/* <div>Number of guests?</div> */}
          <div>Guests</div>
        </div>
        <button type="submit" className="search-button">
          <a href="#">
            <IoSearchCircle />
          </a>
        </button>
      </form>
    </div>
  );
};

// function PlacesSearch() {
//   const dispatch = useDispatch()
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 34.81723, lng: () => -114.34576 },
//       radius: 200 * 1000,
//     },
//   });
//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };
//   const handleSelect = async (address) => {
//     setValue(address, false);
//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     const choice = {lat, lng}
//     await dispatch(searchLocation(choice));
//     clearSuggestions();
//   }
//   return (
//     <div>
//       <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           id='place-search'
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// Places search code for future reference, or when we scale to more than 3 cities
// }
export default Search;
