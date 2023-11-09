import React from "react";

import UserCode from "@/components/UserCode";
import AlgoConst from "@/components/AlgoConst";
import ServerEviornments from "@/components/ServerEviornments";
import Runtime from "@/components/Runtime";
import FootPrintResult from "@/components/FootPrintResult";

const Home = () => {
  return (
    <section className="flex-col w-full">
      <div>
        <div className="p-10 flex-center">
          <UserCode />
        </div>
        <div className="flex flex-row justify-center gap-6 mx-9 flex-center">
          <div className="w-1/3">
            <AlgoConst />
            <ServerEviornments />
            <Runtime />
          </div>
          <div className="w-2/3">
            <FootPrintResult />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
