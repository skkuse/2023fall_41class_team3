import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_INFORMATION_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/server-info";

const ServerInformationSection = () => {
  const [serverInfo, setServerInfo] = useState({});

  const getServerInformation = async () => {
    await axios
      .request({
        method: "get",
        maxBodyLength: Infinity,
        url: SERVER_INFORMATION_URL,
      })
      .then((response) => response.data)
      .then((data) =>
        setServerInfo((before) => {
          return { ...before, ...data };
        })
      )
      .catch((error) => console.log(error));
    console.log(serverInfo);
  };
  useEffect(() => {
    getServerInformation();
  }, []);

  return (
    <div className="container w-full px-5 py-10 mx-auto">
      <div className="relative mb-10 border border-gray-600 rounded-md">
        <p className="p-3">Location: {serverInfo.LOCATION}</p>
        <p className="p-3">Provider: {serverInfo.PROVIDER}</p>
        <p className="p-3">CPU Model: {serverInfo.CPU_MODEL}</p>
        <p className="p-3">Core Power: {serverInfo.CORE_POWER}</p>
        <p className="p-3">Memory Power: {serverInfo.MEMORY_POWER}</p>

        <h2 className="absolute top-0 flex transform -translate-y-1/2">
          <span className="ml-2 text-lg font-medium bg-white">
            Hardware Specs
          </span>
        </h2>
      </div>
      <div className="relative border border-gray-600 rounded-md">
        <p className="p-3">PUE: {serverInfo.PUE}</p>
        <p className="p-3">PSF: {serverInfo.PSF}</p>
        <p className="p-3">CI: {serverInfo.CI}</p>

        <h2 className="absolute top-0 flex transform -translate-y-1/2">
          <span className="ml-2 text-lg font-medium bg-white">
            Algorithm Constants
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ServerInformationSection;
