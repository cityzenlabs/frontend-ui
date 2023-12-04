import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import { Visibility } from "../Reusable/Enums/EventEnums";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import * as EventService from "../../../../Services/EventService/EventService";
import * as UserService from "../../../../Services/UserService/UserService";
import ILabel from "../../../../Library/Label/ILabel";
import IPanel from "../../../../Library/Panel/IPanel";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { MapIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import EventAttendeesList from "./EventAttendeesList";

function EventDashboard({ setEventsVisibility, eventId, token }: any) {
  const [event, setEvent] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [attendees, setAttendees] = useState<any>();
  const [showMembersList, setShowMembersList] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EventService.getEventDashboard(token, eventId);
        if (data) {
          setEvent(data.event);
          const organizer = await UserService.fetchUser(
            token,
            data.event.organizer,
          );
          if (organizer) {
            setOrganizer(organizer);
          }
        }
      } catch (error) {}
    };

    const fetchAttendees = async () => {
      try {
        const attendees = await EventService.getEventAttendees(token, eventId);
        if (attendees) {
          setAttendees(attendees);
        }
      } catch (error) {}
    };

    fetchData();
    fetchAttendees();
  }, []);

  return (
    <div>
      <div>
        {showMembersList && (
          <EventAttendeesList
            setShowMembersList={setShowMembersList}
            attendees={attendees}
          />
        )}
      </div>

      <div>
        {!showMembersList && (
          <div>
            <IContainer className="pb-8 pt-8">
              <div className="xl:flex lg:flex items-center justify-between">
                <div className="flex items-center">
                  <IBackButton
                    onClick={() => setEventsVisibility(Visibility.Home)}
                  />
                  <ILabel className="ml-4" text={event?.name} />
                </div>
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
                      {event && (
                        <div>
                          <ILabel text={event?.name}></ILabel>
                        </div>
                      )}
                      <div className="mt-5 flex">
                        <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                        <div>{event?.city + ", " + event?.state}</div>
                      </div>
                      <div className="mt-5 flex">
                        <CalendarIcon
                          className="h-6 w-6 mr-2"
                          aria-hidden="true"
                        />
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
                  <IPanel height="h-[177px]"></IPanel>
                  <IPanel
                    height="h-[55px]"
                    onPanelClick={() => setShowMembersList(true)}
                  >
                    <div className="flex justify-between items-center h-full ">
                      {event?.attendees.length + " Attendees "}
                      <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </IPanel>
                </div>
              </div>
            </IContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDashboard;
