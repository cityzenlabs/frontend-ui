import React, { useState } from "react";
import IPanel from "../../../../../Library/Panel/IPanel";
import ILabel from "../../../../../Library/Label/ILabel";
import {
  BadgeCheckIcon,
  SunIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";

import { attributeColors } from "../Constants/CommunityConstants";
import { MapIcon } from "@heroicons/react/outline";

import {
  UsersIcon,
  FireIcon,
  GlobeIcon,
  AcademicCapIcon,
  StarIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { Visibility } from "../Enums/CommunityEnums";

const CommunityDetails = ({
  community,
  organizer,
  handleForward,
  communityId,
}: any) => {
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

  const getColorByGenderRequirements = () => {
    switch (community?.genderRequirements) {
      case "MALE":
        return "#68BEF1";
      case "FEMALE":
        return "#40B87E";
      case "NEUTRAL":
        return "#4BCEC9";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
      <div className="col-span-3 xl:col-span-2">
        <IPanel height="h-[550px]">
          <div className="h-full flex flex-col">
            {community && (
              <div className="flex justify-between">
                <div className="flex">
                  <ILabel text={community.name} className="mr-2"></ILabel>
                  <BadgeCheckIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                    style={{ color: "#40B87E" }}
                  />
                </div>

                <div className="flex">
                  <div className="mr-2">{community.communityPoints}</div>
                  <SunIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                    style={{ color: getColorByGenderRequirements() }}
                  />
                </div>
              </div>
            )}
            <div className="mt-5 flex">
              <UserGroupIcon
                className="h-6 w-6 mr-2"
                aria-hidden="true"
                style={{ color: getColorByGenderRequirements() }}
              />
              <div>{community?.minimumAge + "-" + community?.maximumAge}</div>
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

      {/* Organizer and Requirements Panel */}
      <div className="col-span-3 xl:col-span-1 flex flex-col gap-6">
        <IPanel height="h-[177px]">
          <div>
            <div className="font-bold text-md">
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
                  const color = attributeColors[index % attributeColors.length];
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
          onPanelClick={() => {
            handleForward(
              Visibility.Community,
              Visibility.CommunityMembersList,
              communityId,
            );
          }}
        >
          <div className="flex justify-between items-center h-full">
            {community?.members.length} Members
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </IPanel>
      </div>
    </div>
  );
};

export default CommunityDetails;
