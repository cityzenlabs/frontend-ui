import React, { useEffect, useState } from "react";
import EventPortal from "./EventPortal/EventPortal";
import { Visibility } from "./Enums/EventEnums";
import CreateEvents from "./CreateEvents/CreateEvents";
import * as EventService from "../../../Services/EventService/EventService";
import { useAuth } from "../../../AuthContext";
import IContainer from "../../../Library/Container/IContainer";
import IPanel from "../../../Library/Panel/IPanel";
import IEventPanel from "../../../Library/EventPanel/IEventPanel";
import ILabel from "../../../Library/Label/ILabel";
import IInput from "../../../Library/Input/IInput";
import IButton from "../../../Library/Button/IButton";

function Events() {
  const [eventsVisibility, setEventsVisibility] = useState<Visibility>(
    Visibility.Events,
  );
  const [eventsHome, setEventsHome] = useState<any>();
  const accessToken = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EventService.getEventHome(accessToken.token);
        setEventsHome(data);
      } catch (error) {
        //setError(error);
      }
    };

    fetchData();
  }, [eventsVisibility]);

  const handleMangeEvents = () => {
    setEventsVisibility(Visibility.Manage);
  };

  const handleCreateEvent = () => {
    setEventsVisibility(Visibility.Create);
  };

  return (
    <div>
      <div>
        {eventsVisibility === Visibility.Manage && (
          <EventPortal setEventsVisibility={setEventsVisibility} />
        )}

        {eventsVisibility === Visibility.Create && (
          <CreateEvents setEventsVisibility={setEventsVisibility} />
        )}

        {eventsVisibility === Visibility.Events && (
          <div>
            <IContainer paddingY={8}>
              <div className="flex items-center justify-between flex-wrap">
                <div className="inline-block">
                  <ILabel text="Events" />
                </div>

                <div className="flex flex-wrap gap-4   mt-4 lg:mt-0 xl:mt-0">
                  <IInput placeholder="Search Community" name="search" />

                  <IButton text="Manage Events" onClick={handleMangeEvents} />
                  <IButton
                    text="Create Event"
                    onClick={() => setEventsVisibility(Visibility.Create)}
                    bgColor="bg-regal-blue"
                    textColor="text-white"
                    icon={<span>+</span>}
                  />
                </div>
              </div>
            </IContainer>
            <IContainer className="pb-8">
              <div>
                <IPanel title="Trending" buttonLabel="See All" height="600px">
                  <IEventPanel events={eventsHome?.trendingEvents ?? {}} />
                </IPanel>
              </div>
            </IContainer>
            <IContainer className="pb-8">
              <div>
                <IPanel title="Upcoming" buttonLabel="See All" height="600px">
                  <IEventPanel events={eventsHome?.upcomingEvents ?? {}} />
                </IPanel>
              </div>
            </IContainer>
            <IContainer className="pb-8">
              <div>
                <IPanel
                  title="Recommended"
                  buttonLabel="See All"
                  height="600px"
                >
                  <IEventPanel events={eventsHome?.recommendedEvents ?? {}} />
                </IPanel>
              </div>
            </IContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
