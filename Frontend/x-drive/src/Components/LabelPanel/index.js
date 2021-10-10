import React from "react";
import './index.css'

export default function LabelPanel(props) {
  let {data} = props
  if(data)
    data = JSON.parse(data)
    console.log("LABEL-PANEL-dot", data)
    console.log("LABEL-PANEL-dot", data?.data)
    console.log("LABEL-PANEL-dot", data?.detects)
  
  if(data)
    console.log("LABEL-PANEL-dict", data["detects"])
  return (
      <div>
        <h1><em>LABEL-PANEL</em></h1>
        <ul className="main1">
          <li className="liststy">
            Detected Classes:
            <ul className="l3">
              {data?.data?.detects?.map((singleData) => {
              return (
                <li className="js2">{singleData.Object[0]} - {Math.round(singleData.Confidence[0]*100)}%</li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
  );
};


