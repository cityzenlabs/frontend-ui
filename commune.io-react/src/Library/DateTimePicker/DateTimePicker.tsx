import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

function IDateTimePicker({ label, value, onChange, placeholder }: any) {
  const customStyles = {
    backgroundColor: "rgb(249, 250, 251)",
    borderColor: "#d3d3d3",
    color: "#595959",
    fontSize: "0.75rem",
    borderRadius: "0.5rem",
    padding: "0.625rem",
    outline: "none",
    boxShadow: "none",
    width: "100%",
    border: "1px solid #d3d3d3",
    lineHeight: "16px",
    "&:focus": {
      borderColor: "#007bff",
      boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    },
  };

  const renderInput = (props: any, openCalendar: any) => {
    return (
      <input
        {...props}
        style={customStyles}
        placeholder={placeholder}
        onFocus={openCalendar}
      />
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor="datetime-picker" className="text-sm font-thin block">
          {label}
        </label>
      )}
      <Datetime
        value={value}
        onChange={onChange}
        isValidDate={(current) => current.isAfter(moment().subtract(1, "day"))}
        renderInput={renderInput}
        className="w-full mt-1"
      />
    </div>
  );
}

export default IDateTimePicker;
