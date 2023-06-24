import React from "react";
import { Link } from "react-router-dom";
import "./style/Button.css";

export default function Button({ description, url }) {
  return (
    <div className="button-container">
      <Link to={url}>{description}</Link>
    </div>
  );
}