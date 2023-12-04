import React, { useEffect, useState } from "react";
import { Visibility } from "./Reusable/Enums/EventEnums";
import CreateEvent from "./EventCreate/EventCreate";
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
import EventHome from "./EventHome/EventHome";

function EventDiscovery({ user, getUpdatedUser }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuth();
  const [eventsVisibility, setEventsVisibility] = useState<Visibility>(
    Visibility.Events,
  );
  const [eventDiscovery, setEventDiscovery] = useState<any>();
  const [eventId, setEventId] = useState("");

  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [pageState, setPageState] = useState<Visibility[]>([Visibility.Events]);

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

  const fetchEventHome = async () => {
    try {
      const data = await EventService.getEventDiscovery(accessToken.token);
      setEventDiscovery(data);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchEventHome()]);
      setIsLoading(false);
    };
    fetchData();
  }, [eventsVisibility]);

  const handleBack = () => {
    setEventsVisibility(pageState[pageState.length - 1]);
    if (pageState.length > 1) {
      setPageState((prevState) => prevState.slice(0, -1));
    }
  };

  const handleForward = (previousPage: Visibility, nextPage: Visibility) => {
    setEventsVisibility(nextPage);
    setPageState((prev) => {
      return [...prev, previousPage];
    });
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        {eventsVisibility === Visibility.Home && (
          <EventHome
            setEventsVisibility={setEventsVisibility}
            setEventId={setEventId}
            token={accessToken.token}
            handleBack={handleBack}
          />
        )}

        {eventsVisibility === Visibility.Create && (
          <CreateEvent
            setEventsVisibility={setEventsVisibility}
            setEventId={setEventId}
            token={accessToken.token}
            user={user}
            getUpdatedUser={getUpdatedUser}
          />
        )}

        {eventsVisibility === Visibility.Event && (
          <Event
            setEventsVisibility={setEventsVisibility}
            eventId={eventId}
            token={accessToken.token}
            user={user}
            getUpdatedUser={getUpdatedUser}
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

                  <IButton
                    text="Home"
                    onClick={() => setEventsVisibility(Visibility.Home)}
                  />
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
                      events={eventDiscovery?.trendingEvents ?? {}}
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
                      events={eventDiscovery?.upcomingEvents ?? {}}
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
                      events={eventDiscovery?.recommendedEvents ?? {}}
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

export default EventDiscovery;
