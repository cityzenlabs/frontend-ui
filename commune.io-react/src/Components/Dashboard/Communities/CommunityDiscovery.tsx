import React, { useEffect, useState } from "react";
import ILabel from "../../../Library/Label/ILabel";
import IButton from "../../../Library/Button/IButton";
import { useAuth } from "../../../AuthContext";
import * as CommunityService from "../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";

import { useNavigate } from "react-router-dom";
import IMenuButton from "../../../Library/MenuButton/IMenuButton";
import { useScreenSize } from "../../../Context/ScreenContext";
import ISpinner from "../../../Library/Spinner/ISpinner";

function CommunityDiscovery() {
  const accessToken = useAuth();
  const navigate = useNavigate();
  const { isMobile, isLargeScreen } = useScreenSize();
  const [isLoading, setIsLoading] = useState(true);
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
      try {
        await Promise.all([fetchCommunityDiscovery()]);
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div className="flex justify-between pt-4 pb-4">
        <ILabel text="Discover Communities" />
        <div className={`flex ${isLargeScreen ? "" : "hidden"}`}>
          <IButton
            text="Home"
            onClick={() => navigate("/communities/home")}
            className="px-6 mr-2"
          />
          <IButton
            text="New +"
            onClick={() => navigate("/communities/create")}
            bgColor="bg-regal-blue"
            textColor="text-white"
            className="px-6"
          />
        </div>

        {/* Menu button shown on non-large screens */}
        {!isLargeScreen && (
          <IMenuButton
            options={[
              { label: "Home", action: () => navigate("/communities/home") },
              { label: "New +", action: () => navigate("/communities/create") },
            ]}
          />
        )}
      </div>

      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        {!showAllUpcoming && !showAllRecommended && (
          <ICommunityPanel
            title="Trending"
            buttonLabel={showAllTrending ? "Show Less" : "Show All"}
            onButtonClick={toggleShowAllTrending}
            communities={communityDiscovery?.trendingCommunities}
            showAll={showAllTrending}
            onCommunityClick={(communityName, communityId) =>
              navigate(`/community/${communityName}/${communityId}`)
            }
          />
        )}

        {!showAllTrending && !showAllRecommended && (
          <ICommunityPanel
            title="New"
            buttonLabel={showAllUpcoming ? "Show Less" : "Show All"}
            onButtonClick={() =>
              navigate(
                `/communities/${encodeURIComponent("New Communities")}`,
                { state: { communities: communityDiscovery?.newCommunities } },
              )
            }
            communities={communityDiscovery?.newCommunities}
            showAll={showAllUpcoming}
            onCommunityClick={(communityName, communityId) =>
              navigate(`/community/${communityName}/${communityId}`)
            }
          />
        )}

        {!showAllTrending && !showAllUpcoming && (
          <ICommunityPanel
            title="Recommended"
            buttonLabel={showAllRecommended ? "Show Less" : "Show All"}
            onButtonClick={() =>
              navigate(
                `/communities/${encodeURIComponent("Recommended Communities")}`,
                {
                  state: {
                    communities: communityDiscovery?.recommendedCommunities,
                  },
                },
              )
            }
            communities={communityDiscovery?.recommendedCommunities}
            showAll={showAllRecommended}
            onCommunityClick={(communityName, communityId) =>
              navigate(`/community/${communityName}/${communityId}`)
            }
          />
        )}
      </div>
    </div>
  );
}

export default CommunityDiscovery;
