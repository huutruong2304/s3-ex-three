import React from "react";
import "./Link.css";

const Link = ({ link = "#", name = "link" }) => <a href={link}>{name}</a>;

export default Link;
