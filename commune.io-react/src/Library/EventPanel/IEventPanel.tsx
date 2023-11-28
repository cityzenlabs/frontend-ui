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
              <h3>{event.name}</h3>
              {event.category && <p>{event?.category}</p>}
              <p className="text-sm truncate">{event?.address}</p>
              <p className="text-xs text-gray-500 uppercase">
                {event?.attribute}
              </p>
              {event.type && <p className="text-sm">{event?.type}</p>}
              {event.attendees && (
                <p className="text-sm">Attendees: {event?.attendees}</p>
              )}
              {event.startTime && (
                <p className="text-sm">
                  {event?.startTime
                    ? new Date(event.startTime).toLocaleDateString()
                    : "Unknown start time"}
                  {" - "}
                  {event?.endTime
                    ? new Date(event.endTime).toLocaleDateString()
                    : "Unknown end time"}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default IEventPanel;
