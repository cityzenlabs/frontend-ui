import React, { ChangeEvent, useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import IDatePicker from "../../../../Library/DatePicker/IDatePicker";
import * as EventService from "../../../../Services/EventService/EventService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

function EventDashboardEdit() {
  const { eventId } = useParams();
  const accessToken = useAuth();
  const [event, setEvent] = useState<any>();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const fetchEventData = async (callback = () => {}) => {
    try {
      const community = await EventService.getEvent(accessToken.token, eventId);
      if (community) {
        setEvent(community);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchEventData()]);
    };

    fetchData();
  }, [eventId, accessToken.token]);

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <ILabel text="Edit Event" />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IInput
            label="Event Name"
            placeholder={event?.name}
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          ></IInput>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IInputGroup
            label="Location"
            inputs={[
              {
                name: "city",
                placeholder: event?.city,
                value: city,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value),
                disabled: true,
              },
              {
                name: "state",
                placeholder: event?.state,
                value: state,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value),
                disabled: true,
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>
      <IContainer>
        <IDatePicker />
      </IContainer>
    </div>
  );
}

export default EventDashboardEdit;
