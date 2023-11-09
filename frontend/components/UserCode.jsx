//monaco-editor
//
"use client"
import { useState, useRef } from 'react'
import Editor from "@monaco-editor/react"
import axios from 'axios';
import { get } from 'mongoose';

const files = {
  "index.java": {
    name: "index.java",
    language: "java",
    value: "public static void main(String[] args) {\n\tSystem.out.println(\"Hello World!\");\n}"
  }
}

function UserCode() {
  const [fileName, setFileName] = useState("index.java"); // change to "index.html"
  const [loading, setLoading] = useState(false); // change to true
  const [data, setData] = useState([]); 
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

//axios post 이용해서 서버로 코드 전송
//예시로 localhost:5000으로 일단 설정
  async function postData() {
    try{
      const response = await axios.post('http://localhost:5000/', {
        code : editorRef.current.getValue()
      }).then((response) => {
        console.log(response.data);
        axios.get('http://localhost:5000/').then((getResponse) => {
          setLoading(false);
          console.log(getResponse.data);
        });
      });
      console.log(response.data);
    }catch{
      console.log("error");
    }
  }


  // front 확인용
  function getEditorValue() {
    alert(editorRef.current.getValue());
    postData();

  }

  return (
    <div className='w-full flex-col justify-center'>
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
        <span id="runtime" className='text-black'></span>
        <button className="rounded bg-primary-green w-[5%] text-white" id="compile-btn" onClick={getEditorValue}>
          Run
        </button>
      </div>
    </div>
  )
}

export default UserCode