import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const IGraph = ({ data, categories, title }: any) => {
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: title,
        data: data.data,
        fill: false,
        backgroundColor: "rgb(80,129,255)",
        borderColor: "rgba(80,129,255, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="w-full bg-white rounded shadow p-4 md:p-6 "
      style={{ height: "300px" }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default IGraph;
