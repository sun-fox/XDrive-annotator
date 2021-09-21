import React from "react";
import Button from "../Button";

import "./leftSide.css";
export default function LeftSide() {
  const onGenerateClick = () => {
    console.log("hello");
  };

  return (
    <div className="lsContainer">
      {/* <div>Helo world</div>
      <div onClick={onGenerateClick}>generate</div>
      <div>Helo world</div>
      <div onClick={onGenerateClick}>generate</div>
      <div>Helo world</div>
      <div onClick={onGenerateClick}>generate</div> */}
      <div className="d-grid gap-2 col-10 mx-auto" >
        <button className="btn btn-success btn-lg" style={{marginTop: '20px'}}>Generate Annotations</button>
        <button className="btn btn-warning btn-lg">Scan Drive</button>
        <button className="btn btn-danger btn-lg">Import DataSet</button>
        <button className="btn btn-info btn-lg">Export Dataset</button>
      </div>
      
      {/* <Button text="Generate" color="green" onClick={onGenerateClick} />
      <Button text="Scan" color="purple" onClick={onGenerateClick} />
      <Button text="Import" color="purple" onClick={onGenerateClick} />
      <Button text="Export" color="purple" onClick={onGenerateClick} /> */}
    </div>
  );
}
