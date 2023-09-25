import React, { useState } from "react";
import ManageEvents from "./ManageEvents/ManageEvents";
import { Visibility } from "./Enums/EventEnums";
import CreateEvents from "./CreateEvents/CreateEvents";

function Events() {
  const [eventsVisibility, setEventsVisibility] = useState<Visibility>(
    Visibility.Events,
  );

  const handleMangeEvents = () => {
    setEventsVisibility(Visibility.Manage);
  };

  const handleCreateEvent = () => {
    setEventsVisibility(Visibility.Create);
  };

  return (
    <div>
      <div>
        {eventsVisibility === Visibility.Manage && (
          <ManageEvents setEventsVisibility={setEventsVisibility} />
        )}

        {eventsVisibility === Visibility.Create && (
          <CreateEvents setEventsVisibility={setEventsVisibility} />
        )}

        {eventsVisibility === Visibility.Events && (
          <div>
            <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8 xl:flex justify-between">
              <label className="font-medium text-3xl">Events</label>
              <div>
                <input
                  type="search"
                  id="search"
                  name="search"
                  placeholder="Search Events"
                  className="xl:mt-0 mt-4 rounded-2xl font-medium text-black text-md bg-white border py-2 px-6 mr-4"
                />
                <button
                  className=" rounded-2xl font-light text-black text-md bg-white border py-2 px-6 mr-4 "
                  onClick={handleMangeEvents}
                >
                  Manage Events
                </button>
                <button
                  className=" xl:mt-0 mt-4 rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-6 "
                  onClick={handleCreateEvent}
                >
                  Create Event <span>+</span>
                </button>
              </div>
            </div>
            <div className="xl:ml-[320px] md:ml-[320px] px-12">
              <div className="w-full">
                <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
                  <div className="flex justify-between">
                    <div className="text-xl">Trending</div>
                    <div>
                      <button className="text-sm border rounded py-1 px-4">
                        See All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8">
              <div className="w-full">
                <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
                  <div className="flex justify-between">
                    <div className="text-xl">Upcoming</div>
                    <div>
                      <button className="text-sm border rounded py-1 px-4">
                        See All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:ml-[320px] md:ml-[320px] px-12">
              <div className="w-full">
                <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
                  <div className="flex justify-between">
                    <div className="text-xl">Recommended</div>
                    <div>
                      <button className="text-sm border rounded py-1 px-4">
                        See All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
