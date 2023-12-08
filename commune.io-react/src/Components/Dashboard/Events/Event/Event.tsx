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
import EventDetails from "../Reusable/EventDetails/EventDetails";
import ICarousel from "../../../../Library/Carousel/ICarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useDash } from "../../../../Context/DashboardContext";
import { useAuth } from "../../../../AuthContext";

function Event() {
  const { eventId } = useParams();
  const accessToken = useAuth();
  const { user, triggerDataRefresh } = useDash();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [relatedEvents, setRelatedEvents] = useState<any>();
  const [eventPicture, setEventPicture] = useState<any>();
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
          checkMembership(event);
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

  const fetchPicture = async () => {
    try {
      const data = await EventService.getEventPicture(
        accessToken.token,
        eventId,
      );
      if (data) {
        setEventPicture(data);
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
      await Promise.all([fetchEvent(), fetchRelatedEvents(), fetchPicture()]);
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
        await triggerDataRefresh();
        fetchEvent(() => setHasJoined(!hasJoined));
      }
    } catch (error) {}
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <IContainer className="pb-8 pt-8">
          <div className="flex justify-between items-center">
            <div className="flex">
              <ILabel text={event?.name} />
            </div>
            <div>
              <IButton
                text={hasJoined ? "Leave Event" : "Join Event"}
                onClick={handleJoinOrLeaveEvent}
                bgColor={
                  user?.id === organizer?.id ? "bg-white" : "bg-regal-blue"
                }
                textColor={
                  user?.id === organizer?.id ? "text-black" : "text-white"
                }
                className="px-6 py-2"
                disabled={user?.id === organizer?.id}
              />
            </div>
          </div>
        </IContainer>
        <IContainer className="pb-8">
          <div className="w-full">
            <ICarousel imageUrls={[eventPicture]} />
          </div>
        </IContainer>
        <IContainer className="pb-8">
          <EventDetails
            event={event}
            organizer={organizer}
            user={user}
            community={community}
          />
        </IContainer>
        <IContainer className="pb-8">
          <div>
            <IPanel title="Related" buttonLabel={"Show All"} height="600px">
              <IEventPanel
                events={relatedEvents}
                onEventClick={(eventId) => {
                  navigate(`/dashboard/events/${eventId}`);
                }}
              />
            </IPanel>
          </div>
        </IContainer>
      </div>
    </div>
  );
}

export default Event;
