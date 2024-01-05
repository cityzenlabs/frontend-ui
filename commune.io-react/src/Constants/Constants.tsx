export function capitalizeFirstLetter(string: any) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getAttributeColor(attribute: string, opacity = 1) {
  switch (attribute) {
    case "FITNESS":
      return `rgba(104, 190, 241, ${opacity})`; // #68BEF1
    case "INTELLIGENCE":
      return `rgba(75, 206, 201, ${opacity})`; // #4BCEC9
    case "SOCIAL":
      return `rgba(64, 184, 126, ${opacity})`; // #40B87E
    case "CULTURE":
      return `rgba(167, 121, 230, ${opacity})`; // #A979E6
    case "ADVENTURE":
      return `rgba(255, 80, 80, ${opacity})`; // #FF5050
    case "NIGHTLIFE":
      return `rgba(255, 80, 80, ${opacity})`; // #FF5050
  }
}
