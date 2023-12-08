import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const [sidebarVisibilty, setSidebarVisibility] = useState<boolean>(false);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const [sideBarSelection, setSideBarSelection] = useState(
    sessionStorage.getItem("sidebarSelection") || "Home",
  );

  useEffect(() => {
    // Save to sessionStorage when sideBarSelection changes
    sessionStorage.setItem("sidebarSelection", sideBarSelection);

    // Optional: Clean up listener when component unmounts
    return () => {
      sessionStorage.removeItem("sidebarSelection");
    };
  }, [sideBarSelection]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Sidebar
        sideBarSelection={sideBarSelection}
        sideBarVisibility={sidebarVisibilty}
        viewProfile={viewProfile}
        setViewProfile={setViewProfile}
        setSideBarSelection={setSideBarSelection}
        setSideBarVisibility={setSidebarVisibility}
      />
      <Outlet />
    </div>
  );
}

export default Dashboard;
