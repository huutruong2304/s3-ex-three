import React from "react";
import "./FourOFour.css";
import Link from "../UI/link/Link";
const FourOFour = () => (
  <div className="FourOFour">
    <h1>Oops!</h1>
    <p>404 - Not found</p>
    <div className="BackHome">
      <Link name="Back to home" link="/" color="white"></Link>
    </div>
  </div>
);

export default FourOFour;
