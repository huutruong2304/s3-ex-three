import React from "react";
import "./Alert.css";

const Alert = ({ message, alertType }) => {
  const alertClasses = ["Alert"];
  switch (alertType) {
    case "error":
      alertClasses.push("Error");
      break;
    case "success":
      alertClasses.push("Success");
      break;
    default:
      break;
  }
  return <p className={alertClasses.join(" ")}>{"- " + message}</p>;
};

export default Alert;
