import UserCode from "@/components/UserCode";
import React from "react";

const Home = () => {
  //   return <div>Home</div>;
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text">
        영상 배너 <br className="max-md:hidden" />
        <span className="text-center green_gradient">CodEco</span>
      </h1>
      <p className="text-center desc">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <UserCode />
    </section>
  );
};

export default Home;
