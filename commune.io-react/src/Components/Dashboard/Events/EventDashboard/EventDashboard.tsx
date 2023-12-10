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
import { useAuth } from "../../../../AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EventDashboard() {
  const accessToken = useAuth();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDashboard, setEventDashboard] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [community, setCommunity] = useState<any>();

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
    };

    fetchData();
  }, []);

  const averageTimeSpent = eventDashboard?.event.eventAnalytics
    ? transformAverageTimeSpent(eventDashboard?.event.eventAnalytics)
    : transformAverageTimeSpent(fakeAverageTimeSpent);
  const averageUserLevel = eventDashboard?.event.eventAnalytics
    ? transformAverageUserLevel(eventDashboard?.event.eventAnalytics)
    : transformAverageUserLevel(fakeAverageUserLevel);

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full pb-4 ">
        {averageTimeSpent && (
          <IGraph
            data={averageTimeSpent.series}
            categories={averageTimeSpent.categories}
            title="Average Time Spent"
          />
        )}
        {averageUserLevel && (
          <IGraph
            title="Average User Level"
            data={averageUserLevel.series}
            categories={averageUserLevel.categories}
          />
        )}
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
