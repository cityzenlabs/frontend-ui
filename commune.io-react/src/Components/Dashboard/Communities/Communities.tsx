import React, { useState } from "react";
import ManageCommunities from "./ManageCommunities/ManageCommunities";
import { Visibility } from "./Enums/CommunityEnums";
import CreateCommunities from "./CreateCommunities/CreateCommunities";
import IInput from "../../../Library/Input/IInput";
import IContainer from "../../../Library/Container/IContainer";
import ILabel from "../../../Library/Label/ILabel";
import IPanel from "../../../Library/Panel/IPanel";
import IButton from "../../../Library/Button/IButton";
import CommunityDashboard from "./CommunityDashboard/CommunityDashboard";
import { useAuth } from "../../../AuthContext";

function Communities() {
  const [communitiesVisibility, setCommunitiesVisibility] =
    useState<Visibility>(Visibility.Communities);
  const [communityId, setCommunityId] = useState("");
  const accessToken = useAuth();
  const handleMangeCommunities = () => {
    setCommunitiesVisibility(Visibility.Manage);
  };

  return (
    <div>
      <div>
        {communitiesVisibility === Visibility.Manage && (
          <ManageCommunities
            setCommunitiesVisibility={setCommunitiesVisibility}
            token={accessToken.token}
          />
        )}

        {communitiesVisibility === Visibility.Create && (
          <CreateCommunities
            setCommunitiesVisibility={setCommunitiesVisibility}
            setCommunityId={setCommunityId}
          />
        )}

        {communitiesVisibility === Visibility.Dashboard && (
          <CommunityDashboard
            setCommunitiesVisibility={setCommunitiesVisibility}
            communityId={communityId}
            token={accessToken.token}
          />
        )}

        {communitiesVisibility === Visibility.Communities && (
          <div>
            <IContainer paddingY={8}>
              <div className="flex items-center justify-between flex-wrap">
                <div className="inline-block">
                  <ILabel text="Communities" />
                </div>

                <div className="flex flex-wrap gap-4 mt-4 xl:mt-0">
                  <IInput placeholder="Search Community" name="search" />
                  <IButton
                    text="Manage Communities"
                    onClick={handleMangeCommunities}
                  />
                </div>
              </div>
            </IContainer>

            <IContainer>
              <IPanel title="Trending" buttonLabel="See All"></IPanel>
            </IContainer>
            <IContainer paddingY={8}>
              <IPanel title="Upcoming" buttonLabel="See All"></IPanel>
            </IContainer>
            <IContainer>
              <IPanel title="Recommended" buttonLabel="See All"></IPanel>
            </IContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default Communities;
