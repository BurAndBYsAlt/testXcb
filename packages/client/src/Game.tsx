import * as React from 'react';
import {useAuthenticatedContext} from '../hooks/useAuthenticatedContext';

export function Game() {
  const {room} = useAuthenticatedContext();
  const [deck, setDeck] = React.useState([]);
  const [discardPile, setDiscardPile] = React.useState([]);

  React.useEffect(() => {
    room.onMessage('cardDrawn', (card) => {
      setDeck((prevDeck) => [...prevDeck, card]);
    });

    room.onMessage('cardPlayed', (card) => {
      setDiscardPile((prevPile) => [...prevPile, card]);
    });
  }, [room]);

  const drawCard = () => {
    room.send('draw');
  };

  const playCard = (card) => {
    room.send('playCard', card);
  };

  return (
    <div>
      <h1>Uno Game</h1>
      <button onClick={drawCard}>Draw Card</button>
      <div>
        <h2>Your Cards</h2>
        {deck.map((card, index) => (
          <div key={index} onClick={() => playCard(card)}>
            {card.color} {card.value}
          </div>
        ))}
      </div>
      <div>
        <h2>Discard Pile</h2>
        {discardPile.map((card, index) => (
          <div key={index}>
            {card.color} {card.value}
          </div>
        ))}
      </div>
    </div>
  );
}