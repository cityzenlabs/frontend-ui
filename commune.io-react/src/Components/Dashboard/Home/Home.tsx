import React, { useState } from "react";
import Profile from "./Profile/Profile";
import IContainer from "../../../Library/Container/IContainer";
import IPanel from "../../../Library/Panel/IPanel";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";
import IAttributeBar from "../../../Library/AttributeBar/IAttributeBar";
import { attributeColors } from "./Constants/HomeConstats";

function Home({ viewProfile, setViewProfile, home, user }: any) {
  const [showAllRecommended, setShowAllRecommended] = useState(false);

  return (
    <div>
      {viewProfile ? (
        <Profile setViewProfile={setViewProfile} user={user} />
      ) : (
        <div>
          <IContainer className="pt-8 pb-8">
            <div className="grid xl:grid-cols-2 gap-8">
              <div>
                <IPanel
                  title={"Welcome, " + user?.firstName}
                  height="80"
                  marginTop="mt-8"
                  buttonLabel="See Profile"
                  onButtonClick={() => setViewProfile(true)}
                ></IPanel>

                <IPanel
                  title="Your Top 4 Attributes"
                  height="h-[403px]"
                  marginTop="mt-8"
                >
                  <div className="xl:flex mt-3">
                    <div className="w-full xl:w-full">
                      <div className="xl:flex xl:flex-wrap">
                        {Object.entries(home?.topFourAttributes || {}).map(
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

          <IContainer className="pb-8">
            <IPanel
              title="Recommended Communities"
              height="600px"
              buttonLabel={showAllRecommended ? "Show Less" : "Show All"}
              onButtonClick={() =>
                setShowAllRecommended(!setShowAllRecommended)
              }
            >
              {home?.recommendedCommunities && (
                <ICommunityPanel
                  communities={home.recommendedCommunities}
                  showAll={showAllRecommended}
                />
              )}
            </IPanel>
          </IContainer>
          <IContainer className="pb-8">
            <IPanel
              title="Upcoming Events"
              height="600px"
              buttonLabel="Show All"
            >
              {home?.recommendedCommunities && (
                <ICommunityPanel
                  communities={home.upcomingEvents}
                  showAll={true}
                />
              )}
            </IPanel>
          </IContainer>
        </div>
      )}
    </div>
  );
}

export default Home;
