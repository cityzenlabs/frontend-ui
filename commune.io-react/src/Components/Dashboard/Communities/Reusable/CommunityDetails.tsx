import React from "react";
import IPanel from "../../../../Library/Panel/IPanel";
import ILabel from "../../../../Library/Label/ILabel";
import {
  BadgeCheckIcon,
  SunIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";

import { attributeColors } from "../../Constants/Constants";
import { MapIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { getIconForAttribute } from "../../Constants/Constants";
import IReputationBar from "../../../../Library/ReputationBar/IReputationBar";
import { getAttributeColor } from "../../../../Constants/Constants";

const CommunityDetails = ({
  community,
  communityId,
  membersList,
  organizerId,
}: any) => {
  console.log(community);
  let navigate = useNavigate();

  const getColorByGenderRequirements = () => {
    switch (community?.requirements?.genderRequirements) {
      case "MALE":
        return "#68BEF1";
      case "FEMALE":
        return "#40B87E";
      case "NONE":
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
                </div>

                <div className="flex">
                  <div className="mr-2">{community.communityPoints}</div>
                </div>
              </div>
            )}
            <div className="mt-2 flex text-[10px]">
              <span className=" rounded-full py-1 px-3 font-thin text-white bg-black">
                {community?.private ? "PRIVATE" : "PUBLIC"}
              </span>
              <span
                className=" ml-2 rounded-full py-1 px-3 font-thin text-white "
                style={{
                  backgroundColor: getAttributeColor(community?.attribute, 0.2),
                }}
              >
                <span
                  style={{
                    color: getAttributeColor(community?.attribute),
                  }}
                >
                  {community?.attribute}
                </span>
              </span>
            </div>
            <div className="mt-5 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <div className="text-[#7E858B] text-sm">
                {community?.city + ", " + community?.state}
              </div>
            </div>

            <div className="mt-5 mb-2 overflow-y-auto whitespace-pre-wrap flex-grow text-[#323439] font-thin">
              {community?.description}
            </div>
          </div>
        </IPanel>
      </div>

      <div className="col-span-3 xl:col-span-1 flex flex-col gap-5">
        <IPanel height="177px">
          <div className="flex items-center ">
            <div onClick={() => navigate(`/profile/${organizerId}`)}>
              <img
                src={community?.organizer?.photo}
                alt={``}
                style={{ borderRadius: "15px", objectFit: "cover" }}
                className="w-[30px] h-[30px] mr-2 mb-1"
              />
            </div>
            <div className="text-md">{community?.organizer?.name}</div>
          </div>
          <div className="text-[#7E858B] text-sm mb-6">
            <IReputationBar
              reputation={community?.organizer?.reputation}
              color="regal-blue"
            />
          </div>

          <div className="flex items-center ">
            <div
              onClick={() =>
                navigate(`/community/${community?.name}/${community?.id}`)
              }
            >
              <img
                src={community?.photo}
                alt={``}
                style={{ borderRadius: "15px", objectFit: "cover" }}
                className="w-[30px] h-[30px] mr-2 mb-1"
              />
            </div>
            <div className="text-md">{community?.name}</div>
          </div>

          <div className="text-[#7E858B] text-sm mb-6">
            <IReputationBar
              reputation={community?.reputation}
              color="regal-blue"
            />
          </div>
        </IPanel>

        <IPanel height="h-[255px]">
          <div>
            <div className="font-md text-xs pt-2">REQUIREMENTS</div>
            <div className="grid grid-cols-2 gap-5 py-6">
              {community?.requirements?.attributes &&
                Object.entries(
                  community.requirements?.attributes as [string, number][],
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
            {membersList?.length} Members
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </IPanel>
      </div>
    </div>
  );
};

export default CommunityDetails;
