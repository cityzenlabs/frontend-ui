import React, { useEffect, useState } from "react";
import { Visibility } from "../Reusable/Enums/EventEnums";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IContainer from "../../../../Library/Container/IContainer";
import IPanel from "../../../../Library/Panel/IPanel";
import * as EventService from "../../../../Services/EventService/EventService";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";

function EventHome({
  setEventsVisibility,
  setEventId,
  token,
  handleBack,
}: any) {
  const [eventHome, setEventHome] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchHome = async () => {
    try {
      const data = await EventService.getEventHome(token);
      if (data) {
        console.log(data);
        setEventHome(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchHome()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton onClick={handleBack} />
            <ILabel className="ml-4" text="Event Home" />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {Object.keys(eventHome?.ongoingEvents ?? {}).length}
            </div>
            <div className="text-xs pr-8">ONGOING EVENTS</div>
          </IPanel>

          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {Object.keys(eventHome?.pendingEvents ?? {}).length}
            </div>
            <div className="text-xs pr-8">PENDING EVENTS</div>
          </IPanel>

          <IPanel height="h-[112px]">
            <div className="text-3xl">
              {Object.keys(eventHome?.completedEvents ?? {}).length}
            </div>
            <div className="text-xs pr-8">COMPLETED EVENTS</div>
          </IPanel>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <IPanel title="Ongoing Events" buttonLabel="See All" height="600px">
          <IEventPanel
            events={eventHome?.ongoingEvents ?? {}}
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
            events={eventHome?.pendingEvents ?? {}}
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
              events={eventHome?.completedEvents ?? {}}
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

export default EventHome;
