import React from "react";

const Button = (props) => {
  const { color, text, onClick } = props;
  return (
    <div
      className="buttonContainer"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
