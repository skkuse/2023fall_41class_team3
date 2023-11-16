//monaco-editor
//
"use client";
import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

// const code_submit_url = 'http://
const code_submit_url = "http://127.0.0.1:5000/api/submit_code"; // 서버에 코드를 보내는 url (POST) (서버에서는 코드를 받아서 실행 후 결과를 반환)
const refactor_submit_url = "http://127.0.0.1:5000/submit_reduction";
const reduction_url = "http://127.0.0.1:5000/total_reduction";

//초기 화면 java 코드 : Hello World! (Ideone 참고)
const files = {
  "index.java": {
    name: "index.java",
    language: "java",
    value:
      'import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\n/* Name of the class has to be "Main" only if the class is public. */\nclass Main\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\tSystem.out.println("Hello World!");\n\t}\n}',
  },
};

function UserCode({ updateResultsData }) {
  const [fileName, setFileName] = useState("index.java"); // change to "index.html"
  const [loading, setLoading] = useState(false); //현재 로딩 중인지 확인 (true : 로딩 중, false : 로딩 X)
  const [codeRuntime, setCodeRuntime] = useState("0"); //코드 실행 시간 (오류시 ERROR, 정상 실행시 실행 시간, 로딩 중일 때는 Running...)
  const [codeRuntimeClassName, setCodeRuntimeClassName] = useState("text-black"); //코드 실행 시간의 글자 색상 (오류시 빨간색, 정상 실행시 초록색, 로딩 중일 때는 파란색)
  const editorRef = useRef(null); //editorRef.current.getValue()를 통해 현재 에디터의 코드를 가져올 수 있음
  const file = files[fileName]; //fileName에 따라서 file을 변경
  useEffect(() => {
    //초기 설정
    setCodeRuntimeClassName("text-black");
    setCodeRuntime("Waiting for Code");
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Running 상태 설정
  function setLoadingState() {
    setLoading(true);
    setCodeRuntimeClassName("text-blue-500");
    setCodeRuntime("Running...");
  }

  // 코드 실행 완료 시 Runtime 출력
  function setFinishState(runtime) {
    setLoading(false);
    setCodeRuntime(runtime + "ms");
    setCodeRuntimeClassName("text-primary-green");
  }

  // 오류 발생 시 ERROR 출력 후 초기화
  function setErrorState() {
    setLoading(false);
    setCodeRuntime("ERROR");
    setCodeRuntimeClassName("text-red-500");
  }

  async function postData() {
    setLoadingState();
    try {
      // 서버에 보낼 데이터
      const data = {
        refactoring_status: false,
        code: editorRef.current.getValue(),
      };

      // 서버에 POST 요청 보내기 axios 이용
      const response = await axios
        .post(code_submit_url, data)
        .then(function (response) {
          if (response.data.success === false) {
            setErrorState();
          } else {
            setFinishState(response.data.runtime_real);
            updateResultsData(response.data, editorRef.current.getValue());
            console.log(response.data);
          }
        })
        .catch(function (error) {
          setErrorState();
          console.log(error);
        });
    } catch (e) {
      setErrorState();
      console.log(e);
    }
  }

  function getEditorValue() {
    // 버튼 클릭 시 모달 사용 제안 : react-modal
    // 코드 실행 중일 때 코드를 실행버튼을 다시 클릭하면 코드를 재실행할 것인지 물어봄
    if (loading === true) {
      if (window.confirm("Code is Running Do you want to restart code?")) {
        setLoading(false);
        postData();
      } else {
        //코드 재실행을 하지 않을 경우
        return;
      }
    } else {
      //코드 실행 중이 아닐 경우
      alert(editorRef.current.getValue());
      postData();
    }
  }

  return (
    <div className="flex-col justify-center w-full">
      {/* Monaco 코드 에디터, Style 수정 예정 */}
      <Editor
        height="40vh"
        width="100%"
        theme="vs"
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
      {/* 코드 실행 버튼 + 런타임 출력 부분 */}
      <div className="flex items-center justify-end p-2 space-x-2 border-black-1 space-between">
        {/* <Runntime /> */}
        <span className={codeRuntimeClassName}>{codeRuntime}</span>
        <button
          className="p-2 text-white border-black rounded bg-primary-green "
          id="compile-btn"
          onClick={getEditorValue}>
          Run
        </button>
      </div>
      {/* 제안 : 실행 결과 출력 (post response에 출력 결과가 있음) */}
    </div>
  );
}

export default UserCode;
