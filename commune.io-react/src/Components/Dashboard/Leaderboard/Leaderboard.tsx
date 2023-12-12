import React, { useEffect, useState } from "react";
import IPanel from "../../../Library/Panel/IPanel";
import ILabel from "../../../Library/Label/ILabel";
import IToggleButtonGroup from "../../../Library/ToggleButtonGroup/IToggleButtonGroup";
import { useAuth } from "../../../AuthContext";
import * as LeaderBoardService from "../../../Services/LeaderboardService/LeaderboardService";
import { useDash } from "../../../Context/DashboardContext";
import ICommunityLeaderBoard from "../../../Library/Leaderboard/ICommunityLeaderBoard";
import IUserLeaderBoard from "../../../Library/Leaderboard/IUserLeaderBoard";
import ISpinner from "../../../Library/Spinner/ISpinner";
import IPaginator from "../../../Library/Paginator/Paginator";

function Leaderboard() {
  const accessToken = useAuth();
  const { user, profilePicture } = useDash();
  const [location, setLocation] = useState("city");
  const [category, setCategory] = useState("user");
  const [attribute, setAttribute] = useState("SOCIAL");
  const [firstThree, setFirstThree] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<any>();
  const [rest, setRest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState<any>(1);

  const fetchFirstThree = async () => {
    try {
      const data = await LeaderBoardService.getLeaderboard(
        accessToken.token,
        `category=${category}&attribute=${attribute}&${location}=${getLocation()}&page=${0}`,
      );
      if (data) {
        setFirstThree(data.content);
        getTotalPages(data.totalElements);
      }
    } catch (error) {}
  };

  const fetchRest = async () => {
    try {
      const data = await LeaderBoardService.getLeaderboard(
        accessToken.token,
        `category=${category}&attribute=${attribute}&${location}=${getLocation()}&page=${1}`,
      );
      if (data) {
        setRest(data.content);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchFirstThree(), fetchRest()]);
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, [location, category, attribute]);

  const getLocation = () => {
    switch (location) {
      case "city":
        return user?.city;
      case "state":
        return user?.state;
      case "global":
        return "";
    }
  };

  const getTotalPages = (totalElements: number) => {
    if (totalElements < 3) {
      setTotalPages(0);
    } else {
      setTotalPages(Math.ceil((totalElements - 3) / 7));
    }
  };
  const handlePageChange = async (newPage: any) => {
    setPage(newPage);
    // Fetch new data based on the new page
    await getNextPage(newPage);
  };

  const getNextPage = async (newPage: any) => {
    try {
      const data = await LeaderBoardService.getLeaderboard(
        accessToken.token,
        `category=${category}&attribute=${attribute}&${location}=${getLocation()}&page=${newPage}`,
      );
      if (data) {
        setRest(data.content);
      }
    } catch (error) {}
  };

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex flex-col w-4/5">
          <div className="pb-4 pt-4">
            <ILabel text="Leaderboard"></ILabel>
          </div>
          <div className="flex gap-2 pb-4">
            <IPanel height="h-[152px]"></IPanel>
            <IPanel height="h-[152px]"></IPanel>
            <IPanel height="h-[152px]"></IPanel>
          </div>

          {category === "community" && (
            <ICommunityLeaderBoard
              communities={rest}
              onRowClick={() => {}}
              page={page}
            />
          )}
          {category === "user" && (
            <IUserLeaderBoard
              users={rest}
              onRowClick={() => {}}
              picture={profilePicture}
              page={page}
            />
          )}
          <div className="flex justify-center items-center mt-4">
            <IPaginator
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="w-1/5 pt-16">
          <IPanel height="h-[516px]">
            <IToggleButtonGroup
              label="Location"
              options={[
                { label: "City", value: "city" },
                { label: "State", value: "state" },
                { label: "Global", value: "global" },
              ]}
              onChange={(newLocation) => {
                setLocation(newLocation);
                setPage(1);
              }}
              selectedValue={location}
            ></IToggleButtonGroup>
            <IToggleButtonGroup
              label="Category"
              options={[
                { label: "User", value: "user" },
                { label: "Community", value: "community" },
              ]}
              onChange={(newCategory) => {
                setCategory(newCategory);
                setPage(1);
              }}
              selectedValue={category}
            ></IToggleButtonGroup>
            <IToggleButtonGroup
              label="Attribute"
              options={[
                { label: "Overall", value: "OVERALL" },
                { label: "Social", value: "SOCIAL" },
                { label: "Intelligence", value: "INTELLIGENCE" },
                { label: "Fitness", value: "FITNESS" },
                { label: "Nightlife", value: "NIGHTLIFE" },
                { label: "Adventure", value: "ADVENTURE" },
                { label: "Culture", value: "CULTURE" },
              ]}
              onChange={(newAttribute) => {
                setAttribute(newAttribute);
                setPage(1);
              }}
              selectedValue={attribute}
            ></IToggleButtonGroup>
          </IPanel>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
