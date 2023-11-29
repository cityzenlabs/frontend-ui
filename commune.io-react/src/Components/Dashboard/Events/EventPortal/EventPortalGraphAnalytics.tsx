export const transformAverageTimeSpent = (analytics: any) => {
  const dataPoints: any = [];
  const categories: any = [];

  Object.keys(analytics).forEach((month) => {
    categories.push(month);
    dataPoints.push(analytics[month].averageTimeSpent);
  });

  return {
    series: [{ name: "Average Time Spent", data: dataPoints }],
    categories,
  };
};

export const transformAverageUserLevel = (analytics: any) => {
  const dataPoints: any = [];
  const categories: any = [];

  Object.keys(analytics).forEach((month) => {
    categories.push(month);
    dataPoints.push(analytics[month].averageUserLevel);
  });

  return {
    series: [{ name: "Average User Level", data: dataPoints }],
    categories,
  };
};
