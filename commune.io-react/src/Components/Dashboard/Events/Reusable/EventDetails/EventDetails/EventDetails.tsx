import React from "react";
import IPanel from "../../../../../../Library/Panel/IPanel";
import ILabel from "../../../../../../Library/Label/ILabel";
import { CalendarIcon, MapIcon, SunIcon } from "@heroicons/react/outline";
import { ArrowRightIcon, BadgeCheckIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

function EventDetails({ event, organizer, community, communityPicture }: any) {
  let navigate = useNavigate();

  const getColorByEventProperty = () => {
    return "#68BEF1";
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="grid grid-cols-3 xl:grid-cols-3 gap-5">
      <div className="col-span-3 xl:col-span-2">
        <IPanel height="h-[550px]">
          <div className="h-full flex flex-col">
            {event && (
              <div className="flex justify-between">
                <div className="flex">
                  <ILabel text={event.name} className="mr-2"></ILabel>
                  <BadgeCheckIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                    style={{ color: "#40B87E" }}
                  />
                </div>

                <div className="flex">
                  <div className="mr-2">{event.points}</div>
                  <SunIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                    style={{ color: getColorByEventProperty() }}
                  />
                </div>
              </div>
            )}
            <div className="mt-5 flex">
              <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" />
              <div className="text-[#7E858B]">
                {event?.city + ", " + event?.state}
              </div>
            </div>
            <div className="mt-5 flex">
              <CalendarIcon className="h-6 w-6 mr-2" aria-hidden="true" />
              <div>
                {formatDate(event?.startTime)} - {formatDate(event?.endTime)}
              </div>
            </div>
            <div className="mt-5 overflow-y-auto whitespace-pre-wrap flex-grow text-[#323439]">
              {event?.description}
            </div>
          </div>
        </IPanel>
      </div>

      <div className="col-span-3 xl:col-span-1 flex flex-col gap-5">
        <IPanel height="177px">
          <div className="flex items-center">
            <div>
              <img
                src={organizer?.picture || "default-avatar.png"}
                alt={`${organizer?.firstName} ${organizer?.lastName}`}
                style={{ borderRadius: "15px", objectFit: "cover" }}
                className="w-[30px] h-[30px] mr-2 mb-1"
              />
            </div>
            <div className="text-md">
              {organizer?.firstName + " " + organizer?.lastName}
            </div>
          </div>
          <div className="text-[#7E858B] text-sm mb-6">
            Reputation Score - {organizer?.reputation}
          </div>

          <div className="flex items-center">
            <div>
              <img
                src={community?.picture || "default-event-image.png"}
                alt={event?.name}
                style={{ borderRadius: "15px", objectFit: "cover" }}
                className="w-[30px] h-[30px] mr-2 mb-1"
              />
            </div>
            <div className="text-md">Community</div>
          </div>
          <div className="text-[#7E858B] text-sm mb-6">
            Reputation Score - {community?.reputation}
          </div>
        </IPanel>

        <IPanel
          height="h-[55px]"
          onPanelClick={() => {
            navigate(`/events/${event.id}/attendees`);
          }}
        >
          <div className="flex justify-between items-center ">
            {event?.attendees.length} Attendees
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </IPanel>

        {/* Additional Panel (if needed) */}
        <IPanel height="h-[270px]">{/* Additional content */}</IPanel>
      </div>
    </div>
  );
}

export default EventDetails;
