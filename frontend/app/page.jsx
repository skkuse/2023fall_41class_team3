"use client";

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

  const [code, setCode] = useState("");
  const [resState, setResState] = useState(0); // 0: code, 1: results, 2: refactoring
  const updateResState = (state) => {
    setResState(state);
  };
  return (
    <main className="flex-col w-full">
      <section id="code-section" className="my-10 p-10 flex-center h-[36rem]">
        <CodeSection
          onSubmit={(code) => setCode(code)}
          onRes={updateResState}
          onFinish={(results) =>
            setExecutionResults((before) => {
              return { ...before, ...results };
            })
          }
        />
      </section>

      <section
        id="analysis"
        className="flex flex-row gap-5 mx-9 h-auto min-h-[45rem]">
        <div className="w-1/5">
          <ServerInformationSection />
        </div>

        <div className="w-4/5 flex-col mb-20 min-h-[45rem] h-auto">
          <ResultSection
            code={code}
            state={resState}
            updateState={updateResState}
            results={executionResults}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
