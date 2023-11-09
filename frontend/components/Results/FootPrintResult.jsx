// 탄소배출량 분석 결과
// Carbon footprint, Energy needed, Carbon Intensity
// Carbon sequestration, in a passenger car, of flight seoul-Tokyo, use same amount of CO2
import React from "react";
import Image from "next/image";
import dynamic from 'next/dynamic'
const FootPrintResult = () => {
  return (
  <div>
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center">
        <div>
          <Image
            src="/assets/icons/carbon-footprint.svg"
            alt="footprint"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <div id="carbonEmissions_text">... g CO2e</div>
          <div>Cardon Footprint </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div>
        <Image
            src="/assets/icons/co2_icon.svg"
            alt="footprint"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <div id="carbonEmissions_text">100000</div>
          <div>Energy Needed </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FootPrintResult;
