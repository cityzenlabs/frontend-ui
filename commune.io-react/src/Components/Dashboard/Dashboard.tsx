import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home/Home";
import Events from "./Events/Events";
import Communities from "./Communities/CommunityDiscovery";
import Leaderboard from "./Leaderboard/Leaderboard";
import Notifications from "./Notifications/Notifications";
import Settings from "./Settings/Settings";
import * as UserService from "../../Services/UserService/UserService";
import { useAuth } from "../../AuthContext";
import CommunityDiscovery from "./Communities/CommunityDiscovery";

function Dashboard() {
  const [sideBarSelection, setSideBarSelection] = useState<string>("Home");
  const [sidebarVisibilty, setSidebarVisibility] = useState<boolean>(false);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const [userHome, setUserHome] = useState<any>();
  const [user, setUser] = useState<any>();
  const [profilePicture, setProfilePicture] = useState<any>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuth();
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const triggerDataRefresh = () => {
    setTriggerRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataPromise = UserService.fetchUserHome(accessToken.token);
        const profilePicturePromise = UserService.fetchProfilePicture(
          accessToken.token,
        );

        const [userHome, imageUrl] = await Promise.all([
          userDataPromise,
          profilePicturePromise,
        ]);
        setUserHome(userHome);
        setUser(userHome.user);
        setProfilePicture(imageUrl);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [triggerRefresh]);

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
              home={userHome}
              user={user}
            />
          )}
        </div>
        <div>
          {sideBarSelection === "Events" && (
            <Events user={user} getUpdatedUser={triggerDataRefresh} />
          )}
        </div>
        <div>
          {sideBarSelection === "Communities" && (
            <CommunityDiscovery
              user={user}
              getUpdatedUser={triggerDataRefresh}
            />
          )}
        </div>
        <div>{sideBarSelection === "Leaderboard" && <Leaderboard />}</div>
        <div>{sideBarSelection === "Notifications" && <Notifications />}</div>
        <div>
          {sideBarSelection === "Settings" && (
            <Settings
              setHome={setUserHome}
              home={userHome}
              profilePicture={profilePicture}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
