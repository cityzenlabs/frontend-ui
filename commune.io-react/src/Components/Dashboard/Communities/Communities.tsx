import React, { useEffect, useState } from "react";
import ManageCommunities from "./ManageCommunities/ManageCommunities";
import { Visibility } from "./Enums/CommunityEnums";
import CreateCommunities from "./CreateCommunities/CreateCommunities";
import IInput from "../../../Library/Input/IInput";
import IContainer from "../../../Library/Container/IContainer";
import ILabel from "../../../Library/Label/ILabel";
import IPanel from "../../../Library/Panel/IPanel";
import IButton from "../../../Library/Button/IButton";
import CommunityDashboard from "./CommunityDashboard/CommunityDashboard";
import { useAuth } from "../../../AuthContext";

import * as CommunityService from "../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";

function Communities() {
  const [communityHome, setCommunityHome] = useState<any>();
  const [communitiesVisibility, setCommunitiesVisibility] =
    useState<Visibility>(Visibility.Communities);
  const [communityId, setCommunityId] = useState("");
  const accessToken = useAuth();
  const handleMangeCommunities = () => {
    setCommunitiesVisibility(Visibility.Manage);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CommunityService.getCommunityHome(accessToken.token);

        setCommunityHome(data);
      } catch (error) {
        //setError(error);
      } finally {
        //setIsLoading(false);
      }
    };

    fetchData();
  }, [communitiesVisibility]);

  return (
    <div>
      <div>
        {communitiesVisibility === Visibility.Manage && (
          <ManageCommunities
            setCommunitiesVisibility={setCommunitiesVisibility}
            token={accessToken.token}
          />
        )}

        {communitiesVisibility === Visibility.Create && (
          <CreateCommunities
            setCommunitiesVisibility={setCommunitiesVisibility}
            setCommunityId={setCommunityId}
          />
        )}

        {communitiesVisibility === Visibility.Dashboard && (
          <CommunityDashboard
            setCommunitiesVisibility={setCommunitiesVisibility}
            communityId={communityId}
            token={accessToken.token}
          />
        )}

        {communitiesVisibility === Visibility.Communities && (
          <div>
            <IContainer paddingY={8}>
              <div className="flex items-center justify-between flex-wrap">
                <div className="inline-block">
                  <ILabel text="Communities" />
                </div>

                <div className="flex flex-wrap gap-4   mt-4 lg:mt-0 xl:mt-0">
                  <IInput placeholder="Search Community" name="search" />

                  <IButton
                    text="Manage Communities"
                    onClick={handleMangeCommunities}
                  />
                  <IButton
                    text="Create Community"
                    onClick={() => setCommunitiesVisibility(Visibility.Create)}
                    bgColor="bg-regal-blue"
                    textColor="text-white"
                    icon={<span>+</span>}
                  />
                </div>
              </div>
            </IContainer>

            {!showAllUpcoming && !showAllRecommended && (
              <IContainer paddingY={8}>
                <IPanel
                  title="Trending"
                  buttonLabel={showAllTrending ? "Show Less" : "Show All"}
                  height="600px"
                  onButtonClick={toggleShowAllTrending}
                >
                  {communityHome?.trendingCommunities && (
                    <ICommunityPanel
                      communities={communityHome.trendingCommunities}
                      showAll={showAllTrending}
                      onCommunityClick={(id) => {
                        setCommunityId(id);
                        setCommunitiesVisibility(Visibility.Dashboard);
                      }}
                    />
                  )}
                </IPanel>
              </IContainer>
            )}

            {!showAllTrending && !showAllRecommended && (
              <IContainer>
                <IPanel
                  title="New"
                  buttonLabel={showAllUpcoming ? "Show Less" : "Show All"}
                  height="600px"
                  onButtonClick={toggleShowAllUpcoming}
                >
                  {communityHome?.newCommunities && (
                    <ICommunityPanel
                      communities={communityHome.newCommunities}
                      showAll={showAllUpcoming}
                      onCommunityClick={(id) => {
                        setCommunityId(id);
                        setCommunitiesVisibility(Visibility.Dashboard);
                      }}
                    />
                  )}
                </IPanel>
              </IContainer>
            )}

            {!showAllTrending && !showAllUpcoming && (
              <IContainer paddingY={8}>
                <IPanel
                  title="Recommended"
                  buttonLabel={showAllRecommended ? "Show Less" : "Show All"}
                  height="600px"
                  onButtonClick={toggleShowAllRecommended}
                >
                  {communityHome?.recommendedCommunities && (
                    <ICommunityPanel
                      communities={communityHome.recommendedCommunities}
                      showAll={showAllRecommended}
                      onCommunityClick={(id) => {
                        setCommunityId(id);
                        setCommunitiesVisibility(Visibility.Dashboard);
                      }}
                    />
                  )}
                </IPanel>
              </IContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Communities;
