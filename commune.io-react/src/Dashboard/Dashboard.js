import Accordian from "../Accordian/Accordian";
import DashAuthButtons from "./AuthButtons/DashAuthButtons";
import CheckSection from "./CheckSection/CheckSection";
import DashContent from "./Content/DashContent";
import DashHeader from "./Header/DashHeader";
import DashImageSection from "./ImageSection/DashImageSection";
import { ACCORDIAN_OPTIONS } from "../constants";
import DashFooter from "./Footer/DashFooter";

function Dashboard() {
  const items = ACCORDIAN_OPTIONS;

  return (
    <div>
      <DashHeader />
      <DashAuthButtons />
      <DashContent />
      <DashImageSection
        heading="Section 1 Heading"
        text="A lot of random words just to see if this is working the way that it is supposed to."
        buttonText="Get started"
        imageSrc="/leaderBoard.png"
        imageAlt="Leaderboard"
        reverse={false}
      />
      <DashImageSection
        heading="Section 2 Heading"
        text="A lot of random words just to see if this is working the way that it is supposed to."
        buttonText="Get started"
        imageSrc="/graph.png"
        imageAlt="Graph"
        reverse={true}
      />
      <CheckSection />
      <Accordian items={items} />
      <DashFooter />
    </div>
  );
}

export default Dashboard;
