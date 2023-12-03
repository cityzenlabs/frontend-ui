import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import { Visibility } from "../Enums/CommunityEnums";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IPanel from "../../../../Library/Panel/IPanel";
import {
  UsersIcon,
  FireIcon,
  GlobeIcon,
  AcademicCapIcon,
  StarIcon,
  MoonIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import CommunityDashboardEvents from "./CommunityDashboardEvents";
import { MapIcon } from "@heroicons/react/outline";
import {
  transformMembersAttendingEventsData,
  transformMembersData,
} from "./CommunityDashboardGraphAnalytics";
import IGraph from "../../../../Library/Graph/IGraph";
import { attributeColors } from "../Constants/CommunityConstants";
import IButton from "../../../../Library/Button/IButton";
import IMenuButton from "../../../../Library/MenuButton/IMenuButton";
import CommunityDashboardEdit from "./CommunityDashboardEdit";
import * as UserService from "../../../../Services/UserService/UserService";
import CommunityMembersList from "../CommunityMembersList/CommunityMembersList";
import CommunityEvent from "../CommunityEvent/CommunityEvent";

function CommunityDashboard({ communityId, token, handleBack }: any) {
  const [communityDashboard, setCommunityDashboard] = useState<any>(null);
  const [showDashboardEvents, setShowDashboardEvents] = useState("");
  const [editCommunity, setEditCommunity] = useState(false);
  const [organizer, setOrganizer] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [showMembersList, setShowMembersList] = useState<boolean>(false);
  const [communityEventId, setCommunityEventId] = useState<any>();
  const [showCommunityEvent, setShowCommunityEvent] = useState<boolean>(false);

  const getIconForAttribute = (attribute: any) => {
    const icons: any = {
      social: <UsersIcon className="h-6 w-6" aria-hidden="true" />,
      fitness: <FireIcon className="h-6 w-6" aria-hidden="true" />,
      nightlife: <MoonIcon className="h-6 w-6 " aria-hidden="true" />,
      intelligence: <AcademicCapIcon className="h-6 w-6 " ria-hidden="true" />,
      culture: <StarIcon className="h-6 w-6" aria-hidden="true" />,
      adventure: <GlobeIcon className="h-6 w-6 " aria-hidden="true" />,
    };
    return icons[attribute.toLowerCase()];
  };

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
              <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
                <div className="col-span-3 xl:col-span-2">
                  <IPanel height="h-[550px]">
                    <div className="h-full flex flex-col">
                      {communityDashboard && (
                        <div>
                          <ILabel
                            text={communityDashboard.community.name}
                          ></ILabel>
                        </div>
                      )}
                      <div className="mt-5 flex">
                        <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                        <div>
                          {communityDashboard?.community.city +
                            ", " +
                            communityDashboard?.community.state}
                        </div>
                      </div>
                      <div className="mt-5 overflow-y-auto whitespace-pre-wrap flex-grow">
                        {communityDashboard?.community.description}
                      </div>
                    </div>
                  </IPanel>
                </div>

                <div className="col-span-3 xl:col-span-1 flex flex-col gap-6">
                  <IPanel height="h-[177px]">
                    <div>
                      <div className="font-bold text-md ">
                        {organizer?.firstName + " " + organizer?.lastName}
                      </div>
                      <div>Reputation Score - {organizer?.reputation}</div>
                      <div className="font-bold text-md mt-4">Community</div>
                      <div>
                        Reputation Score -{" "}
                        {communityDashboard?.community.reputation}
                      </div>
                    </div>
                  </IPanel>

                  <IPanel height="h-[270px]">
                    <div>
                      <div className="font-bold text-md mb-4">REQUIREMENTS</div>
                      <div className="grid grid-cols-2 gap-4">
                        {communityDashboard?.community.attributeRequirements &&
                          Object.entries(
                            communityDashboard.community
                              .attributeRequirements as [string, number][],
                          ).map(([attribute, level], index) => {
                            // Determine the color for the current attribute
                            const color =
                              attributeColors[index % attributeColors.length];
                            return (
                              <div
                                key={attribute}
                                className="flex justify-between items-center p-1"
                              >
                                <div className="flex-1">
                                  <div
                                    className="text-sm font-medium capitalize"
                                    style={{ color }}
                                  >
                                    {attribute.toLowerCase()}
                                  </div>
                                  <div className="text-xs">Level {level}</div>
                                </div>
                                {/* Use the same color for the icon */}
                                <div style={{ color }}>
                                  {getIconForAttribute(attribute)}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </IPanel>

                  <IPanel
                    height="h-[55px]"
                    onPanelClick={() => setShowMembersList(true)}
                  >
                    <div className="flex justify-between items-center h-full ">
                      {
                        Object.keys(communityDashboard?.community.members ?? {})
                          .length
                      }{" "}
                      Members
                      <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </IPanel>
                </div>
              </div>
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
