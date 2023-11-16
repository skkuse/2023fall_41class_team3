import React, { useEffect, useRef } from "react";
import { MonacoEditor } from "react-monaco-editor";
import { monaco } from "react-monaco-editor";

const Refactoring = () => {
  const containerRef = useRef(null); // 컨테이너에 대한 ref 생성

  useEffect(() => {
    if (containerRef.current) {
      const originalModel = monaco.editor.createModel(
        "hello world",
        "text/plain"
      );
      const modifiedModel = monaco.editor.createModel(
        "Hello World!",
        "text/plain"
      );

      const diffEditor = monaco.editor.createDiffEditor(containerRef.current, {
        originalEditable: true,
        automaticLayout: true,
      });

      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel,
      });

      return () => diffEditor.dispose(); // 컴포넌트가 언마운트될 때 에디터 정리
    }
  }, []);

  return (
    <div className="h-[90%] bg-surface p-2 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-dark">
        <div className="flex-col bg-background flex-center rounded-xl">
          <div>Carbon footprint</div>
          <div>graph</div>
        </div>
        <div className="flex-col flex-center bg-background rounded-xl">
          <div>Carbon footprint</div>
          <div>graph</div>
        </div>
      </div>
      <div className="h-full ">
        <div className="h-[90%] bg-surface-dark rounded-xl">
          <div className="h-[90%] py-10 flex-center">
            <div
              id="container"
              // style={{ height: "90%" }}
              ref={containerRef}
              className="w-[90%] h-full m-auto ">
              <div className="py-4 flex-center bg-background">
                Suggested Change
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refactoring;
