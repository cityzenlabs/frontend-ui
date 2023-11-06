import React from "react";
import { CommunitiesProps } from "../types/CommunityProps";
import { Visibility } from "../Enums/CommunityEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";

function ManageCommunities({ setCommunitiesVisibility }: CommunitiesProps) {
  const eventStats = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const graphs = [{ id: 1 }, { id: 2 }];

  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Communities);
  };
  return (
    <div>
      <IContainer paddingY={8}>
        <div className="flex">
          <IBackButton onClick={handleBack} />
          <ILabel text="Manage Communities" className="ml-4"></ILabel>
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
