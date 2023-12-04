import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import Link from "next/link";

const ExecutionResultsComponent = ({ value, onResState, onPageChange }) => {
  
  return (
    <div className="h-full w-full bg-[#1e1e1e] flex-col justify-between">
      <h1 className="flex items-center h-[10%] text-white text-xl mx-10">
        Code Output
      </h1>
      <Editor
        height="45%"
        width="100%"
        theme="vs-dark"
        value={value.success ? value.code_output : "ERROR"}
        options={{ fontSize: 18, readOnly: true }}
        defaultLanguage="java"
        className="my-5"
      />

      <div className={`flex flex-row h-[45%] items-center ${value.success ? 'justify-between' : 'justify-end'}  border-black-1 space-between text-white text-xl ml-[5%] mr-[2%]`}>
        {value.success && (
          <div className="flex w-7/12 h-full justify-between align-center items-center">
            <div>
              Runtime: {value.runtime_real.toFixed(3)} ms<br />
              Energy Needed: {value.energy_needed.toFixed(3)} kWh <br />
              Carbon Footprint: {value.carbon_footprint.toFixed(3)}g CO2e
            </div>
          </div>
        )}
        <div className="flex pb-5 justify-between align-bottom items-end h-full">
          <div className="flex align-center flex-row justify-end">
            <button
              type="button"
              className="mr-5 rounded-full bg-primary-green px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
              onClick={onPageChange}
            >
              Edit Code
            </button>
            {value.success && (<Link href="/#analysis" scroll={true}>
              <button
                type="button"
                onClick={() => onResState(1)}
                className="rounded-full bg-primary-green px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
              >
                Analysis
              </button>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionResultsComponent;
