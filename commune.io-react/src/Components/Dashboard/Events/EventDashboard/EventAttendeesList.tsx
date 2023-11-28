import React from "react";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IUserTable from "../../../../Library/IUserTable/IUserTable";

function EventAttendeesList({ setShowMembersList, attendees }: any) {
  return (
    <div>
      <IContainer className="pb-8 pt-8">
        <div className="flex">
          <IBackButton onClick={() => setShowMembersList(false)} />
          <ILabel className="ml-4" text="Attendees" />
        </div>
      </IContainer>

      <IContainer className="pb-8">
        <IUserTable users={attendees} />
      </IContainer>
    </div>
  );
}

export default EventAttendeesList;
