import React from "react";
import {useHistory} from "react-router-dom"

import "./card.css";

const Card = (props) => {
  const { src, image } = props;
  const history = useHistory();
  const ClickHandler=()=>{
    history.push({pathname:'/annotate', state:{src}})
    console.log(src)
  }

  // console.log(src);
  return (
    <div className="card text-center" style={{width: '18rem', marginBottom: '5px'}}>
      <img src={src} class="card-img-top" alt=""></img>
      <div className="card-body">
        <h5 className="card-title">{image}</h5>
        <p className="card-text">The Details of the detected classes will be here</p>
        <div className="btn btn-primary" style={{width:'80%'}} onClick={ClickHandler}>Annotate</div>
      </div>
    </div>
  );
};

export default Card;
