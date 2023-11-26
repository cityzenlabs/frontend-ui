import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import { Visibility } from "../Enums/CommunityEnums";
import IPanel from "../../../../Library/Panel/IPanel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ILabel from "../../../../Library/Label/ILabel";
import {
  UsersIcon,
  FireIcon,
  GlobeIcon,
  AcademicCapIcon,
  StarIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { Carousel } from "@material-tailwind/react";
import ICarousel from "../../../../Library/Carousel/ICarousel";

function Community({ setCommunitiesVisibility, communityId, token }: any) {
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await CommunityService.getCommunity(communityId, token);

        if (isMounted) {
          setCommunity(data);
        }
      } catch (error) {
        console.error(error); // Or handle the error as needed
      } finally {
        if (isMounted) {
          // Stop loading indicators or any cleanup tasks
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Prevents state updates if the component unmounts
    };
  }, [communityId, token]);

  const [community, setCommunity] = useState<any>();

  const attributeColors = [
    "#68BEF1", // Blue
    "#40B87E", // Green
    "#4BCEC9", // Teal
    "#A979E6", // Purple
    "#FFA656", // Orange
    "#FF5050", // Red
  ];

  const getIconForAttribute = (attribute: any) => {
    const icons: any = {
      social: <UsersIcon className="h-6 w-6" aria-hidden="true" />,
      fitness: <FireIcon className="h-6 w-6" aria-hidden="true" />,
      nightlife: <MoonIcon className="h-6 w-6 " aria-hidden="true" />,
      intelligence: <AcademicCapIcon className="h-6 w-6 " ria-hidden="true" />,
      culture: <StarIcon className="h-6 w-6" aria-hidden="true" />,
      adventure: <GlobeIcon className="h-6 w-6 " aria-hidden="true" />,
    };
    return icons[attribute.toLowerCase()];
  };

  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Communities);
  };

  return (
    <div>
      <IContainer paddingY={8}>
        <div className="flex">
          <IBackButton onClick={handleBack} />
        </div>
      </IContainer>

      <IContainer>
        <div className="w-full">
          <IPanel height="h-[320px]">
            <ICarousel images={[community?.picture]} />
          </IPanel>
        </div>
      </IContainer>

      <IContainer paddingY={8}>
        <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
          <div className="col-span-3 xl:col-span-2">
            <IPanel height="h-[550px]">
              <div className="p-4 h-full flex flex-col">
                {community && (
                  <div>
                    <ILabel text={community.name}></ILabel>
                  </div>
                )}
                <div className="mt-5">
                  {community?.city + ", " + community?.state}
                </div>
                <div className="mt-5 overflow-y-auto whitespace-pre-wrap flex-grow">
                  {community?.description}
                </div>
              </div>
            </IPanel>
          </div>
          <div className="col-span-3 xl:col-span-1 flex flex-col gap-6">
            <IPanel height="h-[177px]"></IPanel>

            <IPanel height="h-[270px]">
              <div className="p-4">
                <div className="font-bold text-md mb-4">REQUIREMENTS</div>
                <div className="grid grid-cols-2 gap-4">
                  {community?.attributeRequirements &&
                    Object.entries(
                      community.attributeRequirements as [string, number][],
                    ).map(([attribute, level], index) => {
                      // Determine the color for the current attribute
                      const color =
                        attributeColors[index % attributeColors.length];
                      return (
                        <div
                          key={attribute}
                          className="flex justify-between items-center p-1"
                        >
                          <div className="flex-1">
                            <div
                              className="text-sm font-medium capitalize"
                              style={{ color }}
                            >
                              {attribute.toLowerCase()}
                            </div>
                            <div className="text-xs">Level {level}</div>
                          </div>
                          {/* Use the same color for the icon */}
                          <div style={{ color }}>
                            {getIconForAttribute(attribute)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </IPanel>

            <IPanel height="h-[55px]">{}</IPanel>
          </div>
        </div>
      </IContainer>
      <IContainer className="pb-8">
        <div>
          <IPanel
            title="Related Events"
            height="600px"
            buttonLabel="See All"
          ></IPanel>
        </div>
      </IContainer>
    </div>
  );
}

export default Community;
