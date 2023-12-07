import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import * as EventService from "../../../../Services/EventService/EventService";
import * as UserService from "../../../../Services/UserService/UserService";
import ILabel from "../../../../Library/Label/ILabel";
import IPanel from "../../../../Library/Panel/IPanel";
import { CalendarIcon, MapIcon } from "@heroicons/react/outline";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import { useDash } from "../../../../Context/DashboardContext";

import { useNavigate } from "react-router-dom";

function CommunityEvent() {
  const accessToken = useAuth();
  const { user, triggerDataRefresh } = useDash();
  const { communityName, eventId } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [relatedEvents, setRelatedEvents] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvent = async (callback = () => {}) => {
    try {
      const event = await EventService.getEvent(accessToken.token, eventId);
      if (event) {
        setEvent(event);
        const organizer = await UserService.fetchUser(
          accessToken.token,
          event.organizer,
        );
        if (organizer) {
          setOrganizer(organizer);
          checkMembership(event);
          callback();
        }
      }
    } catch (error) {}
  };

  const fetchRelatedEvents = async () => {
    try {
      const data = await EventService.getRelatedEvents(
        accessToken.token,
        eventId,
      );
      if (data) {
        setRelatedEvents(data);
      }
    } catch (error) {}
  };

  const checkMembership = (event: any) => {
    if (user && event) {
      setHasJoined(user?.joinedEvents.includes(event.id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchEvent(), fetchRelatedEvents()]);
      setIsLoading(false);
    };

    fetchData();
  }, [eventId, accessToken.token]);

  const handleJoinOrLeaveEvent = async () => {
    try {
      const response = hasJoined
        ? await EventService.leaveEvent(accessToken.token, eventId)
        : await EventService.joinEvent(accessToken.token, eventId);

      if (response.ok) {
        triggerDataRefresh();
        fetchEvent(() => setHasJoined(!hasJoined));
      }
    } catch (error) {}
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="flex justify-between items-center">
          <div className="flex">
            <ILabel className="ml-4" text={event?.name} />
          </div>
          <div>
            <IButton
              text={hasJoined ? "Leave Event" : "Join Event"}
              onClick={handleJoinOrLeaveEvent}
              bgColor={user?.id === organizer.id ? "bg-white" : "bg-regal-blue"}
              textColor={
                user?.id === organizer.id ? "text-black" : "text-white"
              }
              className="px-6 py-2"
              disabled={user?.id === organizer.id}
            />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="w-full">
          <IPanel height="h-[320px]"></IPanel>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div className="grid grid-cols-3 xl:grid-cols-3 gap-6">
          <div className="col-span-3 xl:col-span-2">
            <IPanel height="h-[550px]">
              <div className=" h-full flex flex-col">
                {event && (
                  <div>
                    <ILabel text={event.name}></ILabel>
                  </div>
                )}
                <div className="mt-5 flex">
                  <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                  <div>{event?.city + ", " + event?.state}</div>
                </div>
                <div className="mt-5 flex">
                  <CalendarIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                  <div>
                    {event &&
                      `${new Date(
                        event.startTime,
                      ).toLocaleDateString()} ${new Date(
                        event.startTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} - ${new Date(
                        event.endTime,
                      ).toLocaleDateString()} ${new Date(
                        event.endTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                  </div>
                </div>
                <div className="mt-5 overflow-y-auto whitespace-pre-wrap flex-grow">
                  {event?.description}
                </div>
              </div>
            </IPanel>
          </div>
          <div className="col-span-3 xl:col-span-1 flex flex-col gap-6">
            <IPanel height="h-[177px]">
              <div>
                <div className="font-bold text-md ">
                  {organizer?.firstName + " " + organizer?.lastName}
                </div>
                <div>Reputation Score - {organizer?.reputation}</div>
              </div>
            </IPanel>
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <div>
          <IPanel title="Related" buttonLabel={"Show All"} height="600px">
            <IEventPanel
              events={relatedEvents ?? {}}
              onEventClick={(eventId) => {
                navigate(`/dashboard/communities/event/${eventId}`);
              }}
            />
          </IPanel>
        </div>
      </IContainer>
    </div>
  );
}

export default CommunityEvent;
