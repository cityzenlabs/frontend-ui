import React, { ChangeEvent } from "react";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import IInput from "../../../../Library/Input/IInput";
import IDateTimePicker from "../../../../Library/DateTimePicker/DateTimePicker";
import moment from "moment";

function EventLocationTimeForm({
  user,
  city,
  state,
  setCity,
  setState,
  address,
  setAddress,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  event,
}: any) {
  return (
    <div>
      <div className="pb-4">
        <IInputGroup
          label="Location"
          inputs={[
            {
              name: "city",
              placeholder: user?.city,
              value: city,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value),
              disabled: true,
            },
            {
              name: "state",
              placeholder: user?.state,
              value: state,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value),
              disabled: true,
            },
          ]}
        ></IInputGroup>
      </div>
      <div className="pb-4">
        <IInput
          label="Address"
          placeholder={event ? event?.address : ""}
          name="name"
          value={address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
        ></IInput>
      </div>

      <div className="pb-4">
        <div className="xl:flex w-full gap-2">
          <div className="flex-grow pb-4">
            <IDateTimePicker
              label="Start Date"
              value={startTime}
              onChange={(newDate: any) => setStartTime(newDate)}
              placeholder={
                event
                  ? moment(event.startTime).format("MM/DD/YYYY hh:mm A")
                  : ""
              }
            />
          </div>
          <div className="flex-grow">
            <IDateTimePicker
              label="End Date"
              value={endTime}
              onChange={(newDate: any) => setEndTime(newDate)}
              placeholder={
                event ? moment(event.endTime).format("MM/DD/YYYY hh:mm A") : ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventLocationTimeForm;
