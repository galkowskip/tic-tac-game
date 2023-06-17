import React from "react";
import { render } from "@testing-library/react";

import GameWidget from "./GameWidget.tsx";

test("renders game widget", () => {
  const { container } = render(<GameWidget />);

  const gameWidgetContainer = container.getElementsByClassName("game-widget");

  expect(gameWidgetContainer).toHaveLength(1);
});

test("renders start player", () => {
  const { container } = render(<GameWidget />);

  const currentPlayer = container.getElementsByClassName("game-widget")[0];
  const currentPlayerText =
    currentPlayer.getElementsByClassName("game-state")[0];

  expect(currentPlayerText).toHaveTextContent("Current player: X");
});

test("changes player on tile click", async () => {
  const { container } = render(<GameWidget />);

  const gameBoardContainer = container.getElementsByClassName("game-widget")[0];
  const gameTiles = gameBoardContainer.getElementsByClassName("tile");

  const tile = gameTiles[0] as HTMLElement;
  await tile.click();

  const currentPlayer = container.getElementsByClassName("game-widget")[0];
  const currentPlayerText =
    currentPlayer.getElementsByClassName("game-state")[0];

  expect(currentPlayerText).toHaveTextContent("Current player: O");
});

test("does not change player on tile click if tile is already clicked", async () => {
  const { container } = render(<GameWidget />);

  const gameBoardContainer = container.getElementsByClassName("game-widget")[0];
  const gameTiles = gameBoardContainer.getElementsByClassName("tile");

  const tile = gameTiles[0] as HTMLElement;
  await tile.click();

  const currentPlayer = container.getElementsByClassName("game-widget")[0];
  const currentPlayerText =
    currentPlayer.getElementsByClassName("game-state")[0];

  expect(currentPlayerText).toHaveTextContent("Current player: O");

  await tile.click();

  expect(currentPlayerText).toHaveTextContent("Current player: O");
});
