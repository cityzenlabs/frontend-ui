import React, { useEffect, useState } from "react";
import ILabel from "../../../../Library/Label/ILabel";
import * as EventService from "../../../../Services/EventService/EventService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import { useDash } from "../../../../Context/DashboardContext";
import { CategoryKey, EventCreateMapping } from "./EventCreateMapping";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import IPanel from "../../../../Library/Panel/IPanel";
import IStepper from "../../../../Library/Stepper/IStepper";
import EventDetailForm from "../Reusable/EventDetailForm";
import { Button } from "@mui/material";
import EventLocationTimeForm from "../Reusable/EventLocationTimeForm";
import EventPhotoForm from "../Reusable/EventPhotoForm";
import moment from "moment";

function EventCreate({}: any) {
  let navigate = useNavigate();
  const accessToken = useAuth();
  const { user, joinEvent } = useDash();
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [type, setType] = useState<any>();
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
    setLoading(true);
    const event = {
      name: name,
      description: description,
      city: user.city,
      state: user.state,
      address: address,
      startTime: moment(startTime).format("YYYY-MM-DDTHH:mm:ss"),
      endTime: moment(endTime).format("YYYY-MM-DDTHH:mm:ss"),
      type: type,
      category: category,
      attribute: attribute,
      hostId: community,
    };

    try {
      const result = await EventService.createEvent(event, accessToken.token);

      if (result) {
        navigate(`/event/manage/${result.id}`);
        joinEvent(result.id);
        if (imageFiles.length > 0) {
          await EventService.updateEventPicture(
            accessToken.token,
            result?.id,
            imageFiles[0],
          );
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
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
