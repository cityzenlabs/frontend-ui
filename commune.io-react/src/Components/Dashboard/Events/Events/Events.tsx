import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import ILabel from "../../../../Library/Label/ILabel";
import { useDash } from "../../../../Context/DashboardContext";
import ShowAllEvents from "../Reusable/ShowAllEvents";
import * as EventService from "../../../../Services/EventService/EventService";
import { useAuth } from "../../../../Context/AuthContext";

function Events() {
  const location = useLocation();
  const { kind }: any = useParams();
  const [events, setEvents] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useDash();
  const accessToken = useAuth();

  const fetchEventsFunction = useCallback(
    async (page: any) => {
      let url: any = "";
      switch (location.state?.type) {
        case "trending":
          url = `trending?city=${user?.city}&page=${page}`;
          break;
        case "upcoming":
          url = `upcoming?city=${user?.city}&page=${page}`;
          break;
        case "recommended":
          url = `recommended?city=${user?.city}&attribute=${user?.topAttribute}&page=${page}`;
          break;
        default:
          url = null;
      }

      if (url) {
        try {
          const data = await EventService.getEventDiscoveryShowAll(
            accessToken.token,
            url,
          );
          return data;
        } catch (error) {
          console.error("Error fetching communities:", error);
          return [];
        }
      } else {
        return [];
      }
    },
    [accessToken.token, location.state?.type, user?.city, user?.topAttribute],
  );

  useEffect(() => {
    if (location.state.events) {
      setEvents(location.state.communities);
      setIsLoading(false);
    } else {
      fetchEventsFunction(1).then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
        setIsLoading(false);
      });
    }
  }, [fetchEventsFunction]);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div>
      <div className="pt-4 pb-4 flex justify-between xl:w-3/4 w-full ">
        <ILabel text={kind || ""}></ILabel>
      </div>

      <ShowAllEvents
        kind={kind}
        initialEvents={events}
        fetchCommunitiesFunction={fetchEventsFunction}
      />
    </div>
  );
}

export default Events;
