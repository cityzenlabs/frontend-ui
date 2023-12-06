export const transformAverageTimeSpent = (analytics: any) => {
  const dataPoints: any = [];
  const categories: any = [];

  Object.keys(analytics).forEach((month) => {
    categories.push(month);
    dataPoints.push(analytics[month].averageTimeSpent);
  });

  /*return {
    series: [{ name: "Average Time Spent", data: dataPoints }],
    categories,
  };*/
  return {
    series: [{ name: "Average Time Spent", data: [] }],
    categories: [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
  };
};

export const transformAverageUserLevel = (analytics: any) => {
  const dataPoints: any = [];
  const categories: any = [];

  Object.keys(analytics).forEach((month) => {
    categories.push(month);
    dataPoints.push(analytics[month].averageUserLevel);
  });

  /*return {
    series: [{ name: "Average User Level", data: dataPoints }],
    categories,
  };*/

  return {
    series: [{ name: "Average User Level", data: [] }],
    categories: [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
  };
};

export const fakeAverageTimeSpent = () => {
  return {
    series: [{ name: "Average Time Spent", data: [] }],
    categories: [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
  };
};

export const fakeAverageUserLevel = () => {
  return {
    series: [{ name: "Average User Level", data: [] }],
    categories: [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
  };
};
