import React, { useEffect, useState } from "react";
import { Visibility } from "../Reusable/Enums/EventEnums";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import * as EventService from "../../../../Services/EventService/EventService";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import IDropdown from "../../../../Library/Dropdown/IDropdown";

function EventHome({ setEventId, token, handleBack, handleForward }: any) {
  const [eventHome, setEventHome] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [joinedOrCreated, setJoinedOrCreated] = useState<any>("Joined");
  const [pendingEvents, setPendingEvents] = useState<any>();
  const [ongoingEvents, setOngoingEvents] = useState<any>();
  const [completedEvents, setCompletedEvents] = useState<any>();

  const fetchHome = async () => {
    try {
      const data = await EventService.getEventHome(token);
      if (data) {
        setEventHome(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchHome()]);
      setJoinedOrCreated("Joined");
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
    return <div></div>;
  }

  return (
    <div>
      <div>
        <IContainer className="pb-8 pt-8">
          <div className="xl:flex lg:flex items-center justify-between">
            <div className="flex items-center">
              <IBackButton onClick={handleBack} />
              <ILabel className="ml-4" text="Event Home" />
            </div>
            <div className="w-[200px]">
              <IDropdown
                labelText=""
                value={joinedOrCreated}
                options={[
                  { value: "Joined", label: "Joined" },
                  { value: "Created", label: "Created" },
                ]}
                onChange={(newValue) => setJoinedOrCreated(newValue)}
              />
            </div>
          </div>
        </IContainer>

        <IContainer className="pb-8">
          <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
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

            <IPanel height="h-[112px]">
              <div className="text-3xl">0</div>
              <div className="text-xs pr-8">
                PENDING <br />
                REQUESTS
              </div>
            </IPanel>
          </div>
        </IContainer>

        <IContainer className="pb-8">
          <div>
            <IPanel title="Ongoing" buttonLabel="Show All" height="600px">
              <IEventPanel
                events={ongoingEvents}
                onEventClick={(id) => {
                  handleForward(
                    Visibility.EventHome,
                    joinedOrCreated === "Joined"
                      ? Visibility.Event
                      : Visibility.Dashboard,
                  );
                  setEventId(id);
                }}
              />
            </IPanel>
          </div>
        </IContainer>

        <IContainer className="pb-8">
          <div>
            <IPanel title="Pending" buttonLabel="Show All" height="600px">
              <IEventPanel
                events={pendingEvents}
                onEventClick={(id) => {
                  handleForward(
                    Visibility.EventHome,
                    joinedOrCreated === "Joined"
                      ? Visibility.Event
                      : Visibility.Dashboard,
                  );
                  setEventId(id);
                }}
              />
            </IPanel>
          </div>
        </IContainer>

        <IContainer className="pb-8">
          <div>
            <IPanel title="Completed" buttonLabel="Show All" height="600px">
              <IEventPanel
                events={completedEvents}
                onEventClick={(id) => {
                  handleForward(
                    Visibility.EventHome,
                    joinedOrCreated === "Joined"
                      ? Visibility.Event
                      : Visibility.Dashboard,
                  );
                  setEventId(id);
                }}
              />
            </IPanel>
          </div>
        </IContainer>
      </div>
    </div>
  );
}

export default EventHome;
