import React, { useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IPanel from "../../../../Library/Panel/IPanel";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import { Visibility } from "../Reusable/Enums/EventEnums";

function EventHomeDetails({
  joinedOrCreated,
  completedEvents,
  onGoingEvents,
  pendingEvents,
  setEventId,
  handleForward,
  handleBack,
}: any) {
  const [showAllPendingEvents, setShowAllPendingEvents] = useState<any>(false);
  const [showAllOngoingEvents, setShowAllOngoingEvents] = useState<any>(false);
  const [showAllCompletedEvents, setShowAllCompletedEvents] =
    useState<any>(false);

  const toggleShowAllPendingEvents = () => {
    setShowAllPendingEvents((prev: any) => !prev);
    if (!showAllPendingEvents) {
      setShowAllOngoingEvents(false);
      setShowAllCompletedEvents(false);
    }
  };

  const toggleShowAllOngoingEvents = () => {
    setShowAllOngoingEvents((prev: any) => !prev);
    if (!showAllOngoingEvents) {
      setShowAllPendingEvents(false);
      setShowAllCompletedEvents(false);
    }
  };

  const toggleShowAllCompletedEvents = () => {
    setShowAllCompletedEvents((prev: any) => !prev);
    if (!showAllCompletedEvents) {
      setShowAllPendingEvents(false);
      setShowAllOngoingEvents(false);
    }
  };

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <IBackButton onClick={handleBack} />
            <ILabel className="ml-4" text={joinedOrCreated} />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-3 gap-6 xl:w-1/2 lg:w-full">
          <IPanel height="h-[112px]">
            <div className="text-3xl">{pendingEvents?.length}</div>
            <div className="text-xs pr-8">
              PENDING <br /> EVENTS
            </div>
          </IPanel>

          <IPanel height="h-[112px]">
            <div className="text-3xl">{onGoingEvents?.length}</div>
            <div className="text-xs pr-8">
              ONGOING <br /> EVENTS
            </div>
          </IPanel>

          <IPanel height="h-[112px]">
            <div className="text-3xl">{completedEvents?.length}</div>
            <div className="text-xs pr-8">
              COMPLETED <br />
              EVENTS
            </div>
          </IPanel>
        </div>
      </IContainer>

      {!showAllCompletedEvents && !showAllOngoingEvents && (
        <IContainer className="pb-8">
          <IPanel
            title="Pending Events"
            buttonLabel={showAllPendingEvents ? "Show Less" : "Show All"}
            height="600px"
            onButtonClick={toggleShowAllPendingEvents}
          >
            <IEventPanel
              events={pendingEvents}
              showAll={showAllPendingEvents}
              onEventClick={(id) => {
                handleForward(
                  Visibility.EventHomeDetails,
                  joinedOrCreated === "Created Events"
                    ? Visibility.Dashboard
                    : Visibility.Event,
                );
                setEventId(id);
              }}
            />
          </IPanel>
        </IContainer>
      )}

      {!showAllCompletedEvents && !showAllPendingEvents && (
        <IContainer className="pb-8">
          <IPanel
            title="Ongoing Events"
            buttonLabel={showAllOngoingEvents ? "Show Less" : "Show All"}
            height="600px"
            onButtonClick={toggleShowAllOngoingEvents}
          >
            <IEventPanel
              events={onGoingEvents}
              showAll={showAllOngoingEvents}
              onEventClick={(id) => {
                handleForward(
                  Visibility.EventHomeDetails,
                  joinedOrCreated === "Created Events"
                    ? Visibility.Dashboard
                    : Visibility.Event,
                );
                setEventId(id);
              }}
            />
          </IPanel>
        </IContainer>
      )}

      {!showAllOngoingEvents && !showAllPendingEvents && (
        <IContainer className="pb-8">
          <div>
            <IPanel
              title="Completed Events"
              buttonLabel={showAllCompletedEvents ? "Show Less" : "Show All"}
              height="600px"
              onButtonClick={toggleShowAllCompletedEvents}
            >
              <IEventPanel
                events={completedEvents}
                showAll={showAllCompletedEvents}
                onEventClick={(id) => {
                  handleForward(
                    Visibility.EventHomeDetails,
                    joinedOrCreated === "Created Events"
                      ? Visibility.Dashboard
                      : Visibility.Event,
                  );
                  setEventId(id);
                }}
              />
            </IPanel>
          </div>
        </IContainer>
      )}
    </div>
  );
}

export default EventHomeDetails;
