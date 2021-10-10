import React from "react";
import LeftSide from "../LeftSide";
import RightSide from "../RightSide";

import "./datasetExplorer.css";

export default function DataSetExplorer() {
  return (
    <div className="appContainer">
    <div className="l2">
      <LeftSide />
    </div>
    <div className="l8">
      <RightSide />
    </div>
  </div>
  );
};


