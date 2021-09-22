import React from "react";
import LeftSide from "../LeftSide";
import RightSide from "../RightSide";

import "./datasetExplorer.css";

export default function DataSetExplorer() {
  return (
    <div className="appContainer">
    <div className="l3">
      <LeftSide />
    </div>
    <div className="l7">
      <RightSide />
    </div>
  </div>
  );
};


