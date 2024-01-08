import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import ILabel from "../../../../Library/Label/ILabel";
import ISpinner from "../../../../Library/Spinner/ISpinner";
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

  const fetchCommunitiesFunction = useCallback(
    async (page: any) => {
      let url: any = "";
      switch (location.state?.type) {
        case "trending":
          url = `trending?city=${user?.city}&page=${page}`;
          break;
        case "new":
          url = `new?city=${user?.city}&page=${page}`;
          break;
        case "recommended":
          url = `recommended?city=${user?.city}&attribute=${user?.topAttribute}&page=${page}`;
          break;
        default:
          url = null;
      }

      if (url) {
        try {
          const data = await CommunityService.getCommunityDiscoveryShowAll(
            accessToken.token,
            url,
          );
          return data;
        } catch (error) {
          console.error("Error fetching communities:", error);
          return [];
        }
      } else {
        return [];
      }
    },
    [accessToken.token, location.state?.type, user?.city, user?.topAttribute],
  );

  useEffect(() => {
    if (location.state.communities) {
      setCommunities(location.state.communities);
      setIsLoading(false);
    } else {
      fetchCommunitiesFunction(1).then((data) => {
        if (Array.isArray(data)) {
          setCommunities(data);
        }
        setIsLoading(false);
      });
    }
  }, [fetchCommunitiesFunction]);

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="pt-4 pb-4 flex justify-between xl:w-3/4 w-full ">
        <ILabel text={kind || ""}></ILabel>
      </div>
      <ShowAllCommunities
        initialCommunities={communities}
        fetchCommunitiesFunction={fetchCommunitiesFunction}
        kind={kind}
      />
    </div>
  );
}

export default Communities;
