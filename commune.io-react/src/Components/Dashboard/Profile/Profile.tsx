import React, { useEffect, useState } from "react";
import IAttributeBar from "../../../Library/AttributeBar/IAttributeBar";
import IPanel from "../../../Library/Panel/IPanel";
import IContainer from "../../../Library/Container/IContainer";
import { attributeColors } from "../Home/Constants/HomeConstats";
import * as UserService from "../../../Services/UserService/UserService";
import * as CommunityService from "../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import ILabel from "../../../Library/Label/ILabel";
import { getIconForAttribute } from "../Constants/Constants";
import ISpinner from "../../../Library/Spinner/ISpinner";

function Profile() {
  const accessToken = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>();
  const [communities, setCommunities] = useState<any>();
  const [showAllJoined, setShowAllJoined] = useState(false);

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

  const toggleShowAllJoined = () => {
    setShowAllJoined((prev) => !prev);
  };

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="pb-4 pt-4">
        <ILabel text="Profile" />
      </div>
      <div className="pb-4">
        <IPanel height="600px ">
          <div className=" py-6 ">
            <div className="flex">
              <div className="w-[136px] h-[136px] rounded-full overflow-hidden">
                <img
                  src={user?.picture}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6 grid grid-rows">
                <div className="text-2xl">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-sm text-[#7E858B]">
                  Reputation Score - {user?.reputation}
                </div>
                <div className="text-sm text-[#7E858B]">
                  {user?.city}, {user.state}{" "}
                  <div className="text-sm">
                    {user?.dateOfBirth} - {user?.gender}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 pt-8 lg:gap-4">
              {Object.entries(user?.attributes || {}).map(
                ([attributeKey, attributeValue], index) => (
                  <div
                    key={attributeKey}
                    className="flex items-center xl:w-[90%] " // Flex container for each grid item
                  >
                    <IAttributeBar
                      attributeKey={attributeKey}
                      attributeValue={attributeValue as any}
                      color={attributeColors[index % attributeColors.length]}
                    />
                    <div
                      className="ml-auto border py-3 px-3 rounded" // Positioned to the right
                      style={{
                        color: attributeColors[index % attributeColors.length],
                        borderColor: `${
                          attributeColors[index % attributeColors.length]
                        }20`,
                        backgroundColor: `${
                          attributeColors[index % attributeColors.length]
                        }20`,
                      }}
                    >
                      {getIconForAttribute(attributeKey)}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </IPanel>
      </div>

      <div>
        {communities && (
          <ICommunityPanel
            onButtonClick={toggleShowAllJoined}
            height="600px"
            title="Joined Communities"
            buttonLabel={showAllJoined ? "Show Less" : "Show All"}
            communities={communities}
            showAll={showAllJoined}
            onCommunityClick={(communityName, communityId) => {
              navigate(`/community/${communityName}/${communityId}`);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
