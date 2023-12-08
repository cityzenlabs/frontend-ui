import React, { useEffect, useState } from "react";
import * as EventService from "../../../Services/EventService/EventService";
import { useAuth } from "../../../AuthContext";
import IContainer from "../../../Library/Container/IContainer";
import IPanel from "../../../Library/Panel/IPanel";
import IEventPanel from "../../../Library/EventPanel/IEventPanel";
import ILabel from "../../../Library/Label/ILabel";
import IInput from "../../../Library/Input/IInput";
import IButton from "../../../Library/Button/IButton";
import { useNavigate } from "react-router-dom";

function EventDiscovery() {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuth();
  const navigate = useNavigate();

  const [eventDiscovery, setEventDiscovery] = useState<any>();

  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);

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
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
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
                onClick={() => {
                  navigate(`/dashboard/events/home`);
                }}
              />
              <IButton
                text="Create"
                onClick={() => console.log("")}
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
                  events={eventDiscovery?.trendingEvents}
                  onEventClick={(eventId) => {
                    navigate(`/dashboard/events/${eventId}`);
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
                  events={eventDiscovery?.upcomingEvents}
                  onEventClick={(eventId) => {
                    navigate(`/dashboard/events/${eventId}`);
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
                  events={eventDiscovery?.recommendedEvents}
                  onEventClick={(eventId) => {
                    navigate(`/dashboard/events/${eventId}`);
                  }}
                />
              </IPanel>
            </div>
          </IContainer>
        )}
      </div>
    </div>
  );
}

export default EventDiscovery;
