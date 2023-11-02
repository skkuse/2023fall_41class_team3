// 탄소배출량 계산에 필요한 런타임 시간
import React from "react";
import { BiTime, BiLoaderCircle } from "react-icons/bi";

const RunTimeInfo = ({ title, description }) => {
  return (
    <div className="flex p-3 bg-slate-50 rounded-xl h-[90px]">
      <div className="w-1/3 font-semibold rounded-xl flex-center bg-neutral-300">
        {title}
      </div>
      <div className="w-2/3 gap-2 flex-center ">
        <BiLoaderCircle />
        <span className="text-primary-green">{description}</span>
      </div>
    </div>
  );
};
const Runtime = () => {
  const computerSpecs = [
    {
      title: "Run Time",
      description: "Running",
    },
  ];
  return (
    <div className="p-5 bg-gray-100">
      <div className="flex items-center font-semibold">
        <BiTime /> Run - Time
      </div>
      <div className="grid gap-3 my-auto text-center ">
        {computerSpecs.map((spec, index) => (
          <RunTimeInfo
            key={index}
            title={spec.title}
            description={spec.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Runtime;
