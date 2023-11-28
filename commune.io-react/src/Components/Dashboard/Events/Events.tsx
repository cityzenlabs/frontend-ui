import React, { useEffect, useState } from "react";
import EventPortal from "./EventPortal/EventPortal";
import { Visibility } from "./Enums/EventEnums";
import CreateEvent from "./CreateEvent/CreateEvent";
import * as EventService from "../../../Services/EventService/EventService";
import { useAuth } from "../../../AuthContext";
import IContainer from "../../../Library/Container/IContainer";
import IPanel from "../../../Library/Panel/IPanel";
import IEventPanel from "../../../Library/EventPanel/IEventPanel";
import ILabel from "../../../Library/Label/ILabel";
import IInput from "../../../Library/Input/IInput";
import IButton from "../../../Library/Button/IButton";
import Event from "./Event/Event";
import EventDashboard from "./EventDashboard/EventDashboard";

function Events({ user }: any) {
  const [eventsVisibility, setEventsVisibility] = useState<Visibility>(
    Visibility.Events,
  );
  const [eventsHome, setEventsHome] = useState<any>();
  const [eventId, setEventId] = useState("");
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);

  const accessToken = useAuth();

  const toggleShowAllTrending = () => {
    setShowAllTrending((prev) => !prev);
    if (!showAllTrending) {
      setShowAllUpcoming(false);
      setShowAllRecommended(false);
    }
  };

  const toggleShowAllUpcoming = () => {
    setShowAllUpcoming((prev) => !prev);
    if (!showAllUpcoming) {
      setShowAllTrending(false);
      setShowAllRecommended(false);
    }
  };

  const toggleShowAllRecommended = () => {
    setShowAllRecommended((prev) => !prev);
    if (!showAllRecommended) {
      setShowAllTrending(false);
      setShowAllUpcoming(false);
    }
  };

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
    setEventsVisibility(Visibility.Portal);
  };

  return (
    <div>
      <div>
        {eventsVisibility === Visibility.Portal && (
          <EventPortal
            setEventsVisibility={setEventsVisibility}
            setEventId={setEventId}
          />
        )}

        {eventsVisibility === Visibility.Create && (
          <CreateEvent
            setEventsVisibility={setEventsVisibility}
            token={accessToken.token}
            setEventId={setEventId}
            user={user}
          />
        )}

        {eventsVisibility === Visibility.Event && (
          <Event
            setEventsVisibility={setEventsVisibility}
            eventId={eventId}
            token={accessToken.token}
            user={user}
          />
        )}

        {eventsVisibility === Visibility.Dashboard && (
          <EventDashboard
            setEventsVisibility={setEventsVisibility}
            eventId={eventId}
            token={accessToken.token}
          />
        )}

        {eventsVisibility === Visibility.Events && (
          <div>
            <IContainer className="pt-8 pb-8">
              <div className="flex items-center justify-between flex-wrap">
                <div className="inline-block">
                  <ILabel text="Events" />
                </div>

                <div className="flex flex-wrap gap-4   mt-4 lg:mt-0 xl:mt-0">
                  <IInput placeholder="Search Community" name="search" />

                  <IButton text="Manage" onClick={handleMangeEvents} />
                  <IButton
                    text="Create"
                    onClick={() => setEventsVisibility(Visibility.Create)}
                    bgColor="bg-regal-blue"
                    textColor="text-white"
                    icon={<span>+</span>}
                  />
                </div>
              </div>
            </IContainer>
            {!showAllUpcoming && !showAllRecommended && (
              <IContainer className="pb-8">
                <div>
                  <IPanel
                    title="Trending"
                    buttonLabel={showAllTrending ? "Show Less" : "Show All"}
                    height="600px"
                    onButtonClick={toggleShowAllTrending}
                  >
                    <IEventPanel
                      events={eventsHome?.trendingEvents ?? {}}
                      onEventClick={(id) => {
                        setEventId(id);
                        setEventsVisibility(Visibility.Event);
                      }}
                    />
                  </IPanel>
                </div>
              </IContainer>
            )}

            {!showAllTrending && !showAllRecommended && (
              <IContainer className="pb-8">
                <div>
                  <IPanel
                    title="Upcoming"
                    buttonLabel={showAllUpcoming ? "Show Less" : "Show All"}
                    height="600px"
                    onButtonClick={toggleShowAllUpcoming}
                  >
                    <IEventPanel
                      events={eventsHome?.upcomingEvents ?? {}}
                      onEventClick={(id) => {
                        setEventId(id);
                        setEventsVisibility(Visibility.Event);
                      }}
                    />
                  </IPanel>
                </div>
              </IContainer>
            )}

            {!showAllTrending && !showAllUpcoming && (
              <IContainer className="pb-8">
                <div>
                  <IPanel
                    title="Recommended"
                    buttonLabel={showAllRecommended ? "Show Less" : "Show All"}
                    height="600px"
                    onButtonClick={toggleShowAllRecommended}
                  >
                    <IEventPanel
                      events={eventsHome?.recommendedEvents ?? {}}
                      onEventClick={(id) => {
                        setEventId(id);
                        setEventsVisibility(Visibility.Event);
                      }}
                    />
                  </IPanel>
                </div>
              </IContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
