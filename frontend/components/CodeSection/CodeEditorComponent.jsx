import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const INITIAL_JAVA_CODE =
  'import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\n/* Name of the class has to be "Main" only if the class is public. */\nclass Main\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\tSystem.out.println("Hello World!");\n\t}\n}';

const CodeEditorComponent = ({ onSubmit }) => {
  const [code, setCode] = useState(INITIAL_JAVA_CODE);

  const editorChangeHandler = (value, _) => {
    setCode(value);
  };

  const buttonClickHandler = () => {
    onSubmit(code);
  };

  const handleKeyDown = (event) => {
    // Check for F5 or Ctrl+R or Cmd+R
    if (
      event.key === "F5" ||
      (event.ctrlKey && event.key === "r") ||
      (event.metaKey && event.key === "r")
    ) {
      localStorage.setItem("code", INITIAL_JAVA_CODE);
    }
  };

  // TODO: 처음에 사용자가 입력한 코드 불러오기
  useEffect(() => {
    const originalCode = localStorage.getItem("code");
    window.addEventListener("keydown", handleKeyDown);
    setCode(originalCode);
  }, []);

  return (
    <div className="h-full w-full bg-[#1e1e1e] flex-col justify-between">
      <Editor
        height="80%"
        width="100%"
        theme="vs-dark"
        value={code}
        options={{ fontSize: 18, suggest: { showWords: false } }}
        defaultLanguage="java"
        onChange={editorChangeHandler}
        className="my-5"
      />

      <div className="flex items-center justify-end p-2 space-x-2 h-1/5 border-black-1 space-between">
        <button
          type="button"
          className="rounded-full bg-primary-green px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          onClick={buttonClickHandler}>
          Run Code
        </button>
      </div>
    </div>
  );
};

export default CodeEditorComponent;
