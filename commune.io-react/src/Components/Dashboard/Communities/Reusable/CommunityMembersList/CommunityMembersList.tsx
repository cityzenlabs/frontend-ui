import React, { useEffect, useState } from "react";
import IContainer from "../../../../../Library/Container/IContainer";
import IBackButton from "../../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../../Services/CommunityService/CommunityService";
import IUserTable from "../../../../../Library/IUserTable/IUserTable";
import CommunityProfile from "../CommunityProfile/CommunityProfile";
import Community from "../../Community/Community";

function CommunityMembersList({
  setShowMembersList,
  token,
  communityId,
  user,
  getUpdatedUser,
}: any) {
  const [members, setMembers] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [showUserCommunity, setShowUserCommunity] = useState<boolean>(false);
  const [userCommunityId, setUserCommunityId] = useState<any>();

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        const data = await CommunityService.getCommunityMembers(
          communityId,
          token,
        );

        if (isMounted) {
          setMembers(data);
          setIsLoading(false);
        }
      } catch (error) {
      } finally {
        if (isMounted) {
        }
      }
    };

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, [communityId, token]);

  const handleBack = () => {
    setShowUserCommunity(false);
    setShowUserProfile(false);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        {showUserCommunity && (
          <Community
            communityId={userCommunityId}
            token={token}
            user={user}
            handleBack={handleBack}
            getUpdatedUser={getUpdatedUser}
          />
        )}
      </div>

      <div>
        {showUserProfile && !showUserCommunity && (
          <CommunityProfile
            userId={userId}
            token={token}
            setShowUserProfile={setShowUserProfile}
            setShowUserCommunity={setShowUserCommunity}
            setUserCommunityId={setUserCommunityId}
          />
        )}
      </div>

      {!showUserProfile && !showUserCommunity && (
        <div>
          <IContainer className="pb-8 pt-8">
            <div className="flex">
              <IBackButton onClick={() => setShowMembersList(false)} />
              <ILabel className="ml-4" text="Members" />
            </div>
          </IContainer>

          <IContainer className="pb-8">
            <IUserTable
              users={members}
              onRowClick={(userId) => {
                setUserId(userId);
                setShowUserProfile(true);
              }}
            />
          </IContainer>
        </div>
      )}
    </div>
  );
}

export default CommunityMembersList;
