import React from "react";
import {useHistory} from "react-router-dom"

import "./card.css";

const Card = (props) => {
  const { src, image, detects } = props;
  const history = useHistory();

  console.log(detects);
  return (
    <div className="card text-center" style={{width: '18rem', marginBottom: '5px'}}>
      <img src={src} class="card-img-top" alt=""></img>
      <div className="card-body">
        <h5 className="card-title">{image.split("\\")[3]}</h5>
        <p className="card-text">The Details of the detected classes will be here</p>
        <p>{JSON.stringify(detects)}</p>
        <div id="here">
          { (detects)=>{Object.keys(detects).forEach(function(key) {
            console.log(key + " " + detects[key]);
            return(<p>{key} - {detects[key]}</p>) 
            })
          }}

          { (detects)=>{Object.keys(detects).map(function(key,index) {
            console.log(key + " " + detects[key]);
            return(<p>{key} - {detects[key]}</p>)
            })
          }}
        </div>
      </div>
    </div>
  );
};

export default Card;
