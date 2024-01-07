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
import ShowAllCommunities from "../Reusable/ShowAllCommunities";

function Communities() {
  const location = useLocation();
  const accessToken = useAuth();
  const { user } = useDash();
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
      setHasMore(false);
    } else if (!isLoading && hasMore) {
      setIsLoading(true);
      try {
        const data = await CommunityService.getCommunityDiscoveryShowAll(
          accessToken.token,
          getUrlForShowAll(),
        );
        if (Array.isArray(data)) {
          setCommunities((prevCommunities) => [...prevCommunities, ...data]);
          if (data.length < 12) {
            setHasMore(false);
          }
        }
      } catch (error) {
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
      <div className="pt-4 pb-4 flex justify-between xl:w-3/4 w-full ">
        <ILabel text={kind || ""}></ILabel>
      </div>

      <div>
        <ShowAllCommunities communities={communities} />
      </div>
    </div>
  );
}

export default Communities;
