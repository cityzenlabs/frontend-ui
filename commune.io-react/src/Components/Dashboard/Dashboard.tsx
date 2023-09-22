import React, { useState } from "react";
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
            />
          )}
        </div>
        <div>{sideBarSelection === "Events" && <Events />}</div>
        <div>{sideBarSelection === "Communities" && <Communities />}</div>
        <div>{sideBarSelection === "Leaderboard" && <Leaderboard />}</div>
        <div>{sideBarSelection === "Notifications" && <Notifications />}</div>
        <div>{sideBarSelection === "Settings" && <Settings />}</div>
      </div>
    </div>
  );
}

export default Dashboard;
