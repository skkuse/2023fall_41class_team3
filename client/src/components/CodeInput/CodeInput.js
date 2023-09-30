import React, { useState, useEffect } from "react";

const CodeInput = () => {
  const [showCodeInput, setShowCodeInput] = useState(true);
  const [codeInput, setCodeInput] = useState("");
  const [codeResult, setCodeResult] = useState("");
  const [runtime, setRuntime] = useState(0);

  useEffect(() => {
    setCodeInput(localStorage.getItem("code") || "");
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("code", codeInput);

    fetch("/api/runtime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codeInput),
    })
      .then((res) => res.json())
      .then((data) => {
        setCodeResult(data.result);
        setRuntime(data.runtime);
      })
      .then(() => setShowCodeInput(false));
  };

  const handleTextareaChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleTextareaKeydown = (e) => {
    if (e.key == "Tab") {
      e.preventDefault();
    }
  };

  const handleButtomClick = () => {
    setShowCodeInput(!showCodeInput);
  };

  const getEnergyNeeded = (runtime) => {
    const power_draw = 1;
    const PUE = 1.67;
    const PSF = 1;
    return runtime * power_draw * PUE * PSF;
  };

  const getCarbonFootprint = (runtime) => {
    const energy_needed = getEnergyNeeded(runtime);
    const carbon_intensity = 415.6;
    return energy_needed * carbon_intensity;
  };

  const formatNumber = (number, precision) => {
    return (
      Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
    ).toFixed(precision);
  };

  const codeInputElement = (
    <form method="POST" action="/api/runtime" onSubmit={handleFormSubmit}>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <h2 className="h-10 text-white flex items-center mx-5">
          {showCodeInput ? "Code Input" : "Execution Results"}
        </h2>

        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="code-input"
            name=""
            value={codeInput}
            rows="4"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 h-96 font-mono"
            placeholder="Code Input"
            onKeyDown={handleTextareaKeydown}
            onChange={handleTextareaChange}
            spellCheck="false"
            required
          />
        </div>
        <div className="flex justify-items-end flex-row-reverse px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
          >
            Submit
          </button>
          <button
            type="button"
            className="mx-5 py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
            onClick={handleButtomClick}
          >
            {showCodeInput ? "Execution Results" : "Code Input"}
          </button>
        </div>
      </div>
    </form>
  );
  const executionResultsElement = (
    <form method="POST" action="/api/runtime" onSubmit={handleFormSubmit}>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <h2 className="h-10 text-white flex items-center mx-5">
          {showCodeInput ? "Code Input" : "Execution Results"}
        </h2>

        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <textarea
            id="execution-results"
            name=""
            value={codeResult}
            rows="4"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 h-72 font-mono"
            placeholder="Submit the code!"
            spellCheck="false"
            onChange={() => {}}
            required
          />
        </div>
        <ul className="h-16 text-white m-5">
          <li>Runtime: {formatNumber(runtime, 4)} (sec)</li>
          <li>
            Energy Needed: {formatNumber(getEnergyNeeded(runtime), 4)} (kWh)
          </li>
          <li>
            Carbon Footprint: {formatNumber(getCarbonFootprint(runtime), 4)} (g)
          </li>
        </ul>
        <div className="flex justify-items-end flex-row-reverse px-3 py-2 border-t dark:border-gray-600">
          <button
            type="button"
            className="mx-5 inline-flex py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
            onClick={handleButtomClick}
          >
            {showCodeInput ? "Execution Results" : "Code Input"}
          </button>
        </div>
      </div>
    </form>
  );

  return <>{showCodeInput ? codeInputElement : executionResultsElement}</>;
};

export default CodeInput;
