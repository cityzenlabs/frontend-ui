import React, { useEffect, useState } from "react";
import IContainer from "../../../../../Library/Container/IContainer";
import IBackButton from "../../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../../Library/Label/ILabel";
import * as EventService from "../../../../../Services/EventService/EventService";
import IUserTable from "../../../../../Library/IUserTable/IUserTable";

function EventAttendeesList({ setShowAttendeesList, token, eventId }: any) {
  const [attendees, setAttendees] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const fetchMembers = async () => {
    try {
      const data = await EventService.getEventAttendees(token, eventId);
      if (data) {
        setAttendees(data);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchMembers();
  }, [eventId, token]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="flex">
          <IBackButton onClick={() => setShowAttendeesList(false)} />
          <ILabel className="ml-4" text="Attendees" />
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <IUserTable users={attendees} onRowClick={() => setUserId(userId)} />
      </IContainer>
    </div>
  );
}

export default EventAttendeesList;
