import React from "react";
import LeftSide from "../LeftSide";
import "./index.css";

export default function Wrapper(props) {
  return (
    <div className="appContainer">
    <div className="l2">
      <LeftSide />
    </div>
    <div className="l8">
        {props.children}
    </div>
  </div>
  );
};


