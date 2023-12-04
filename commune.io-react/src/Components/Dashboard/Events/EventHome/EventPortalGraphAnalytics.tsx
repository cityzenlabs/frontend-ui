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

/*const averageTimeSpent = eventHome?.analytics
    ? transformAverageTimeSpent(eventHome.analytics)
    : null;
  const averageUserLevel = eventHome?.analytics
    ? transformAverageUserLevel(eventHome.analytics)
    : null;*/

/* <IContainer className="pb-8">
       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full ">
         {averageTimeSpent && (
           <IGraph
             data={averageTimeSpent.series}
             categories={averageTimeSpent.categories}
             title="Average Time Spent"
           />
         )}
         {averageUserLevel && (
           <IGraph
             title="Average User Level"
             data={averageUserLevel.series}
             categories={averageUserLevel.categories}
           />
         )}
       </div>
     </IContainer>;*/
