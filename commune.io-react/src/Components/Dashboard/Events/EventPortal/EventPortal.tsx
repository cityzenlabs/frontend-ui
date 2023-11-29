import React, { useEffect, useState } from "react";
import { Visibility } from "../Enums/EventEnums";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import * as EventService from "../../../../Services/EventService/EventService";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import IGraph from "../../../../Library/Graph/IGraph";
import {
  transformAverageTimeSpent,
  transformAverageUserLevel,
} from "./EventPortalGraphAnalytics";

function EventPortal({ setEventsVisibility, setEventId, token }: any) {
  const [eventPortal, setEventPortal] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EventService.getEventPortal(token);
        if (data) {
          setEventPortal(data);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const averageTimeSpent = eventPortal?.analytics
    ? transformAverageTimeSpent(eventPortal.analytics)
    : null;
  const averageUserLevel = eventPortal?.analytics
    ? transformAverageUserLevel(eventPortal.analytics)
    : null;

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton
              onClick={() => setEventsVisibility(Visibility.Events)}
            />
            <ILabel className="ml-4" text="Manage Events" />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {Object.keys(eventPortal?.ongoingEvents ?? {}).length}
            </div>
            <div className="text-xs pr-8">ONGOING EVENTS</div>
          </IPanel>

          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {Object.keys(eventPortal?.pendingEvents ?? {}).length}
            </div>
            <div className="text-xs pr-8">PENDING EVENTS</div>
          </IPanel>

          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {Object.keys(eventPortal?.completedEvents ?? {}).length}
            </div>
            <div className="text-xs pr-8">COMPLETED EVENTS</div>
          </IPanel>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full ">
          {averageTimeSpent && (
            <IGraph
              data={averageTimeSpent.series}
              categories={averageTimeSpent.categories}
              title="Average Time Spent"
            />
          )}
          {averageUserLevel && (
            <IGraph
              title="Average User Level"
              data={averageUserLevel.series}
              categories={averageUserLevel.categories}
            />
          )}
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <IPanel title="Ongoing Events" buttonLabel="See All" height="600px">
          <IEventPanel
            events={eventPortal?.ongoingEvents ?? {}}
            onEventClick={(id) => {
              setEventsVisibility(Visibility.Dashboard);
              setEventId(id);
            }}
          />
        </IPanel>
      </IContainer>

      <IContainer className="pb-8">
        <IPanel title="Pending Events" buttonLabel="See All" height="600px">
          <IEventPanel
            events={eventPortal?.pendingEvents ?? {}}
            onEventClick={(id) => {
              setEventsVisibility(Visibility.Dashboard);
              setEventId(id);
            }}
          />
        </IPanel>
      </IContainer>

      <IContainer className="pb-8">
        <div>
          <IPanel title="Completed Events" buttonLabel="See All" height="600px">
            <IEventPanel
              events={eventPortal?.completedEvents ?? {}}
              onEventClick={(id) => {
                setEventsVisibility(Visibility.Dashboard);
                setEventId(id);
              }}
            />
          </IPanel>
        </div>
      </IContainer>
    </div>
  );
}

export default EventPortal;
