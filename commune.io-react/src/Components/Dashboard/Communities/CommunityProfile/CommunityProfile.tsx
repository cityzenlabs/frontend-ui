import React, { useEffect, useState } from "react";
import IAttributeBar from "../../../../Library/AttributeBar/IAttributeBar";
import IPanel from "../../../../Library/Panel/IPanel";
import IContainer from "../../../../Library/Container/IContainer";
import { attributeColors } from "../Reusable/Constants/CommunityConstants";
import * as UserService from "../../../../Services/UserService/UserService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import { useAuth } from "../../../../AuthContext";
import { useParams } from "react-router-dom";
import ILabel from "../../../../Library/Label/ILabel";
import { useNavigate } from "react-router-dom";

function CommunityProfile() {
  const accessToken = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>();
  const [communities, setCommunities] = useState<any>();

  const getUser = async () => {
    try {
      const user = await UserService.fetchUser(accessToken.token, userId);
      if (user) {
        setUser(user);
      }
    } catch (error) {}
  };

  const getJoinedCommunities = async () => {
    try {
      const communities = await CommunityService.getJoinedCommunities(
        accessToken.token,
        userId,
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
        <ILabel className="ml-4" text="Profile" />
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
              onCommunityClick={(communityId) => {
                navigate(`/dashboard/communities/${communityId}`);
              }}
            />
          )}
        </IPanel>
      </IContainer>
    </div>
  );
}

export default CommunityProfile;
