import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import debounce from "lodash/debounce"; // Ensure lodash/debounce is correctly imported
import ILabel from "../../../../Library/Label/ILabel";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import { UsersIcon } from "@heroicons/react/outline";
import { getAttributeColor } from "../../../../Constants/Constants";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import { useAuth } from "../../../../Context/AuthContext";
import { useDash } from "../../../../Context/DashboardContext";

function Communities() {
  const location = useLocation();
  const accessToken = useAuth();
  const { user } = useDash();
  const navigate = useNavigate();
  const { kind } = useParams();
  const [communities, setCommunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getUrlForShowAll = useCallback(() => {
    switch (location.state?.type) {
      case "trending":
        return `trending?city=${user?.city}&page=${page}`;
      case "new":
        return `new?city=${user?.city}&page=${page}`;
      case "recommended":
        return `recommended?city=${user?.city}&attribute=${user?.topAttribute}&page=${page}`;
      default:
        return null;
    }
  }, [location.state?.type, user?.city, user?.topAttribute, page]);

  const fetchCommunities = useCallback(async () => {
    if (location.state?.communities) {
      setCommunities(location.state.communities);
      setIsLoading(false);
      setHasMore(false); // Assuming no more data needs to be fetched
    } else if (!isLoading && hasMore) {
      setIsLoading(true);
      try {
        const data = await CommunityService.getCommunityDiscoveryShowAll(
          accessToken.token,
          getUrlForShowAll(),
        );
        // Check if data is an array before trying to spread it into state
        if (Array.isArray(data)) {
          setCommunities((prevCommunities) => [...prevCommunities, ...data]);
          if (data.length < 12) {
            // Replace 12 with your actual page size
            setHasMore(false);
          }
        } else {
          console.error("Data fetched is not an array:", data);
          // Handle non-array data appropriately
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
        // Handle the error
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    location.state?.communities,
    accessToken.token,
    getUrlForShowAll,
    isLoading,
    hasMore,
  ]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      !isLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchCommunities();
    setIsLoading(false);
  }, [page, fetchCommunities]);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text={kind || ""}></ILabel>
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
                    <span className=" rounded-full py-1 px-3 font-thin text-white bg-black">
                      {community?.private ? "PRIVATE" : "PUBLIC"}
                    </span>
                    <span
                      className=" ml-2 rounded-full py-1 px-3 font-thin text-white "
                      style={{
                        backgroundColor: getAttributeColor(
                          community?.attribute,
                          0.2,
                        ),
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
                    <div className="mt-4">
                      <div className="text-xs font-thin mb-1">
                        {community?.city}, {community?.state}
                      </div>
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
                        {community?.description}
                      </div>
                      <div className="text-[11px] font-md mt-2">
                        Reputation: {community?.reputation}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className=" bg-black px-2 rounded-full flex items-center font-thin"
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
