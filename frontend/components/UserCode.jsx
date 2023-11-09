//monaco-editor
//
"use client";
import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { get } from "mongoose";

const files = {
  "index.java": {
    name: "index.java",
    language: "java",
    value:
      'public static void main(String[] args) {\n\tSystem.out.println("Hello World!");\n}',
  },
};

function UserCode() {
  const [fileName, setFileName] = useState("index.java"); // change to "index.html"
  const editorRef = useRef(null);
  const file = files[fileName];
  // files["script.py"] -> file -> name, language, value -> pass those to the editor

  // it will take up the full width / height of its container (width: 100%, height: 100%)
  // editors of any size
  // full screen, embed type size

  // 1. Be able to change from 1 file to the next
  // 2. Get the value of the Monaco editor

  // a file path (name), a language, a default value

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function postData() {
    try {
      const response = await axios.post("http://localhost:5000/", {
        code: editorRef.current.getValue(),
      });
      console.log(response.data);
    } catch {
      console.log("error");
    }
  }

  function getEditorValue() {
    alert(editorRef.current.getValue());
    postData();
  }

  return (
    <div className="flex-col justify-center w-full">
      <Editor
        height="40vh"
        width="100%"
        theme="vs"
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
      <div className="flex justify-end border-black-1 space-between">
        {/* <Runntime /> */}
        <button className="" id="compile-btn" onClick={() => getEditorValue()}>
          Get Editor Value
        </button>
      </div>
    </div>
  );
}

export default UserCode;
