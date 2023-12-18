import React, { useEffect, useState } from "react";
import * as EventService from "../../../../Services/EventService/EventService";
import ILabel from "../../../../Library/Label/ILabel";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import EventDetails from "../Reusable/EventDetails/EventDetails/EventDetails";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useDash } from "../../../../Context/DashboardContext";
import { useAuth } from "../../../../Context/AuthContext";
import ISpinner from "../../../../Library/Spinner/ISpinner";

function Event() {
  const { eventId } = useParams();
  const accessToken = useAuth();
  const { user, joinEvent, leaveEvent } = useDash();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>();
  const [communityPicture, setCommunityPicture] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [organizerId, setOrganizerId] = useState<any>();
  const [relatedEvents, setRelatedEvents] = useState<any>();
  const [community, setCommunity] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [attendeesList, setAttendeesList] = useState<any>();

  const fetchEvent = async () => {
    try {
      const eventPage = await EventService.getEvent(accessToken.token, eventId);
      if (eventPage) {
        setEvent(eventPage?.event);
        setOrganizerId(eventPage?.event?.organizerId);
        setOrganizer(eventPage?.organizer);
        setCommunity(eventPage?.host);
        setAttendeesList(eventPage?.event?.attendees);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEvent();
      } catch (error) {}
      setIsLoading(false);
    };

    fetchData();
  }, [eventId, accessToken.token]);

  const handleJoinOrLeaveEvent = async () => {
    try {
      const response = user?.joinedEvents.includes(event.id)
        ? await EventService.leaveEvent(accessToken.token, eventId)
        : await EventService.joinEvent(accessToken.token, eventId);
      if (response.ok) {
        if (user?.joinedEvents?.includes(eventId)) {
          const updatedMembersList = attendeesList.filter(
            (id: any) => id !== user?.id,
          );
          setAttendeesList(updatedMembersList);
          leaveEvent(eventId);
        } else {
          const updatedMembersList = [...attendeesList, user?.id];
          setAttendeesList(updatedMembersList);
          joinEvent(eventId);
        }
      }
    } catch (error) {}
  };

  if (isLoading) {
    return <ISpinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-4 pt-4">
        <div className="flex">
          <ILabel text={event?.name} />
        </div>
        <div>
          <IButton
            text={
              user?.joinedEvents?.includes(eventId)
                ? "Leave Event"
                : "Join Event"
            }
            onClick={handleJoinOrLeaveEvent}
            bgColor={user?.id === organizerId ? "bg-white" : "bg-regal-blue"}
            textColor={user?.id === organizerId ? "text-black" : "text-white"}
            className="px-6 py-2"
            disabled={user?.id === organizerId}
          />
        </div>
      </div>
      <div className="pb-4">
        <ICarousel imageUrls={[event?.photo]} />
      </div>

      <div className="pb-4">
        <EventDetails
          event={event}
          organizer={organizer}
          community={community}
          communityPicture={communityPicture}
          attendeesList={attendeesList}
        />
      </div>

      {user?.joinedEvents?.includes(eventId) && (
        <IEventPanel
          title="Related"
          buttonLabel="Show All"
          height="600px"
          events={relatedEvents}
          onEventClick={(eventName, eventId) => {
            navigate(`/event/${eventName}/${eventId}`);
          }}
          marginTop="mt-0"
          paddingB={8}
        />
      )}
    </div>
  );
}

export default Event;
