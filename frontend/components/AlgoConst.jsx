// 탄소배출량 계산에 필요한 알고리즘 상수
// saveButton 구현하고 redirect 막기
// PUE, PSF, CPU Usage Factor
// PUE deafult value: 1.67 - `green-algorithms-tool/data/v2.2/defaults_PUE.csv unknown 참고`
// PSF deafult value: 1 - `green-algorithms-tool/app.py`
// CPU: 1 - `green-algorithms-tool/app.py`

"use client";
import React, { useState } from "react";

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
    <div className="bg-gray-200">
      <form action="">
        <div>
          {/* Power Usage Effectiveness */}
          <div>Power Usage Effectiveness</div>
          <input
            type="number"
            placeholder="1.67"
            id="PUE"
            value={pue}
            onChange={handlePueChange}
          />
        </div>
        <div>
          {/* Pragmatic Scaling Factor */}
          <div>Pragmatic Scaling Factor</div>
          <input
            type="number"
            placeholder="1"
            id="PSE"
            value={pse}
            onChange={handlePseChange}
          />
        </div>
        <div>
          {/* CPU Usage Factor */}
          <div>CPU Usage Factor</div>
          <input
            type="number"
            placeholder="1"
            id="usageCPU"
            value={cpu}
            onChange={handleCpuChange}
          />
        </div>
        <button type="submit" onClick={saveButton}>
          save
        </button>
      </form>
    </div>
  );
};

export default AlgoConst;
