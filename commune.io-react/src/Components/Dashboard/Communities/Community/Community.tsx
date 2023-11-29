import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import { Visibility } from "../Enums/CommunityEnums";
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
} from "@heroicons/react/solid";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import CommunityMembersList from "./CommunityMembersList";
import { MapIcon } from "@heroicons/react/outline";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import { attributeColors } from "../Constants/CommunityConstants";

function Community({
  setCommunitiesVisibility,
  communityId,
  token,
  user,
}: any) {
  const [community, setCommunity] = useState<any>();
  const [communityPicture, setCommunityPicture] = useState<any>();
  const [upcomingEvents, setUpcomingEvents] = useState<[]>();
  const [organizer, setOrganizer] = useState<any>();
  const [showMembersList, setShowMembersList] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const community = await CommunityService.getCommunity(
          communityId,
          token,
        );
        if (community) {
          setCommunity(community);
          const organizer = await UserService.fetchUser(
            token,
            community.organizer,
          );

          if (organizer) {
            setOrganizer(organizer);
            checkMembership(community);
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
          setUpcomingEvents(upcomingEvents);
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

    const checkMembership = (communityData: any) => {
      if (user && communityData) {
        setHasJoined(user?.joinedCommunities.includes(communityData.id));
      }
    };

    fetchData();
    fetchPicture();
    fetchCommunityEvents();
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

  const handleJoin = () => {};

  return (
    <div>
      {showMembersList && (
        <CommunityMembersList
          setShowMembersList={setShowMembersList}
          token={token}
          communityId={community.id}
        />
      )}

      {!showMembersList && (
        <div>
          <IContainer className="pt-8 pb-8">
            <div className="flex justify-between items-center">
              <div className="flex">
                <IBackButton
                  onClick={() =>
                    setCommunitiesVisibility(Visibility.Communities)
                  }
                />
                <ILabel className="ml-4" text={community?.name} />
              </div>
              <div>
                <IButton
                  text={hasJoined ? "Leave Community" : "Join Community"}
                  onClick={handleJoin}
                  bgColor="bg-regal-blue"
                  textColor="text-white"
                  className="px-6 py-2"
                />
              </div>
            </div>
          </IContainer>

          <IContainer className="pb-8">
            <div className="w-full">
              <IPanel height="h-[320px]">
                <ICarousel images={[communityPicture]} />
              </IPanel>
            </div>
          </IContainer>

          <IContainer className="pb-8">
            <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
              <div className="col-span-3 xl:col-span-2">
                <IPanel height="h-[550px]">
                  <div className=" h-full flex flex-col">
                    {community && (
                      <div>
                        <ILabel text={community.name}></ILabel>
                      </div>
                    )}
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
                          // Determine the color for the current attribute
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
          <IContainer className="pb-8">
            <div>
              <IPanel title="Upcoming Events" height="600px">
                {upcomingEvents && <IEventPanel events={upcomingEvents} />}
              </IPanel>
            </div>
          </IContainer>
        </div>
      )}
    </div>
  );
}

export default Community;
