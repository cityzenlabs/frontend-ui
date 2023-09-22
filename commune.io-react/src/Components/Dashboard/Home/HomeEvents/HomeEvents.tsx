import React from "react";
import { HomeEventsProps } from "./types/HomeEventsProps";

function HomeEvents({ setSideBarSelection }: HomeEventsProps) {
  const handleSetSideBarSelection = (): void => {
    setSideBarSelection("Events");
  };
  return (
    <div className="w-full">
      <div className="h-[515px] rounded-lg bg-white px-4 py-6 xl:mt-8">
        <div className="flex justify-between">
          <div className="text-2xl">
            Level up with these <br /> events
          </div>
          <div>
            <button
              className="text-sm border rounded py-1 px-4"
              onClick={handleSetSideBarSelection}
            >
              See All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeEvents;
