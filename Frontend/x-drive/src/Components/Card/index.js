import React from "react";

import "./card.css";

const Card = (props) => {
  const { src, image } = props;

  console.log(src);
  return (
    // <div className="card">
    //   <img alt="" src={src} className="imgClass"></img>
    //   <div>{image}</div>
    // </div>
    <div className="card text-center" style={{width: '18rem'}}>
      <img src={src} class="card-img-top" alt=""></img>
      <div className="card-body">
        <h5 className="card-title">{image}</h5>
        <p className="card-text">The Details of the detected classes will be here</p>
        <a href="#" className="btn btn-primary" style={{width:'80%'}}>Annotate</a>
      </div>
    </div>
  );
};

export default Card;
