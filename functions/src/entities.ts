interface GameState {
    id: string;
    players: PlayerState[];
    board: BoardState;
    turn: number;
    winner: number;
  }

  interface PlayerState {
    id: string;
    name: string;
    color: string;
    score: number;
  }

  interface BoardState {
    board: [
      [number, number, number],
      [number, number, number],
      [number, number, number]
    ];
  }

export {GameState, PlayerState, BoardState};
