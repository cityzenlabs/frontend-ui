import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import ILabel from "../../../../Library/Label/ILabel";

function Communities() {
  const location = useLocation();
  const navigate = useNavigate();
  const { kind }: any = useParams();
  const communities = location.state?.communities;
  console.log("Communities:", communities);

  return (
    <div>
      <div className="pb-4 pt-4">
        <ILabel text="Communities" />
      </div>
      <ICommunityPanel
        communities={communities}
        showAll={true}
        title={kind}
        height="600px"
        onCommunityClick={(communityName, communityId) => {
          navigate(`/community/${communityName}/${communityId}`);
        }}
      />
    </div>
  );
}

export default Communities;
