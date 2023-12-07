import React from "react";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import IAttributeBar from "../../../../Library/AttributeBar/IAttributeBar";
import { attributeColors } from "../Constants/HomeConstats";
import { BadgeCheckIcon } from "@heroicons/react/solid";

function Profile({ setViewProfile, user }: any) {
  const handleSetViewProfile = (): void => {
    setViewProfile(false);
  };

  const calculateRegistrationAge = (registrationDate: any) => {
    const regDate: any = new Date(registrationDate);
    const today: any = new Date();
    const diffTime = Math.abs(today - regDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const weeksOld = Math.floor(diffDays / 7);
    const monthsOld = Math.floor(diffDays / 30); // Approximation
    const yearsOld = today.getFullYear() - regDate.getFullYear();

    if (yearsOld > 0) return `${yearsOld} year(s) old`;
    if (monthsOld > 0) return `${monthsOld} month(s) old`;
    return `${weeksOld} week(s) old`;
  };

  const calculateAge = (dob: any) => {
    const birthday = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <IContainer className="pt-8 pb-8">
        <IBackButton onClick={handleSetViewProfile} />
        <IPanel height="h-full" marginTop="mt-8">
          <div className="px-12 py-6 ">
            <div className="flex">
              <div className="w-[136px] h-[136px] rounded-full overflow-hidden flex">
                <img
                  src="levelUp.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6 grid grid-rows">
                <div className="text-2xl flex justify-between">
                  <div>
                    <div className="mr-2">
                      {user?.firstName} {user?.lastName}
                    </div>

                    <div className="text-xs" style={{ color: "#40B87E" }}>
                      {user?.subscription?.tier}
                    </div>
                  </div>

                  <div>{user?.userPoints}</div>
                </div>
                <div className="text-sm">
                  Reputation Score - {user?.reputation}
                </div>
                <div className="text-sm">
                  {user?.city}, {user.state}{" "}
                  <div className="text-sm">
                    {calculateAge(user?.dateOfBirth)} - {user?.gender}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-sm">
                    {calculateRegistrationAge(user?.metadata?.registrationDate)}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg mt-12">Profile Points</div>
            <div className="xl:flex mt-3">
              <div className="w-full xl:w-full">
                <div className="xl:flex xl:flex-wrap">
                  {Object.entries(user.attributes || {}).map(
                    ([attributeKey, attributeValue], index) => (
                      <IAttributeBar
                        key={attributeKey}
                        attributeKey={attributeKey}
                        attributeValue={attributeValue as any} // Cast to 'any' since we don't have a type here
                        color={attributeColors[index % attributeColors.length]}
                        isHalfWidth={true} // Use modulo for cycling colors if more attributes than colors
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
