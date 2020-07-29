import React from "react";
import "./Input.css";
import Alert from "../alert/Alert";

const Input = (props) => {
  let inputElement = null;
  let alertElement = null;
  const inputClasses = ["Input"];

  if (props.touched) {
    if (props.isValid) {
      inputClasses.push("Valid");
    } else {
      inputClasses.push("Invalid");
    }
  }

  if (props.errors) {
    alertElement = props.errors.map((err, id) => {
      return <Alert key={id} alertType="error" message={err}></Alert>;
    });
  }

  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          // onClick={props.clicked}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          // onClick={props.clicked}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          // onClick={props.clicked}
        />
      );
      break;
  }
  return (
    <div>
      {inputElement}
      {alertElement}
    </div>
  );
};

export default Input;
