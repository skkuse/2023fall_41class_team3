import React from "react";

import UserCode from "@/components/UserCode";
import AlgoConst from "@/components/AlgoConst";
import ServerEviornments from "@/components/ServerEviornments";
import Runtime from "@/components/Runtime";
import FootPrintResult from "@/components/FootPrintResult";
import Banner from "@/components/Banner";

const Home = () => {
  //   return <div>Home</div>;
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text">
        영상 배너 <br className="max-md:hidden" />
        <span className="text-center green_gradient">CodEco</span>
      </h1>
      <Banner />
      <div>
        <UserCode />
        <div>
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
