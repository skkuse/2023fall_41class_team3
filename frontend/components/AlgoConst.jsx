// 탄소배출량 계산에 필요한 알고리즘 상수
// PUE, PSF, CPU Usage Factor
// PUE deafult value: 1.67 - `green-algorithms-tool/data/v2.2/defaults_PUE.csv unknown 참고`
// PSF deafult value: 1 - `green-algorithms-tool/app.py`
// CPU: 1 - `green-algorithms-tool/app.py`

// maintainance: 후에 사용자가 PUE, PSF, CPU usage를 입력할 수 있으므로 현재 사용하지 않는 기능은 주석처리한다.
import React from "react";

const AlgoInfo = ({ title, value }) => {
  return (
    <div className="p-3 rounded-xl h-[90px]">
      <div className="py-1 font-semibold rounded-xl flex-start">{title}</div>
      <div className="flex items-center justify-start px-3 py-1 bg-neutral-300 rounded-2xl">
        <input
          className="w-full all-initial"
          type="number"
          value={value}
          readOnly
        />
      </div>
    </div>
  );
};

const AlgoConst = () => {
  return (
    <div className="bg-gray-100">
      <form action="">
        <AlgoInfo title="Power Usage Effectiveness" value={1.67} />
        <AlgoInfo title="Pragmatic Scaling Factor" value={1} />
        <AlgoInfo title="CPU Usage Factor" value={1} />
        <div className="py-5 flex-center">
          {/* <button
            type="submit"
            onClick={saveButton}
            className="px-16 py-2 text-white rounded-3xl bg-primary-green flex-center">
            Save
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default AlgoConst;
