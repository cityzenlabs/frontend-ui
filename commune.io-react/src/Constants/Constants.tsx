import {
  AcademicCapIcon,
  FireIcon,
  GlobeIcon,
  MoonIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import React from "react";

export function capitalizeFirstLetter(string: any) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getAttributeColor(attribute: string, opacity = 1) {
  switch (attribute) {
    case "SOCIAL":
      return `rgba(104, 190, 241, ${opacity})`; // #68BEF1
    case "CULTURE":
      return `rgba(75, 206, 201, ${opacity})`; // #4BCEC9
    case "FITNESS":
      return `rgba(64, 184, 126, ${opacity})`; // #40B87E
    case "NIGHTLIFE":
      return `rgba(167, 121, 230, ${opacity})`; // #A979E6
    case "ADVENTURE":
      return `rgba(255, 80, 80, ${opacity})`; // #FF5050
    case "INTELLIGENCE":
      return `rgba(255, 166, 86, ${opacity})`; // #FF5050
  }
}

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
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};
