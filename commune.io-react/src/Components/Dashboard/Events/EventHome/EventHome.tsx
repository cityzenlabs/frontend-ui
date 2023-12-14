import React, { useEffect, useState } from "react";
import ILabel from "../../../../Library/Label/ILabel";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import * as EventService from "../../../../Services/EventService/EventService";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import { useAuth } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import IMenuButton from "../../../../Library/MenuButton/IMenuButton";
import ISpinner from "../../../../Library/Spinner/ISpinner";

function EventHome() {
  const accessToken = useAuth();
  const navigate = useNavigate();
  const [eventHome, setEventHome] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [joinedOrCreated, setJoinedOrCreated] = useState<any>("");
  const [pendingEvents, setPendingEvents] = useState<any>();
  const [ongoingEvents, setOngoingEvents] = useState<any>();
  const [completedEvents, setCompletedEvents] = useState<any>();
  const [route, setRoute] = useState<any>();

  const fetchHome = async () => {
    try {
      const data = await EventService.getEventHome(accessToken.token);
      if (data) {
        setEventHome(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchHome()]);
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (eventHome) {
      if (joinedOrCreated === "Joined") {
        setPendingEvents(eventHome.pendingJoinedEvents);
        setCompletedEvents(eventHome.completedJoinedEvents);
        setOngoingEvents(eventHome.ongoingJoinedEvents);
      } else if (joinedOrCreated === "Created") {
        setPendingEvents(eventHome.pendingCreatedEvents);
        setCompletedEvents(eventHome.completedCreatedEvents);
        setOngoingEvents(eventHome.ongoingCreatedEvents);
      }
    }
  }, [joinedOrCreated, eventHome]);

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="xl:flex lg:flex items-center justify-between pb-4 pt-4">
        <div className="flex items-center">
          <ILabel text="Event Home" />
        </div>
        <div>
          <IMenuButton
            options={[
              {
                label: "Joined",
                action: () => setJoinedOrCreated("Joined"),
              },
              {
                label: "Created",
                action: () => setJoinedOrCreated("Created"),
              },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full pb-4">
        <IPanel height="h-[112px]">
          <div className="text-3xl">{eventHome?.joinedEvents.length}</div>
          <div className="text-xs pr-8">
            JOINED <br /> EVENTS
          </div>
        </IPanel>

        <IPanel height="h-[112px]">
          <div className="text-3xl">{eventHome?.createdEvents.length}</div>
          <div className="text-xs pr-8">
            CREATED <br /> EVENTS
          </div>
        </IPanel>
      </div>

      <IEventPanel
        title="Ongoing"
        buttonLabel="Show All"
        height="600px"
        events={ongoingEvents}
        onEventClick={(eventName, eventId) => {
          joinedOrCreated === "Joined"
            ? navigate(`/event/${eventName}/${eventId}`)
            : navigate(`/event/manage/${eventId}`);
        }}
        marginTop="mt-0"
        paddingB={8}
      />

      <IEventPanel
        title="Pending"
        buttonLabel="Show All"
        height="600px"
        events={pendingEvents}
        onEventClick={(eventName, eventId) => {
          joinedOrCreated === "Joined"
            ? navigate(`/event/${eventName}/${eventId}`)
            : navigate(`/event/manage/${eventId}`);
        }}
        marginTop="mt-0"
        paddingB={8}
      />

      <IEventPanel
        title="Completed"
        buttonLabel="Show All"
        height="600px"
        events={completedEvents}
        onEventClick={(eventName, eventId) => {
          joinedOrCreated === "Joined"
            ? navigate(`/event/${eventName}/${eventId}`)
            : navigate(`/event/manage/${eventId}`);
        }}
        marginTop="mt-0"
        paddingB={8}
      />
    </div>
  );
}

export default EventHome;
