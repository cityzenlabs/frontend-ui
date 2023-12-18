import React, { ChangeEvent, useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";
import IButton from "../../../../Library/Button/IButton";
import * as EventService from "../../../../Services/EventService/EventService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IDropdown from "../../../../Library/Dropdown/IDropdown";

import { times } from "./EventCreateConstants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import { useDash } from "../../../../Context/DashboardContext";
import { CategoryKey, EventCreateMapping } from "./EventCreateMapping";
import IDatePicker from "../../../../Library/DatePicker/IDatePicker";
import ISpinner from "../../../../Library/Spinner/ISpinner";

function EventCreate({}: any) {
  let navigate = useNavigate();
  const accessToken = useAuth();
  const { user } = useDash();
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [type, setType] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [year, setYear] = useState<any>();
  const [community, setCommunity] = useState<any>("");
  const [category, setCategory] = useState<any>();
  const [attribute, setAttribute] = useState<any>();

  const [joinedCommunities, setJoinedCommunities] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categoryOptions = Object.entries(EventCreateMapping).map(
    ([key, value]) => ({
      label: key.replace(/_/g, " "), // Format the label for display
      value: key,
    }),
  );

  const handleCategoryChange = (selectedCategory: CategoryKey) => {
    setCategory(selectedCategory);
    setAttribute(EventCreateMapping[selectedCategory]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CommunityService.getJoinedCommunities(
          accessToken.token,
          user?.id,
        );
        const transformedData = data.map((community: any) => ({
          label: community.name,
          value: community.id,
        }));

        setJoinedCommunities(transformedData);
      } catch (error) {
        // Handle errors if needed
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [accessToken.token, user?.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles && selectedImageFiles[0]) {
      setImageFiles([selectedImageFiles[0]]);
    }
  };

  const handleCreateEvent = async () => {
    const combineDateTime = (date: Date, time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      date.setHours(hours, minutes, 0, 0);
      return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0") +
        "T" +
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0") +
        ":" +
        String(date.getSeconds()).padStart(2, "0")
      );
    };

    const formattedStartTime = combineDateTime(new Date(startDate), startTime);
    const formattedEndTime = combineDateTime(new Date(endDate), endTime);
    const event = {
      name: name,
      description: description,
      city: user.city,
      state: user.state,
      address: address,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      type: type,
      category: category,
      attribute: attribute,
      hostId: community,
    };

    try {
      const result = await EventService.createEvent(event, accessToken.token);
      if (result) {
        navigate(`/event/manage/${result.id}`);
        if (imageFiles.length > 0) {
          await EventService.updateEventPicture(
            accessToken.token,
            result?.id,
            imageFiles[0],
          );
        }
      }
    } catch (error) {}
  };

  if (loading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text="Create Event"></ILabel>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <IInput
          label="Event Name"
          placeholder=""
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        ></IInput>
      </div>

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <IDropdown
          labelText="Community"
          options={joinedCommunities}
          onChange={(newValue) => setCommunity(newValue)}
          value={community}
        ></IDropdown>
      </div>

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
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

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <IInput
          label="Address"
          placeholder=""
          name="name"
          value={address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
        ></IInput>
      </div>

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <IDropdown
          labelText="Type"
          options={[
            { value: "SOCIAL", label: "Social" },
            { value: "HOSTED", label: "Hosted" },
          ]}
          value={type}
          onChange={setType}
        />
      </div>

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <IDropdown
          labelText="Category"
          options={categoryOptions}
          onChange={(newValue) => handleCategoryChange(newValue as CategoryKey)}
          value={category}
        ></IDropdown>
      </div>

      <div className="xl:flex xl:gap-2 xl:w-1/2 lg:w-1/2 ">
        <div className="w-full pb-4">
          <IDatePicker
            label="Start Date"
            onChange={(newValue: any) => setStartDate(newValue)}
            value={startDate}
          />
        </div>
        <div className="w-full pb-4">
          <IDatePicker
            label="End Date"
            onChange={(newValue: any) => setEndDate(newValue)}
            value={endDate}
          />
        </div>
      </div>

      <div className="flex xl:w-1/2 lg:w-1/2 pb-4">
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

      <div className="pb-4">
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
      </div>

      <div className="pb-4">
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </div>

      <div className="pb-4">
        <IButton
          onClick={handleCreateEvent}
          className="px-4 py-2"
          text="Publish"
          bgColor="bg-regal-blue"
          textColor="text-white"
        />
      </div>
    </div>
  );
}

export default EventCreate;
