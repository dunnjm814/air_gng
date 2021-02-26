import React, { useState } from "react";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import { getDay } from "date-fns";
import "react-nice-dates/build/style.css";

function DatePickerExample() {
  const [startDate, setStartDate] = useState();
  const [date, setDate] = useState();

  return (
    <DatePicker
      date={date}
      format="MM-dd-yyy"
      onDateChange={setDate}
      locale={enGB}
    >
      {({ inputProps, focused }) => (
        <input
          className={"input" + (focused ? " -focused" : "")}
          {...inputProps}
        />
      )}
    </DatePicker>
  );
}

export default DatePickerExample;
