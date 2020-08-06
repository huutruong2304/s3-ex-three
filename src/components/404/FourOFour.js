import React from "react";
import "./FourOFour.css";
import S3Link from "../UI/s3-link/S3Link";
const FourOFour = () => (
  <div className="FourOFour">
    <h1>Oops!</h1>
    <p>404 - Not found</p>
    <div className="BackHome">
      <S3Link name="Back to home" link="/" color="white"></S3Link>
    </div>
  </div>
);

export default FourOFour;
