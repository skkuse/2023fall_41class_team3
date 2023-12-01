import React, { useEffect, useRef } from "react";
import { monaco } from "react-monaco-editor";
import RefactoringDiff from "./Refactoring/RefactoringDiff";
import AnalysisDiff from "./Refactoring/AnalysisDiff";

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
    <div className="h-[95%] bg-surface p-2 flex flex-col  gap-3">
      <AnalysisDiff />
      <RefactoringDiff />
    </div>
  );
};

export default Refactoring;
