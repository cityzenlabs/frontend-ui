import React, { ChangeEvent, useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import IDatePicker from "../../../../Library/DatePicker/IDatePicker";
import * as EventService from "../../../../Services/EventService/EventService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import { times } from "../EventCreate/EventCreateConstants";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";

function EventDashboardEdit() {
  const { eventId } = useParams();
  const accessToken = useAuth();
  const [event, setEvent] = useState<any>();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
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
      console.log(event);
      if (event) {
        setEvent(event);
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
      <IContainer className="pb-4 pt-4">
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
      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
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
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IDropdown
            labelText="Type"
            options={[
              { value: "SOCIAL", label: "Social" },
              { value: "HOSTED", label: "Hosted" },
            ]}
            value={type}
            onChange={setType}
            placeholder={event?.type}
          />
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="flex gap-2 w-full lg:w-1/2 xl:w-1/2">
          <div className="xl:w-1/2 w-full">
            <IDatePicker label="Start Date" placeholder={event?.startTime} />
          </div>
          <div className="xl:w-1/2 w-full">
            <IDatePicker label="End Date" placeholder={event?.endTime} />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="flex xl:w-1/2 lg:w-1/2">
          <div className="w-1/2 mr-2">
            <IDropdown
              labelText="Start Time"
              options={times}
              onChange={(newValue) => setStartTime(newValue)}
              value={startTime}
            ></IDropdown>
          </div>
          <div className="w-1/2 ">
            <IDropdown
              labelText="End Time"
              options={times}
              onChange={(newValue) => setEndTime(newValue)}
              value={endTime}
            ></IDropdown>
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2">
          <ITextArea
            name="description"
            placeholder={event?.description}
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </IContainer>
    </div>
  );
}

export default EventDashboardEdit;
