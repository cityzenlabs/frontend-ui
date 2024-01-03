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
import IPanel from "../../../../Library/Panel/IPanel";
import IStepper from "../../../../Library/Stepper/IStepper";
import EventDetailForm from "../Reusable/EventDetailForm";
import { Button } from "@mui/material";
import EventLocationTimeForm from "../Reusable/EventLocationTimeForm";
import EventPhotoForm from "../Reusable/EventPhotoForm";

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
  const [community, setCommunity] = useState<any>("");
  const [category, setCategory] = useState<any>();
  const [attribute, setAttribute] = useState<any>();
  const [joinedCommunities, setJoinedCommunities] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const steps = ["Details", "Location & Time", "Photos"];
  const [activeStep, setActiveStep] = useState(1);

  const categoryOptions = Object.entries(EventCreateMapping).map(
    ([key, value]) => ({
      label: key.replace(/_/g, " "),
      value: key,
    }),
  );

  const handleCategoryChange = (selectedCategory: CategoryKey) => {
    setCategory(selectedCategory);
    setAttribute(EventCreateMapping[selectedCategory]);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
      <IPanel>
        <IStepper steps={steps} activeStep={activeStep} />
        <div className="xl:pl-[14.5%] xl:pr-[14.5%] mt-10">
          {activeStep === 1 && (
            <EventDetailForm
              name={name}
              setName={setName}
              joinedCommunities={joinedCommunities}
              community={community}
              setCommunity={setCommunity}
              type={type}
              setType={setType}
              category={category}
              categoryOptions={categoryOptions}
              handleCategoryChange={handleCategoryChange}
              description={description}
              setDescription={setDescription}
            />
          )}

          {activeStep === 2 && (
            <EventLocationTimeForm
              user={user}
              city={city}
              state={state}
              setCity={setCity}
              setState={setState}
              address={address}
              setAddress={setAddress}
            />
          )}

          {activeStep === 3 && (
            <EventPhotoForm
              imageFiles={imageFiles}
              handleImageChange={handleImageChange}
            />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            color="inherit"
            disabled={activeStep === 1}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length ? (
              <span onClick={handleCreateEvent}>Create</span>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </IPanel>
    </div>
  );
}

export default EventCreate;
