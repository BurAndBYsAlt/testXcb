import {Schema, type} from '@colyseus/schema';

export class Card extends Schema {
  @type('string') public color: string;
  @type('string') public value: string;

  constructor(color: string, value: string) {
    super();
    this.color = color;
    this.value = value;
  }
}

export class GameState extends Schema {
  @type('array') public deck: Card[] = [];
  @type('array') public players: string[] = [];
  @type('number') public currentPlayerIndex: number = 0;
  @type('array') public discardPile: Card[] = [];

  constructor() {
    super();
    this.initializeDeck();
  }

  private initializeDeck() {
    const colors = ['red', 'green', 'blue', 'yellow'];
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2'];

    for (const color of colors) {
      for (const value of values) {
        this.deck.push(new Card(color, value));
      }
    }
    // Shuffle the deck
    this.deck.sort(() => Math.random() - 0.5);
  }

  public drawCard(): Card | null {
    return this.deck.length > 0 ? this.deck.pop() : null;
  }

  public playCard(card: Card) {
    this.discardPile.push(card);
  }
}