// 탄소배출량 계산에 필요한 알고리즘 상수
// saveButton 구현하고 redirect 막기
// PUE, PSF, CPU Usage Factor
// PUE deafult value: 1.67 - `green-algorithms-tool/data/v2.2/defaults_PUE.csv unknown 참고`
// PSF deafult value: 1 - `green-algorithms-tool/app.py`
// CPU: 1 - `green-algorithms-tool/app.py`

"use client";
import React, { useState } from "react";

const AlgoInfo = ({ title, description, value, onChange }) => {
  return (
    <div className="p-3 rounded-xl h-[90px]">
      <div className="py-1 font-semibold rounded-xl flex-start">{title}</div>
      <div className="flex items-center justify-start px-3 py-1 bg-neutral-300 rounded-2xl">
        <input
          className="w-full all-initial"
          type="number"
          value={value}
          onChange={onChange}
          placeholder={description}
        />
      </div>
    </div>
  );
};

const AlgoConst = () => {
  const [pue, setPue] = useState(1.67);
  const [pse, setPse] = useState(1);
  const [cpu, setCpu] = useState(1);

  const handlePueChange = (e) => {
    setPue(e.target.value);
  };

  const handlePseChange = (e) => {
    setPse(e.target.value);
  };

  const handleCpuChange = (e) => {
    setCpu(e.target.value);
  };

  const saveButton = (e) => {
    // pue, pse, usage cpu 값 저장해서 넘겨주기
  };

  return (
    <div className="bg-gray-100">
      <form action="">
        <AlgoInfo
          title="Power Usage Effectiveness"
          description="1.67"
          value={pue}
          onChange={handlePueChange}
        />
        <AlgoInfo
          title="Pragmatic Scaling Factor"
          description="1"
          value={pse}
          onChange={handlePseChange}
        />
        <AlgoInfo
          title="CPU Usage Factor"
          description="1"
          value={cpu}
          onChange={handleCpuChange}
        />
        <div className="py-5 flex-center">
          <button
            type="submit"
            onClick={saveButton}
            className="px-16 py-2 text-white rounded-3xl bg-primary-green flex-center">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlgoConst;
