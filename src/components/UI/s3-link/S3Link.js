import React from "react";
import "./S3Link.css";
import { Link } from "react-router-dom";

const S3Link = ({ link = "#", name = "link", color = "" }) => (
  <Link className="Link" style={{ color: color }} to={link}>
    {name}
  </Link>
);

export default S3Link;
