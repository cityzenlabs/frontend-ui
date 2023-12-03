import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import IPanel from "../../../../Library/Panel/IPanel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import * as UserService from "../../../../Services/UserService/UserService";
import ILabel from "../../../../Library/Label/ILabel";
import {
  UsersIcon,
  FireIcon,
  GlobeIcon,
  AcademicCapIcon,
  StarIcon,
  MoonIcon,
  ArrowRightIcon,
  UserGroupIcon,
  BadgeCheckIcon,
  SunIcon,
} from "@heroicons/react/solid";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import CommunityMembersList from "../CommunityMembersList/CommunityMembersList";
import { MapIcon } from "@heroicons/react/outline";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import { attributeColors } from "../Constants/CommunityConstants";
import CommunityEvent from "../CommunityEvent/CommunityEvent";

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
  const [genderRequirementColor, setGenderRequirementColor] = useState<any>();
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
        getColorByGenderRequirements(community.genderRequirements);
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

  const getIconForAttribute = (attribute: any) => {
    const icons: any = {
      social: <UsersIcon className="h-6 w-6" aria-hidden="true" />,
      fitness: <FireIcon className="h-6 w-6" aria-hidden="true" />,
      nightlife: <MoonIcon className="h-6 w-6 " aria-hidden="true" />,
      intelligence: <AcademicCapIcon className="h-6 w-6 " ria-hidden="true" />,
      culture: <StarIcon className="h-6 w-6" aria-hidden="true" />,
      adventure: <GlobeIcon className="h-6 w-6 " aria-hidden="true" />,
    };
    return icons[attribute.toLowerCase()];
  };

  const getColorByGenderRequirements = (genderRequirement: any) => {
    switch (genderRequirement) {
      case "MALE":
        setGenderRequirementColor("#68BEF1");
        break;
      case "FEMALE":
        setGenderRequirementColor("#40B87E");
        break;
      case "NEUTRAL":
        setGenderRequirementColor("#4BCEC9");
        break;
      default:
        return null;
    }
  };

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
            <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
              <div className="col-span-3 xl:col-span-2">
                <IPanel height="h-[550px]">
                  <div className=" h-full flex flex-col">
                    {community && (
                      <div className="flex justify-between">
                        <div className="flex">
                          <ILabel
                            text={community.name}
                            className="mr-2"
                          ></ILabel>
                          <BadgeCheckIcon
                            className="h-6 w-6 "
                            aria-hidden="true"
                            style={{ color: "#40B87E" }}
                          />
                        </div>

                        <div className="flex ">
                          <div className="mr-2">
                            {community?.communityPoints}
                          </div>
                          <SunIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                            style={{ color: genderRequirementColor }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="mt-5 flex">
                      <UserGroupIcon
                        className="h-6 w-6 mr-2"
                        aria-hidden="true"
                        color={genderRequirementColor}
                      />
                      <div>
                        {community?.minimumAge + "-" + community?.maximumAge}
                      </div>
                    </div>
                    <div className="mt-5 flex">
                      <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                      <div>{community?.city + ", " + community?.state}</div>
                    </div>

                    <div className="mt-5 overflow-y-auto whitespace-pre-wrap flex-grow">
                      {community?.description}
                    </div>
                  </div>
                </IPanel>
              </div>
              <div className="col-span-3 xl:col-span-1 flex flex-col gap-6">
                <IPanel height="h-[177px]">
                  <div>
                    <div className="font-bold text-md ">
                      {organizer?.firstName + " " + organizer?.lastName}
                    </div>
                    <div>Reputation Score - {organizer?.reputation}</div>
                    <div className="font-bold text-md mt-4">Community</div>
                    <div>Reputation Score - {community?.reputation}</div>
                  </div>
                </IPanel>

                <IPanel height="h-[270px]">
                  <div>
                    <div className="font-bold text-md mb-4">REQUIREMENTS</div>
                    <div className="grid grid-cols-2 gap-4">
                      {community?.attributeRequirements &&
                        Object.entries(
                          community.attributeRequirements as [string, number][],
                        ).map(([attribute, level], index) => {
                          const color =
                            attributeColors[index % attributeColors.length];
                          return (
                            <div
                              key={attribute}
                              className="flex justify-between items-center p-1"
                            >
                              <div className="flex-1">
                                <div
                                  className="text-sm font-medium capitalize"
                                  style={{ color }}
                                >
                                  {attribute.toLowerCase()}
                                </div>
                                <div className="text-xs">Level {level}</div>
                              </div>
                              {/* Use the same color for the icon */}
                              <div style={{ color }}>
                                {getIconForAttribute(attribute)}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </IPanel>

                <IPanel
                  height="h-[55px]"
                  onPanelClick={() => setShowMembersList(true)}
                >
                  <div className="flex justify-between items-center h-full ">
                    {Object.keys(community?.members ?? {}).length} Members
                    <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </IPanel>
              </div>
            </div>
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
