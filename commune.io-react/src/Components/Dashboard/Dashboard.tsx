import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import IContainer from "../../Library/Container/IContainer";
import { WebSocketContext } from "../../Context/WebSocketContext";

function Dashboard() {
  const [sidebarVisibilty, setSidebarVisibility] = useState<boolean>(false);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const [sideBarSelection, setSideBarSelection] = useState(
    sessionStorage.getItem("sidebarSelection") || "Home",
  );

  useEffect(() => {
    sessionStorage.setItem("sidebarSelection", sideBarSelection);
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
      <IContainer>
        <Outlet />
      </IContainer>
    </div>
  );
}

export default Dashboard;
