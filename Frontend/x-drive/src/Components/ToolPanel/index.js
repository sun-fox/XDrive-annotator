import React from "react";
import './index.css'

export default function ToolPanel() {
  return (
      <div>
        <div className="lsContainer">
            <div className="d-grid gap-2 col-10 mx-auto" >
                <button className="btn btn-success" style={{marginTop: '20px'}}>Generate Annotations</button>
                <button className="btn btn-warning">Scan Drive</button>
                <button className="btn btn-danger">Import DataSet</button>
                <button className="btn btn-info">Export Dataset</button>
            </div>
        </div>
      </div>
  );
};


