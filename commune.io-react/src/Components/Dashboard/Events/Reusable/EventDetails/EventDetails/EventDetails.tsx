import React from "react";
import IPanel from "../../../../../../Library/Panel/IPanel";
import ILabel from "../../../../../../Library/Label/ILabel";
import { CalendarIcon, MapIcon, SunIcon } from "@heroicons/react/outline";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

function EventDetails({ event, organizer, community }: any) {
  let navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
        <div className="col-span-3 xl:col-span-2">
          <IPanel height="h-[550px]">
            <div className=" h-full flex flex-col">
              {event && (
                <div>
                  <div className="flex justify-between">
                    <div className="flex">
                      <ILabel text={event.name}></ILabel>
                    </div>

                    <div className="flex">
                      <div className="mr-2">{event.points}</div>
                      <SunIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                        style={{ color: "#68BEF1" }}
                      />
                    </div>
                  </div>
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
              <div className="mt-5 flex">
                <div>
                  {event?.type} | {event?.attribute} | {event?.category}
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
              <div className="font-bold text-md">
                {organizer?.firstName + " " + organizer?.lastName}
              </div>
              <div>Reputation Score - {organizer?.reputation}</div>
              <div className="font-bold text-md mt-4">Community</div>
              <div>Reputation Score - {community?.reputation}</div>
            </div>
          </IPanel>

          <IPanel
            height="h-[55px]"
            onPanelClick={() => {
              navigate(`/events/${event.id}/attendees`);
            }}
          >
            <div className="flex justify-between items-center h-full">
              {event?.attendees.length} Attendees
              <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
            </div>
          </IPanel>

          <IPanel height="h-[270px]"></IPanel>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
