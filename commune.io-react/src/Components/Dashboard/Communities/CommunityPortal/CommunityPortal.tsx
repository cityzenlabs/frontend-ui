import React, { useEffect, useState } from "react";
import { Visibility } from "../Enums/CommunityEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import {
  transformMembersAttendingEventsData,
  transformMembersData,
} from "./CommunityPortalGraphAnalytics";
import IGraph from "../../../../Library/Graph/IGraph";

function CommunityPortal({
  setCommunitiesVisibility,
  token,
  setCommunityId,
}: any) {
  const [communityPortal, setCommunityPortal] = useState<any>();
  const [showAllCommunities, setShowAllCommunities] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CommunityService.getCommunityPortal(token);
        if (data) {
          setCommunityPortal(data);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const membersChartData = communityPortal?.analytics
    ? transformMembersData(communityPortal.analytics)
    : null;
  const membersAttendingEventsChartData = communityPortal?.analytics
    ? transformMembersAttendingEventsData(communityPortal.analytics)
    : null;

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton
              onClick={() => setCommunitiesVisibility(Visibility.Communities)}
            />
            <ILabel className="ml-4" text="Manage Communities" />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
          <IPanel height="h-[112px]">
            <div className="text-3xl">{communityPortal?.ongoingEvents}</div>
            <div className="text-xs pr-8">
              ONGOING <br />
              EVENTS
            </div>
          </IPanel>
          <IPanel height="h-[112px]">
            <div className="text-3xl">{communityPortal?.pendingEvents}</div>
            <div className="text-xs">
              PENDING <br /> EVENTS
            </div>
          </IPanel>
          <IPanel height="h-[112px]">
            <div className="text-3xl">{communityPortal?.completedEvents}</div>
            <div className="text-xs">
              EVENTS <br />
              COMPLETED
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
        <IPanel
          title="Communities"
          buttonLabel={showAllCommunities ? "Show Less" : "Show All"}
          height="600px"
          onButtonClick={() => setShowAllCommunities(!showAllCommunities)}
        >
          {communityPortal?.communityCards && (
            <ICommunityPanel
              communities={communityPortal.communityCards}
              showAll={showAllCommunities}
              onCommunityClick={(id) => {
                setCommunityId(id);
                setCommunitiesVisibility(Visibility.Dashboard);
              }}
            />
          )}
        </IPanel>
      </IContainer>
    </div>
  );
}

export default CommunityPortal;
