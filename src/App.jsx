import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import Button from "./components/Button/Button";
//import Timer from "./components/Timer/Timer";
import "./App.css";

const pantoneColorList = [
  { nameParts: ["PANTONE", "13-1520", "Rose Quartz"], value: "#F7CACA" },
  { nameParts: ["PANTONE", "13-0647", "Illuminating"], value: "#F6EB61" },
  { nameParts: ["PANTONE", "19-4052", "Classic Blue"], value: "#0F4C81" },
  { nameParts: ["PANTONE", "16-1546", "Living Coral"], value: "#FF6F61" },
  { nameParts: ["PANTONE", "14-0852", "Spectra Yellow"], value: "#FFC20E" },
  { nameParts: ["PANTONE", "18-3838", "Ultra Violet"], value: "#5F4B8B" },
];
const initializeCards = () => {
  const allCards = [];
  let idCounter = 1;
  pantoneColorList.forEach((color) => {
    allCards.push({
      id: idCounter++,
      colorName: color.nameParts,
      colorValue: color.value,
      isFlipped: false,
      isMatched: false,
    });
    allCards.push({
      id: idCounter++,
      colorName: color.nameParts,
      colorValue: color.value,
      isFlipped: false,
      isMatched: false,
    });
  });
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }
  return allCards;
};

function App() {
  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [canFlip, setCanFlip] = useState(true);
  const [moves, setMoves] = useState(0);

  // Handle card click
  const handleCardClick = (clickedCardId) => {
    if (!canFlip) return;
    const clickedCard = cards.find((card) => card.id === clickedCardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;
    if (flippedCards.length === 2) return;

    setMoves((prev) => prev + 1);

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCardId ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, clickedCardId]);
  };

  // Check for match when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlip(false);
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (
        firstCard &&
        secondCard &&
        firstCard.colorValue === secondCard.colorValue
      ) {
        // Match!
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setFlippedCards([]);
          setCanFlip(true);
        }, 800);
      } else {
        // Not a match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMatchedPairs(0);
    setCanFlip(true);
    setMoves(0); // Réinitialiser les coups
  };

  useEffect(() => {
    if (
      pantoneColorList.length > 0 &&
      matchedPairs === pantoneColorList.length
    ) {
      setTimeout(() => {
        alert(`Bravo ! Terminé en ${moves} coups.`);
      }, 500);
    }
  }, [matchedPairs, moves, pantoneColorList.length]);

  return (
    <div className="App">
      <h1>
        <span
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "24px",
          }}
        >
          Pantone
          <sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>
            ®
          </sup>{" "}
          MEMORY
        </span>
      </h1>
      <Board cards={cards} onCardClick={handleCardClick} />
      <div className="game-info">
        <p>Coups : {moves}</p>
        <p>
          Paires trouvées : {matchedPairs} / {pantoneColorList.length}
        </p>
        {/* Utilisation du composant Button ici */}
        <Button onClick={resetGame}>Recommencer</Button>
      </div>
    </div>
  );
}

export default App;
