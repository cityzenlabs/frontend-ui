import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
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
import * as UserService from "../../../../Services/UserService/UserService";
import CommunityDetails from "../Reusable/CommunityDetails/CommunityDetails";
import { useAuth } from "../../../../Context/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";

function CommunityDashboard() {
  const accessToken = useAuth();
  const { communityId } = useParams();
  const navigate = useNavigate();

  const [communityDashboard, setCommunityDashboard] = useState<any>(null);
  const [showDashboardEvents, setShowDashboardEvents] = useState("");
  const [organizer, setOrganizer] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [communityPicture, setCommunityPicture] = useState<any>("");

  const getCommunityDashboard = async (callback = () => {}) => {
    try {
      const data = await CommunityService.getCommunityDashboard(
        communityId,
        accessToken.token,
      );
      if (data) {
        setCommunityDashboard(data);
        const organizer = await UserService.fetchUser(
          accessToken.token,
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
      try {
        await Promise.all([getCommunityDashboard()]);
      } catch (error) {}
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const membersChartData = communityDashboard?.community?.analytics
    ? transformMembersData(communityDashboard?.community?.analytics)
    : null;
  const membersAttendingEventsChartData = communityDashboard?.community
    ?.analytics
    ? transformMembersAttendingEventsData(
        communityDashboard?.community?.analytics,
      )
    : null;

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      {showDashboardEvents && (
        <CommunityDashboardEvents
          dashboardEvents={showDashboardEvents}
          setDashboardEvents={setShowDashboardEvents}
          communityId={communityDashboard.community.id}
          token={accessToken}
        />
      )}

      {!showDashboardEvents && (
        <div>
          <div>
            <div className="flex justify-between pt-4 pb-4">
              <div className="flex">
                {communityDashboard && (
                  <ILabel text={communityDashboard?.community?.name}></ILabel>
                )}
              </div>

              <div className="flex">
                <IButton
                  text={"Edit"}
                  onClick={() => navigate(`/communities/edit/${communityId}`)}
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
          </div>

          <div className="grid xl:grid-cols-3 gap-5 xl:w-4/5 lg:w-full pb-4">
            <IPanel
              height="h-[60px]"
              onPanelClick={() => setShowDashboardEvents("Ongoing Events")}
            >
              <div className="flex justify-between items-center">
                {communityDashboard?.ongoingEvents + " Ongoing Events "}
                <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </IPanel>
            <IPanel
              height="h-[60px]"
              onPanelClick={() => setShowDashboardEvents("Pending Events")}
            >
              <div className="flex justify-between items-center">
                {communityDashboard?.pendingEvents + " Pending Events"}
                <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </IPanel>
            <IPanel
              height="h-[60px]"
              onPanelClick={() => setShowDashboardEvents("Completed Events")}
            >
              <div className="flex justify-between items-center">
                {communityDashboard?.completedEvents + " Completed Events"}{" "}
                <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </IPanel>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full pb-4 ">
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

          <div className="pb-4">
            <CommunityDetails
              community={communityDashboard?.community}
              organizer={organizer}
              communityId={communityId}
              communityPicture={communityPicture}
            />
          </div>

          <IEventPanel
            title="Upcoming Hosted Events"
            height="600px"
            buttonLabel="See All"
            events={communityDashboard?.upcomingHostedEvents ?? []}
            onEventClick={(eventName, eventId) => {
              navigate(`/communities/event/${eventId}`);
            }}
            marginTop="mt-0"
            paddingB={4}
          />

          <IEventPanel
            title="Upcoming Social Events"
            buttonLabel="See All"
            height="600px"
            events={communityDashboard?.upcomingSocialEvents ?? []}
            onEventClick={(eventName, eventId) => {
              navigate(`/communities/event/${eventId}`);
            }}
            marginTop="mt-0"
            paddingB={4}
          />
        </div>
      )}
    </div>
  );
}

export default CommunityDashboard;
