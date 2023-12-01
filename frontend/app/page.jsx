"use client";

import React, { useState } from "react";
import React, { useState } from "react";

import ServerInformationSection from "@/components/ServerInformationSection/ServerInformationSection";
import CodeSection from "@/components/CodeSection/CodeSection";
import ResultSection from "@/components/ResultSection/ResultSection";

const Home = () => {
  const [executionResults, setExecutionResults] = useState({
    success: false,
    runtime_real: 0.0,
    runtime_user: 0.0,
    runtime_sys: 0.0,
    code_output: "",
    cpu_usage: 0.0,
    energy_needed: 0.0,
    carbon_footprint: 0.0,
  });

  const [codeData, setCodeData] = useState({
    bef_code: "", // UserCode에서 입력한 코드
    aft_code: "", // Refactoring에서 수정한 코드
  });

  // UserCode에서 ResultsData 내용 변경
  const updateResultsData = (data, code) => {
    setResultsData(data);
    setCodeData({
      bef_code: code,
      aft_code: "",
    });
  };

  return (
    <section className="flex-col w-full">
      <div>
        <div className="p-10 flex-center">
          <UserCode updateResultsData={updateResultsData} />
        </div>
        <div className="flex flex-row gap-5 mx-9">
          <div className="grid w-1/3 gap-6">
            <AlgoConst />
            <ServerEviornments />
            <Runtime />
          </div>
          <div className="flex-col w-2/3">
            {/* resultsData내용을 전달*/}
            <Results resultsData={resultsData} codeData={codeData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
