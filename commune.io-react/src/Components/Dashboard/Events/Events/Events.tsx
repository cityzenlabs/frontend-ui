import { CameraIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import ILabel from "../../../../Library/Label/ILabel";

function Events({
  showAll,
  onEventClick,
  title,
  buttonLabel,
  onButtonClick,
  //height = "h-[244px]",
  marginTop = "mt-0",
  titleColor,
  paddingB = 4,
}: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const { kind }: any = useParams();
  const [events, setEvents] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (location.state?.events) {
      setEvents(location.state.events);
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text={kind}></ILabel>
      </div>
      <div className={` rounded-lg bg-white px-7 py-2`}>
        <div className="flex justify-between items-center mb-1">
          <div
            className={`font-medium ${title ? "my-auto" : ""}`}
            style={{ color: titleColor }}
          >
            {title}
          </div>
          {buttonLabel && (
            <button
              className="text-xs border rounded px-4 py-1 my-auto"
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick && onButtonClick();
              }}
            >
              {buttonLabel}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1 pb-4">
          {events?.map((event: any, index: any) => (
            <div
              key={index}
              className="rounded-lg shadow-md flex flex-col"
              onClick={() => navigate(`/event/${event?.name}/${event?.id}`)}
            >
              <div className="h-28 overflow-hidden rounded-t-lg">
                {event?.photo ? (
                  <img
                    src={event?.photo}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full bg-gray-100 rounded-t-lg">
                    <CameraIcon className="w-8 h-8 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="px-2 pt-2 flex items-center justify-between">
                <h3 className="text-sm font-medium truncate">{event.name}</h3>
              </div>
              <div className="px-2 flex items-center justify-between">
                <div className="text-xs font-medium truncate text-[#7E858B]">
                  {event.category}
                </div>
                <div className="text-xs font-medium truncate text-[#7E858B]">
                  Public
                </div>
              </div>
              <div className="px-2 pb-2 flex items-center justify-between">
                <div className="text-xs font-medium truncate text-[#7E858B]">
                  {event.address}
                </div>
                <div className="text-xs font-medium truncate text-[#7E858B]">
                  {event.attendees + " Attendees"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
