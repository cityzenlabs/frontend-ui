import React from "react";
import { CameraIcon } from "@heroicons/react/outline";

interface IEventPanelProps {
  events: any[];
  showAll?: boolean;
  onEventClick?: (name: string, id: string) => void;
  title?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  height?: string;
  marginTop?: string;
  titleColor?: string;
  paddingB?: number;
}

const IEventPanel: React.FC<IEventPanelProps> = ({
  events,
  showAll,
  onEventClick,
  title,
  buttonLabel,
  onButtonClick,
  height = "h-[244px]",
  marginTop = "mt-0",
  titleColor,
  paddingB = 4,
}) => {
  const paddingBClass = `pb-${paddingB}`;

  return (
    <div
      className={`xl:ml-[330px] md:ml-[330px] xl:mr-[50px] md:mr-[50px] mr-[50px] ml-[50px] ${paddingBClass} ${marginTop}`}
    >
      <div className={`${height} rounded-lg bg-white px-7 py-2`}>
        <div className="flex justify-between items-center mb-1">
          <div
            className={`font-light ${title ? "my-auto" : ""}`}
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
          {Array.isArray(events) &&
            (showAll ? events : events.slice(0, 4)).map((event, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md flex flex-col"
                onClick={() =>
                  onEventClick && onEventClick(event.name, event.id)
                }
              >
                <div className="h-28 overflow-hidden rounded-t-lg">
                  {event.picture ? (
                    <img
                      src={event.picture}
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
                    {event.address}
                  </div>
                  <div className="text-xs font-medium truncate text-[#7E858B]">
                    {event.type}
                  </div>
                </div>
                <div className="px-2 pb-2 flex items-center justify-between">
                  <div className="text-xs font-medium truncate text-[#7E858B]">
                    {event.category}
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
};

export default IEventPanel;
