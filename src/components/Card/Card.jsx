import React from "react";
import "./Card.css";

function Card({ colorValue, colorName, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`Card${isFlipped || isMatched ? " flipped" : ""}`}
      onClick={onClick}
    >
      <div className="Card-inner">
        <div className="Card-front"></div>
        <div className="Card-back" style={{ backgroundColor: colorValue }}>
          <span className="color-name">{colorName}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
