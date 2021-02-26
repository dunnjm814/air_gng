import "./Bookings.css";
import React from "react";
import DatePickerExample from "../SearchBar/dates";


const Bookings = () => {

    return (
        <form>
            <DatePickerExample />
            <input>Guests</input>
            <submit>Reserve</submit>
        </form>
    )
}

export default Bookings
