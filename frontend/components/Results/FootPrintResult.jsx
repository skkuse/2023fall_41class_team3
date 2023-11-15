// 탄소배출량 분석 결과
// Carbon footprint, Energy needed, Carbon Intensity
// Carbon sequestration, in a passenger car, of flight seoul-Tokyo, use same amount of CO2
"use client";
import React,{useState} from "react";
import dynamic from 'next/dynamic'

//상단에 Result그림과 하단의 
const ResultInfo = ({imgTitle, description, value, id, unit}) => {
  return (
      <div className="flex flex-col justify-center items-center bg-background p-2 rounded">
        <div className="flex justify-center items-center">
          <img style={{ margin: "0 auto" }} className="w-[60%] h-auto" src={imgTitle} alt="CarbonFootprintImage"/>
        </div>
        <div className="flex flex-col justify-start">
          <div>{description}</div>
          <div id={id}> {value} {unit}</div>
        </div>
      </div>
  )
}



const FootPrintResult = ({resultsData}) => {
  const carbonFootprint= Number((resultsData?.carbon_footprint || 0.0).toFixed(2));
  const cpuUsage= Number((resultsData?.cpu_usage || 0.0).toFixed(2));
  const energyNeeded= Number((resultsData?.energy_needed || 0.0).toFixed(2));
  const [carbonFootprintImage, setCarbonFootprintImage] = useState("/assets/icons/carbon-footprint.svg"); //탄소 발자국 이미지
  const [energyNeededImage, setEnergyNeededImage] = useState("/assets/icons/energy.svg"); //에너지 필요량 이미지
  const [cpuUsageImage, setCpuUsageImage] = useState("/assets/icons/co2_icon.svg"); //CPU 이미지로 변경 필요
  return (
    <div className="flex flex-col justify-center items-start bg-surface p-2 gap-3">
      <div className="grid grid-cols-3 gap-3 w-full items-stretch justify-center items-center text-center bg-surface-dark p-2 rounded">   
        <ResultInfo 
          imgTitle={carbonFootprintImage}
          description="Carbon Footprint" 
          value={carbonFootprint} 
          id="carbonFootprint_text"
          unit="g CO2e"
        />
        <ResultInfo 
          imgTitle={energyNeededImage}
          description="Energy Needed" 
          value={energyNeeded} 
          id="energyNeeded_text"
          unit="kWh"
        />
        <ResultInfo 
          imgTitle={cpuUsageImage}
          description="Cpu Usage" 
          value={cpuUsage} 
          id="cpuUsage_text"
          unit=""
        />
      </div>
      <div className="grid grid-cols-2 gap-3 w-full items-stretch justify-center items-center text-center bg-surface-dark p-2 rounded">   
        <ResultInfo 
          imgTitle={carbonFootprintImage}
          description="Carbon Footprint" 
          value={carbonFootprint} 
          id="carbonFootprint_text"
          unit="g CO2e"
        />
        <ResultInfo 
          imgTitle={carbonFootprintImage}
          description="Carbon Footprint" 
          value={carbonFootprint} 
          id="carbonFootprint_text"
          unit="g CO2e"
        />
        <ResultInfo 
          imgTitle={energyNeededImage}
          description="Energy Needed" 
          value={energyNeeded} 
          id="energyNeeded_text"
          unit="kWh"
        />
        <ResultInfo 
          imgTitle={cpuUsageImage}
          description="Cpu Usage" 
          value={cpuUsage} 
          id="cpuUsage_text"
          unit=""
        />
      </div>
    </div>
  );
};

export default FootPrintResult;
