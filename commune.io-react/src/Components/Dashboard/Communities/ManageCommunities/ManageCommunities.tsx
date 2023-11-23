import React, { useEffect, useState } from "react";
import { Visibility } from "../Enums/CommunityEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IButton from "../../../../Library/Button/IButton";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import { ManagedCommunitiesModel } from "./ManageCommunitiesModel";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";

function ManageCommunities({ setCommunitiesVisibility, token }: any) {
  const [communityPortal, setCommunityPortal] =
    useState<ManagedCommunitiesModel>();

  const [showAllCommunities, setShowAllCommunities] = useState(false);

  const handleSeeAll = () => {
    setShowAllCommunities(!showAllCommunities);
  };

  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Communities);
  };

  const handleCreateCommunity = () => {
    setCommunitiesVisibility(Visibility.Create);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CommunityService.getCommunityPortal(token);
        console.log(data);
        setCommunityPortal(data);
      } catch (error) {
        //setError(error);
      } finally {
        //setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <IContainer paddingY={8}>
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton onClick={handleBack} />
            <ILabel className="ml-4" text="Manage Communities" />
          </div>
        </div>
      </IContainer>

      <IContainer>
        <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {communityPortal?.ongoingEvents.length}
            </div>
            <div className="text-xs pr-8">ONGOING EVENTS</div>
          </IPanel>
          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {communityPortal?.pendingEvents.length}
            </div>
            <div className="text-xs">EVENTS IN PROGRESS</div>
          </IPanel>
          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {communityPortal?.completedEvents.length}
            </div>
            <div className="text-xs">EVENTS COMPLETED</div>
          </IPanel>
        </div>
      </IContainer>

      <IContainer paddingY={8}>
        <div className="grid grid-cols-2 gap-6 xl:w-full ">
          <IPanel height="h-[300px]"></IPanel>
          <IPanel height="h-[300px]"></IPanel>
        </div>
      </IContainer>

      <IContainer>
        <IPanel
          title="Communities"
          buttonLabel={showAllCommunities ? "Show Less" : "Show All"}
          height="600px"
          onButtonClick={handleSeeAll}
        >
          {communityPortal?.communityCards && (
            <ICommunityPanel
              communities={communityPortal.communityCards}
              showAll={showAllCommunities}
            />
          )}
        </IPanel>
      </IContainer>
    </div>
  );
}

export default ManageCommunities;
