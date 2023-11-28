import React from "react";

interface IEventPanelProps {
  events: any[];
  showAll?: boolean;
  onEventClick?: (id: string) => void;
}

const IEventPanel: React.FC<IEventPanelProps> = ({
  events,
  showAll,
  onEventClick,
}) => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 p-4 overflow-x-auto py-4 space-x-3">
      {Object.entries(events)
        .slice(0, showAll ? undefined : 4)
        .map(([id, event]) => (
          <div
            key={id}
            className="rounded-lg shadow-md"
            style={{ height: "275px" }}
            onClick={() => onEventClick && onEventClick(event?.id)}
          >
            <img
              src={event?.picture || "default-placeholder.jpg"}
              alt={event?.name}
              className="rounded-t-lg w-full h-32 object-cover"
            />
            <div className="p-4">
              <div className="text-md">{event.name}</div>
              {event.category && (
                <p className="text-sm text-gray-500">{event?.category}</p>
              )}
              <p className="text-xs text-gray-500 uppercase">
                {event?.type + " | " + event?.attribute}
              </p>

              {event.attendees && (
                <p className="text-sm text-gray-500">
                  Attendees: {event?.attendees}
                </p>
              )}
              {event.startTime && (
                <p className="text-sm text-gray-500">
                  {event?.startTime
                    ? new Date(event.startTime).toLocaleDateString()
                    : "Unknown start time"}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default IEventPanel;
