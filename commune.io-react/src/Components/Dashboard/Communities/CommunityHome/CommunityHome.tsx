import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ICommunityPanel from "../../../../Library/CommunityPanel/ICommunityPanel";
import { useAuth } from "../../../../Context/AuthContext";

import { useNavigate } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";
function CommunityHome() {
  const accessToken = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [communityHome, setCommunityHome] = useState<any>();
  const [showAllCreatedCommunities, setShowAllCreatedCommunities] =
    useState(false);
  const [showAllJoinedCommunities, setShowAllJoinedCommunities] =
    useState(false);

  const toggleShowAllJoinedCommunities = () => {
    setShowAllJoinedCommunities((prev) => !prev);
    if (!showAllJoinedCommunities) {
      setShowAllCreatedCommunities(false);
    }
  };

  const fetchHome = async () => {
    try {
      const data = await CommunityService.getCommunityHome(accessToken.token);
      if (data) {
        setCommunityHome(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchHome()]);
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="xl:flex lg:flex items-center justify-between pt-4 pb-4">
        <div className="flex items-center">
          <ILabel text="Community Home" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full pb-4">
        <IPanel height="h-[112px]">
          <div className="text-3xl">
            {communityHome?.joinedCommunities.length}
          </div>
          <div className="text-xs pr-8">
            JOINED <br />
            COMMUNITIES
          </div>
        </IPanel>
        <IPanel height="h-[112px]">
          <div className="text-3xl">
            {" "}
            {communityHome?.createdCommunities.length}
          </div>
          <div className="text-xs">
            CREATED <br /> COMMUNITIES
          </div>
        </IPanel>
      </div>

      {!showAllCreatedCommunities && (
        <ICommunityPanel
          title="Joined Communities"
          buttonLabel={"Show All"}
          height="600px"
          onButtonClick={() =>
            navigate(
              `/communities/${encodeURIComponent("Joined Communities")}`,
              {
                state: {
                  communities: communityHome?.joinedCommunities,
                },
              },
            )
          }
          communities={communityHome?.joinedCommunities}
          onCommunityClick={(communityName, communityId) => {
            navigate(`/community/${communityName}/${communityId}`);
          }}
          marginTop="mt-0"
          paddingB={4}
        />
      )}

      <ICommunityPanel
        title="Created Communities"
        buttonLabel={"Show All"}
        height="600px"
        onButtonClick={() =>
          navigate(
            `/communities/${encodeURIComponent("Created Communities")}`,
            {
              state: {
                communities: communityHome?.createdCommunities,
              },
            },
          )
        }
        communities={communityHome?.createdCommunities}
        onCommunityClick={(communityName, communityId) => {
          navigate(`/community/manage/${communityId}`);
        }}
        marginTop="mt-0"
        paddingB={8}
      />
    </div>
  );
}

export default CommunityHome;
