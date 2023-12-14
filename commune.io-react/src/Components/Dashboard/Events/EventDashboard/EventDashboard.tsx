import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import * as EventService from "../../../../Services/EventService/EventService";
import * as UserService from "../../../../Services/UserService/UserService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ILabel from "../../../../Library/Label/ILabel";
import IGraph from "../../../../Library/Graph/IGraph";
import {
  fakeAverageTimeSpent,
  fakeAverageUserLevel,
  transformAverageTimeSpent,
  transformAverageUserLevel,
} from "./EventDashboardGraphAnalytics";
import EventDetails from "../Reusable/EventDetails/EventDetails/EventDetails";
import IButton from "../../../../Library/Button/IButton";
import IMenuButton from "../../../../Library/MenuButton/IMenuButton";
import { useAuth } from "../../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import { ArrowRightIcon } from "@heroicons/react/outline";
import IPanel from "../../../../Library/Panel/IPanel";

function EventDashboard() {
  const accessToken = useAuth();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDashboard, setEventDashboard] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [community, setCommunity] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EventService.getEventDashboard(
          accessToken.token,
          eventId,
        );
        if (data) {
          setEventDashboard(data);
          const community = await CommunityService.getCommunity(
            data?.event.host,
            accessToken.token,
          );
          const organizer = await UserService.fetchUser(
            accessToken.token,
            data.event.organizer,
          );
          if (organizer) {
            setOrganizer(organizer);
          }

          if (community) {
            setCommunity(community);
          }
        }
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
        <div className="flex">
          {eventDashboard && (
            <ILabel text={eventDashboard?.event.name}></ILabel>
          )}
        </div>

        <div className="flex">
          <IButton
            text={"Edit"}
            onClick={() => navigate(`/event/edit/${eventId}`)}
            bgColor="bg-regal-blue"
            textColor="text-white"
            className="px-6  mr-4"
          />
          <IMenuButton
            options={[
              {
                label: "Transfer",
                action: () => console.log("Transfer"),
              },
              {
                label: "Delete",
                action: () => console.log("Delete"),
              },
            ]}
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-5 xl:w-4/5 lg:w-full pb-4">
        <IPanel
          height="h-[60px]"
          //onPanelClick={() => setShowDashboardEvents("Ongoing Events")}
        >
          <div className="flex justify-between items-center">
            {"Demographics"}
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </IPanel>
        <IPanel
          height="h-[60px]"
          //onPanelClick={() => setShowDashboardEvents("Pending Events")}
        >
          <div className="flex justify-between items-center">
            {"Analytics"}
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </IPanel>
        <IPanel
          height="h-[60px]"
          //onPanelClick={() => setShowDashboardEvents("Completed Events")}
        >
          <div className="flex justify-between items-center">
            {"Summary"}
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </IPanel>
      </div>

      <div className="pb-4">
        <EventDetails
          event={eventDashboard?.event}
          organizer={organizer}
          community={community}
        />
      </div>
    </div>
  );
}

export default EventDashboard;
