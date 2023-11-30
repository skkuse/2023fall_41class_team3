import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const REFACTORIZATION_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/refactorization";

const RefactorizationComponent = ({ code }) => {
  const [refactorStatus, setRefactorStatus] = useState(0);
  const [refactoredCode, setRefactoredCode] = useState(code);

  const refactor = async () => {
    if (code == "") {
      return;
    }

    setRefactorStatus(1);
    await axios
      .request({
        method: "post",
        maxBodyLength: Infinity,
        url: REFACTORIZATION_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          code: code,
        }),
      })
      .then((reponse) => reponse.data)
      .then((data) => setRefactoredCode(data.refactoredCode))
      .catch((error) => console.log(error))
      .finally(setRefactorStatus(2));
  };

  const RefactorButton = () => {
    return (
      <div className="h-full w-full flex justify-center align-middle items-center bg-[#1e1e1e]">
        <button
          className="rounded-full bg-primary-green px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          type="button"
          onClick={refactor}
        >
          Refactor
        </button>
      </div>
    );
  };

  const LoadingState = () => {
    return (
      <div className="h-full w-full animate-pulse flex justify-center align-middle items-center bg-[#1e1e1e] text-white">
        Loading...
      </div>
    );
  };

  const RefactoredOutput = () => {
    return (
      <>
        <h1 className="text-center">Updated Code</h1>
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          value={refactoredCode}
          options={{ fontSize: 12 }}
          defaultLanguage="java"
          className="my-5"
        />
      </>
    );
  };

  const render = [<RefactorButton />, <LoadingState />, <RefactoredOutput />];

  return (
    <div>
      <h1 className="text-3xl mb-5">Code Refactorization</h1>
      <p>
        Our website provides a code refactorization feature, which utilizes
        OpenAI's ChatGPT service to statically analyze and reduce the carbon
        emission of the given code. While this service may be useful, it is up
        to the user to check if the refactored code has the same functionality
        before usage since AI models can be incorrect.
      </p>

      <div className="h-80 flex mt-10 border border-black">
        <div className="w-full">
          <h1 className="text-center">Original Code</h1>
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            value={code === "" ? "Submit your code first" : code}
            options={{ fontSize: 12 }}
            defaultLanguage="java"
            className="my-5"
          />
        </div>
        <div className="h-full w-full">{render[refactorStatus]}</div>
      </div>
    </div>
  );
  // const containerRef = useRef(null); // 컨테이너에 대한 ref 생성

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const originalModel = monaco.editor.createModel(
  //       "hello world",
  //       "text/plain"
  //     );
  //     const modifiedModel = monaco.editor.createModel(
  //       "Hello World!",
  //       "text/plain"
  //     );

  //     const diffEditor = monaco.editor.createDiffEditor(containerRef.current, {
  //       originalEditable: true,
  //       automaticLayout: true,
  //     });

  //     diffEditor.setModel({
  //       original: originalModel,
  //       modified: modifiedModel,
  //     });

  //     return () => diffEditor.dispose(); // 컴포넌트가 언마운트될 때 에디터 정리
  //   }
  // }, []);

  // return (
  //   <div className="h-[90%] bg-surface p-2 flex flex-col gap-3">
  //     <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-dark">
  //       <div className="flex-col bg-background flex-center rounded-xl">
  //         <div>Carbon footprint</div>
  //         <div>graph</div>
  //       </div>
  //       <div className="flex-col flex-center bg-background rounded-xl">
  //         <div>Carbon footprint</div>
  //         <div>graph</div>
  //       </div>
  //     </div>
  //     <div className="h-full ">
  //       <div className="h-[90%] bg-surface-dark rounded-xl">
  //         <div className="h-[90%] py-10 flex-center">
  //           <div
  //             id="container"
  //             // style={{ height: "90%" }}
  //             ref={containerRef}
  //             className="w-[90%] h-full m-auto ">
  //             <div className="py-4 flex-center bg-background">
  //               Suggested Change
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default RefactorizationComponent;
