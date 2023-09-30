import React, { useState, useEffect } from "react";

const CodeInput = () => {
  const [codeInput, setCodeInput] = useState("");
  const [codeResult, setCodeResult] = useState("");
  const [runtime, setRuntime] = useState(0);

  useEffect(() => {
    setCodeInput(localStorage.getItem("code") || "");
  });

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
      });
  };

  const handleTextareaChange = (e) => {
    setCodeInput(e.target.value);
  };

  return (
    <div style={{ display: "flex" }}>
      <form method="POST" action="/api/runtime" onSubmit={handleFormSubmit}>
        <h2>Code Input</h2>
        <textarea
          id="code-input"
          name=""
          cols="50"
          rows="10"
          value={codeInput}
          onChange={handleTextareaChange}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Execution Results</h2>
        <textarea
          id="code-input"
          name=""
          cols="50"
          rows="8"
          value={codeResult}
          onChange={() => {}}
        />
        <p>Runtime: {runtime}</p>
      </div>
    </div>
  );
};

export default CodeInput;
