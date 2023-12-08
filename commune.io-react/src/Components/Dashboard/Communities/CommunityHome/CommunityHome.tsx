import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import { useAuth } from "../../../../AuthContext";

import { useNavigate } from "react-router-dom";
function CommunityHome() {
  const accessToken = useAuth();
  const navigate = useNavigate();

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
      const data = await CommunityService.getCommunityHome(accessToken.token);
      if (data) {
        setCommunityHome(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchHome()]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <IContainer className="pb-4 pt-4">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <ILabel className="ml-4" text="Community Home" />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
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
        <IContainer className="pb-4">
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
                onCommunityClick={(communityName, communityId) => {
                  navigate(`/community/${communityName}/${communityId}`);
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
                onCommunityClick={(communityName, communityId) => {
                  navigate(`/community/manage/${communityId}`);
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
