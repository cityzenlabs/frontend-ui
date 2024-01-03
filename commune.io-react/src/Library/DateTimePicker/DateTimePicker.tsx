import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css"; // This imports default styles
import moment from "moment";

function IDateTimePicker({ label }: any) {
  const [date, setDate] = useState(moment());

  const handleDateChange = (newDate: any) => {
    if (moment.isMoment(newDate)) {
      setDate(newDate);
    }
  };

  const customStyles = {
    backgroundColor: "rgb(249, 250, 251)",
    borderColor: "#d3d3d3",
    color: "#595959",
    fontSize: "0.75rem", // same as IInput
    borderRadius: "0.5rem", // same as IInput
    padding: "0.625rem", // same as IInput
    outline: "none",
    boxShadow: "none",
    width: "100%", // Ensure input takes full width
    "&:focus": {
      borderColor: "#007bff",
      boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    },
    border: "1px solid #d3d3d3", // Match IInput border style
    lineHeight: "18px", // Adjust line-height if needed
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor="datetime-picker" className="text-sm font-thin block">
          {label}
        </label>
      )}
      <Datetime
        value={date}
        onChange={handleDateChange}
        isValidDate={(current) => current.isAfter(moment().subtract(1, "day"))}
        inputProps={{ style: customStyles }}
        className="w-full "
      />
    </div>
  );
}

export default IDateTimePicker;
