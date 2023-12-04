import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import IPanel from "../../../../Library/Panel/IPanel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import * as UserService from "../../../../Services/UserService/UserService";
import ILabel from "../../../../Library/Label/ILabel";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import CommunityMembersList from "../Reusable/CommunityMembersList/CommunityMembersList";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import CommunityEvent from "../Reusable/CommunityEvent/CommunityEvent";
import CommunityDetails from "../Reusable/CommunityDetails/CommunityDetails";

function Community({
  communityId,
  token,
  user,
  getUpdatedUser,
  handleBack,
}: any) {
  const [community, setCommunity] = useState<any>();
  const [communityPicture, setCommunityPicture] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [showMembersList, setShowMembersList] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [gallery, setGallery] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [socialEvents, setSocialEvents] = useState<any>("");
  const [hostedEvents, setHostedEvents] = useState<any>("");
  const [showAllSocialEvents, setShowAllSocialEvents] = useState(false);
  const [showAllHostedEvents, setShowAllHostedEvents] = useState(false);
  const [communityEventId, setCommunityEventId] = useState<any>();
  const [showCommunityEvent, setShowCommunityEvent] = useState<boolean>(false);

  const fetchCommunityData = async (callback = () => {}) => {
    try {
      const community = await CommunityService.getCommunity(communityId, token);
      if (community) {
        setCommunity(community);
        const organizer = await UserService.fetchUser(
          token,
          community.organizer,
        );
        if (organizer) {
          setOrganizer(organizer);
          checkMembership(community);
          callback();
        }
      }
    } catch (error) {}
  };

  const fetchCommunityEvents = async () => {
    try {
      const upcomingEvents = await CommunityService.getCommunityEvents(
        communityId,
        token,
        "upcoming",
      );
      if (upcomingEvents) {
        console.log(upcomingEvents);
        const hostedEvents = upcomingEvents.filter(
          (event: any) => event.type === "HOSTED",
        );
        const socialEvents = upcomingEvents.filter(
          (event: any) => event.type === "SOCIAL",
        );

        setHostedEvents(hostedEvents);
        setSocialEvents(socialEvents);
      }
    } catch (error) {}
  };

  const fetchPicture = async () => {
    try {
      const picture = await CommunityService.getCommunityPicture(
        communityId,
        token,
      );
      if (picture) {
        setCommunityPicture(picture);
      }
    } catch (error) {}
  };

  const fetchGallery = async () => {
    try {
      const gallery = await CommunityService.getCommunityPhotoGallery(
        token,
        communityId,
      );
      if (gallery) {
        setGallery(gallery);
      }
    } catch (error) {}
  };

  const checkMembership = (communityData: any) => {
    if (user && communityData) {
      setHasJoined(user?.joinedCommunities.includes(communityData.id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchCommunityData(),
        fetchCommunityEvents(),
        fetchPicture(),
        fetchGallery(),
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, [communityId, token]);

  const handleJoinOrLeaveCommunity = async () => {
    try {
      const response = hasJoined
        ? await CommunityService.leaveCommunity(token, communityId)
        : await CommunityService.joinCommunity(token, communityId);

      if (response.ok) {
        await getUpdatedUser();
        fetchCommunityData(() => setHasJoined(!hasJoined));
      }
    } catch (error) {}
  };

  const toggleShowAllSocialEvents = () => {
    setShowAllSocialEvents((prev) => !prev);
    if (!showAllSocialEvents) {
      setShowAllHostedEvents(false);
    }
  };

  const toggleShowAllHostedEvents = () => {
    setShowAllHostedEvents((prev) => !prev);
    if (!showAllHostedEvents) {
      setShowAllSocialEvents(false);
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      {showCommunityEvent && (
        <CommunityEvent
          eventId={communityEventId}
          setShowCommunityEvent={setShowCommunityEvent}
          setCommunityEventId={setCommunityEventId}
          token={token}
          user={user}
          getUpdatedUser={getUpdatedUser}
          fetchCommunityEvents={fetchCommunityEvents}
        />
      )}

      {showMembersList && !showCommunityEvent && (
        <CommunityMembersList
          setShowMembersList={setShowMembersList}
          token={token}
          communityId={community.id}
        />
      )}

      {!showMembersList && !showCommunityEvent && (
        <div>
          <IContainer className="pt-8 pb-8">
            <div className="flex justify-between items-center">
              <div className="flex">
                <IBackButton onClick={handleBack} />
                <ILabel className="ml-4" text={community?.name} />
              </div>
              <div className="flex">
                <IButton
                  text={hasJoined ? "Leave Community" : "Join Community"}
                  onClick={handleJoinOrLeaveCommunity}
                  bgColor={
                    user.id === organizer.id ? "bg-white" : "bg-regal-blue"
                  }
                  textColor={
                    user.id === organizer.id ? "text-black" : "text-white"
                  }
                  className="px-6 py-2 "
                  disabled={user.id === organizer.id}
                />
              </div>
            </div>
          </IContainer>

          <IContainer className="pb-8">
            <div className="w-full">
              {hasJoined && <ICarousel imageUrls={gallery} />}
              {!hasJoined && <ICarousel imageUrls={[communityPicture]} />}
            </div>
          </IContainer>

          <IContainer className="pb-8">
            <CommunityDetails
              community={community}
              organizer={organizer}
              setShowMembersList={setShowMembersList}
            />
          </IContainer>

          {hasJoined && !showAllSocialEvents && (
            <IContainer className="pb-8">
              <div>
                <IPanel
                  title="Upcoming Hosted Events"
                  height="600px"
                  buttonLabel={showAllHostedEvents ? "Show Less" : "Show All"}
                  onButtonClick={toggleShowAllHostedEvents}
                >
                  <IEventPanel
                    events={hostedEvents}
                    showAll={showAllHostedEvents}
                    onEventClick={(id) => {
                      setCommunityEventId(id);
                      setShowCommunityEvent(true);
                    }}
                  ></IEventPanel>
                </IPanel>
              </div>
            </IContainer>
          )}

          {hasJoined && !showAllHostedEvents && (
            <IContainer className="pb-8">
              <div>
                <IPanel
                  title="Upcoming Social Events"
                  height="600px"
                  buttonLabel={showAllSocialEvents ? "Show Less" : "Show All"}
                  onButtonClick={toggleShowAllSocialEvents}
                >
                  <IEventPanel
                    events={socialEvents}
                    showAll={showAllSocialEvents}
                    onEventClick={(id) => {
                      setCommunityEventId(id);
                      setShowCommunityEvent(true);
                    }}
                  ></IEventPanel>
                </IPanel>
              </div>
            </IContainer>
          )}
        </div>
      )}
    </div>
  );
}

export default Community;
