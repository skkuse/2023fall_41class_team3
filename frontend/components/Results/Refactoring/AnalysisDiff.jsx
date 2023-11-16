// TODO: web page 띄울 때 뜨는 에러 해결할 것
// Unhandled Runtime Error
// Error: Canvas is already in use. Chart with ID '0' must be destroyed before the canvas with ID '' can be reused.
// yarn add tw-elements
"use client";

import React, { useRef, useEffect } from "react";
import { Chart, initTE } from "tw-elements";
const MyChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    initTE({ Chart });

    const dataBarHorizontal = {
      type: "bar",
      data: {
        labels: ["Original", "Suggested"],
        datasets: [{ label: "Carbon footprint", data: [30, 15] }],
      },
    };

    const optionsBarHorizontal = {
      options: {
        indexAxis: "y",
        scales: {
          x: {
            stacked: true,
            grid: {
              display: true,
              borderDash: [2],
              zeroLineColor: "rgba(0,0,0,0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: {
              color: "rgba(0,0,0, 0.5)",
            },
          },
          y: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(0,0,0, 0.5)",
            },
          },
        },
      },
    };
    // 이전 차트 파기
    if (chartRef.current) {
      chartRef.current.clear;
      chartRef.current.destroy;
    }
    new Chart(chartRef.current, dataBarHorizontal, optionsBarHorizontal);
  }, []);

  return <canvas ref={chartRef}></canvas>;
};
const FootPrintDiff = ({ fromValue, toValue }) => {
  return <div></div>;
};

const AnalysisDiff = () => {
  return (
    <div className="p-3 rounded-xl bg-surface-dark">
      <div className="flex-col flex-center bg-background rounded-xl">
        <div>Carbon footprint</div>
        <div class="mx-auto w-3/5 h-full overflow-hidden">
          <MyChartComponent />
        </div>
      </div>
    </div>
  );
};

export default AnalysisDiff;
