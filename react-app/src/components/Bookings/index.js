import "./Bookings.css";
import React, {useState} from "react";
import { DatePicker } from "react-nice-dates";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import { enGB } from "date-fns/locale";
import * as bookingActions from '../../store/booking'
const Bookings = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [date, setDate] = useState();
    const [toggle, setToggle] = useState(false)
    const currentDate = new Date();
    const {craft_id} = useParams();
    const userId = sessionUser.id;
    console.log('the params', craft_id)
    const onSubmit = (e) => {
        e.preventDefault()
        setToggle(true)
        dispatch(bookingActions.submitBooking(date, null, null, userId, craft_id))
        dispatch(bookingActions.getBookings(userId))
    }
    return (
        <div className="booking-wrapper">
            <span>Book Here</span>
            <form onSubmit={onSubmit}>
                <span>Day to book:</span>
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
                <button type='submit'>Reserve</button>
                {toggle && <div>Reservation confirmed!</div>}
            </form>
        </div>
    )
}

export default Bookings
