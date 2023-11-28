import React from "react";

interface ICommunityPanelProps {
  communities: any[];
  showAll: boolean;
  onCommunityClick?: (id: string) => void;
}

const ICommunityPanel: React.FC<ICommunityPanelProps> = ({
  communities,
  showAll,
  onCommunityClick,
}) => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 p-4 overflow-x-auto py-4 space-x-3">
      {communities.slice(0, showAll ? undefined : 4).map((community) => (
        <div
          key={community.communityId} // Use communityId as key
          className="rounded-lg shadow-md"
          style={{ height: "275px" }}
          onClick={() =>
            onCommunityClick && onCommunityClick(community.communityId)
          }
        >
          <img
            src={community.communityPicture}
            alt={community.communityName}
            className="rounded-t-lg w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3>{community.communityName}</h3>
            <p className="text-sm">
              Reputation: {community.communityReputation}
            </p>
            <p className="text-sm">Members: {community.memberCount}</p>
            <p className="text-sm">Type: {community.communityType}</p>
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
