// 컴퓨터 서버 환경
// CPU, CPU CORE, Memory(GB)
// npm install react-icons --save
// TODO: computerSpecs 사용자로부터 컴퓨터 사양 받아오기
import React from "react";
import { IoIosSettings } from "react-icons/io";

const CpuInfo = ({ title, description }) => {
  return (
    <div className="flex p-3 bg-slate-50 rounded-xl h-[90px]">
      <div className="w-1/3 overflow-scroll text-xs font-semibold rounded-xl flex-center bg-neutral-300">
        {title}
      </div>
      <div className="w-2/3 overflow-scroll text-xs flex-center">
        {description}
      </div>
    </div>
  );
};

const ServerEviornments = () => {
  const computerSpecs = [
    {
      title: "CPU",
      description: "Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz 1.80 GHz",
    },
    { title: "CPU CORE", description: "4" },
    { title: "Memory (GB)", description: "16" },
  ];
  return (
    <div className="p-5 bg-gray-100">
      <div className="flex items-center font-semibold">
        <IoIosSettings /> Environment
      </div>
      <div className="grid gap-3 my-auto text-center ">
        {computerSpecs.map((spec, index) => (
          <CpuInfo
            key={index}
            title={spec.title}
            description={spec.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServerEviornments;
