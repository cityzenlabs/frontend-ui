import React, { useEffect, useState } from "react";
import ILabel from "../../../Library/Label/ILabel";
import IButton from "../../../Library/Button/IButton";
import { useAuth } from "../../../Context/AuthContext";
import * as CommunityService from "../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";

import { useNavigate } from "react-router-dom";
import IMenuButton from "../../../Library/MenuButton/IMenuButton";
import { useScreenSize } from "../../../Context/ScreenContext";
import ISpinner from "../../../Library/Spinner/ISpinner";
import { useDash } from "../../../Context/DashboardContext";
import ISearch from "../../../Library/Search/ISearch";
import Communities from "./Communities/Communities";
import ShowAllCommunities from "./Reusable/ShowAllCommunities";

function CommunityDiscovery() {
  const accessToken = useAuth();
  const { user } = useDash();
  const navigate = useNavigate();
  const { isMobile, isLargeScreen } = useScreenSize();
  const [isLoading, setIsLoading] = useState(true);
  const [communityDiscovery, setCommunityDiscovery] = useState<any>();
  const [showFilteredResults, setShowFilteredResults] = useState<any>();
  const [filteredCommunities, setFilteredCommunities] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<any>();
  const [selectedPrivacy, setSelectedPrivacy] = useState<any>();
  const [selectedAttribute, setSelectedAttribute] = useState<any>();

  const [page, setPage] = useState(1);

  const fetchCommunityDiscovery = async () => {
    try {
      const data = await CommunityService.getCommunityDiscovery(
        accessToken.token,
        user?.city,
        user?.topAttribute,
      );
      if (data) {
        setCommunityDiscovery(data);
      }
    } catch (error) {}
  };

  const fetchMoreCommunities = async (page: any) => {
    const searchUrl = `search?city=${user?.city}&nameContains=${searchTerm}&privacy=${selectedPrivacy}&attribute=${selectedAttribute}&page=${page}`;
    try {
      const data = await CommunityService.getCommunityDiscoverySearch(
        accessToken.token,
        searchUrl,
      );
      return data; // Should return an array of communities
    } catch (error) {
      console.error("Error fetching more communities:", error);
      return []; // Return empty array in case of error
    }
  };

  const handleSearch = async (
    searchTerm: string,
    selectedPrivacy: any,
    selectedAttribute: any,
  ) => {
    if (
      searchTerm === "" &&
      selectedPrivacy === "" &&
      selectedAttribute === ""
    ) {
      setShowFilteredResults(false);
    } else {
      setSearchTerm(searchTerm);
      setSelectedPrivacy(selectedPrivacy);
      setSelectedAttribute(selectedAttribute);
      setPage(1);
      const searchUrl = `search?city=${user?.city}&nameContains=${searchTerm}&privacy=${selectedPrivacy}&attribute=${selectedAttribute}&page=1`;
      try {
        const filteredCommunities =
          await CommunityService.getCommunityDiscoverySearch(
            accessToken.token,
            searchUrl,
          );
        setFilteredCommunities(filteredCommunities);
        setShowFilteredResults(true);
      } catch (error) {}
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCommunityDiscovery();
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div>
      <div>
        <div className="flex justify-between pt-4 pb-4">
          <ILabel text="Discover Communities" />
          <div className={`flex ${isLargeScreen ? "" : "hidden"}`}>
            <ISearch handleSearch={handleSearch} />
            <IButton
              text="Home"
              onClick={() => navigate("/communities/home")}
              className="px-6 mr-2"
            />
            <IButton
              text="Create +"
              onClick={() => navigate("/communities/create")}
              bgColor="bg-regal-blue"
              textColor="text-white"
              className="px-6"
            />
          </div>

          {!isLargeScreen && (
            <IMenuButton
              options={[
                {
                  label: "Home",
                  action: () => navigate("/communities/home"),
                },
                {
                  label: "Create +",
                  action: () => navigate("/communities/create"),
                },
              ]}
            />
          )}
        </div>
        {!showFilteredResults && (
          <div>
            <ICommunityPanel
              title="Trending"
              buttonLabel={
                communityDiscovery?.trendingCommunities?.length
                  ? "Show All"
                  : ""
              }
              height="600px"
              onButtonClick={() =>
                navigate(
                  `/communities/${encodeURIComponent("Trending Communities")}`,
                  {
                    state: {
                      type: "trending",
                    },
                  },
                )
              }
              communities={communityDiscovery?.trendingCommunities}
              onCommunityClick={(communityName, communityId) => {
                navigate(`/community/${communityName}/${communityId}`);
              }}
            />
            <ICommunityPanel
              title="New"
              buttonLabel={
                communityDiscovery?.newCommunities?.length ? "Show All" : ""
              }
              height="600px"
              onButtonClick={() =>
                navigate(
                  `/communities/${encodeURIComponent("New Communities")}`,
                  {
                    state: {
                      type: "new",
                    },
                  },
                )
              }
              communities={communityDiscovery?.newCommunities}
              onCommunityClick={(communityName, communityId) => {
                navigate(`/community/${communityName}/${communityId}`);
              }}
            />

            <ICommunityPanel
              title="Recommended"
              buttonLabel={
                communityDiscovery?.recommendedCommunities?.length
                  ? "Show All"
                  : ""
              }
              height="600px"
              onButtonClick={() =>
                navigate(
                  `/communities/${encodeURIComponent(
                    "Recommended Communities",
                  )}`,
                  {
                    state: {
                      type: "recommended",
                    },
                  },
                )
              }
              communities={communityDiscovery?.recommendedCommunities}
              onCommunityClick={(communityName, communityId) => {
                navigate(`/community/${communityName}/${communityId}`);
              }}
            />
          </div>
        )}

        {showFilteredResults && (
          <ShowAllCommunities
            initialCommunities={filteredCommunities}
            fetchCommunitiesFunction={fetchMoreCommunities}
            initialPage={page}
            pageSize={12}
          />
        )}
      </div>
    </div>
  );
}

export default CommunityDiscovery;
