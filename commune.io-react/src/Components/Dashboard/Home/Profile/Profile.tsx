import React from "react";
import ProfileCommunities from "./ProfileCommunities/ProfileCommunities";
import ProfileStubs from "./ProfileStubs/ProfileStubs";
import { ProfileProps } from "./types/ProfileProps";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import IContainer from "../../../../Library/Container/IContainer";
import ILabel from "../../../../Library/Label/ILabel";
import IPanel from "../../../../Library/Panel/IPanel";
import IAttributeBar from "../../../../Library/AttributeBar/IAttributeBar";

function Profile({ setViewProfile, user }: ProfileProps) {
  const handleSetViewProfile = (): void => {
    setViewProfile(false);
  };

  const attributeColors = [
    "#68BEF1",
    "#40B87E",
    "#4BCEC9",
    "#A979E6",
    "#FFA656",
    "#FF5050",
  ];

  return (
    <div>
      <IContainer paddingY={8}>
        <IBackButton onClick={handleSetViewProfile} />
        <IPanel height="h-full" marginTop="mt-8">
          <div className="px-12 py-6 ">
            <div className="flex">
              <div className="w-[136px] h-[136px] rounded-full overflow-hidden">
                <img
                  src="levelUp.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6 grid grid-rows">
                <div className="text-2xl">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-sm">
                  Reputation Score - {user?.reputation}
                </div>
                <div className="text-sm">
                  {user?.city}, {user.state}{" "}
                  <div className="text-sm">
                    {user?.dateOfBirth} - {user?.gender}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg mt-12">Profile Points</div>
            <div className="xl:flex mt-3">
              <div className="w-full xl:w-full">
                <div className="xl:flex xl:flex-wrap">
                  {Object.entries(user?.attributes || {}).map(
                    ([attributeKey, attributeValue], index) => (
                      <IAttributeBar
                        key={attributeKey}
                        attributeKey={attributeKey}
                        attributeValue={attributeValue as any} // Cast to 'any' since we don't have a type here
                        color={attributeColors[index % attributeColors.length]} // Use modulo for cycling colors if more attributes than colors
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </IPanel>
      </IContainer>
    </div>
  );
}

export default Profile;
