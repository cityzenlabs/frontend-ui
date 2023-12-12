import React, { ChangeEvent, useEffect, useState } from "react";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import * as EventService from "../../../../Services/EventService/EventService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import { times } from "../EventCreate/EventCreateConstants";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import BasicDateTimePicker from "../../../../Library/DateTimePicker/DateTimePicker";

function EventDashboardEdit() {
  const { eventId } = useParams();
  const accessToken = useAuth();
  const [event, setEvent] = useState<any>();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState("");

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles && selectedImageFiles[0]) {
      setImageFiles([selectedImageFiles[0]]);
    }
  };

  const fetchEventData = async (callback = () => {}) => {
    try {
      const event = await EventService.getEvent(accessToken.token, eventId);
      if (event) {
        setEvent(event);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchEventData()]);
      } catch (error) {}
      setIsLoading(false);
    };

    fetchData();
  }, [eventId, accessToken.token]);

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="xl:flex lg:flex items-center justify-between pb-4 pt-4">
        <div className="flex items-center">
          <ILabel text="Edit Event" />
        </div>
      </div>

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
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

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
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

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <IInput
          label="Address"
          placeholder={event?.address}
          name="name"
          value={address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
        ></IInput>
      </div>
      <BasicDateTimePicker />
      <BasicDateTimePicker />

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <ITextArea
          name="description"
          placeholder={event?.description}
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <div className="pb-4">
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </div>
    </div>
  );
}

export default EventDashboardEdit;
