import React, { useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import * as EventService from "../../../../Services/EventService/EventService";
import IUserTable from "../../../../Library/IUserTable/IUserTable";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

function EventAttendeesList() {
  const navigate = useNavigate();
  const accessToken = useAuth();
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const fetchMembers = async () => {
    try {
      const data = await EventService.getEventAttendees(
        accessToken.token,
        eventId,
      );
      if (data) {
        setAttendees(data);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchMembers();
  }, [eventId, accessToken.token]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text="Attendees" />
      </div>

      <div className="pb-4">
        <IUserTable
          users={attendees}
          onRowClick={(userId) => {
            navigate(`/profile/${userId}`);
          }}
        />
      </div>
    </div>
  );
}

export default EventAttendeesList;
