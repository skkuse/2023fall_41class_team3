// 탄소배출량 분석 결과
// Carbon footprint, Energy needed, Carbon Intensity
// Carbon sequestration, in a passenger car, of flight seoul-Tokyo, use same amount of CO2
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const CarbonInfo = ({ imagePath, value, imageName, unit, size }) => {
  return (
    <div className="flex-col gap-3 p-3 text-center flex-center bg-slate-50 rounded-2xl">
      <Image
        src={imagePath}
        alt={`${imageName} image`}
        width={size}
        height={size}
      />
      <div className="text-xl">{`${value} ${unit} ${imageName}`}</div>
    </div>
  );
};

const FootPrintResult = () => {
  const CarbonSpecs = [
    {
      imagePath: "/assets/icons/carbon-footprint.svg",
      value: 73.17,
      imageName: "Carbon footprint",
      unit: "g CO2e",
      size: 150,
    },
    {
      imagePath: "/assets/icons/energy.svg",
      value: 658.11,
      imageName: "Energy needed",
      unit: "kWh",
      size: 150,
    },
    {
      imagePath: "/assets/icons/co2_icon.svg",
      value: 16,
      imageName: "Carbon Intensity",
      unit: "g CO2e/kwh",
      size: 150,
    },
  ];
  return (
    <div className="p-10">
      <div className="flex flex-row gap-5 p-7 h-1/3 bg-neutral-300 place-content-evenly rounded-xl">
        {CarbonSpecs.map((spec, index) => (
          <CarbonInfo
            key={index}
            imagePath={spec.imagePath}
            value={spec.value}
            imageName={spec.imageName}
            unit={spec.unit}
            size={spec.size}
          />
        ))}
      </div>
      <div className="h-2/3 bg-slate-50"></div>
    </div>
  );
};

export default FootPrintResult;
