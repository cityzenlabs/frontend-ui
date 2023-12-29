import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import ILabel from "../../../../Library/Label/ILabel";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import { UsersIcon } from "@heroicons/react/outline";
import { useDash } from "../../../../Context/DashboardContext";

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
  const { user } = useDash();
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
        <div className="xl:w-3/4 w-full">
          <div>
            {communities?.map((community: any) => (
              <div
                key={community?.communityId}
                className="pb-4 flex justify-between"
                onClick={() =>
                  navigate(`/community/${community?.name}/${community?.id}`)
                }
              >
                <div className="flex ">
                  <div className=" h-[170px] xl:w-[250px] w-[200px]  overflow-hidden rounded">
                    <img
                      src={community?.photo}
                      alt={community?.name}
                      className=" w-full h-full object-cover "
                    />
                  </div>
                  <div className="ml-4 mt-1 text-[10px]">
                    <span className="border rounded-full py-1 px-3 font-thin text-white bg-black">
                      {community?.private ? "PRIVATE" : "PUBLIC"}
                    </span>
                    <div className="mt-4">
                      <div className="text-xs font-thin mb-1">{user?.city}</div>
                      <div className="text-lg mb-1">{community?.name}</div>
                      <div
                        className="text-xs font-thin xl:w-[300px] lg:w-[200px] md:w-[150px] sm:w-[200px] w-[200px] mb-1"
                        style={{
                          maxHeight: "inherit",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </div>
                      <div className="text-xs font-thin">
                        Reputation: {community?.reputation}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="border bg-black px-2 rounded-full flex items-center font-thin"
                  style={{ height: "fit-content" }}
                >
                  <div className="text-sm mr-1 text-white">
                    {community?.memberCount}
                  </div>
                  <div>
                    <UsersIcon
                      className="h-3.5 w-3.5 text-white"
                      aria-hidden="true"
                    />
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
