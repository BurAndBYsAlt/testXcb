import {Room, Client} from 'colyseus';
import {GameState} from '../entities/GameState';

export class GameRoom extends Room<GameState> {
  onCreate() {
    this.setState(new GameState());

    this.onMessage('draw', (client) => {
      const card = this.state.drawCard();
      if (card) {
        // Send the card to the client
        client.send('cardDrawn', card);
      }
    });

    this.onMessage('playCard', (client, card) => {
      this.state.playCard(card);
      // Notify other clients
      this.broadcast('cardPlayed', card);
    });
  }

  onJoin(client: Client) {
    this.state.players.push(client.sessionId);
  }

  onLeave(client: Client) {
    this.state.players = this.state.players.filter(player => player !== client.sessionId);
  }
}