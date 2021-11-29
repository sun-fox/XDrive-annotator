import React from "react";
import {useHistory} from "react-router-dom"

import "./card.css";

const Card = (props) => {
  const { src, image } = props;
  const history = useHistory();
  // console.log(history.location.pathname.split('/')[2])
  let dat_name = history.location.pathname.split('/')[2]
  const ClickHandler=()=>{
    history.push({pathname:'/annotate', state:{src,dat_name}})
    console.log(src)
  }

  const ClickHandlerNew=()=>{
    history.push({pathname:'/label', state:{src}})
    console.log("Path to Image File:",src)
  }

  // console.log(src);
  return (
    <div className="card text-center" style={{width: '18rem', marginBottom: '5px'}}>
      <img src={src} class="card-img-top" alt=""></img>
      <div className="card-body">
        <h5 className="card-title">{image.split("\\")[3]}</h5>
        <p className="card-text">The Details of the detected classes will be here</p>
        <div className="btn btn-primary" style={{width:'80%'}} onClick={ClickHandler}>Auto-Annotate</div>
        <div className="btn btn-success" style={{width:'80%', marginTop:'5px'}} onClick={ClickHandlerNew}>Label</div>
      </div>
    </div>
  );
};

export default Card;
