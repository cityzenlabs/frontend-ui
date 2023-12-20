import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import ILabel from "../../../../Library/Label/ILabel";
import ISpinner from "../../../../Library/Spinner/ISpinner";

function Communities({
  onCommunityClick,
  title,
  buttonLabel,
  onButtonClick,
  titleColor,
}: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const { kind }: any = useParams();
  const [communities, setCommunities] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (location.state?.communities) {
      setCommunities(location.state.communities);
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text={kind}></ILabel>
      </div>
      <div>
        <div className={` rounded-lg bg-white px-7 py-2`}>
          <div className="flex justify-between items-center mb-1">
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
            {communities?.map((community: any) => (
              <div
                key={community?.communityId}
                className="rounded-lg shadow-md flex flex-col"
                onClick={() =>
                  navigate(`/community/${community?.name}/${community?.id}`)
                }
              >
                <div className="h-28 overflow-hidden rounded-t-lg">
                  <img
                    src={community?.photo}
                    alt={community?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-2 pt-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium truncate">
                    {community?.name}
                  </h3>
                </div>
                <div className="px-2 flex items-center justify-between">
                  <div className="text-xs font-medium truncate text-[#7E858B]">
                    Reputation {community?.reputation}
                  </div>
                  <div className="text-xs font-medium truncate text-[#7E858B]">
                    Public
                  </div>
                </div>
                <div className="px-2 pb-2 flex items-center justify-between">
                  <div className="text-xs font-medium truncate text-[#7E858B]">
                    {community?.attribute}
                  </div>
                  <div className="text-xs text-[#7E858B] font-medium truncate flex">
                    {community?.memberCount} Members
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communities;
