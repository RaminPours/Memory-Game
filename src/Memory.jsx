import { useState, useEffect } from "react";
import { Cards } from "./data/Cards";

function Memory() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
  const shuffled = [...Cards].sort(() => Math.random() - 0.5);
  setCards(shuffled);
}, []);


  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card.id)) {
      setFlippedCards([...flippedCards, card.id]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flippedCards]);


  return (
    <>
    <h1>Memory Game</h1>
    <div className="cards">
  {cards.map((card) => {
    const isFlipped = flippedCards.includes(card.id);
    return (
      <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
        {isFlipped ? (<img src={card.img} />) : (<div className="back"></div>)}
      </div>
    );
  })}
</div>
    </>

  );
}

export default Memory;
