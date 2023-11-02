import React from "react";

import UserCode from "@/components/UserCode";
import AlgoConst from "@/components/AlgoConst";
import ServerEviornments from "@/components/ServerEviornments";
import Runtime from "@/components/Runtime";
import FootPrintResult from "@/components/FootPrintResult";
import Banner from "@/components/Banner";

const Home = () => {
  return (
    <section className="flex-col w-full flex-center">
      {/* <Banner /> */}
      <h1 className="text-center head_text">
        영상 배너 <br className="max-md:hidden" />
        <span className="text-center green_gradient">CodEco</span>
      </h1>
      <div>
        <div className="flex-center">
          <UserCode />
        </div>
        <div className="flex flex-row gap-6 flex-center">
          <div>
            <AlgoConst />
            <ServerEviornments />
            <Runtime />
          </div>
          <div>
            <FootPrintResult />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
