import { Visibility } from "../Enums/EventEnums";

export interface EventsProps {
  setEventsVisibility: (visible: Visibility) => void;
}
