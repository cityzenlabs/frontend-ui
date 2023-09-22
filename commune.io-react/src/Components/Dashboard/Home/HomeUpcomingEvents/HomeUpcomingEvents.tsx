import React from "react";

function HomeUpcomingEvents() {
  return (
    <div className="w-full">
      <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
        <div className="flex justify-between">
          <div className="text-xl">Upcoming Events</div>
          <div>
            <button className="text-sm border rounded py-1 px-4">
              See All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeUpcomingEvents;
