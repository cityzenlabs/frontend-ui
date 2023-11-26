import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home/Home";
import Events from "./Events/Events";
import Communities from "./Communities/Communities";
import Leaderboard from "./Leaderboard/Leaderboard";
import Notifications from "./Notifications/Notifications";
import Settings from "./Settings/Settings";
import * as UserService from "../../Services/UserService/UserService";
import { useAuth } from "../../AuthContext";

function Dashboard() {
  const [sideBarSelection, setSideBarSelection] = useState<string>("Home");
  const [sidebarVisibilty, setSidebarVisibility] = useState<boolean>(false);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const [home, setHome] = useState<any>();
  const [profilePicture, setProfilePicture] = useState<any>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataPromise = UserService.fetchUserHome(accessToken.token);
        const profilePicturePromise = UserService.fetchProfilePicture(
          accessToken.token,
        );

        const [dashboardData, imageUrl] = await Promise.all([
          userDataPromise,
          profilePicturePromise,
        ]);
        setHome(dashboardData);
        setProfilePicture(imageUrl);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar
        sideBarSelection={sideBarSelection}
        sideBarVisibility={sidebarVisibilty}
        viewProfile={viewProfile}
        setViewProfile={setViewProfile}
        setSideBarSelection={setSideBarSelection}
        setSideBarVisibility={setSidebarVisibility}
      />
      <div className="bg-slate-50 min-h-screen">
        <div>
          {sideBarSelection === "Home" && !isLoading && (
            <Home
              setViewProfile={setViewProfile}
              viewProfile={viewProfile}
              setSideBarSelection={setSideBarSelection}
              home={home}
            />
          )}
        </div>
        <div>{sideBarSelection === "Events" && <Events />}</div>
        <div>{sideBarSelection === "Communities" && <Communities />}</div>
        <div>{sideBarSelection === "Leaderboard" && <Leaderboard />}</div>
        <div>{sideBarSelection === "Notifications" && <Notifications />}</div>
        <div>
          {sideBarSelection === "Settings" && (
            <Settings
              setHome={setHome}
              home={home}
              profilePicture={profilePicture}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
