import React, { useEffect, useState } from "react";
import * as EventService from "../../../Services/EventService/EventService";
import { useAuth } from "../../../Context/AuthContext";
import IContainer from "../../../Library/Container/IContainer";
import IPanel from "../../../Library/Panel/IPanel";
import IEventPanel from "../../../Library/EventPanel/IEventPanel";
import ILabel from "../../../Library/Label/ILabel";
import IInput from "../../../Library/Input/IInput";
import IButton from "../../../Library/Button/IButton";
import { useNavigate } from "react-router-dom";
import IMenuButton from "../../../Library/MenuButton/IMenuButton";
import { useScreenSize } from "../../../Context/ScreenContext";
import ISpinner from "../../../Library/Spinner/ISpinner";
import { useDash } from "../../../Context/DashboardContext";

function EventDiscovery() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useDash();
  const accessToken = useAuth();
  const navigate = useNavigate();
  const { isMobile, isLargeScreen } = useScreenSize();

  const [eventDiscovery, setEventDiscovery] = useState<any>();

  const fetchEventDiscovery = async () => {
    try {
      const data = await EventService.getEventDiscovery(
        accessToken.token,
        user?.city,
        user?.topAttribute,
      );
      setEventDiscovery(data);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEventDiscovery();
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="flex justify-between pt-4 pb-4">
        <ILabel text="Discover Events" />

        <div className={`flex ${isLargeScreen ? "" : "hidden"}`}>
          <IButton
            text="Home"
            onClick={() => navigate("/events/home")}
            className="px-6 mr-2"
          />
          <IButton
            text="Create +"
            onClick={() => navigate("/events/create")}
            bgColor="bg-regal-blue"
            textColor="text-white"
            className="px-6"
          />
        </div>
        {!isLargeScreen && (
          <IMenuButton
            options={[
              {
                label: "Home",
                action: () => navigate("/events/home"),
              },
              {
                label: "Create +",
                action: () => navigate("/events/create"),
              },
            ]}
          />
        )}
      </div>

      <IEventPanel
        title="Trending"
        buttonLabel={eventDiscovery?.trendingEvents?.length ? "Show All" : ""}
        height="600px"
        events={eventDiscovery?.trendingEvents}
        onEventClick={(eventName, eventId) => {
          navigate(`/event/${eventName}/${eventId}`);
        }}
        marginTop="mt-0"
        paddingB={4}
        onButtonClick={() =>
          navigate(`/events/${encodeURIComponent("Trending Events")}`, {
            state: { events: eventDiscovery?.trendingEvents },
          })
        }
      />

      <IEventPanel
        title="Upcoming"
        buttonLabel={eventDiscovery?.upcomingEvents?.length ? "Show All" : ""}
        height="600px"
        onButtonClick={() =>
          navigate(`/events/${encodeURIComponent("Upcoming Events")}`, {
            state: { events: eventDiscovery?.upcomingEvents },
          })
        }
        events={eventDiscovery?.upcomingEvents}
        onEventClick={(eventName, eventId) => {
          navigate(`/event/${eventName}/${eventId}`);
        }}
        marginTop="mt-0"
        paddingB={4}
      />

      <IEventPanel
        title="Recommended"
        buttonLabel={
          eventDiscovery?.recommendedEvents?.length ? "Show All" : ""
        }
        height="600px"
        onButtonClick={() =>
          navigate(`/events/${encodeURIComponent("Recommended Events")}`, {
            state: { events: eventDiscovery?.recommendedEvents },
          })
        }
        events={eventDiscovery?.recommendedEvents}
        onEventClick={(eventName, eventId) => {
          navigate(`/event/${eventName}/${eventId}`);
        }}
        marginTop="mt-0"
        paddingB={4}
      />
    </div>
  );
}

export default EventDiscovery;
