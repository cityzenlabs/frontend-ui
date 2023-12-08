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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 overflow-x-auto">
      {communities?.slice(0, showAll ? undefined : 4).map((community) => (
        <div
          key={community.communityId} // Use communityId as key
          className="rounded-lg shadow-md flex flex-col"
          onClick={() =>
            onCommunityClick && onCommunityClick(community.name, community.id)
          }
        >
          <img
            src={community.picture}
            alt={community.name}
            className="rounded-t-lg w-full h-auto object-cover" // Removed fixed height, use auto to maintain aspect ratio
          />
          <div className="p-4 flex-grow">
            <h3>{community.name}</h3>
            <p className="text-sm">Reputation: {community.reputation}</p>
            <p className="text-sm">Members: {community.memberCount}</p>
            <p className="text-sm">Type: {community.attribute}</p>
            <p className="text-xs text-gray-500 uppercase">
              {community.premium ? "Premium Community" : "Regular Community"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ICommunityPanel;
