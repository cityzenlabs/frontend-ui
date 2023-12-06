import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import * as EventService from "../../../../Services/EventService/EventService";
import * as UserService from "../../../../Services/UserService/UserService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ILabel from "../../../../Library/Label/ILabel";
import EventAttendeesList from "../Reusable/EventAttendeesList/EventAttendeesList";
import IGraph from "../../../../Library/Graph/IGraph";
import {
  fakeAverageTimeSpent,
  fakeAverageUserLevel,
  transformAverageTimeSpent,
  transformAverageUserLevel,
} from "./EventDashboardGraphAnalytics";
import EventDetails from "../Reusable/EventDetails/EventDetails";
import IButton from "../../../../Library/Button/IButton";
import IMenuButton from "../../../../Library/MenuButton/IMenuButton";
import EventDashboardEdit from "./EventDashboardEdit";

function EventDashboard({ eventId, token, handleBack }: any) {
  const [eventDashboard, setEventDashboard] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [community, setCommunity] = useState<any>();
  const [showAttendeesList, setShowAttendeesList] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EventService.getEventDashboard(token, eventId);
        if (data) {
          setEventDashboard(data);
          const community = await CommunityService.getCommunity(
            data?.event.host,
            token,
          );
          const organizer = await UserService.fetchUser(
            token,
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
      <div>
        {editEvent && (
          <EventDashboardEdit
            setEditEvent={setEditEvent}
            event={eventDashboard.event}
          />
        )}
      </div>

      <div>
        {showAttendeesList && !editEvent && (
          <EventAttendeesList
            token={token}
            eventId={eventId}
            setShowAttendeesList={setShowAttendeesList}
          />
        )}
      </div>

      <div>
        {!showAttendeesList && !editEvent && (
          <div>
            <IContainer className="pb-8 pt-8">
              <div className="flex justify-between">
                <div className="flex">
                  <IBackButton onClick={handleBack} />
                  {eventDashboard && (
                    <ILabel
                      text={eventDashboard?.event.name}
                      className="ml-4"
                    ></ILabel>
                  )}
                </div>

                <div className="flex">
                  <IButton
                    text={"Edit"}
                    onClick={() => setEditEvent(true)}
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
            </IContainer>

            <IContainer className="pb-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full ">
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
            </IContainer>

            <IContainer className="pb-8">
              <EventDetails
                event={eventDashboard?.event}
                organizer={organizer}
                community={community}
                setShowAttendeesList={setShowAttendeesList}
              />
            </IContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDashboard;
