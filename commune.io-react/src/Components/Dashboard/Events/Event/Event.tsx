import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import * as EventService from "../../../../Services/EventService/EventService";
import * as UserService from "../../../../Services/UserService/UserService";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import ILabel from "../../../../Library/Label/ILabel";
import IPanel from "../../../../Library/Panel/IPanel";
import IButton from "../../../../Library/Button/IButton";
import IEventPanel from "../../../../Library/EventPanel/IEventPanel";
import EventDetails from "../Reusable/EventDetails/EventDetails/EventDetails";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useDash } from "../../../../Context/DashboardContext";
import { useAuth } from "../../../../AuthContext";
import ISpinner from "../../../../Library/Spinner/ISpinner";

function Event() {
  const { eventId } = useParams();
  const accessToken = useAuth();
  const { user, triggerDataRefresh } = useDash();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>();
  const [communityPicture, setCommunityPicture] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [relatedEvents, setRelatedEvents] = useState<any>();
  const [community, setCommunity] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEvent = async (callback = () => {}) => {
    try {
      const event = await EventService.getEvent(accessToken.token, eventId);
      if (event) {
        setEvent(event);
        const community = await CommunityService.getCommunity(
          event.host,
          accessToken.token,
        );
        const organizer = await UserService.fetchUser(
          accessToken.token,
          event.organizer,
        );
        if (organizer) {
          setOrganizer(organizer);

          callback();
        }
        if (community) {
          setCommunity(community);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchEvent(), fetchRelatedEvents()]);
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
        await triggerDataRefresh();
        fetchEvent();
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
              user?.joinedEvents.includes(event.id)
                ? "Leave Event"
                : "Join Event"
            }
            onClick={handleJoinOrLeaveEvent}
            bgColor={user?.id === organizer?.id ? "bg-white" : "bg-regal-blue"}
            textColor={user?.id === organizer?.id ? "text-black" : "text-white"}
            className="px-6 py-2"
            disabled={user?.id === organizer?.id}
          />
        </div>
      </div>
      <div className="pb-4">
        <ICarousel imageUrls={[event?.picture]} />
      </div>

      <div className="pb-4">
        <EventDetails
          event={event}
          organizer={organizer}
          user={user}
          community={community}
          communityPicture={communityPicture}
        />
      </div>
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
    </div>
  );
}

export default Event;
