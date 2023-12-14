import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IUserTable from "../../../../Library/IUserTable/IUserTable";
import { useAuth } from "../../../../Context/AuthContext";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";

function CommunityMembersList() {
  const navigate = useNavigate();
  const accessToken = useAuth();
  const { communityId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<any>();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await CommunityService.getCommunityMembers(
          communityId,
          accessToken.token,
        );
        if (data) {
          setMembers(data);
        }
      } catch (error) {}
      setIsLoading(false);
    };

    fetchMembers();
  }, [communityId, accessToken.token]);

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div>
        <div className="flex pt-4 pb-4">
          <ILabel text="Members" />
        </div>

        <IUserTable
          users={members}
          onRowClick={(userId) => {
            navigate(`/profile/${userId}`);
          }}
        />
      </div>
    </div>
  );
}

export default CommunityMembersList;
