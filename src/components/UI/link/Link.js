import React from "react";
import "./Link.css";

const Link = ({ link = "#", name = "link", color = "" }) => (
  <a className="Link" style={{ color: color }} href={link}>
    {name}
  </a>
);

export default Link;
