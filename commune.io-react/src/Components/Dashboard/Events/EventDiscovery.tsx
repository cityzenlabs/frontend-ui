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
import ISearch from "../../../Library/Search/ISearch";
import ShowAllEvents from "./Reusable/ShowAllEvents";

function EventDiscovery() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useDash();
  const accessToken = useAuth();
  const navigate = useNavigate();
  const { isMobile, isLargeScreen } = useScreenSize();

  const [eventDiscovery, setEventDiscovery] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<any>();
  const [selectedPrivacy, setSelectedPrivacy] = useState<any>();
  const [selectedAttribute, setSelectedAttribute] = useState<any>();
  const [showFilteredResults, setShowFilteredResults] = useState<any>();
  const [filteredEvents, setFilteredEvents] = useState<any>();

  const [page, setPage] = useState(1);

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

  const fetchMoreEvents = async (page: any) => {
    const searchUrl = `search?city=${user?.city}&nameContains=${searchTerm}&privacy=${selectedPrivacy}&attribute=${selectedAttribute}&page=${page}`;
    try {
      const data = await EventService.getEventDiscoverySearch(
        accessToken.token,
        searchUrl,
      );
      return data; // Should return an array of communities
    } catch (error) {
      console.error("Error fetching more communities:", error);
      return []; // Return empty array in case of error
    }
  };

  const handleSearch = async (
    searchTerm: string,
    selectedPrivacy: any,
    selectedAttribute: any,
  ) => {
    if (
      searchTerm === "" &&
      selectedPrivacy === "" &&
      selectedAttribute === ""
    ) {
      setShowFilteredResults(false);
    } else {
      setSearchTerm(searchTerm);
      setSelectedPrivacy(selectedPrivacy);
      setSelectedAttribute(selectedAttribute);
      setPage(1);
      const searchUrl = `search?city=${user?.city}&nameContains=${searchTerm}&privacy=${selectedPrivacy}&attribute=${selectedAttribute}&page=1`;
      try {
        const filteredCommunities = await EventService.getEventDiscoverySearch(
          accessToken.token,
          searchUrl,
        );
        setFilteredEvents(filteredCommunities);
        setShowFilteredResults(true);
      } catch (error) {}
    }
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
          <ISearch handleSearch={handleSearch} />
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

      {!showFilteredResults && (
        <div>
          <IEventPanel
            title="Trending"
            buttonLabel={
              eventDiscovery?.trendingEvents?.length ? "Show All" : ""
            }
            height="600px"
            events={eventDiscovery?.trendingEvents}
            onEventClick={(eventName, eventId) => {
              navigate(`/event/${eventName}/${eventId}`);
            }}
            marginTop="mt-0"
            paddingB={4}
            onButtonClick={() =>
              navigate(`/events/${encodeURIComponent("Trending Events")}`, {
                state: {
                  type: "trending",
                },
              })
            }
          />

          <IEventPanel
            title="Upcoming"
            buttonLabel={
              eventDiscovery?.upcomingEvents?.length ? "Show All" : ""
            }
            height="600px"
            onButtonClick={() =>
              navigate(`/events/${encodeURIComponent("Upcoming Events")}`, {
                state: {
                  type: "upcoming",
                },
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
                state: {
                  type: "recommended",
                },
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
      )}

      {showFilteredResults && (
        <ShowAllEvents
          initialEvents={filteredEvents}
          fetchEventsFunction={fetchMoreEvents}
          initialPage={page}
          pageSize={12}
        />
      )}
    </div>
  );
}

export default EventDiscovery;
