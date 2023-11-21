import React from "react";
interface Community {
  communityName: string;
  communityReputation: number;
  memberCount: number;
  premiumCommunity: boolean;
  communityPicture?: string;
}

interface ManagedCommunities {
  [key: string]: Community;
}

interface ICommunityPanelProps {
  communities: ManagedCommunities;
}

const ICommunityPanel: React.FC<ICommunityPanelProps> = ({ communities }) => {
  return (
    <div className="xl:grid lg:grid grid-cols-4 gap-3 p-4 flex overflow-x-auto py-4 space-x-3">
      {Object.entries(communities)
        .slice(0, 4)
        .map(([id, community]) => (
          <div
            key={id}
            className="rounded-lg shadow-md"
            style={{ height: "275px" }}
          >
            <img
              src={community.communityPicture}
              alt=""
              className="rounded-t-lg w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3>{community.communityName}</h3>
              <p className="text-sm">
                Reputation: {community.communityReputation}
              </p>
              <p className="text-sm">Members: {community.memberCount}</p>

              <p className="text-xs text-gray-500 uppercase">
                {community.premiumCommunity
                  ? "Premium Community"
                  : "Regular Community"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ICommunityPanel;
