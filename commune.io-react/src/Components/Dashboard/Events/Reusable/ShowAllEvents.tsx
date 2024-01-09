import { UsersIcon } from "@heroicons/react/outline";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, getAttributeColor } from "../../../../Constants/Constants";
import { debounce } from "lodash";

function ShowAllEvents({
  initialEvents,
  fetchEventsFunction,
  initialPage = 1,
  pageSize = 12,
  kind,
}: any) {
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents || []);
  const [page, setPage] = useState(initialPage + 1); // Start from the next page
  const [hasMore, setHasMore] = useState(true);
  console.log(initialEvents);

  const fetchMoreEvents = useCallback(async () => {
    try {
      const newEvents = await fetchEventsFunction(page, pageSize);
      if (newEvents && newEvents.length > 0) {
        setEvents((prev: any) => [...prev, ...newEvents]);
        setPage((prev: any) => prev + 1);
        if (newEvents.length < pageSize) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    }
  }, [page, pageSize, fetchEventsFunction]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      fetchMoreEvents();
    }
  }, [fetchMoreEvents, hasMore]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setEvents(initialEvents);
    setPage(initialPage + 1);
    setHasMore(true);
  }, [initialEvents, initialPage]);

  return (
    <div>
      <div className="xl:w-3/4 w-full pb-4">
        <div>
          {events?.map((event: any) => (
            <div
              key={event?.communityId}
              className=" flex justify-between bg-white p-4 rounded mb-4"
              onClick={() => navigate(`/event/${event?.name}/${event?.id}`)}
            >
              <div className="flex ">
                <div className=" h-[170px] xl:w-[250px] w-[200px]  overflow-hidden rounded">
                  <img
                    src={event?.photo}
                    alt={event?.name}
                    className=" w-full h-full object-cover "
                  />
                </div>
                <div className="ml-4 mt-1 text-[10px]">
                  <span className="rounded-full py-1 px-3 font-thin text-white bg-black">
                    {event?.privacy === "PRIVATE" ? "PRIVATE" : "PUBLIC"}
                  </span>
                  <span
                    className="ml-2 rounded-full py-1 px-3 font-thin text-white"
                    style={{
                      backgroundColor: getAttributeColor(event?.attribute, 0.2),
                    }}
                  >
                    <span
                      style={{
                        color: getAttributeColor(event?.attribute),
                      }}
                    >
                      {event?.attribute}
                    </span>
                  </span>

                  <div className="mt-4">
                    <div className="text-xs font-thin mb-1">
                      {formatDate(event?.startTime)}
                    </div>
                    <div className="text-lg mb-1">{event?.name}</div>
                    <div
                      className="text-xs font-thin xl:w-[300px] lg:w-[200px] md:w-[150px] sm:w-[200px] w-[200px] mb-1"
                      style={{
                        maxHeight: "inherit",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {event?.description}
                    </div>
                    <div className="text-[11px] font-md mt-2">
                      {event?.address}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-black px-2 rounded-full flex items-center font-thin"
                style={{ height: "fit-content" }}
              >
                <div className="text-sm mr-1 text-white">
                  {event?.attendees}
                </div>
                <div>
                  <UsersIcon
                    className="h-3.5 w-3.5 text-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowAllEvents;
