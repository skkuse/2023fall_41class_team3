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
        }),
      )
      .catch((error) => console.log(error));
    console.log(serverInfo);
  };
  useEffect(() => {
    getServerInformation();
  }, []);

  return (
    <div class="container mx-auto px-5 py-10 w-full">
      <div class="relative mb-10 rounded-md border border-gray-600">
        <p class="p-3">Location: {serverInfo.LOCATION}</p>
        <p class="p-3">Provider: {serverInfo.PROVIDER}</p>
        <p class="p-3">CPU Model: {serverInfo.CPU_MODEL}</p>
        <p class="p-3">Core Power: {serverInfo.CORE_POWER}</p>
        <p class="p-3">Memory Power: {serverInfo.MEMORY_POWER}</p>

        <h2 class="absolute flex top-0 transform -translate-y-1/2">
          <span class="ml-2 bg-white text-lg font-medium">Hardware Specs</span>
        </h2>
      </div>
      <div class="relative rounded-md border border-gray-600">
        <p class="p-3">PUE: {serverInfo.PUE}</p>
        <p class="p-3">PSF: {serverInfo.PSF}</p>
        <p class="p-3">CI: {serverInfo.CI}</p>

        <h2 class="absolute flex top-0 transform -translate-y-1/2">
          <span class="ml-2 bg-white text-lg font-medium">
            Algorithm Constants
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ServerInformationSection;
