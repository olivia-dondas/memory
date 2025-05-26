import React from "react";
import "./Card.css";

function Card({ id, colorValue, colorName, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`Card${isFlipped || isMatched ? " flipped" : ""}`}
      onClick={onClick}
    >
      <div className="Card-inner">
        <div className="Card-front"></div>

        <div className="Card-back">
          <div
            className="color-top"
            style={{ backgroundColor: colorValue }}
          ></div>
          <span className="color-name">
            {colorName.map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < colorName.length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
