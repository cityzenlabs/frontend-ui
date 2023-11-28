import React, { useEffect, useState } from "react";
import { Visibility } from "../Enums/CommunityEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";

function CommunityPortal({
  setCommunitiesVisibility,
  token,
  setCommunityId,
}: any) {
  const [communityPortal, setCommunityPortal] = useState<any>();

  const [showAllCommunities, setShowAllCommunities] = useState(false);

  const handleSeeAll = () => {
    setShowAllCommunities(!showAllCommunities);
  };

  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Communities);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CommunityService.getCommunityPortal(token);
        console.log(data);
        setCommunityPortal(data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton onClick={handleBack} />
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
        <div className="grid grid-cols-2 gap-6 xl:w-full ">
          <IPanel height="h-[300px]"></IPanel>
          <IPanel height="h-[300px]"></IPanel>
        </div>
      </IContainer>

      <IContainer className="pb-8">
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
