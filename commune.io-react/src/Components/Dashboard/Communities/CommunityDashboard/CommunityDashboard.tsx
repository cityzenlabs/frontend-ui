import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IPanel from "../../../../Library/Panel/IPanel";
import { ArrowRightIcon } from "@heroicons/react/solid";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import CommunityDashboardEvents from "./CommunityDashboardEvents";
import {
  transformMembersAttendingEventsData,
  transformMembersData,
} from "./CommunityDashboardGraphAnalytics";
import IGraph from "../../../../Library/Graph/IGraph";
import IButton from "../../../../Library/Button/IButton";
import IMenuButton from "../../../../Library/MenuButton/IMenuButton";
import CommunityDashboardEdit from "./CommunityDashboardEdit";
import * as UserService from "../../../../Services/UserService/UserService";
import CommunityMembersList from "../Reusable/CommunityMembersList/CommunityMembersList";
import CommunityEvent from "../Reusable/CommunityEvent/CommunityEvent";
import CommunityDetails from "../Reusable/CommunityDetails/CommunityDetails";

function CommunityDashboard({ communityId, token, handleBack }: any) {
  const [communityDashboard, setCommunityDashboard] = useState<any>(null);
  const [showDashboardEvents, setShowDashboardEvents] = useState("");
  const [editCommunity, setEditCommunity] = useState(false);
  const [organizer, setOrganizer] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [showMembersList, setShowMembersList] = useState<boolean>(false);
  const [communityEventId, setCommunityEventId] = useState<any>();
  const [showCommunityEvent, setShowCommunityEvent] = useState<boolean>(false);

  const getCommunityDashboard = async (callback = () => {}) => {
    try {
      const data = await CommunityService.getCommunityDashboard(
        communityId,
        token,
      );
      if (data) {
        setCommunityDashboard(data);
        const organizer = await UserService.fetchUser(
          token,
          data.community.organizer,
        );
        if (organizer) {
          setOrganizer(organizer);
        }
        callback();
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getCommunityDashboard()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const membersChartData = communityDashboard?.community.analytics
    ? transformMembersData(communityDashboard.community.analytics)
    : null;
  const membersAttendingEventsChartData = communityDashboard?.community
    .analytics
    ? transformMembersAttendingEventsData(
        communityDashboard.community.analytics,
      )
    : null;

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      {showCommunityEvent &&
        !showDashboardEvents &&
        !editCommunity &&
        !showMembersList && (
          <CommunityEvent
            eventId={communityEventId}
            setShowCommunityEvent={setShowCommunityEvent}
            setCommunityEventId={setCommunityEventId}
          />
        )}

      {showMembersList && !showCommunityEvent && (
        <CommunityMembersList
          setShowMembersList={setShowMembersList}
          token={token}
          communityId={communityId}
        />
      )}
      {editCommunity && !showCommunityEvent && !showMembersList && (
        <CommunityDashboardEdit
          setEditCommunity={setEditCommunity}
          community={communityDashboard.community}
          token={token}
          getCommunityDashboard={getCommunityDashboard}
        />
      )}

      {showDashboardEvents &&
        !showCommunityEvent &&
        !editCommunity &&
        !showMembersList && (
          <CommunityDashboardEvents
            dashboardEvents={showDashboardEvents}
            setDashboardEvents={setShowDashboardEvents}
            communityId={communityDashboard.community.id}
            token={token}
          />
        )}

      {!showDashboardEvents &&
        !editCommunity &&
        !showCommunityEvent &&
        !showMembersList && (
          <div>
            <div>
              <IContainer className="pb-8 pt-8">
                <div className="flex justify-between">
                  {/* Left side: Back Button and Label */}
                  <div className="flex">
                    <IBackButton onClick={handleBack} />
                    {communityDashboard && (
                      <ILabel
                        text={communityDashboard.community.name}
                        className="ml-4"
                      ></ILabel>
                    )}
                  </div>

                  <div className="flex">
                    <IButton
                      text={"Edit"}
                      onClick={() => setEditCommunity(true)}
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
            </div>

            <IContainer className="pb-8">
              <div className="grid xl:grid-cols-3 gap-6 xl:w-4/5 lg:w-full">
                <IPanel
                  height="h-[70px]"
                  onPanelClick={() => setShowDashboardEvents("Ongoing Events")}
                >
                  <div className="flex justify-between items-center">
                    {communityDashboard?.ongoingEvents + " Ongoing Events "}
                    <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </IPanel>
                <IPanel
                  height="h-[70px]"
                  onPanelClick={() => setShowDashboardEvents("Pending Events")}
                >
                  <div className="flex justify-between items-center">
                    {communityDashboard?.pendingEvents + " Pending Events"}
                    <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </IPanel>
                <IPanel
                  height="h-[70px]"
                  onPanelClick={() =>
                    setShowDashboardEvents("Completed Events")
                  }
                >
                  <div className="flex justify-between items-center">
                    {communityDashboard?.completedEvents + " Completed Events"}{" "}
                    <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </IPanel>
              </div>
            </IContainer>

            <IContainer className="pb-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full ">
                {membersChartData && (
                  <IGraph
                    data={membersChartData.series}
                    categories={membersChartData.categories}
                    title="Members"
                  />
                )}
                {membersAttendingEventsChartData && (
                  <IGraph
                    title="Members Attending Events"
                    data={membersAttendingEventsChartData.series}
                    categories={membersAttendingEventsChartData.categories}
                  />
                )}
              </div>
            </IContainer>

            <IContainer className="pb-8">
              <CommunityDetails
                community={communityDashboard.community}
                organizer={organizer}
                setShowMembersList={setShowMembersList}
              />
            </IContainer>

            <IContainer className="pb-8">
              <div>
                <IPanel
                  title="Upcoming Hosted Events"
                  height="600px"
                  buttonLabel="See All"
                >
                  <IEventPanel
                    events={communityDashboard?.upcomingHostedEvents ?? {}}
                    onEventClick={(id) => {
                      setCommunityEventId(id);
                      setShowCommunityEvent(true);
                    }}
                  />
                </IPanel>
              </div>
            </IContainer>

            <IContainer className="pb-8">
              <div>
                <IPanel
                  title="Upcoming Social Events"
                  buttonLabel="See All"
                  height="600px"
                >
                  <IEventPanel
                    events={communityDashboard?.upcomingSocialEvents ?? {}}
                    onEventClick={(id) => {
                      setCommunityEventId(id);
                      setShowCommunityEvent(true);
                    }}
                  />
                </IPanel>
              </div>
            </IContainer>
          </div>
        )}
    </div>
  );
}

export default CommunityDashboard;
