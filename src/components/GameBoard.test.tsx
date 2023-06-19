import React from "react";
import { render } from "@testing-library/react";

import GameBoard from "./GameBoard.tsx";

let gameState = [[], [], []];
let setGameState = (value) => {
  gameState = value;
};

let isWinner = false;
let setIsWinner = (value) => {
  isWinner = value;
};

let isDraw = false;
let setIsDraw = (value) => {
  isDraw = value;
};

let currentPlayer = "X";
let toggleCurrentPlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

function renderGameBoard() {
  return (
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
  );
}
describe("GameBoard", () => {
  beforeEach(() => {
    setGameState([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);

    setIsWinner(false);
    setIsDraw(false);
    currentPlayer = "X";
  });

  test("renders game board", () => {
    const { container } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");

    expect(gameTiles).toHaveLength(9);

    const tiles = Array.from(gameTiles);
    tiles.forEach((tile) => {
      expect(tile).toHaveTextContent("");
    });
  });

  test("renders game board with X and O", async () => {
    setGameState([
      ["X", false, false],
      [false, false, false],
      [false, false, "O"],
    ]);

    const { container } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");

    expect(gameTiles).toHaveLength(9);

    const tiles = Array.from(gameTiles);
    expect(tiles[0]).toHaveTextContent("X");
    expect(tiles[8]).toHaveTextContent("O");
  });

  test("handles tile click", async () => {
    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");

    const tile = gameTiles[0] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("X");
  });

  test("does not handle tile click if tile is already clicked", async () => {
    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");

    const tile = gameTiles[0] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("X");

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("X");
  });

  test("does not handle tile click if there is a winner", async () => {
    setIsWinner(true);

    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");
    const tile = gameTiles[0] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("");
  });

  test("does not handle tile click if there is a draw", async () => {
    setIsDraw(true);

    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");
    const tile = gameTiles[0] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("");
  });

  test("checks for draw", async () => {
    setGameState([
      [false, "O", "X"],
      ["O", "X", "O"],
      ["O", "X", "O"],
    ]);

    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");
    const tile = gameTiles[0] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("X");

    expect(isDraw).toBe(true);
    expect(isWinner).toBe(false);

    const draw = container.getElementsByClassName("draw");
    expect(draw).toHaveLength(1);
  });

  test("checks for horizontal winner", async () => {
    setGameState([
      [false, "X", "X"],
      [false, false, false],
      [false, false, false],
    ]);

    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");
    const tile = gameTiles[0] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("X");

    expect(isDraw).toBe(false);
    expect(isWinner).toBe(true);

    const winner = container.getElementsByClassName("winner");
    expect(winner).toHaveLength(1);
  });

  test("checks for vertical winner", async () => {
    setGameState([
      [false, false, "X"],
      [false, false, "X"],
      [false, false, false],
    ]);

    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");
    const tile = gameTiles[8] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("X");
    expect(isDraw).toBe(false);
    expect(isWinner).toBe(true);
    const winner = container.getElementsByClassName("winner");
    expect(winner).toHaveLength(1);
  });

  test("checks for diagonal winner", async () => {
    setGameState([
      ["X", false, false],
      [false, "X", false],
      [false, false, false],
    ]);

    const { container, rerender } = render(renderGameBoard());

    const gameTiles = container.getElementsByClassName("tile");
    const tile = gameTiles[8] as HTMLElement;

    await tile.click();

    rerender(renderGameBoard());

    expect(tile).toHaveTextContent("X");
    expect(isDraw).toBe(false);
    expect(isWinner).toBe(true);
    const winner = container.getElementsByClassName("winner");
    expect(winner).toHaveLength(1);
  });
});
