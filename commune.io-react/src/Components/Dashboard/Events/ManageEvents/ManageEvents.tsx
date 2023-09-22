import React from "react";
import EventsUpcoming from "../EventsUpcoming/EventsUpcoming";

function ManageEvents() {
  const eventStats = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const graphs = [{ id: 1 }, { id: 2 }];
  return (
    <div>
      <div className="flex xl:ml-[320px] md:ml-[320px] px-12 py-8">
        <button className="flex items-center space-x-1 px-2 py-1 text-slate-400 border bg-white rounded">
          <div className="w-6 h-6 flex m-auto transform rotate-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="2 0 20 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 4.293a1 1 0 011.414 0L12 8.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
        <label className="font-medium text-3xl ml-4">Manage Events</label>
      </div>
      <div className="flex xl:ml-[320px] md:ml-[320px] px-12">
        {eventStats.map((item) => (
          <div key={item.id} className="w-[148px] mr-4">
            <div className="h-[112px] rounded-lg bg-white flex items-center px-4 mt-8"></div>
          </div>
        ))}
      </div>
      <div className="xl:flex xl:ml-[320px] md:ml-[320px] px-12">
        {graphs.map((item, index) => (
          <div
            key={item.id}
            className={`xl:w-1/2 lg:w-full ${
              index !== graphs.length - 1 ? "xl:mr-8" : ""
            }`}
          >
            <div className="h-[320px] rounded-lg bg-white flex items-center mt-8"></div>
          </div>
        ))}
      </div>
      <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8">
        <div className="w-full">
          <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
            <div className="flex justify-between">
              <div className="text-xl text-[#AE2443]">Ongoing Events</div>
            </div>
          </div>
        </div>
        <div className="w-full py-8">
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
        <div className="w-full">
          <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
            <div className="flex justify-between">
              <div className="text-xl">Past Events</div>
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
  );
}

export default ManageEvents;
