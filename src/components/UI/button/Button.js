import React from "react";
import "./Button.css";

const Button = ({ name, clicked, disabled = false }) => {
  // const [terminate, setTerminate] = useState(false);

  const handleClick = (event) => {
    clicked(event);
    // setTerminate(false);
    // setTimeout(() => {
    //   setTerminate(false);
    // }, 2000);
  };

  return (
    <button
      className="Button"
      disabled={disabled}
      onClick={(event) => handleClick(event)}
    >
      {name}
    </button>
  );
};
export default Button;
