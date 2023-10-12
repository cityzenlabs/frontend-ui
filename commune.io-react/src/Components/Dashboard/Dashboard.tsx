import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home/Home";
import Events from "./Events/Events";
import Communities from "./Communities/Communities";
import Leaderboard from "./Leaderboard/Leaderboard";
import Notifications from "./Notifications/Notifications";
import Settings from "./Settings/Settings";
function Dashboard() {
  const [sideBarSelection, setSideBarSelection] = useState<string>("Home");
  const [sidebarVisibilty, setSidebarVisibility] = useState<boolean>(false);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [userId] = useState<string>("65273b2aab6a9b4c117b09a6");
  const [profilePicture, setProfilePicture] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/app-service/users/${userId}`,
        );

        const result = await response.json();
        if (JSON.stringify(user) !== JSON.stringify(result)) {
          setUser(result);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const getProfilePicture = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/app-service/users/${userId}/profile-picture`,
        );

        const imageUrl = await response.text();

        setProfilePicture(imageUrl);
      } catch (error) {}
    };
    getProfilePicture();
    fetchData();
  }, []); // Still depend on user, but check before setting state

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
