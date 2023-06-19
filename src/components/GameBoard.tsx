import React from "react";

function gameBoard({
  gameState,
  setGameState,
  isWinner,
  setIsWinner,
  isDraw,
  setIsDraw,
  currentPlayer,
  toggleCurrentPlayer,
}): JSX.Element {
  function createGameBoard(): JSX.Element {
    const boardTiles = gameState.map(
      (column: string[] | Boolean[], columnIndex: number) => {
        return column.map((tile: string | Boolean, rowIndex: number) => {
          return (
            <div
              className={`
              tile ${typeof tile === "string" ? tile : ""}
              `}
              key={columnIndex + rowIndex}
              onClick={() => handleTileClick(columnIndex, rowIndex)}
            >
              {typeof tile === "string" ? tile : ""}
            </div>
          );
        });
      }
    );

    function handleTileClick(columnIndex: number, rowIndex: number) {
      if (
        isWinner ||
        isDraw ||
        typeof gameState[columnIndex][rowIndex] === "string"
      ) {
        return;
      }

      let newGameBoard = gameState;

      newGameBoard[columnIndex][rowIndex] = currentPlayer;
      setGameState(newGameBoard);

      if (checkDraw()) {
        setIsDraw(true);
      } else if (checkWinConditions()) {
        setIsWinner(true);
      } else {
        setIsWinner(false);
        toggleCurrentPlayer();
      }
    }

    function checkWinConditions(): boolean {
      return checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin();
    }

    function checkHorizontalWin(): boolean {
      const result = gameState.map((column: string[] | Boolean[]) => {
        if (column.every((tile: string | Boolean) => tile === currentPlayer)) {
          return true;
        } else {
          return false;
        }
      });

      return result.includes(true);
    }
    function checkVerticalWin(): boolean {
      const result = gameState.map(
        (column: string[] | Boolean[], columnIndex: number) => {
          if (
            column.every(
              (_, rowIndex: number) =>
                gameState[rowIndex][columnIndex] === currentPlayer
            )
          ) {
            return true;
          } else {
            return false;
          }
        }
      );

      return result.includes(true);
    }
    function checkDiagonalWin(): boolean {
      const diagonalRows = [
        [gameState[0][0], gameState[1][1], gameState[2][2]],
        [gameState[0][2], gameState[1][1], gameState[2][0]],
      ];

      const result = diagonalRows.map((row: (string | Boolean)[]) => {
        if (row.every((tile: string | Boolean) => tile === currentPlayer)) {
          return true;
        } else {
          return false;
        }
      });

      return result.includes(true);
    }

    function checkDraw(): boolean {
      return gameState.every((column: string[] | Boolean[]) => {
        return column.every((tile: string | Boolean) => {
          return typeof tile === "string";
        });
      });
    }

    return <div className="board">{boardTiles}</div>;
  }

  return (
    <div className={`${isDraw ? "draw" : ""} ${isWinner ? "winner" : ""}`}>
      {createGameBoard()}
    </div>
  );
}

export default gameBoard;
