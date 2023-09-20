import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home/Home";
import Events from "./Events/Events";
import Communities from "./Communities/Communities";
import Leaderboard from "./Leaderboard/Leaderboard";
import Notifications from "./Notifications/Notifications";
import Settings from "./Settings/Settings";
function Dashboard() {
  const [selectedItem, setSelectedItem] = useState<string>("Home");
  const [sidebarVisibilty, setSidebarVisibility] = useState<boolean>(false);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  return (
    <div>
      <Sidebar
        selectedItem={selectedItem}
        sideBarVisibility={sidebarVisibilty}
        viewProfile={viewProfile}
        setViewProfile={setViewProfile}
        setSelectedItem={setSelectedItem}
        setSideBarVisibility={setSidebarVisibility}
      />
      <div className="bg-slate-50 min-h-screen">
        <div>
          {selectedItem === "Home" && (
            <Home setViewProfile={setViewProfile} viewProfile={viewProfile} />
          )}
        </div>
        <div>{selectedItem === "Events" && <Events />}</div>
        <div>{selectedItem === "Communities" && <Communities />}</div>
        <div>{selectedItem === "Leaderboard" && <Leaderboard />}</div>
        <div>{selectedItem === "Notifications" && <Notifications />}</div>
        <div>{selectedItem === "Settings" && <Settings />}</div>
      </div>
    </div>
  );
}

export default Dashboard;
