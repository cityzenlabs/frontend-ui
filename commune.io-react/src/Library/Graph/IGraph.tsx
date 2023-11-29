import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "react-apexcharts";

const IGraph = ({ data, categories, type = "line", title }: any) => {
  const [chartRendered, setChartRendered] = useState(false);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      setChartRendered(true);
    }
  }, [chartContainerRef]);

  if (!data || !categories || !chartRendered) {
    return <div ref={chartContainerRef}></div>;
  }

  const chartOptions: any = {
    title: {
      text: title, // Your title text
      align: "center", // Alignment of title: 'left', 'right', or 'center'
      style: {
        fontSize: "16px", // Font size of title
        color: "#263238", // Color of title text
        fontFamily: "Helvetica, Arial, sans-serif", // Font family of title
        // Other CSS properties can be added here
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
      colors: ["#2563EB"], // Replace with the color you want for the line
    },
    markers: {
      size: 5,
      colors: ["#2563EB"], // Replace with the color you want for the markers
      strokeColors: "#ffffff",
      strokeWidth: 2,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value: any) => {
          return value; // Customize based on your data
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: [], // Array of colors for the labels
          fontSize: "6px",
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      min: 0, // minimum value
      max: 1000, // maximum value
      tickAmount: 10, // number of ticks (intervals) you want
      labels: {
        formatter: function (val: any) {
          return val.toFixed(0); // This will format the label values as integers
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#F9FAFB", // Light grey border color for the grid
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className=" w-full bg-white rounded shadow bg-white p-4 md:p-6">
      <div id="line-chart w-full" ref={chartContainerRef}>
        <ApexCharts options={chartOptions} series={data} type={type} />
      </div>
    </div>
  );
};

export default IGraph;
