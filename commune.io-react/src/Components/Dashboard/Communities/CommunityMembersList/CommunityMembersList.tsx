import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IUserTable from "../../../../Library/IUserTable/IUserTable";
import { Visibility } from "../Reusable/Enums/CommunityEnums";

function CommunityMembersList({
  token,
  communityId,
  handleBack,
  handleForward,
  setOtherUserId,
}: any) {
  const [members, setMembers] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

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

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <IContainer className="pb-8 pt-8">
          <div className="flex">
            <IBackButton onClick={() => handleBack()} />
            <ILabel className="ml-4" text="Members" />
          </div>
        </IContainer>

        <IContainer className="pb-8">
          <IUserTable
            users={members}
            onRowClick={(userId) => {
              setOtherUserId(userId);
              handleForward(
                Visibility.CommunityMembersList,
                Visibility.CommunityProfile,
                communityId,
                userId,
              );
            }}
          />
        </IContainer>
      </div>
    </div>
  );
}

export default CommunityMembersList;
