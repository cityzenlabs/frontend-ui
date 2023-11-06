import React from "react";
import { HomeProps } from "./types/HomeProps";
import Profile from "./Profile/Profile";
import IContainer from "../../../Library/Container/IContainer";
import IPanel from "../../../Library/Panel/IPanel";
import ILabel from "../../../Library/Label/ILabel";

function Home({ viewProfile, setViewProfile, user }: HomeProps) {
  const handleSetViewProfile = (): void => {
    console.log(user);
    setViewProfile(true);
  };

  return (
    <div>
      {viewProfile ? (
        <Profile setViewProfile={setViewProfile} user={user} />
      ) : (
        <div>
          <IContainer paddingY={8}>
            <ILabel text="Dashboard"></ILabel>
            <div className="grid xl:grid-cols-2 gap-8">
              <div>
                <IPanel
                  title="Welcome, "
                  height="80"
                  marginTop="mt-8"
                  buttonLabel="See Profile"
                  onButtonClick={handleSetViewProfile}
                ></IPanel>

                <IPanel
                  title="Your Top 4 Attributes"
                  height="h-[403px]"
                  marginTop="mt-8"
                ></IPanel>
              </div>
              <IPanel
                title="Level up with these events"
                buttonLabel="See All"
                height="h-[515px]"
                marginTop="xl:mt-8"
              ></IPanel>
            </div>
          </IContainer>

          <IContainer>
            <IPanel
              title="Recommended Communities"
              buttonLabel="See All"
            ></IPanel>
          </IContainer>
          <IContainer paddingY={8}>
            <IPanel title="Upcoming Events" buttonLabel="See All"></IPanel>
          </IContainer>
        </div>
      )}
    </div>
  );
}

export default Home;
