import React from "react";

const CodeInput = () => {
  return (
    <div style={{ display: "flex" }}>
      <form method="POST" action="/api/runtime">
        <h2>Code Input</h2>
        <textarea id="code-input" name="" cols="50" rows="10" />
        <br />

        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Execution Results</h2>
        <textarea id="code-input" name="" cols="50" rows="8" />
      </div>
    </div>
  );
};

export default CodeInput;
