import { CameraIcon } from "@heroicons/react/outline";
import React from "react";
import { UserGroupIcon } from "@heroicons/react/outline";
import {
  capitalizeFirstLetter,
  getAttributeColor,
} from "../../Constants/Constants";

interface ICommunityPanelProps {
  communities: any[];
  showAll?: boolean;
  onCommunityClick?: (name: string, id: string) => void;
  title?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  height?: string;
  marginTop?: string;
  titleColor?: string;
  paddingB?: number;
}

const ICommunityPanel: React.FC<ICommunityPanelProps> = ({
  communities,
  onCommunityClick,
  title,
  buttonLabel,
  onButtonClick,
  marginTop = "mt-0",
  titleColor,
  paddingB = 4,
}) => {
  const paddingBClass = `pb-${paddingB}`;

  return (
    <div className={`${marginTop} ${paddingBClass}`}>
      <div className={` rounded-lg bg-white px-7 py-2`}>
        <div className="flex justify-between items-center mb-1">
          <div
            className={`font-medium ${title ? "my-auto" : ""}`}
            style={{ color: titleColor }}
          >
            {title}
          </div>
          {buttonLabel && (
            <button
              className="text-xs border rounded px-4 py-1 my-auto"
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick && onButtonClick();
              }}
            >
              {buttonLabel}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1 pb-4">
          {communities?.slice(0, 4).map((community, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md flex flex-col"
              onClick={() =>
                onCommunityClick &&
                onCommunityClick(community.name, community.id)
              }
            >
              <div className="h-28 overflow-hidden rounded-t-lg relative">
                {community.photo ? (
                  <img
                    src={community?.photo}
                    alt={""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="border flex justify-center items-center w-full h-full">
                    <CameraIcon className="w-20 h-20 text-gray-500" />
                  </div>
                )}
                <span className="absolute text-[10px] top-2 right-2 bg-[#9FA3A6] bg-opacity-80 rounded-full px-3 font-thin text-white ">
                  {community?.privacy === "PRIVATE" ? (
                    <>
                      <div className="flex">
                        <svg
                          className="h-3 w-3 mr-1 "
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11V7a5 5 0 00-10 0v4m4 5v6m4-6v6m-4 0H5a2 2 0 01-2-2v-7a2 2 0 012-2h14a2 2 0 012 2v7a2 2 0 01-2 2h-3m-4 0h4"
                          />
                        </svg>
                        <div>PRIVATE</div>
                      </div>
                    </>
                  ) : (
                    <>PUBLIC</>
                  )}
                </span>
              </div>

              <div className="px-2 pt-2 pb-1 flex items-center justify-between">
                <h3 className="text-sm font-medium flex-grow truncate">
                  {community?.name}
                </h3>
                <div className="flex items-center ml-1">
                  <span className="text-xs text-[#7E858B] font-thin truncate flex-grow">
                    {community?.memberCount}
                  </span>
                  <UserGroupIcon
                    className="h-4 w-4 ml-1 flex-shrink-0 text-[#7E858B]"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="px-2 pb-1 flex items-center justify-between">
                <div
                  className="text-xs font-medium text-[#7E858B] truncate flex-grow"
                  style={{ color: getAttributeColor(community?.attribute) }}
                >
                  {capitalizeFirstLetter(community?.attribute)}
                </div>
              </div>
              <div className="px-2 pb-1 flex items-center justify-between">
                <div className="text-xs font-medium text-[#7E858B] font-thin truncate flex-grow">
                  Reputation: {community?.reputation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ICommunityPanel;
