import React from "react";
import "./Button.css";

function Button({ onClick, children, className = "" }) {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
