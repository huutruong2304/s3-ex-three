import React from "react";
import "./Button.css";

const Button = ({ name, clicked, disabled = false }) => (
  <button
    className="Button"
    disabled={disabled}
    onClick={(event) => clicked(event)}
  >
    {name}
  </button>
);

export default Button;
