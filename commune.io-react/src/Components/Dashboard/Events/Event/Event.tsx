import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import { Visibility } from "../Enums/EventEnums";
import * as EventService from "../../../../Services/EventService/EventService";
import * as UserService from "../../../../Services/UserService/UserService";
import ILabel from "../../../../Library/Label/ILabel";
import IPanel from "../../../../Library/Panel/IPanel";
import { CalendarIcon, MapIcon } from "@heroicons/react/outline";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";

function Event({
  setEventsVisibility,
  eventId,
  token,
  user,
  getUpdatedUser,
}: any) {
  const [event, setEvent] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [relatedEvents, setRelatedEvents] = useState<any>();

  const fetchData = async (callback = () => {}) => {
    try {
      const event = await EventService.getEvent(token, eventId);
      if (event) {
        setEvent(event);
        const organizer = await UserService.fetchUser(token, event.organizer);
        if (organizer) {
          setOrganizer(organizer);
          checkMembership(event);
          callback();
        }
      }
    } catch (error) {}
  };

  const fetchRelatedEvents = async () => {
    try {
      const data = await EventService.getRelatedEvents(token, eventId);
      if (data) {
        setRelatedEvents(data);
      }
    } catch (error) {}
  };

  const checkMembership = (event: any) => {
    if (user && event) {
      setHasJoined(user?.joinedEvents.includes(event.id));
    }
  };

  useEffect(() => {
    fetchData();
    fetchRelatedEvents();
  }, [eventId, token]);

  const handleJoinOrLeaveEvent = async () => {
    try {
      const response = hasJoined
        ? await EventService.leaveEvent(token, eventId)
        : await EventService.joinEvent(token, eventId);

      if (response.ok) {
        await getUpdatedUser();
        fetchData(() => setHasJoined(!hasJoined));
      }
    } catch (error) {}
  };

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="flex justify-between items-center">
          <div className="flex">
            <IBackButton
              onClick={() => setEventsVisibility(Visibility.Events)}
            />
            <ILabel className="ml-4" text={event?.name} />
          </div>
          <div>
            <IButton
              text={hasJoined ? "Leave Event" : "Join Event"}
              onClick={handleJoinOrLeaveEvent}
              bgColor="bg-regal-blue"
              textColor="text-white"
              className="px-6 py-2"
            />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="w-full">
          <IPanel height="h-[320px]"></IPanel>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
          <div className="col-span-3 xl:col-span-2">
            <IPanel height="h-[550px]">
              <div className=" h-full flex flex-col">
                {event && (
                  <div>
                    <ILabel text={event.name}></ILabel>
                  </div>
                )}
                <div className="mt-5 flex">
                  <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                  <div>{event?.city + ", " + event?.state}</div>
                </div>
                <div className="mt-5 flex">
                  <CalendarIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                  <div>
                    {event &&
                      `${new Date(
                        event.startTime,
                      ).toLocaleDateString()} ${new Date(
                        event.startTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} - ${new Date(
                        event.endTime,
                      ).toLocaleDateString()} ${new Date(
                        event.endTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                  </div>
                </div>
                <div className="mt-5 overflow-y-auto whitespace-pre-wrap flex-grow">
                  {event?.description}
                </div>
              </div>
            </IPanel>
          </div>
          <div className="col-span-3 xl:col-span-1 flex flex-col gap-6">
            <IPanel height="h-[177px]">
              <div>
                <div className="font-bold text-md ">
                  {organizer?.firstName + " " + organizer?.lastName}
                </div>
                <div>Reputation Score - {organizer?.reputation}</div>
              </div>
            </IPanel>
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div>
          <IPanel title="Related" buttonLabel={"Show All"} height="600px">
            <IEventPanel events={relatedEvents ?? {}} />
          </IPanel>
        </div>
      </IContainer>
    </div>
  );
}

export default Event;
