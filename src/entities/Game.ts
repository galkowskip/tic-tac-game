interface GameState {
  id: String;
  players: PlayerState[];
  board: BoardState;
  turn: Number;
  winner: Number;
}

interface PlayerState {
  id: String;
  name: string;
  color: string;
  score: Number;
}

interface BoardState {
  board: [
    [Number, Number, Number],
    [Number, Number, Number],
    [Number, Number, Number]
  ];
}

export { GameState, PlayerState, BoardState };
