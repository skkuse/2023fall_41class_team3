// 탄소배출량 분석 결과
// Carbon footprint, Energy needed, Carbon Intensity
// Carbon sequestration, in a passenger car, of flight seoul-Tokyo, use same amount of CO2
"use client";
import React,{useState} from "react";
import dynamic from 'next/dynamic'
import Refactoring from "./Refactoring";
import axios from "axios";

//상단에 Result그림과 하단의
const ResultInfo = ({ imgTitle, description, value, id, unit }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded bg-background">
      <div className="flex items-center justify-center">
        <img
          style={{ margin: "0 auto" }}
          className="w-[60%] h-auto"
          src={imgTitle}
          alt="CarbonFootprintImage"
        />
      </div>
      <div className="flex flex-col justify-start">
        <div>{description}</div>
        <div id={id}>
          {" "}
          {value} {unit}
        </div>
      </div>
    </div>
  );
};



const FootPrintResult = ({resultsData, userCode}) => {
  //소수점 2째자리에서 자른다. backend를 통해서 얻은 정보
  const carbonFootprint= Number((resultsData?.carbon_footprint || 0.0).toFixed(2));
  const cpuUsage= Number((resultsData?.cpu_usage || 0.0).toFixed(2));
  const energyNeeded= Number((resultsData?.energy_needed || 0.0).toFixed(2));


  // backend에서 얻은 탄소 배출량을 바탕으로 계산한다.
  const carbonFootprintDetailed = resultsData?.carbon_footprint || 0.0; //탄소 배출량 (내림 없는 버전)
  const tree_years = Math.floor(carbonFootprintDetailed / 11000);
  const plane_percent = Number((((carbonFootprintDetailed / 171)/1147000)*100).toFixed(2));
  const car_percent = Number((carbonFootprintDetailed / 175).toFixed(2));
  const netflix_hour = Number((carbonFootprintDetailed / 36).toFixed(2));
  const code_submit_url = "http://127.0.0.1:5000/api/submit_code";
  const [carbonFootprintImage, setCarbonFootprintImage] = useState("/assets/icons/carbon-footprint.svg"); //탄소 발자국 이미지
  const [energyNeededImage, setEnergyNeededImage] = useState("/assets/icons/energy.svg"); //에너지 필요량 이미지
  const [cpuUsageImage, setCpuUsageImage] = useState("/assets/icons/co2_icon.svg");
  const [treeImage, setTreeImage] = useState("/assets/icons/tree_icon.svg");
  const [peopleImage, setPeopleImage] = useState("/assets/icons/people_icon.svg");
  const [carImage, setCarImage] = useState("/assets/icons/car_icon.svg");
  const [airplaneImage, setAirplaneImage] = useState("/assets/icons/airplane_icon.svg"); //CPU 이미지로 변경 필요

  async function postData() {
    try {
      // 서버에 보낼 데이터
      const data = {
        refactoring_status: true,
        code: {userCode},
      };
  
      // 서버에 POST 요청 보내기 axios 이용
      const response = await axios
        .post(code_submit_url, data)
        .then(function (response) {
          if (response.data.success === false) {
          } else {
            console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col items-start justify-center gap-3 p-2 bg-surface">
      <div className="grid items-stretch justify-center w-full grid-cols-3 gap-3 p-2 text-center rounded bg-surface-dark">
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
          imgTitle={treeImage}
          description="Carbon sequestration" 
          value={tree_years} 
          id="tree_years_text"
          unit="tree-years"
        />
        <ResultInfo 
          imgTitle={carImage}
          description="in a passenger car" 
          value={car_percent} 
          id="carbonFootprint_text"
          unit="km"
        />
        <ResultInfo 
          imgTitle={airplaneImage}
          description="of flight Seoul-Tokyo" 
          value={plane_percent} 
          id="flightSeoulTokyo_text"
          unit="%"
        />
        <ResultInfo 
          imgTitle={peopleImage}
          description="streaming Netflix" 
          value={netflix_hour} 
          id="people_text"
          unit="hours"
        />
      </div>
      {/* <div className="py-5 flex-center justify-center">
          <button
            onClick={postData}
            className="px-16 py-2 text-white rounded-3xl bg-primary-green flex-center">
            Refactoring
          </button>
        </div>
    </div> */}
  );
};

export default FootPrintResult;
