import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { getAttributeColor } from "../../../../Constants/Constants";
import { UsersIcon } from "@heroicons/react/outline";

function ShowAllCommunities({
  initialCommunities,
  fetchCommunitiesFunction,
  initialPage = 1,
  pageSize = 12,
  kind,
}: any) {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState(initialCommunities || []);
  const [page, setPage] = useState(initialPage + 1); // Start from the next page
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreCommunities = useCallback(async () => {
    try {
      const newCommunities = await fetchCommunitiesFunction(page, pageSize);
      if (newCommunities && newCommunities.length > 0) {
        setCommunities((prev: any) => [...prev, ...newCommunities]);
        setPage((prev: any) => prev + 1);
        if (newCommunities.length < pageSize) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    }
  }, [page, pageSize, fetchCommunitiesFunction]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      fetchMoreCommunities();
    }
  }, [fetchMoreCommunities, hasMore]);

  const handleNavigate = (communityName: any, communityId: any) => {
    kind === "Created Communities"
      ? navigate(`/community/manage/${communityId}`)
      : navigate(`/community/${communityName}/${communityId}`);
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setCommunities(initialCommunities);
    setPage(initialPage + 1); // Reset page as well
    setHasMore(true); // Reset hasMore in case new data is different
  }, [initialCommunities, initialPage]);

  return (
    <div>
      <div className="xl:w-3/4 w-full pb-4">
        {communities.map((community: any, index: any) => (
          <div
            key={index}
            className="mb-4 flex justify-between bg-white p-4 rounded "
            onClick={() => handleNavigate(community?.name, community?.id)}
          >
            <div className="flex">
              <div className="h-[170px] xl:w-[250px] w-[200px] overflow-hidden rounded">
                <img
                  src={community?.photo}
                  alt={community?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 mt-1 text-[10px]">
                <span className="rounded-full py-1 px-3 font-thin text-white bg-black">
                  {community?.privacy === "PRIVATE" ? "PRIVATE" : "PUBLIC"}
                </span>
                <span
                  className="ml-2 rounded-full py-1 px-3 font-thin text-white"
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
              className="bg-black px-2 rounded-full flex items-center font-thin"
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
  );
}

export default ShowAllCommunities;
