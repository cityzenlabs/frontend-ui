import React, { useEffect, useState } from "react";
import CommunityPortal from "./CommunityPortal/CommunityPortal";
import { Visibility } from "./Enums/CommunityEnums";
import CreateCommunity from "./CreateCommunity/CreateCommunity";
import IInput from "../../../Library/Input/IInput";
import IContainer from "../../../Library/Container/IContainer";
import ILabel from "../../../Library/Label/ILabel";
import IPanel from "../../../Library/Panel/IPanel";
import IButton from "../../../Library/Button/IButton";
import CommunityDashboard from "./CommunityDashboard/CommunityDashboard";
import { useAuth } from "../../../AuthContext";
import * as CommunityService from "../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";
import Community from "./Community/Community";

function Communities({ user }: any) {
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
          <CommunityPortal
            setCommunitiesVisibility={setCommunitiesVisibility}
            token={accessToken.token}
            setCommunityId={setCommunityId}
          />
        )}

        {communitiesVisibility === Visibility.Create && (
          <CreateCommunity
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

        {communitiesVisibility === Visibility.Community && (
          <Community
            setCommunitiesVisibility={setCommunitiesVisibility}
            communityId={communityId}
            token={accessToken.token}
            user={user}
          />
        )}

        {communitiesVisibility === Visibility.Communities && (
          <div>
            <IContainer className="pt-8 pb-8">
              <div className="flex items-center justify-between flex-wrap">
                <div className="inline-block">
                  <ILabel text="Communities" />
                </div>

                <div className="flex flex-wrap gap-4   mt-4 lg:mt-0 xl:mt-0">
                  <IInput placeholder="Search Community" name="search" />

                  <IButton text="Manage" onClick={handleMangeCommunities} />
                  <IButton
                    text="Create"
                    onClick={() => setCommunitiesVisibility(Visibility.Create)}
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
                  {communityHome?.trendingCommunities && (
                    <ICommunityPanel
                      communities={communityHome.trendingCommunities}
                      showAll={showAllTrending}
                      onCommunityClick={(id) => {
                        setCommunityId(id);
                        setCommunitiesVisibility(Visibility.Community);
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
                  {communityHome?.newCommunities && (
                    <ICommunityPanel
                      communities={communityHome.newCommunities}
                      showAll={showAllUpcoming}
                      onCommunityClick={(id) => {
                        setCommunityId(id);
                        setCommunitiesVisibility(Visibility.Community);
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
                  {communityHome?.recommendedCommunities && (
                    <ICommunityPanel
                      communities={communityHome.recommendedCommunities}
                      showAll={showAllRecommended}
                      onCommunityClick={(id) => {
                        setCommunityId(id);
                        setCommunitiesVisibility(Visibility.Community);
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
