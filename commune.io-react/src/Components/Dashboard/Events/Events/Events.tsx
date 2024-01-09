import { UsersIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ISpinner from "../../../../Library/Spinner/ISpinner";
import ILabel from "../../../../Library/Label/ILabel";
import { useDash } from "../../../../Context/DashboardContext";
import { formatDate } from "../../../../Constants/Constants";
import ShowAllEvents from "../Reusable/ShowAllEvents";

function Events() {
  const location = useLocation();
  const { kind }: any = useParams();
  const [events, setEvents] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useDash();

  useEffect(() => {
    if (location.state?.events) {
      setEvents(location.state.events);
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return <ISpinner />;
  }
  return (
    <div>
      <div className="pt-4 pb-4 flex justify-between xl:w-3/4 w-full ">
        <ILabel text={kind || ""}></ILabel>
      </div>

      <ShowAllEvents events={events} />
    </div>
  );
}

export default Events;
