import React, { useEffect, useState } from "react";
import ILabel from "../../../../Library/Label/ILabel";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import IPanel from "../../../../Library/Panel/IPanel";
import ITab from "../../../../Library/Tab/ITab";
import EventPhotoForm from "../Reusable/EventPhotoForm";
import EventDetailForm from "../Reusable/EventDetailForm";
import IButton from "../../../../Library/Button/IButton";
import EventLocationTimeForm from "../Reusable/EventLocationTimeForm";
import { useDash } from "../../../../Context/DashboardContext";

function EventDashboardEdit() {
  const { eventId } = useParams();
  const { user } = useDash();
  const accessToken = useAuth();
  const [event, setEvent] = useState<any>();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [description, setDescription] = useState("");

  const [tabValue, setTabValue] = React.useState(0);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles && selectedImageFiles[0]) {
      setImageFiles([selectedImageFiles[0]]);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditEvent = () => {};

  useEffect(() => {
    if (location.state?.event) {
      setEvent(location.state.event);
    }
    setIsLoading(false);
  }, [accessToken.token]);

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text="Edit Event" />
      </div>
      <IPanel>
        <ITab
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          tabs={["Details", "Location & Time", "Photos"]}
        />
        <div className="xl:pl-[14.5%] xl:pr-[14.5%] mt-10">
          {tabValue === 0 && (
            <EventDetailForm
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              isEdit={true}
              event={event}
            />
          )}
          {tabValue === 1 && (
            <EventLocationTimeForm event={event} user={user} />
          )}
          {tabValue === 2 && (
            <EventPhotoForm
              imageFiles={imageFiles}
              handleImageChange={handleImageChange}
              picture={event?.photo}
            />
          )}
          <div className="pb-4">
            <IButton
              onClick={handleEditEvent}
              className="px-4 py-2 "
              text="Save"
              bgColor="bg-regal-blue"
              textColor="text-white"
            />
          </div>
        </div>
      </IPanel>
    </div>
  );
}

export default EventDashboardEdit;
