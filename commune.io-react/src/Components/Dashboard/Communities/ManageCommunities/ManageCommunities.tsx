import React from "react";
import { CommunitiesProps } from "../types/CommunityProps";
import { Visibility } from "../Enums/CommunityEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IButton from "../../../../Library/Button/IButton";

function ManageCommunities({ setCommunitiesVisibility }: CommunitiesProps) {
  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Communities);
  };

  const handleCreateCommunity = () => {
    setCommunitiesVisibility(Visibility.Create);
  };

  return (
    <div>
      <IContainer paddingY={8}>
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton onClick={handleBack} />
            <ILabel className="ml-4" text="Manage Communities" />
          </div>
          <div className="xl:mt-0 lg:mt-0 mt-4">
            <IButton
              text="Create Community"
              onClick={handleCreateCommunity} // Should this be `handleCreateCommunity` instead of `handleBack`?
              bgColor="bg-regal-blue"
              textColor="text-white"
              icon={<span>+</span>}
            />
          </div>
        </div>
      </IContainer>

      <IContainer>
        <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
          <IPanel height="h-[112px]"></IPanel>
          <IPanel height="h-[112px]"></IPanel>
          <IPanel height="h-[112px]"></IPanel>
        </div>
      </IContainer>

      <IContainer paddingY={8}>
        <div className="grid grid-cols-2 gap-6 xl:w-full ">
          <IPanel height="h-[428px]"></IPanel>
          <IPanel height="h-[428px]"></IPanel>
        </div>
      </IContainer>

      <IContainer>
        <IPanel title="Communities" buttonLabel="See All"></IPanel>
      </IContainer>
    </div>
  );
}

export default ManageCommunities;
