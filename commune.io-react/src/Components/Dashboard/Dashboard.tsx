import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home/Home";
import Events from "./Events/Events";
import Communities from "./Communities/Communities";
import Leaderboard from "./Leaderboard/Leaderboard";
import Notifications from "./Notifications/Notifications";
import Settings from "./Settings/Settings";
import * as UserService from "../../Services/UserService/UserService";

function Dashboard() {
  const [sideBarSelection, setSideBarSelection] = useState<string>("Home");
  const [sidebarVisibilty, setSidebarVisibility] = useState<boolean>(false);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const [userId] = useState<string>("652d77a0bee0d62986c1efdb");
  const [user, setUser] = useState<any>();
  const [profilePicture, setProfilePicture] = useState<any>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserService.fetchUserData(userId);
        setUser(userData);
      } catch (error) {
        setError(error as Error); // Explicitly cast error to Error type
      }
    };

    const getProfilePicture = async () => {
      try {
        const imageUrl = await UserService.fetchProfilePicture(userId);
        setProfilePicture(imageUrl);
      } catch (error) {
        setError(error as Error); // Explicitly cast error to Error type
      }
    };

    getProfilePicture();
    fetchData();
  }, [userId]);

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
          {sideBarSelection === "Home" && (
            <Home
              setViewProfile={setViewProfile}
              viewProfile={viewProfile}
              setSideBarSelection={setSideBarSelection}
              user={user}
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
              setUser={setUser}
              userId={userId}
              user={user}
              profilePicture={profilePicture}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
