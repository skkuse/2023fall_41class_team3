// TODO: web page 띄울 때 뜨는 에러 해결할 것
// Unhandled Runtime Error
// Error: Canvas is already in use. Chart with ID '0' must be destroyed before the canvas with ID '' can be reused.
// yarn add tw-elements
"use client";

import React, { useRef, useEffect } from "react";
import { Chart, initTE } from "tw-elements";
const FootPrintChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    initTE({ Chart });

    const dataBarHorizontal = {
      type: "bar",
      data: {
        labels: ["Original", "Suggested"],
        datasets: [
          {
            label: "Carbon footprint",
            data: [30, 15],
            barThickness: 20,
          },
        ],
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
              // display: true,
            },
            ticks: {
              color: "rgba(0,0,0, 0.5)", // 왼쪽에 Original, Suggested 글자 색
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

  return (
    <div className="">
      <canvas ref={chartRef} style={{ height: "100px" }}></canvas>
    </div>
  );
};

const AnalysisDiff = () => {
  return (
    <div className="p-3 rounded-xl bg-surface-dark">
      <div className="flex-col flex-center bg-background rounded-xl">
        <div>Carbon footprint</div>
        {/* <div class="w-4/5 overflow-scroll"> */}
        <div class="w-4/5 ">
          <FootPrintChart />
        </div>
      </div>
    </div>
  );
};

export default AnalysisDiff;
