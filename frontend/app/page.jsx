"use client";
import React, { useState } from "react";

import ServerInformationSection from "@/components/ServerInformationSection/ServerInformationSection";
import CodeSection from "@/components/CodeSection/CodeSection";
import Results from "@/components/Results/Results";
// import FootPrintResult from "@/components/FootPrintResult";

const Home = () => {
  // useState를 이용해서 resultsData를 관리 UserCode에서 Result로 결과를 이동
  // 제안 : component/main.jsx를 새로 작성하여 app/page.jsx에는 useState가 존재하지 않도록 구조 변경
  const [resultsData, setResultsData] = useState({
    success: true,
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
    <main className="flex-col w-full">
      <section id="code-section" className="my-10 p-10 flex-center h-[36rem]">
        <CodeSection
          onFinish={(results) =>
            setResultsData((before) => {
              return { ...before, ...results };
            })
          }
        />
      </section>

      <section id="analysis" className="flex flex-row gap-5 mx-9">
        <div className="w-1/5">
          <ServerInformationSection />
        </div>

        <div className="w-4/5 flex-col">
          {/* resultsData내용을 전달*/}
          <Results resultsData={resultsData} codeData={codeData} />
        </div>
      </section>
    </main>
  );
};

export default Home;
