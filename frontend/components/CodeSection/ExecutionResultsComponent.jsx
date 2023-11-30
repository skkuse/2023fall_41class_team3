import Editor from "@monaco-editor/react";
import Link from "next/link";

const ExecutionResultsComponent = ({ value, onPageChange }) => {
  if (value.success === false) {
    return <div>Fail</div>;
  }

  return (
    <div className="h-full w-full bg-[#1e1e1e] flex-col justify-between">
      <h1 className="flex items-center h-[10%] text-white text-xl mx-10">
        Code Output
      </h1>
      <Editor
        height="45%"
        width="100%"
        theme="vs-dark"
        value={value.code_output}
        options={{ fontSize: 18 }}
        defaultLanguage="java"
        className="my-5"
      />

      <div className="flex-col h-[45%] items-center justify-start  border-black-1 space-between text-white text-xl mx-10">
        <p className="h-[33%]">Runtime: {value.runtime_real}</p>
        <p className="h-[33%]">Energy Needed: {value.energy_needed}</p>
        <div className="flex justify-between align-center items-center">
          <p className="h-[33%]">Carbon Footprint: {value.carbon_footprint}</p>
          <div className="w-[30%]">
            <button
              type="button"
              className="mr-10 rounded-full bg-primary-green px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
              onClick={onPageChange}
            >
              Run Code
            </button>
            <Link href="/#analysis" scroll={true}>
              <button
                type="button"
                className="rounded-full bg-primary-green px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
              >
                Analysis
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionResultsComponent;
