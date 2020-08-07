import React, { useState, useEffect } from "react";
import "./Button.css";

const Button = ({ name, clicked, disabled = false }) => {
  const [terminate, setTerminate] = useState(false);

  const terminateButton = (time) => {
    setTimeout(() => {
      setTerminate(false);
    }, time);
  };

  useEffect(() => {
    let timer = terminateButton(2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (event) => {
    clicked(event);
    setTerminate(true);
  };

  return (
    <button
      className="Button"
      disabled={disabled || terminate}
      onClick={(event) => handleClick(event)}
    >
      {name}
    </button>
  );
};
export default Button;
