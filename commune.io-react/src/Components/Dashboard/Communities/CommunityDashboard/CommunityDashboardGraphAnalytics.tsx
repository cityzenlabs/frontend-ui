export const transformMembersData = (analytics: any) => {
  console.log(analytics);
  const dataPoints: any = [];
  const categories: any = [];

  Object.keys(analytics).forEach((month) => {
    categories.push(month);
    dataPoints.push(analytics[month].members);
  });

  return {
    series: [{ name: "Members", data: dataPoints }],
    categories,
  };
};

export const transformMembersAttendingEventsData = (analytics: any) => {
  const dataPoints: any = [];
  const categories: any = [];

  Object.keys(analytics).forEach((month) => {
    categories.push(month);
    dataPoints.push(analytics[month].membersAttendingEvents);
  });

  return {
    series: [{ name: "Members Attending Events", data: dataPoints }],
    categories,
  };
};
