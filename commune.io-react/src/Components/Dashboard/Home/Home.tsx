import React, { useState } from "react";
import { HomeProps } from "./types/HomeProps";
import Profile from "./Profile/Profile";
import IContainer from "../../../Library/Container/IContainer";
import IPanel from "../../../Library/Panel/IPanel";
import ILabel from "../../../Library/Label/ILabel";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";
import IAttributeBar from "../../../Library/AttributeBar/IAttributeBar";

function Home({ viewProfile, setViewProfile, user }: HomeProps) {
  const attributeColors = [
    "#68BEF1",
    "#40B87E",
    "#4BCEC9",
    "#A979E6",
    "#FFA656",
    "#FF5050",
  ];
  const handleSetViewProfile = (): void => {
    setViewProfile(true);
  };

  const [showAllRecommended, setShowAllRecommended] = useState(false);

  const toggleShowAllRecommended = () => {
    setShowAllRecommended((prev) => !prev);
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
                  title={"Welcome, " + user.firstName}
                  height="80"
                  marginTop="mt-8"
                  buttonLabel="See Profile"
                  onButtonClick={handleSetViewProfile}
                ></IPanel>

                <IPanel
                  title="Your Top 4 Attributes"
                  height="h-[403px]"
                  marginTop="mt-8"
                >
                  <div className="xl:flex mt-3">
                    <div className="w-full xl:w-full">
                      <div className="xl:flex xl:flex-wrap">
                        {Object.entries(user?.topFourAttributes || {}).map(
                          ([attributeKey, attributeValue], index) => (
                            <IAttributeBar
                              key={attributeKey}
                              attributeKey={attributeKey}
                              attributeValue={attributeValue as any} // Cast to 'any' since we don't have a type here
                              color={
                                attributeColors[index % attributeColors.length]
                              } // Use modulo for cycling colors if more attributes than colors
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </IPanel>
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
              height="600px"
              buttonLabel={showAllRecommended ? "Show Less" : "Show All"}
              onButtonClick={toggleShowAllRecommended}
            >
              {user?.recommendedCommunities && (
                <ICommunityPanel
                  communities={user.recommendedCommunities}
                  showAll={showAllRecommended}
                />
              )}
            </IPanel>
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
