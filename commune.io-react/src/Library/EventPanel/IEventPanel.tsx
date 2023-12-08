import React from "react";
import { CameraIcon } from "@heroicons/react/outline";

interface IEventPanelProps {
  events: any[];
  showAll?: boolean;
  onEventClick?: (name: string, id: string) => void;
}

const IEventPanel: React.FC<IEventPanelProps> = ({
  events,
  showAll,
  onEventClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1 pb-4">
      {(showAll ? events : events?.slice(0, 4))?.map((event, index) => (
        <div
          key={index}
          className="rounded-lg shadow-md flex flex-col"
          onClick={() => onEventClick && onEventClick(event.name, event.id)}
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
            {/* Additional event info or icons can go here */}
          </div>
          <div className="px-2 flex items-center justify-between">
            <div className="text-xs font-medium truncate text-[#7E858B]">
              {/* Event details */}
            </div>
            {/* Other event details */}
          </div>
          <div className="px-2 pb-2 flex items-center justify-between">
            {/* Additional event details */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IEventPanel;
