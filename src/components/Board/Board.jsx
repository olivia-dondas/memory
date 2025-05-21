import React from "react";
import Card from "../Card/Card";
import "./Board.css";

function Board({ cards, onCardClick }) {
  return (
    <div className="Board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          colorValue={card.colorValue}
          colorName={card.colorName}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}

export default Board;
