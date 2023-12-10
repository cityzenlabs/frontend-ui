import React from "react";

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
  showAll,
  onCommunityClick,
  title,
  buttonLabel,
  onButtonClick,
  height = "h-[244px]",
  marginTop = "mt-0",
  titleColor,
  paddingB = 4,
}) => {
  const paddingBClass = `pb-${paddingB}`;

  return (
    <div className={`${marginTop} ${paddingBClass}`}>
      <div className={`${height} rounded-lg bg-white px-7 py-2`}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1 pb-4">
          {communities?.slice(0, 4).map((community) => (
            <div
              key={community.communityId}
              className="rounded-lg shadow-md flex flex-col"
              onClick={() =>
                onCommunityClick &&
                onCommunityClick(community.name, community.id)
              }
            >
              <div className="h-28 overflow-hidden rounded-t-lg">
                <img
                  src={community.picture}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-2 pt-2 flex items-center justify-between">
                <h3 className="text-sm font-medium truncate">
                  {community.name}
                </h3>
                {/* Additional content or icons */}
              </div>
              <div className="px-2 flex items-center justify-between">
                <div className="text-xs font-medium truncate text-[#7E858B]">
                  Reputation {community.reputation}
                </div>
                <div className="text-xs font-medium truncate text-[#7E858B]">
                  Public
                </div>
              </div>
              <div className="px-2 pb-2 flex items-center justify-between">
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
      </div>
    </div>
  );
};

export default ICommunityPanel;
