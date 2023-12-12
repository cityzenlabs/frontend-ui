import React from "react";
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
import { useNavigate } from "react-router-dom";
import { getIconForAttribute } from "../../../Constants/Constants";

const CommunityDetails = ({ community, organizer, communityId }: any) => {
  let navigate = useNavigate();

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
    <div className="grid grid-cols-3 xl:grid-cols-3 gap-5">
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
              <div className="text-[#7E858B]">
                {community?.city + ", " + community?.state}
              </div>
            </div>

            <div className="mt-5 mb-2 overflow-y-auto whitespace-pre-wrap flex-grow text-[#323439]">
              {community?.description}
            </div>
          </div>
        </IPanel>
      </div>

      {/* Organizer and Requirements Panel */}
      <div className="col-span-3 xl:col-span-1 flex flex-col gap-5">
        <IPanel height="177px">
          <div className="flex items-center ">
            <div>
              <img
                src={organizer?.picture}
                alt={``}
                style={{ borderRadius: "15px", objectFit: "cover" }}
                className="w-[30px] h-[30px] mr-2 mb-1"
              />
            </div>
            <div className="text-md">
              {organizer?.firstName + " " + organizer?.lastName}
            </div>
          </div>
          <div className="text-[#7E858B] text-sm mb-6">
            Reputation Score - {organizer?.reputation}
          </div>

          <div className="flex items-center ">
            <div>
              <img
                src={community?.picture}
                alt={``}
                style={{ borderRadius: "15px", objectFit: "cover" }}
                className="w-[30px] h-[30px] mr-2 mb-1"
              />
            </div>
            <div className="text-md">Community</div>
          </div>

          <div className="text-[#7E858B] text-sm mb-6">
            Reputation Score - {community?.reputation}
          </div>
        </IPanel>

        <IPanel height="h-[270px]">
          <div>
            <div className="font-md text-xs pt-2">REQUIREMENTS</div>
            <div className="grid grid-cols-2 gap-5 py-6">
              {community?.attributeRequirements &&
                Object.entries(
                  community.attributeRequirements as [string, number][],
                ).map(([attribute, level], index) => {
                  const color = attributeColors[index % attributeColors.length];
                  return (
                    <div
                      key={attribute}
                      className="flex justify-between items-center "
                    >
                      <div className="flex-1">
                        <div
                          className="text-sm font-medium capitalize"
                          style={{ color }}
                        >
                          {attribute.toLowerCase()}
                        </div>
                        <div className="text-xs text-[#7E858B]">
                          Level {level}
                        </div>
                      </div>
                      <div
                        style={{
                          color:
                            attributeColors[index % attributeColors.length],
                          borderColor: `${
                            attributeColors[index % attributeColors.length]
                          }20`,
                          backgroundColor: `${
                            attributeColors[index % attributeColors.length]
                          }20`,
                        }}
                        className="border px-2 py-2 rounded"
                      >
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
            navigate(`/community/${communityId}/members`);
          }}
        >
          <div className="flex justify-between items-center">
            {community?.members?.length} Members
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </IPanel>
      </div>
    </div>
  );
};

export default CommunityDetails;
