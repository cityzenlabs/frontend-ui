import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IPanel from "../../../../Library/Panel/IPanel";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";

function CommunityDashboardEvents({
  dashboardEvents,
  setDashboardEvents,
  communityId,
  token,
}: any) {
  const [eventState, setEventState] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      let status;
      switch (dashboardEvents) {
        case "Pending Events":
          status = "pending";
          break;
        case "Ongoing Events":
          status = "ongoing";
          break;
        case "Completed Events":
          status = "completed";
          break;
        default:
          status = "";
          break;
      }

      setEventState(status);

      if (status) {
        try {
          const fetchedEvents = await CommunityService.getCommunityEvents(
            communityId,
            token,
            status,
          );
          setEvents(fetchedEvents);
        } catch (error) {}
      }
    };

    fetchEvents();
    setIsLoading(false);
  }, [dashboardEvents, communityId, token]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="flex">
          <IBackButton onClick={() => setDashboardEvents("")} />
          {dashboardEvents && (
            <ILabel text={dashboardEvents} className="ml-4"></ILabel>
          )}
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div>
          <IPanel height="600px">
            <IEventPanel events={events ?? {}} />
          </IPanel>
        </div>
      </IContainer>
    </div>
  );
}

export default CommunityDashboardEvents;
