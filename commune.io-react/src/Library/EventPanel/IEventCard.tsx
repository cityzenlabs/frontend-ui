import React from "react";

interface Event {
  id: string;
  name: string;
  picture: string;
  address: string;
  attribute: string;
  type: string;
  category?: string;
  startTime?: string;
  endTime?: string;
  attendees?: number;
}

interface IEventCardProps {
  events: Event[];
}

const IEventCard: React.FC<IEventCardProps> = ({ events }) => {
  return (
    <div className="xl:grid lg:grid grid-cols-4 gap-3 p-4 flex overflow-x-auto py-4 space-x-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-lg shadow-md"
          style={{ height: "275px" }}
        >
          <img
            src={event.picture || "default-placeholder.jpg"}
            alt={event.name}
            className="rounded-t-lg w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3>{event.name}</h3>
            {event.category && <p>{event.category}</p>}
            <p className="text-sm truncate">{event.address}</p>
            <p className="text-xs text-gray-500 uppercase">{event.attribute}</p>
            {event.type && <p className="text-sm">{event.type}</p>}
            {event.attendees && (
              <p className="text-sm">Attendees: {event.attendees}</p>
            )}
            {event.startTime && (
              <p className="text-sm">
                {event.startTime
                  ? new Date(event.startTime).toLocaleDateString()
                  : "Unknown start time"}
                {" - "}
                {event.endTime
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

export default IEventCard;
