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
import IMenuButton from "../../../Library/MenuButton/IMenuButton";
import { useScreenSize } from "../../../Context/ScreenContext";

function EventDiscovery() {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuth();
  const navigate = useNavigate();
  const { isMobile, isLargeScreen } = useScreenSize();

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
      <div className="flex justify-between pt-4 pb-4">
        <ILabel text="Discover Events" />

        {/* Buttons shown only on large screens */}
        <div className={`flex ${isLargeScreen ? "" : "hidden"}`}>
          <IButton
            text="Home"
            onClick={() => navigate("/events/home")}
            className="px-6 mr-2"
          />
          <IButton
            text="New +"
            onClick={() => navigate("/events/create")}
            bgColor="bg-regal-blue"
            textColor="text-white"
            className="px-6"
          />
        </div>

        {/* Menu button shown on non-large screens */}
        {!isLargeScreen && (
          <IMenuButton
            options={[
              {
                label: "Home",
                action: () => navigate("/events/home"),
              },
              {
                label: "Created",
                action: () => navigate("/events/create"),
              },
            ]}
          />
        )}
      </div>
      {!showAllUpcoming && !showAllRecommended && (
        <IEventPanel
          title="Trending"
          buttonLabel={showAllTrending ? "Show Less" : "Show All"}
          height="600px"
          onButtonClick={toggleShowAllTrending}
          events={eventDiscovery?.trendingEvents}
          onEventClick={(eventName, eventId) => {
            navigate(`/event/${eventName}/${eventId}`);
          }}
          marginTop="mt-0"
          paddingB={4}
        />
      )}

      {!showAllTrending && !showAllRecommended && (
        <IEventPanel
          title="Upcoming"
          buttonLabel={showAllUpcoming ? "Show Less" : "Show All"}
          height="600px"
          onButtonClick={toggleShowAllUpcoming}
          events={eventDiscovery?.upcomingEvents}
          onEventClick={(eventName, eventId) => {
            navigate(`/event/${eventName}/${eventId}`);
          }}
          marginTop="mt-0"
          paddingB={4}
        />
      )}

      {!showAllTrending && !showAllUpcoming && (
        <IEventPanel
          title="Recommended"
          buttonLabel={showAllRecommended ? "Show Less" : "Show All"}
          height="600px"
          onButtonClick={toggleShowAllRecommended}
          events={eventDiscovery?.recommendedEvents}
          onEventClick={(eventName, eventId) => {
            navigate(`/event/${eventName}/${eventId}`);
          }}
          marginTop="mt-0"
          paddingB={4}
        />
      )}
    </div>
  );
}

export default EventDiscovery;
