import React, { ChangeEvent, useEffect, useState } from "react";
import { Visibility } from "../Enums/EventEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";
import IButton from "../../../../Library/Button/IButton";
import IToggleButtonGroup from "../../../../Library/ToggleButtonGroup/IToggleButtonGroup";
import * as EventService from "../../../../Services/EventService/EventService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import { days } from "./CreateEventConstants";
import { months } from "./CreateEventConstants";
import { years } from "./CreateEventConstants";
import { times } from "./CreateEventConstants";

function CreateEvent({ setEventsVisibility, token, setEventId, user }: any) {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [type, setType] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [day, setDay] = useState<any>();
  const [year, setYear] = useState<any>();
  const [community, setCommunity] = useState<any>();

  const [joinedCommunities, setJoinedCommunities] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CommunityService.getJoinedCommunities(
          token,
          user.id,
        );

        const transformedData = data.map((item: any) => ({
          label: item.communityName,
          value: item.communityId,
        }));

        setJoinedCommunities(transformedData);
      } catch (error) {
        //setError(error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles && selectedImageFiles[0]) {
      setImageFiles([selectedImageFiles[0]]);
    }
  };

  const handleCreateEvent = async () => {
    const formatDateTime = (day: any, month: any, year: any, time: any) => {
      const formattedMonth = month.toString().padStart(2, "0");
      const formattedDay = day.toString().padStart(2, "0");
      return `${year}-${formattedMonth}-${formattedDay}T${time}:00`;
    };
    const event = {
      name: name,
      description: description,
      city: city,
      state: state,
      address: address,
      startTime: formatDateTime(day, month, year, startTime),
      endTime: formatDateTime(day, month, year, endTime),
      type: type,
      category: "NETWORKING",
      attribute: "SOCIAL",
      host: community,
    };

    console.log(event);

    try {
      const result = await EventService.createEvent(event, token);
      if (result.id) {
        setEventId(result.id);
        setEventsVisibility(Visibility.Dashboard);

        if (imageFiles.length > 0) {
          await EventService.updateEventPicture(
            token,
            result.id,
            imageFiles[0],
          );
        }
      }
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <div>
      <IContainer className="pt-8 pb-8">
        <div className="flex">
          <IBackButton onClick={() => setEventsVisibility(Visibility.Events)} />
          <ILabel text="Create Event" className="ml-4"></ILabel>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IInput
            label="Name"
            placeholder="Event Name"
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
          <IDropdown
            labelText="Community"
            placeholder="Select Community"
            options={joinedCommunities}
            onChange={(newValue) => setCommunity(newValue)}
          ></IDropdown>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IInputGroup
            label="Location"
            inputs={[
              {
                name: "city",
                placeholder: "City",
                value: city,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value),
              },
              {
                name: "state",
                placeholder: "State",
                value: state,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value),
              },
              {
                name: "Address",
                placeholder: "address",
                value: address,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value),
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <IToggleButtonGroup
          label="Type"
          options={[
            { value: "HOSTED", label: "Hosted" },
            { value: "MOBILE", label: "Mobile" },
          ]}
          selectedValue={type}
          onChange={setType}
        />
      </IContainer>

      <IContainer className="pb-4">
        <div className="flex xl:w-1/2 lg:w-1/2">
          <div className="mr-2 w-1/3">
            <IDropdown
              labelText="Month"
              placeholder="MM"
              options={months}
              onChange={(newValue) => setMonth(newValue)}
            ></IDropdown>
          </div>

          <div className="mr-2 w-1/3">
            <IDropdown
              labelText="Day"
              placeholder="DD"
              options={days}
              onChange={(newValue) => setDay(newValue)}
            ></IDropdown>
          </div>
          <div className="w-1/3">
            <IDropdown
              labelText="Year"
              placeholder="YY"
              options={years}
              onChange={(newValue) => setYear(newValue)}
            ></IDropdown>
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="flex xl:w-1/2 lg:w-1/2">
          <div className="w-1/2 mr-2">
            <IDropdown
              labelText="Start Time"
              placeholder="00:00"
              options={times}
              onChange={(newValue) => setStartTime(newValue)}
            ></IDropdown>
          </div>
          <div className="w-1/2 ">
            <IDropdown
              labelText="End Time"
              placeholder="00:00"
              options={times}
              onChange={(newValue) => setEndTime(newValue)}
            ></IDropdown>
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2">
          <ITextArea
            name="description"
            placeholder="Enter description here..."
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

      <IContainer className="pb-4">
        <IButton
          onClick={handleCreateEvent}
          className="px-4 py-2"
          text="Publish"
          bgColor="bg-regal-blue"
          textColor="text-white"
        />
      </IContainer>
    </div>
  );
}

export default CreateEvent;
