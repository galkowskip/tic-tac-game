import React from "react";
// import LineCanvas from "./LineCanvas.tsx";
import GameBoard from "./GameBoard.tsx";

import "./GameWidget.scss";

function GameWidget() {
  const [gameState, setGameState] = React.useState<string[][] | Boolean[][]>([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
  const [currentPlayer, setCurrentPlayer] = React.useState<string>("X");
  const [isWinner, setIsWinner] = React.useState<Boolean>(false);
  const [isDraw, setIsDraw] = React.useState<Boolean>(false);

  function toggleCurrentPlayer(): void {
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
  }

  function currentGameState(): JSX.Element {
    if (isWinner) {
      return <span>Winner is {currentPlayer}</span>;
    } else if (isDraw) {
      return <span>Draw</span>;
    } else {
      return <span>Current player: {currentPlayer}</span>;
    }
  }

  return (
    <div className="game-widget">
      <h1>Game Widget</h1>
      <p className="game-state">{currentGameState()}</p>
      <GameBoard
        gameState={gameState}
        setGameState={setGameState}
        isWinner={isWinner}
        setIsWinner={setIsWinner}
        isDraw={isDraw}
        setIsDraw={setIsDraw}
        currentPlayer={currentPlayer}
        toggleCurrentPlayer={toggleCurrentPlayer}
      />
    </div>
  );
}

export default GameWidget;
