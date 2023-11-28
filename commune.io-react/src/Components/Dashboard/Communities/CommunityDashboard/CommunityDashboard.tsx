import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import { Visibility } from "../Enums/CommunityEnums";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import IPanel from "../../../../Library/Panel/IPanel";
import {
  UsersIcon,
  FireIcon,
  GlobeIcon,
  AcademicCapIcon,
  StarIcon,
  MoonIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import CommunityDashboardEvents from "./CommunityDashboardEvents";
import { MapIcon } from "@heroicons/react/outline";

function CommunityDashboard({
  setCommunitiesVisibility,
  communityId,
  token,
}: any) {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [dashboardEvents, setDashboardEvents] = useState("");

  const attributeColors = [
    "#68BEF1", // Blue
    "#40B87E", // Green
    "#4BCEC9", // Teal
    "#A979E6", // Purple
    "#FFA656", // Orange
    "#FF5050", // Red
  ];

  // This function returns the corresponding Heroicon component for an attribute
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CommunityService.getCommunityDashboard(
          communityId,
          token,
        );
        setDashboardData(data);
      } catch (error) {
        //setError(error);
      } finally {
        //setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Manage);
  };

  return (
    <div>
      {dashboardEvents && (
        <CommunityDashboardEvents
          dashboardEvents={dashboardEvents}
          setDashboardEvents={setDashboardEvents}
          communityId={dashboardData.community.id}
          token={token}
        />
      )}

      {!dashboardEvents && (
        <div>
          <IContainer className="pb-8 pt-8">
            <div className="flex">
              <IBackButton onClick={handleBack} />
              {dashboardData && (
                <ILabel
                  text={dashboardData.community.name}
                  className="ml-4"
                ></ILabel>
              )}
            </div>
          </IContainer>
          <IContainer className="pb-8">
            <div className="grid xl:grid-cols-3 gap-6 xl:w-4/5 lg:w-full">
              <IPanel
                height="h-[70px]"
                onPanelClick={() => setDashboardEvents("Ongoing Events")}
              >
                <div className="flex justify-between items-center">
                  {dashboardData?.ongoingEvents + " Ongoing Events "}
                  <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              </IPanel>
              <IPanel
                height="h-[70px]"
                onPanelClick={() => setDashboardEvents("Pending Events")}
              >
                <div className="flex justify-between items-center">
                  {dashboardData?.pendingEvents + " Pending Events"}
                  <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              </IPanel>
              <IPanel
                height="h-[70px]"
                onPanelClick={() => setDashboardEvents("Completed Events")}
              >
                <div className="flex justify-between items-center">
                  {dashboardData?.completedEvents + " Completed Events"}{" "}
                  <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              </IPanel>
            </div>
          </IContainer>
          <IContainer className="pb-8">
            <div className="grid xl:grid-cols-2 gap-6 xl:w-full lg:w-full">
              <IPanel height="h-[320px]"></IPanel>
              <IPanel height="h-[320px]"></IPanel>
            </div>
          </IContainer>

          <IContainer className="pb-8">
            <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
              <div className="col-span-3 xl:col-span-2">
                <IPanel height="h-[550px]">
                  <div className="h-full flex flex-col">
                    {dashboardData && (
                      <div>
                        <ILabel text={dashboardData.community.name}></ILabel>
                      </div>
                    )}
                    <div className="mt-5 flex">
                      <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                      <div>
                        {dashboardData?.community.city +
                          ", " +
                          dashboardData?.community.state}
                      </div>
                    </div>
                    <div className="mt-5 overflow-y-auto whitespace-pre-wrap flex-grow">
                      {dashboardData?.community.description}
                    </div>
                  </div>
                </IPanel>
              </div>
              <div className="col-span-3 xl:col-span-1 flex flex-col gap-6">
                <IPanel height="h-[177px]">
                  <div>
                    <div className="font-bold text-md ">Community</div>
                    <div>
                      Reputation Score - {dashboardData?.community.reputation}
                    </div>
                  </div>
                </IPanel>

                <IPanel height="h-[350px]">
                  <div>
                    <div className="font-bold text-md mb-4">REQUIREMENTS</div>
                    <div className="grid grid-cols-2 gap-4">
                      {dashboardData?.community.attributeRequirements &&
                        Object.entries(
                          dashboardData.community.attributeRequirements as [
                            string,
                            number,
                          ][],
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
              </div>
            </div>
          </IContainer>
          <IContainer className="pb-8">
            <div>
              <IPanel
                title="Upcoming Hosted Events"
                height="600px"
                buttonLabel="See All"
              >
                <IEventPanel
                  events={dashboardData?.upcomingHostedEvents ?? {}}
                />
              </IPanel>
            </div>
          </IContainer>

          <IContainer className="pb-8">
            <div>
              <IPanel
                title="Upcoming Social Events"
                buttonLabel="See All"
                height="600px"
              >
                <IEventPanel
                  events={dashboardData?.upcomingSocialEvents ?? {}}
                />
              </IPanel>
            </div>
          </IContainer>
        </div>
      )}
    </div>
  );
}

export default CommunityDashboard;
