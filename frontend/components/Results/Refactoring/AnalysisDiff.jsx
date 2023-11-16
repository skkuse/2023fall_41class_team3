// TODO: backend에서
import React from "react";
const FootPrintDiff = ({ fromValue, toValue }) => {
  return <div></div>;
};
const EnergyNeedDiff = ({ fromValue, toValue }) => {
  return <div></div>;
};

const AnalysisDiff = () => {
  return (
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
  );
};

export default AnalysisDiff;
