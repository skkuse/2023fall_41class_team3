import { useState, useEffect } from "react";
import axios from "axios";

const QUEUE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/execution/queue";
const EXECUTION_RESULTS_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/execution/result";

const Loader = () => {
  return (
    <div className="h-full flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]">
      <div className="flex flex-col items-center justify-center flex-auto p-4 md:p-5">
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only text-white">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Table = ({ queue }) => {
  const tbody = Object.entries(queue).map(([index, data]) => {
    return (
      <tr key={data.submission_id}>
        <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap dark:text-gray-200">
          {index}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap dark:text-gray-200">
          {data.submission_id}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap dark:text-gray-200">
          {data.submission_date}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-white uppercase whitespace-nowrap dark:text-gray-200">
          {data.status}
        </td>
      </tr>
    );
  });

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                  >
                    Index
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                  >
                    Submission ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                  >
                    Submission Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white dark:divide-gray-700">
                {tbody}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const QueueComponent = ({ resultID, onFinish }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("pending");
  const [queue, setQueue] = useState({});

  const checkStatus = async () => {
    await axios
      .request({
        method: "get",
        maxBodyLength: Infinity,
        url: EXECUTION_RESULTS_URL + `/${resultID}`,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.successful === true && data.value !== null) {
          onFinish(data.value);
        }
        setStatus(data.status);
      })
      .catch((error) => console.log(error));
  };

  const fetchQueue = async () => {
    await axios
      .request({
        method: "get",
        maxBodyLength: Infinity,
        url: QUEUE_URL,
      })
      .then((response) => response.data)
      .then((data) =>
        setQueue((previousQueue) => {
          return { ...previousQueue, ...data };
        })
      )
      .catch((error) => {
        console.log(error);
        setQueue({});
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    checkStatus();
    fetchQueue();

    const intervalID = setInterval(() => {
      checkStatus();
      fetchQueue();
    }, 10000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="h-full w-full bg-[#1e1e1e] flex-col justify-around rounded-sm text-white">
      <div className="flex items-center p-10 text-white border-white rounded-t-sm h-1/5">
        Your code status: <span className="uppercase">{status}</span> [
        {resultID}]
      </div>
      <div className="overflow-scroll rounded-b-sm h-4/5 ">
        {isLoading ? <Loader /> : <Table queue={queue} />}
      </div>
    </div>
  );
};
export default QueueComponent;
