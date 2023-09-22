import React, { useState } from "react";
import EventsTrending from "./EventsTrending/EventsTrending";
import EventsUpcoming from "./EventsUpcoming/EventsUpcoming";
import EventsRecommended from "./EventsRecommended/EventsRecommended";
import ManageEvents from "./ManageEvents/ManageEvents";

function Events() {
  const [eventsVisibility, setEventsVisibility] = useState<string>("Events");

  const handleMangeEvents = () => {
    setEventsVisibility("Manage");
  };

  return (
    <div>
      <div>
        {eventsVisibility === "Manage" && <ManageEvents />}
        {eventsVisibility === "Events" && (
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
                <button className=" xl:mt-0 mt-4 rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-6 ">
                  Create Event <span>+</span>
                </button>
              </div>
            </div>
            <div className="xl:ml-[320px] md:ml-[320px] px-12">
              <EventsTrending />
            </div>
            <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8">
              <EventsUpcoming />
            </div>
            <div className="xl:ml-[320px] md:ml-[320px] px-12">
              <EventsRecommended />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
