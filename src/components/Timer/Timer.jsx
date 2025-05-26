import React from "react";

const Timer = ({ time }) => {
  return (
    <div className="Timer">
      <span className="Timer-label">Time:</span>
      <span className="Timer-value">{time}</span>
    </div>
  );
};

export default Timer;
