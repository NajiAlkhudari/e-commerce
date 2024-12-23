"use client";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

const Page = () => {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);

    const lineLabels = Array.from({ length: 12 }, (_, i) => i.toString());
    const lineDatapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
    const lineData = {
      labels: lineLabels,
      datasets: [
        {
          label: "Cubic interpolation (monotone)",
          data: lineDatapoints,
          borderColor: "red",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
        {
          label: "Cubic interpolation",
          data: lineDatapoints,
          borderColor: "blue",
          fill: false,
          tension: 0.4,
        },
        {
          label: "Linear interpolation (default)",
          data: lineDatapoints,
          borderColor: "green",
          fill: false,
        },
      ],
    };

    const lineConfig = {
      type: "line",
      data: lineData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Line Chart",
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Value",
            },
            suggestedMin: -10,
            suggestedMax: 200,
          },
        },
      },
    };

    const pieData = {
      labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
      datasets: [
        {
          label: "Dataset 1",
          data: [10, 20, 30, 25, 15],
          backgroundColor: ["red", "orange", "yellow", "green", "blue"],
        },
      ],
    };

    const pieConfig = {
      type: "pie",
      data: pieData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Pie Chart",
          },
        },
      },
    };

    // Destroy previous charts before creating new ones
    const lineCtx = lineChartRef.current.getContext("2d");
    if (Chart.getChart(lineChartRef.current)) {
      Chart.getChart(lineChartRef.current).destroy();
    }
    new Chart(lineCtx, lineConfig);

    const pieCtx = pieChartRef.current.getContext("2d");
    if (Chart.getChart(pieChartRef.current)) {
      Chart.getChart(pieChartRef.current).destroy();
    }
    new Chart(pieCtx, pieConfig);

    return () => {
      // Clean up charts on unmount
      if (Chart.getChart(lineChartRef.current)) {
        Chart.getChart(lineChartRef.current).destroy();
      }
      if (Chart.getChart(pieChartRef.current)) {
        Chart.getChart(pieChartRef.current).destroy();
      }
    };
  }, []);

  return (
    <>
      <div>
        <p>Fake data</p>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <canvas ref={lineChartRef} className="w-full h-auto"></canvas>
          </div>
          <div className="w-full">
            <canvas ref={pieChartRef} className="w-full h-auto"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
