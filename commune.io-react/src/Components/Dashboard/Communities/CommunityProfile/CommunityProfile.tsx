import React, { useEffect, useState } from "react";
import IAttributeBar from "../../../../Library/AttributeBar/IAttributeBar";
import IPanel from "../../../../Library/Panel/IPanel";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import { attributeColors } from "../Reusable/Constants/CommunityConstants";
import * as UserService from "../../../../Services/UserService/UserService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import { Visibility } from "../Reusable/Enums/CommunityEnums";

function CommunityProfile({
  userId,
  token,
  otherUserId,
  handleBack,
  handleForward,
  setCommunityId,
  setCommunityState,
}: any) {
  const [user, setUser] = useState<any>();
  const [communities, setCommunities] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUser = async () => {
    try {
      const user = await UserService.fetchUser(token, otherUserId);
      if (user) {
        setUser(user);
      }
    } catch (error) {}
  };

  const getJoinedCommunities = async () => {
    try {
      const communities = await CommunityService.getJoinedCommunities(
        token,
        otherUserId,
      );
      if (communities) {
        setCommunities(communities);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getUser(), getJoinedCommunities()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <IContainer className="pt-8 pb-8">
        <IBackButton onClick={() => handleBack()} />
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

      <IContainer className="pb-8">
        <IPanel
          title="Joined Communities"
          buttonLabel={"Show All"}
          height="600px"
          onButtonClick={() => console.log("")}
        >
          {communities && (
            <ICommunityPanel
              communities={communities}
              showAll={true}
              onCommunityClick={(id) => {
                setCommunityId(id);
                setCommunityState((prev: any) => [...prev, id]);
                handleForward(
                  Visibility.CommunityProfile,
                  Visibility.Community,
                );
              }}
            />
          )}
        </IPanel>
      </IContainer>
    </div>
  );
}

export default CommunityProfile;
