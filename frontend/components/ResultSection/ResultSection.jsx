import React, { useState } from "react";

import InformationComponent from "./InformationComponent";
import ResultsAnalysisComponent from "./ResultsAnalysisComponent";
import RefactorizationComponent from "./RefactorizationComponent";

const ResultSection = ({ code, results }) => {
  // Page state can either be 0, 1, or 2.
  // 0 indicates showing the information about the website,
  // 1 indicates showing the carbon footprint analysis information,
  // 2 indicates the refactoring status.
  const [pageState, setPageState] = useState(0);

  const selectedButtonClass = "bg-green-900";
  const unselectedButtonClass = "bg-gray-500";

  const render = [
    <InformationComponent key="information" />,
    <ResultsAnalysisComponent key="resultsAnalysis" results={results} />,
    <RefactorizationComponent key="refactorization" code={code} />,
  ];

  return (
    <div className="h-full">
      <div className="flex justify-end gap-2">
        <button
          className={`w-[20%] font-bold rounded-t-xl text-white p-2 ${
            pageState === 0 ? selectedButtonClass : unselectedButtonClass
          }`}
          onClick={() => {
            setPageState(0);
          }}>
          What is CodEco?
        </button>
        <button
          className={`w-[20%] font-bold rounded-t-xl text-white p-2 ${
            pageState === 1 ? selectedButtonClass : unselectedButtonClass
          }`}
          onClick={() => {
            setPageState(1);
          }}>
          Results Analysis
        </button>
        <button
          className={`w-[20%] font-bold rounded-t-xl text-white p-2 ${
            pageState === 2 ? selectedButtonClass : unselectedButtonClass
          }`}
          onClick={() => {
            setPageState(2);
          }}>
          Code Refactoring
        </button>
      </div>
      <div className="h-full bg-green-900 flex-center">
        <div className="rounded-xl h-[90%] w-[96%] bg-white p-7">
          {render[pageState]}
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
