import React, { useEffect, useState } from "react";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ILabel from "../../../../Library/Label/ILabel";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import CommunityDetails from "../Reusable/CommunityDetails/CommunityDetails";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import { useDash } from "../../../../Context/DashboardContext";

import { useNavigate } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";
function Community() {
  const { communityId } = useParams();
  const accessToken = useAuth();
  const { user, joinedCommunities, setJoinedCommunities } = useDash();
  const navigate = useNavigate();
  const [community, setCommunity] = useState<any>();
  const [communityPicture, setCommunityPicture] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [gallery, setGallery] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [socialEvents, setSocialEvents] = useState<any>("");
  const [hostedEvents, setHostedEvents] = useState<any>("");
  const [showAllSocialEvents, setShowAllSocialEvents] = useState(false);
  const [showAllHostedEvents, setShowAllHostedEvents] = useState(false);
  const [organizerId, setOrganizerId] = useState<any>();
  const [membersList, setMembersList] = useState<any>();

  const fetchCommunityData = async () => {
    try {
      const communityPage = await CommunityService.getCommunityPage(
        communityId,
        accessToken.token,
      );
      if (communityPage) {
        setCommunity(communityPage?.community);
        setOrganizerId(communityPage?.community?.organizerId);
        setOrganizer(communityPage?.organizer);
        setHostedEvents(communityPage?.upcomingHostedEvents);
        setSocialEvents(communityPage?.upcomingSocialEvents);
        setMembersList(communityPage?.community?.members);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCommunityData();
      } catch (error) {}
      setIsLoading(false);
    };

    fetchData();
  }, [communityId, accessToken.token]);

  const handleJoinOrLeaveCommunity = async () => {
    try {
      const response = joinedCommunities?.includes(communityId)
        ? await CommunityService.leaveCommunity(accessToken.token, communityId)
        : await CommunityService.joinCommunity(accessToken.token, communityId);

      if (response.ok) {
        if (!joinedCommunities?.includes(communityId)) {
          const updatedMembersList = [...membersList, user?.id];
          setMembersList(updatedMembersList);
          setJoinedCommunities((prevCommunities: any) => [
            ...prevCommunities,
            communityId,
          ]);
        } else {
          const updatedMembersList = membersList.filter(
            (id: any) => id !== user?.id,
          );
          setMembersList(updatedMembersList);
          const updatedJoinedCommunities = joinedCommunities?.filter(
            (id: any) => id !== communityId,
          );
          setJoinedCommunities(updatedJoinedCommunities);
        }
      }
    } catch (error) {}
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
              text={
                joinedCommunities?.includes(communityId)
                  ? "Leave Community"
                  : "Join Community"
              }
              onClick={handleJoinOrLeaveCommunity}
              bgColor={user?.id === organizerId ? "bg-white" : "bg-regal-blue"}
              textColor={user?.id === organizerId ? "text-black" : "text-white"}
              className="px-6"
              disabled={user?.id === organizerId}
            />
          </div>
        </div>

        <div className="w-full pb-4">
          {joinedCommunities?.includes(communityId) && (
            <ICarousel imageUrls={gallery} />
          )}
          {!joinedCommunities?.includes(communityId) && (
            <ICarousel imageUrls={[community?.picture]} />
          )}
        </div>

        <div className="pb-4">
          <CommunityDetails
            community={community}
            organizer={organizer}
            communityId={communityId}
            communityPicture={communityPicture}
            membersList={membersList}
          />
        </div>

        {joinedCommunities?.includes(communityId) && (
          <IEventPanel
            title="Upcoming Hosted Events"
            height="600px"
            buttonLabel={showAllHostedEvents ? "Show Less" : "Show All"}
            onButtonClick={() => console.log("")}
            events={hostedEvents}
            showAll={showAllHostedEvents}
            onEventClick={(eventName, eventId) => {
              navigate(`/event/${eventName}/${eventId}`);
            }}
            marginTop="mt-0"
            paddingB={4}
          />
        )}

        {joinedCommunities?.includes(communityId) && (
          <IEventPanel
            title="Upcoming Social Events"
            height="600px"
            buttonLabel={showAllSocialEvents ? "Show Less" : "Show All"}
            onButtonClick={() => console.log("")}
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
