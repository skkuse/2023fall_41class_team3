"use client";
import React, { useState } from "react";
import FootPrintResult from "./FootPrintResult";
import Refactoring from "./Refactoring";

const Results = () => {
  const [selectedTab, setSelectedTab] = useState("footPrint");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="h-full">
      <div className="gap-2 flex-end">
        <button
          onClick={() => handleTabClick("footPrint")}
          className={`text-white px-3 py-2 rounded-t-xl ${
            selectedTab === "footPrint"
              ? "bg-primary-green"
              : "bg-primary-green opacity-25"
          }`}>
          FootPrint
        </button>
        <button
          onClick={() => handleTabClick("refactoring")}
          className={`text-white px-3 py-2 rounded-t-xl ${
            selectedTab === "refactoring"
              ? "bg-primary-green"
              : "bg-primary-green opacity-25"
          }`}>
          Refactoring
        </button>
      </div>
      <div className="h-full bg-gray-100">
        {selectedTab === "footPrint" ? <FootPrintResult /> : <Refactoring />}
      </div>
    </div>
  );
};

export default Results;
