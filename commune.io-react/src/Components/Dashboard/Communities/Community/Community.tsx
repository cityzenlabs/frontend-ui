import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import * as UserService from "../../../../Services/UserService/UserService";
import ILabel from "../../../../Library/Label/ILabel";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import CommunityDetails from "../Reusable/CommunityDetails/CommunityDetails";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import { useDash } from "../../../../Context/DashboardContext";

import { useNavigate } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";
function Community() {
  const { communityId } = useParams();
  const accessToken = useAuth();
  const { user, triggerDataRefresh } = useDash();
  const navigate = useNavigate();

  const [community, setCommunity] = useState<any>();
  const [communityPicture, setCommunityPicture] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [gallery, setGallery] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [socialEvents, setSocialEvents] = useState<any>("");
  const [hostedEvents, setHostedEvents] = useState<any>("");
  const [showAllSocialEvents, setShowAllSocialEvents] = useState(false);
  const [showAllHostedEvents, setShowAllHostedEvents] = useState(false);

  const fetchCommunityData = async (callback = () => {}) => {
    try {
      const community = await CommunityService.getCommunity(
        communityId,
        accessToken.token,
      );
      if (community) {
        setCommunity(community);
        const organizer = await UserService.fetchUser(
          accessToken.token,
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
        accessToken.token,
        "upcoming",
      );
      if (upcomingEvents) {
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
        accessToken.token,
      );
      if (picture) {
        setCommunityPicture(picture);
      }
    } catch (error) {}
  };

  const fetchGallery = async () => {
    try {
      const gallery = await CommunityService.getCommunityPhotoGallery(
        accessToken.token,
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
      try {
        await Promise.all([
          fetchCommunityData(),
          fetchCommunityEvents(),
          fetchPicture(),
          fetchGallery(),
        ]);
      } catch (error) {}
      setIsLoading(false);
    };

    fetchData();
  }, [communityId, accessToken.token]);

  const handleJoinOrLeaveCommunity = async () => {
    try {
      const response = hasJoined
        ? await CommunityService.leaveCommunity(accessToken.token, communityId)
        : await CommunityService.joinCommunity(accessToken.token, communityId);

      if (response.ok) {
        await triggerDataRefresh();
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
    return <ISpinner />;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center pt-4 pb-4">
          <div className="flex">
            <ILabel text={community?.name} />
          </div>
          <div className="flex">
            <IButton
              text={hasJoined ? "Leave Community" : "Join Community"}
              onClick={handleJoinOrLeaveCommunity}
              bgColor={user?.id === organizer.id ? "bg-white" : "bg-regal-blue"}
              textColor={
                user?.id === organizer.id ? "text-black" : "text-white"
              }
              className="px-6"
              disabled={user?.id === organizer.id}
            />
          </div>
        </div>

        <div className="w-full pb-4">
          {hasJoined && <ICarousel imageUrls={gallery} />}
          {!hasJoined && <ICarousel imageUrls={[communityPicture]} />}
        </div>

        <div className="pb-4">
          <CommunityDetails
            community={community}
            organizer={organizer}
            communityId={communityId}
            communityPicture={communityPicture}
          />
        </div>

        {hasJoined && !showAllSocialEvents && (
          <IEventPanel
            title="Upcoming Hosted Events"
            height="600px"
            buttonLabel={showAllHostedEvents ? "Show Less" : "Show All"}
            onButtonClick={toggleShowAllHostedEvents}
            events={hostedEvents}
            showAll={showAllHostedEvents}
            onEventClick={(eventName, eventId) => {
              navigate(`/event/${eventName}/${eventId}`);
            }}
            marginTop="mt-0"
            paddingB={4}
          />
        )}

        {hasJoined && !showAllHostedEvents && (
          <IEventPanel
            title="Upcoming Social Events"
            height="600px"
            buttonLabel={showAllSocialEvents ? "Show Less" : "Show All"}
            onButtonClick={toggleShowAllSocialEvents}
            events={socialEvents}
            showAll={showAllSocialEvents}
            onEventClick={(eventName, eventId) => {
              navigate(`/event/${eventName}/${eventId}`);
            }}
            marginTop="mt-0"
            paddingB={4}
          />
        )}
      </div>
    </div>
  );
}

export default Community;
