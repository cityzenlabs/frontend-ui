import React, { useEffect, useState } from "react";
import { Visibility } from "../Reusable/Enums/CommunityEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";

function CommunityHome({
  token,
  setCommunityId,
  handleBack,
  handleForward,
}: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [communityHome, setCommunityHome] = useState<any>();
  const [showAllCreatedCommunities, setShowAllCreatedCommunities] =
    useState(false);
  const [showAllJoinedCommunities, setShowAllJoinedCommunities] =
    useState(false);

  const toggleShowAllCreatedCommunities = () => {
    setShowAllCreatedCommunities((prev) => !prev);
    if (!showAllCreatedCommunities) {
      setShowAllJoinedCommunities(false);
    }
  };

  const toggleShowAllJoinedCommunities = () => {
    setShowAllJoinedCommunities((prev) => !prev);
    if (!showAllJoinedCommunities) {
      setShowAllCreatedCommunities(false);
    }
  };

  const fetchHome = async () => {
    try {
      const data = await CommunityService.getCommunityHome(token);
      if (data) {
        setCommunityHome(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchHome()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton onClick={handleBack} />
            <ILabel className="ml-4" text="Community Home" />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {communityHome?.joinedCommunities.length}
            </div>
            <div className="text-xs pr-8">
              JOINED <br />
              COMMUNITIES
            </div>
          </IPanel>
          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {" "}
              {communityHome?.createdCommunities.length}
            </div>
            <div className="text-xs">
              CREATED <br /> COMMUNITIES
            </div>
          </IPanel>
          <IPanel height="h-[112px]">
            <div className="text-3xl">0</div>
            <div className="text-xs">
              PENDING <br />
              REQUESTS
            </div>
          </IPanel>
        </div>
      </IContainer>

      {!showAllCreatedCommunities && (
        <IContainer className="pb-8">
          <IPanel
            title="Joined Communities"
            buttonLabel={showAllJoinedCommunities ? "Show Less" : "Show All"}
            height="600px"
            onButtonClick={toggleShowAllJoinedCommunities}
          >
            {communityHome?.joinedCommunities && (
              <ICommunityPanel
                communities={communityHome.joinedCommunities}
                showAll={showAllJoinedCommunities}
                onCommunityClick={(id) => {
                  setCommunityId(id);
                  handleForward(Visibility.CommunityHome, Visibility.Community);
                }}
              />
            )}
          </IPanel>
        </IContainer>
      )}

      {!showAllJoinedCommunities && (
        <IContainer className="pb-8">
          <IPanel
            title="Created Communities"
            buttonLabel={showAllCreatedCommunities ? "Show Less" : "Show All"}
            height="600px"
            onButtonClick={toggleShowAllCreatedCommunities}
          >
            {communityHome?.createdCommunities && (
              <ICommunityPanel
                communities={communityHome.createdCommunities}
                showAll={showAllCreatedCommunities}
                onCommunityClick={(id) => {
                  setCommunityId(id);
                  handleForward(
                    Visibility.CommunityHome,
                    Visibility.CommunityDashboard,
                  );
                }}
              />
            )}
          </IPanel>
        </IContainer>
      )}
    </div>
  );
}

export default CommunityHome;
