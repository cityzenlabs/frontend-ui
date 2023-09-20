import DashBody from "./Body/DashBody";
import DashHeader from "./Header/DashHeader";
import DashFooter from "./Footer/DashFooter";
import React from "react";

function Dashboard() {
  return (
    <div>
      <DashHeader />
      <DashBody />
      <DashFooter />
    </div>
  );
}

export default Dashboard;
