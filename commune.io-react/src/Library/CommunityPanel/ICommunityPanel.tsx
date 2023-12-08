import { UserGroupIcon } from "@heroicons/react/outline";
import React from "react";

interface ICommunityPanelProps {
  communities: any[];
  showAll: boolean;
  onCommunityClick?: (name: string, id: string) => void;
}
const ICommunityPanel: React.FC<ICommunityPanelProps> = ({
  communities,
  showAll,
  onCommunityClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  pt-1 pb-4">
      {(showAll ? communities : communities?.slice(0, 4)).map((community) => (
        <div
          key={community.communityId}
          className="rounded-lg shadow-md flex flex-col" // Preserving the rounded corners
          onClick={() =>
            onCommunityClick && onCommunityClick(community.name, community.id)
          }
        >
          <div className="h-28 overflow-hidden rounded-t-lg">
            <img
              src={community.picture}
              alt={community.name}
              className="w-full h-full object-cover" // Image covers the container, maintaining its aspect ratio
            />
          </div>
          <div className="px-2 pt-2  flex items-center justify-between">
            <h3 className="text-sm font-medium truncate">{community.name}</h3>
            <div className="flex">
              <div className="text-xs font-medium truncate"></div>
            </div>
          </div>
          <div className=" px-2  flex items-center justify-between">
            <div className="text-xs font-medium truncate text-[#7E858B]">
              Reputation {community.reputation}
            </div>
            <div className="text-xs font-medium truncate text-[#7E858B]">
              Public
            </div>
          </div>
          <div className=" px-2  pb-2 flex items-center justify-between">
            <div className="text-xs font-medium truncate text-[#7E858B]">
              {community.attribute}
            </div>
            <div className="text-xs text-[#7E858B] font-medium truncate flex">
              {community.memberCount} Members
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ICommunityPanel;
