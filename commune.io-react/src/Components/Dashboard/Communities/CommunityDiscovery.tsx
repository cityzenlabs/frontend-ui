import React, { useEffect, useState } from "react";
import IInput from "../../../Library/Input/IInput";
import IContainer from "../../../Library/Container/IContainer";
import ILabel from "../../../Library/Label/ILabel";
import IPanel from "../../../Library/Panel/IPanel";
import IButton from "../../../Library/Button/IButton";
import { useAuth } from "../../../AuthContext";
import * as CommunityService from "../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";

import { useNavigate } from "react-router-dom";

function CommunityDiscovery() {
  const accessToken = useAuth();
  const navigate = useNavigate();

  const [communityDiscovery, setCommunityDiscovery] = useState<any>();
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);

  const toggleShowAllTrending = () => {
    setShowAllTrending((prev) => !prev);
    if (!showAllTrending) {
      setShowAllUpcoming(false);
      setShowAllRecommended(false);
    }
  };

  const toggleShowAllUpcoming = () => {
    setShowAllUpcoming((prev) => !prev);
    if (!showAllUpcoming) {
      setShowAllTrending(false);
      setShowAllRecommended(false);
    }
  };

  const toggleShowAllRecommended = () => {
    setShowAllRecommended((prev) => !prev);
    if (!showAllRecommended) {
      setShowAllTrending(false);
      setShowAllUpcoming(false);
    }
  };

  const fetchCommunityDiscovery = async () => {
    try {
      const data = await CommunityService.getCommunityDiscovery(
        accessToken.token,
      );
      if (data) {
        setCommunityDiscovery(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCommunityDiscovery()]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <IContainer className="pt-8 pb-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="inline-block">
              <ILabel text="Communities" />
            </div>

            <div className="flex flex-wrap gap-4   mt-4 lg:mt-0 xl:mt-0">
              <IInput placeholder="Search Community" name="search" />

              <IButton
                text="Home"
                onClick={() => {
                  navigate(`/dashboard/communities/home`);
                }}
              />

              <IButton
                text="Create"
                onClick={() => {
                  navigate(`/dashboard/communities/create`);
                }}
                bgColor="bg-regal-blue"
                textColor="text-white"
                icon={<span>+</span>}
              />
            </div>
          </div>
        </IContainer>

        {!showAllUpcoming && !showAllRecommended && (
          <IContainer className="pb-8">
            <IPanel
              title="Trending"
              buttonLabel={showAllTrending ? "Show Less" : "Show All"}
              height="600px"
              onButtonClick={toggleShowAllTrending}
            >
              {communityDiscovery?.trendingCommunities && (
                <ICommunityPanel
                  communities={communityDiscovery.trendingCommunities}
                  showAll={showAllTrending}
                  onCommunityClick={(communityId) => {
                    navigate(`/dashboard/communities/${communityId}`);
                  }}
                />
              )}
            </IPanel>
          </IContainer>
        )}

        {!showAllTrending && !showAllRecommended && (
          <IContainer className="pb-8">
            <IPanel
              title="New"
              buttonLabel={showAllUpcoming ? "Show Less" : "Show All"}
              height="600px"
              onButtonClick={toggleShowAllUpcoming}
            >
              {communityDiscovery?.newCommunities && (
                <ICommunityPanel
                  communities={communityDiscovery.newCommunities}
                  showAll={showAllUpcoming}
                  onCommunityClick={(communityId) => {
                    navigate(`/dashboard/communities/${communityId}`);
                  }}
                />
              )}
            </IPanel>
          </IContainer>
        )}

        {!showAllTrending && !showAllUpcoming && (
          <IContainer className="pb-8">
            <IPanel
              title="Recommended"
              buttonLabel={showAllRecommended ? "Show Less" : "Show All"}
              height="600px"
              onButtonClick={toggleShowAllRecommended}
            >
              {communityDiscovery?.recommendedCommunities && (
                <ICommunityPanel
                  communities={communityDiscovery.recommendedCommunities}
                  showAll={showAllRecommended}
                  onCommunityClick={(communityId) => {
                    navigate(`/dashboard/communities/${communityId}`);
                  }}
                />
              )}
            </IPanel>
          </IContainer>
        )}
      </div>
    </div>
  );
}

export default CommunityDiscovery;
