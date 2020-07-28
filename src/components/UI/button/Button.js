import React from "react";
import "./Button.css";

const Button = ({ name, clicked }) => (
  <button onClick={() => clicked()}>{name}</button>
);

export default Button;
