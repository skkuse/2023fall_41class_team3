import { useState } from "react";

import axios from "axios";

import CodeEditorComponent from "./CodeEditorComponent";
import QueueComponent from "./QueueComponent";
import ExecutionResultsComponent from "./ExecutionResultsComponent";

const CODE_EXECUTION_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/execution";

const CodeSection = ({ onSubmit, onRes, onFinish }) => {
  // Page state can either be 0, 1, or 2.
  // 0 indicates showing the CodeEditorComponent,
  // 1 indicates showing the process queue,
  // 2 indicates the finalized results of the code execution.
  const [pageState, setPageState] = useState(0);
  const [resultID, setResultID] = useState(null);
  const [executionResult, setExecutionResult] = useState({});

  const codeEditorSubmitHandler = async (code) => {
    await axios
      .request({
        method: "post",
        maxBodyLength: Infinity,
        url: CODE_EXECUTION_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          code: code,
        }),
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("code", code); // 사용자가 입력한 코드 로컬에 저장
        setResultID(data.result_id);
        onSubmit(code);
        setPageState(1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const originalCode = localStorage.getItem("code"); // Retrieve the originalCode from localStorage
  // console.log(originalCode);

  const queueFinishHandler = (result) => {
    setExecutionResult(result);
    onFinish(result);
    setPageState(2);
  };

  const render = [
    <CodeEditorComponent key="codeEditor" onSubmit={codeEditorSubmitHandler} />,
    <QueueComponent
      key="queue"
      resultID={resultID}
      onFinish={queueFinishHandler}
    />,
    <ExecutionResultsComponent
      key="executionResults"
      value={executionResult}
      onResState={onRes}
      onPageChange={() => setPageState(0)}
    />,
  ];

  return (
    <div className="flex-col justify-center w-full h-full">
      {render[pageState]}
    </div>
  );
};

export default CodeSection;
