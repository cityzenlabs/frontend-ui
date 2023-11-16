import React from "react";

// Assuming the shape of your event objects is something like this:
interface Event {
  eventName: string;
  eventPicture: string;
  eventLocation: string;
  eventAttribute: string;
  eventTime: string;
}

interface Events {
  [key: string]: Event;
}

interface IEventPanelProps {
  events: Events;
}

const IEventPanel: React.FC<IEventPanelProps> = ({ events }) => {
  return (
    <div className="xl:grid lg:grid grid-cols-4 gap-3 p-4 flex overflow-x-auto py-4 space-x-3">
      {Object.entries(events)
        .slice(0, 4)
        .map(([id, event]) => (
          <div
            key={id}
            className="rounded-lg shadow-md"
            style={{ height: "275px" }}
          >
            <img
              src={event.eventPicture}
              alt=""
              className="rounded-t-lg w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3>{event.eventName}</h3>
              <p className="text-sm truncate">{event.eventLocation}</p>
              <p className="text-xs text-gray-500 uppercase">
                {event.eventAttribute}
              </p>
              <p className="text-sm">
                {new Date(event.eventTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default IEventPanel;
