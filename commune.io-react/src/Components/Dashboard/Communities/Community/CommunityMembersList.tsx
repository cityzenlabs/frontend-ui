import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IUserTable from "../../../../Library/IUserTable/IUserTable";

function CommunityMembersList({ setShowMembersList, token, communityId }: any) {
  const [members, setMembers] = useState<any>();

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
        }
      } catch (error) {
      } finally {
        if (isMounted) {
        }
      }
    };

    fetchMembers();

    return () => {
      isMounted = false; // Prevents state updates if the component unmounts
    };
  }, [communityId, token]);

  return (
    <div>
      <IContainer paddingY={8}>
        <div className="flex">
          <IBackButton onClick={() => setShowMembersList(false)} />
          <ILabel className="ml-4" text="Members" />
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <IUserTable users={members} />
      </IContainer>
    </div>
  );
}

export default CommunityMembersList;
