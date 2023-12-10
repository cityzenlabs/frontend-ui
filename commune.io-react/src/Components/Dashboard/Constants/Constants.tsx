import {
  AcademicCapIcon,
  FireIcon,
  GlobeIcon,
  MoonIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import React from "react";

export const getIconForAttribute = (attribute: any) => {
  const icons: any = {
    social: <UsersIcon className="h-6 w-6" aria-hidden="true" />,
    fitness: <FireIcon className="h-6 w-6" aria-hidden="true" />,
    nightlife: <MoonIcon className="h-6 w-6 " aria-hidden="true" />,
    intelligence: <AcademicCapIcon className="h-6 w-6 " ria-hidden="true" />,
    culture: <StarIcon className="h-6 w-6" aria-hidden="true" />,
    adventure: <GlobeIcon className="h-6 w-6 " aria-hidden="true" />,
  };
  return icons[attribute.toLowerCase()];
};

export const formatDate = (dateString: string) => {
  const options: any = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};
