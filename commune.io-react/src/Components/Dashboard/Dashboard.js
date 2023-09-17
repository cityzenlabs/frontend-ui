import DashBody from "./Body/DashBody";
import DashHeader from "./Header/DashHeader";
import DashFooter from "./Footer/DashFooter";

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
