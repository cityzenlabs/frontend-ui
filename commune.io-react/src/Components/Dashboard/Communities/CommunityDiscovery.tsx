import React, { useEffect, useState } from "react";
import ILabel from "../../../Library/Label/ILabel";
import IButton from "../../../Library/Button/IButton";
import { useAuth } from "../../../Context/AuthContext";
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
        await fetchCommunityDiscovery();
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div>
      <div>
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

          {!isLargeScreen && (
            <IMenuButton
              options={[
                {
                  label: "Home",
                  action: () => navigate("/communities/home"),
                },
                {
                  label: "New +",
                  action: () => navigate("/communities/create"),
                },
              ]}
            />
          )}
        </div>

        <ICommunityPanel
          title="Trending"
          buttonLabel={"Show All"}
          height="600px"
          onButtonClick={() =>
            navigate(
              `/communities/${encodeURIComponent("Trending Communities")}`,
              {
                state: {
                  communities: communityDiscovery?.trendingCommunities,
                },
              },
            )
          }
          communities={communityDiscovery?.trendingCommunities}
          onCommunityClick={(communityName, communityId) => {
            navigate(`/community/${communityName}/${communityId}`);
          }}
        />

        <ICommunityPanel
          title="New"
          buttonLabel={"Show All"}
          height="600px"
          onButtonClick={() =>
            navigate(`/communities/${encodeURIComponent("New Communities")}`, {
              state: {
                communities: communityDiscovery?.newCommunities,
              },
            })
          }
          communities={communityDiscovery?.newCommunities}
          onCommunityClick={(communityName, communityId) => {
            navigate(`/community/${communityName}/${communityId}`);
          }}
        />

        <ICommunityPanel
          title="Recommended"
          buttonLabel={"Show All"}
          height="600px"
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
          onCommunityClick={(communityName, communityId) => {
            navigate(`/community/${communityName}/${communityId}`);
          }}
        />
      </div>
    </div>
  );
}

export default CommunityDiscovery;
