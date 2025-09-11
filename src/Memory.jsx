import { useState, useEffect} from "react";
import { Cards } from "./data/Cards";

function Memory() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // kaarten sorteren bij het opstarten van de memory game
  useEffect(() => {
  const shuffled = [...Cards].sort(() => Math.random() - 0.5);
  setCards(shuffled);
}, []);


// Wanneer er op een kaart geklikt wordt draait de kaart om...
  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card.id)) {
      setFlippedCards([...flippedCards, card.id]);
    }
  };


  // 2 seconden timer ingesteld bij opgedraaide kaarten
  useEffect(() => {
    if (flippedCards.length === 2) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards; 
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);
      if (firstCard.img === secondCard.img) {
        setMatchedCards([...matchedCards, firstId, secondId]);
        setFlippedCards([]);
      }
    }
  }, [flippedCards, cards, matchedCards]);


  return (
    <>

    <h1>Memory Game</h1>
    <div className="cards">
  {cards.map((card) => {
    const isFlipped = flippedCards.includes(card.id);
    const isMatched = matchedCards.includes(card.id);
    return (
      <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
      {(isFlipped || isMatched) ? (<img src={card.img} />) : (<p className="back"></p>)}
    
      </div>
    );
  })}
    </div>

    </>

  );
}

export default Memory;
