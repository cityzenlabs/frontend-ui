import React, { useEffect, useState } from "react";
import IPanel from "../../../Library/Panel/IPanel";
import ILabel from "../../../Library/Label/ILabel";
import IToggleButtonGroup from "../../../Library/ToggleButtonGroup/IToggleButtonGroup";
import { useAuth } from "../../../AuthContext";
import * as LeaderBoardService from "../../../Services/LeaderboardService/LeaderboardService";
import { useDash } from "../../../Context/DashboardContext";
import ICommunityLeaderBoard from "../../../Library/Leaderboard/ICommunityLeaderBoard";
import IUserLeaderBoard from "../../../Library/Leaderboard/IUserLeaderBoard";

function Leaderboard() {
  const accessToken = useAuth();
  const { user, profilePicture } = useDash();
  const [location, setLocation] = useState("city");
  const [category, setCategory] = useState("user");
  const [attribute, setAttribute] = useState("SOCIAL");
  const [leaderBoard, setLeaderBoard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<any>(0);

  const fetchFilteredLeaderBoard = async () => {
    setIsLoading(true);
    try {
      const data = await LeaderBoardService.getLeaderboard(
        accessToken.token,
        `category=${category}&attribute=${attribute}&${location}=${getLocation()}&page=${page}`,
      );
      if (data) {
        setLeaderBoard(data);
      }
    } catch (error) {
      console.error("Failed to fetch filtered leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(profilePicture);
    fetchFilteredLeaderBoard();
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

  if (isLoading) {
    return <div></div>;
  }

  return (
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
            communities={leaderBoard?.content}
            onRowClick={() => {}}
          />
        )}
        {category === "user" && (
          <IUserLeaderBoard
            users={leaderBoard?.content}
            onRowClick={() => {}}
            picture={profilePicture}
          />
        )}
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
            onChange={setLocation}
            selectedValue={location}
          ></IToggleButtonGroup>
          <IToggleButtonGroup
            label="Category"
            options={[
              { label: "User", value: "user" },
              { label: "Community", value: "community" },
            ]}
            onChange={setCategory}
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
            onChange={setAttribute}
            selectedValue={attribute}
          ></IToggleButtonGroup>
        </IPanel>
      </div>
    </div>
  );
}

export default Leaderboard;
