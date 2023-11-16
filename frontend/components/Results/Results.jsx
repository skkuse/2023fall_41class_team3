"use client";
import React, { useState, useEffect } from "react";
import Refactoring from "./Refactoring";
import FootPrintResult from "./FootPrintResult";

const Results = ({ resultsData, userCode }) => {
  const [resultBtnState, setResultBtnState] = useState(false); // true면 FootPrint, false면 Refactoring

  function handleFootPrintBtn() {
    setResultBtnState(true);
  }

  function handleRefactoringBtn() {
    setResultBtnState(false);
  }

  const footPrintBtnClassName = resultBtnState
    ? "bg-primary-green"
    : "bg-gray-500 opacity-50";
  const refactoringBtnClassName = resultBtnState
    ? "bg-gray-500 opacity-50"
    : "bg-primary-green";

  return (
    <div className="h-full">
      <div className="flex justify-end gap-2">
        <button
          className={`w-[20%] font-bold rounded-t text-white p-2 ${footPrintBtnClassName}`}
          onClick={handleFootPrintBtn}>
          FootPrint
        </button>
        <button
          className={`w-[20%] font-bold text-white p-2 ${refactoringBtnClassName}`}
          onClick={handleRefactoringBtn}>
          Refactoring
        </button>
      </div>
      <div className="h-full">
        {resultBtnState ? (
          <FootPrintResult resultsData={resultsData} userCode={userCode}/>
        ) : (
          <Refactoring />
        )}
      </div>
    </div>
  );
};

export default Results;
