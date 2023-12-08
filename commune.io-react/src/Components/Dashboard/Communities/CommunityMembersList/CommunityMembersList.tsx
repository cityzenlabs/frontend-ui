import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IUserTable from "../../../../Library/IUserTable/IUserTable";
import { useAuth } from "../../../../AuthContext";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function CommunityMembersList() {
  const navigate = useNavigate();
  const accessToken = useAuth();
  const { communityId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<any>();

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        const data = await CommunityService.getCommunityMembers(
          communityId,
          accessToken.token,
        );

        if (isMounted) {
          setMembers(data);
          setIsLoading(false);
        }
      } catch (error) {}
    };

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, [communityId, accessToken.token]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <IContainer className="pb-8 pt-8">
          <div className="flex">
            <ILabel className="ml-4" text="Members" />
          </div>
        </IContainer>

        <IContainer className="pb-8">
          <IUserTable
            users={members}
            onRowClick={(userId) => {
              navigate(`/profile/${userId}`);
            }}
          />
        </IContainer>
      </div>
    </div>
  );
}

export default CommunityMembersList;
