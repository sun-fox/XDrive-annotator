import React, {useState, useEffect} from "react";
// import { data } from "../../data";
import Card from "../Card";

import "./rightSide.css";
export default function RightSide() {
  const [data,setData]= useState()
  useEffect(() => {
    fetch('http://localhost:4000/get_images').then((data)=>{return data.json()}).then((data)=>{
      // data.forEach(element => {
      //   element.replace("\\","/")
      // });
      console.log("Incoming Data", data)
      setData(data)
    })
  }, [])
  return (
    <div className="rsContainer" style={{marginBottom:'10px'}}>
      <div className="rsContainerTop" style={{backgroundColor:'rgb(66, 65, 65)'}}>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Images</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Exports</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Members</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Statistics</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Settings</a>
          </li>
        </ul>
      </div>
      <div className="rsImageContainer" style={{marginTop:'10px'}}>
        {data?.map((singleData) => {
          return (
            <Card
              src={singleData}
              key={singleData.split('.')[1]}
              image={singleData}
            />
          );
        })}
      </div>
    </div>
  );
}
