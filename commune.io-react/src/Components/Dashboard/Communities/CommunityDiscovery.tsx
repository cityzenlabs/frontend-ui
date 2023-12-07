import React, { useEffect, useState } from "react";
import { Visibility } from "./Reusable/Enums/CommunityEnums";
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
import CommunityHome from "./CommunityHome/CommunityHome";
import CommunityMembersList from "./CommunityMembersList/CommunityMembersList";
import CommunityProfile from "./CommunityProfile/CommunityProfile";

function CommunityDiscovery({ user, getUpdatedUser }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuth();
  const [communitiesVisibility, setCommunitiesVisibility] =
    useState<Visibility>(Visibility.Communities);
  const [communityDiscovery, setCommunityDiscovery] = useState<any>();
  const [communityId, setCommunityId] = useState("");
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [pageState, setPageState] = useState<Visibility[]>([
    Visibility.Communities,
  ]);

  const [navigationState, setNavigationState] = useState<any>([
    { previousPage: Visibility.Communities },
  ]);

  const [otherUserId, setOtherUserId] = useState<any>();

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

  const handleBack = () => {
    const navState = navigationState[navigationState.length - 1];
    setCommunitiesVisibility(navState.previousPage);
    if (navState.communityId) {
      setCommunityId(navState.communityId);
    }

    if (navState.userId) {
      setOtherUserId(navState.userId);
    }
    if (navigationState.length > 1) {
      setNavigationState((prevState: any) => prevState.slice(0, -1));
    }
  };

  const handleForward = (
    previousPage: any,
    nextPage: any,
    communityId?: any,
    userId?: any,
  ) => {
    setNavigationState((prev: any) => [
      ...prev,
      {
        previousPage,
        nextPage,
        communityId,
        userId,
      },
    ]);
    setCommunitiesVisibility(nextPage);
    if (communityId) {
      setCommunityId(communityId);
    }

    if (userId) {
      setOtherUserId(userId);
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
      setIsLoading(false);
    };
    fetchData();
  }, [communitiesVisibility]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        {communitiesVisibility === Visibility.CommunityMembersList && (
          <CommunityMembersList
            communityId={communityId}
            token={accessToken.token}
            handleBack={handleBack}
            handleForward={handleForward}
            setOtherUserId={setOtherUserId}
          />
        )}

        {communitiesVisibility === Visibility.CommunityProfile && (
          <CommunityProfile
            otherUserId={otherUserId}
            handleBack={handleBack}
            handleForward={handleForward}
          />
        )}

        {communitiesVisibility === Visibility.CommunityHome && (
          <CommunityHome
            setCommunitiesVisibility={setCommunitiesVisibility}
            token={accessToken.token}
            pageState={pageState}
            handleBack={handleBack}
            handleForward={handleForward}
          />
        )}

        {communitiesVisibility === Visibility.CommunityCreate && (
          <CreateCommunity
            getUpdatedUser={getUpdatedUser}
            handleBack={handleBack}
            handleForward={handleForward}
          />
        )}

        {communitiesVisibility === Visibility.CommunityDashboard && (
          <CommunityDashboard
            setCommunitiesVisibility={setCommunitiesVisibility}
            communityId={communityId}
            token={accessToken.token}
            handleBack={handleBack}
          />
        )}

        {communitiesVisibility === Visibility.Community && (
          <Community
            setCommunitiesVisibility={setCommunitiesVisibility}
            communityId={communityId}
            token={accessToken.token}
            user={user}
            getUpdatedUser={getUpdatedUser}
            handleBack={handleBack}
            handleForward={handleForward}
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

                  <IButton
                    text="Home"
                    onClick={() => {
                      handleForward(
                        Visibility.Communities,
                        Visibility.CommunityHome,
                      );
                    }}
                  />

                  <IButton
                    text="Create"
                    onClick={() => {
                      handleForward(
                        Visibility.Communities,
                        Visibility.CommunityCreate,
                      );
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
                        handleForward(
                          Visibility.Communities,
                          Visibility.Community,
                          communityId,
                        );
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
                        handleForward(
                          Visibility.Communities,
                          Visibility.Community,
                          communityId,
                        );
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
                        handleForward(
                          Visibility.Communities,
                          Visibility.Community,
                          communityId,
                        );
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

export default CommunityDiscovery;
