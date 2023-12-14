import React, { useEffect, useState } from "react";
import IPanel from "../../../Library/Panel/IPanel";
import ILabel from "../../../Library/Label/ILabel";
import IToggleButtonGroup from "../../../Library/ToggleButtonGroup/IToggleButtonGroup";
import { useAuth } from "../../../Context/AuthContext";
import * as LeaderBoardService from "../../../Services/LeaderboardService/LeaderboardService";
import { useDash } from "../../../Context/DashboardContext";
import CommunityLeaderBoard from "./LeaderBoardTables/CommunityLeaderBoard";
import UserLeaderBoard from "./LeaderBoardTables/UserLeaderBoard";
import ISpinner from "../../../Library/Spinner/ISpinner";
import IPaginator from "../../../Library/Paginator/Paginator";
import IMenuButtonFilter from "../../../Library/MenuButtonFilter/IMenuButtonFilter";
import { useScreenSize } from "../../../Context/ScreenContext";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const accessToken = useAuth();
  const navigate = useNavigate();
  const { user, profilePicture } = useDash();
  const [location, setLocation] = useState("city");
  const [category, setCategory] = useState("user");
  const [attribute, setAttribute] = useState("SOCIAL");
  const [firstThree, setFirstThree] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<any>();
  const [rest, setRest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isExtraLargeScreen } = useScreenSize();
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const filterOptions = [
    {
      label: "Location",
      options: [
        { label: "City", value: "city" },
        { label: "State", value: "state" },
        { label: "Global", value: "global" },
      ],
      onChange: setLocation, // Assuming you have a setLocation function
      selectedValue: location, // Assuming you have a location state
    },
    {
      label: "Category",
      options: [
        { label: "User", value: "user" },
        { label: "Community", value: "community" },
      ],
      onChange: setCategory, // Assuming you have a setCategory function
      selectedValue: category, // Assuming you have a category state
    },
    {
      label: "Attribute",
      options: [
        { label: "Overall", value: "OVERALL" },
        { label: "Social", value: "SOCIAL" },
        { label: "Intelligence", value: "INTELLIGENCE" },
        { label: "Fitness", value: "FITNESS" },
        { label: "Nightlife", value: "NIGHTLIFE" },
        { label: "Adventure", value: "ADVENTURE" },
        { label: "Culture", value: "CULTURE" },
      ],
      onChange: setAttribute,
      selectedValue: attribute,
    },
  ];

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
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      isFirstRender ? setIsLoading(true) : setIsTableLoading(true);
      try {
        await Promise.all([fetchFirstThree(), fetchRest()]);
      } catch (error) {}
      setIsLoading(false);
      setIsTableLoading(false);
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
    setIsTableLoading(true);
    setPage(newPage);
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
        setIsTableLoading(false);
      }
    } catch (error) {}
  };

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex flex-col w-full xl:w-4/5">
          <div className="flex justify-between items-center pb-4 pt-4">
            <ILabel text="Leaderboard"></ILabel>
            {!isExtraLargeScreen && (
              <IMenuButtonFilter filterOptions={filterOptions} />
            )}
          </div>
          {isTableLoading && <ISpinner />}
          {category === "community" && (
            <CommunityLeaderBoard
              communities={rest}
              onRowClick={() => {}}
              page={page}
              firstThree={firstThree}
            />
          )}
          {category === "user" && (
            <UserLeaderBoard
              users={rest}
              onRowClick={(userId) => navigate(`/profile/${userId}`)}
              picture={profilePicture}
              page={page}
              firstThree={firstThree}
            />
          )}
          <div className="flex justify-center items-center mt-4 pb-4">
            <IPaginator
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {isExtraLargeScreen && (
          <div className="w-1/5 pt-16">
            <IPanel>
              {filterOptions?.map((option, index) => (
                <IToggleButtonGroup
                  key={index}
                  label={option.label}
                  options={option.options}
                  onChange={option.onChange}
                  selectedValue={option.selectedValue}
                />
              ))}
            </IPanel>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
