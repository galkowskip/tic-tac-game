import React from "react";

import App from "./App.tsx";
import { render } from "@testing-library/react";

describe("App", () => {
  test("App", () => {
    const { container } = render(<App />);

    expect(container).toBeTruthy();
  });

  test("renders game widget", () => {
    const { container } = render(<App />);

    const gameWidgetContainer = container.getElementsByClassName("game-widget");

    expect(gameWidgetContainer).toHaveLength(1);
  });

  test("renders start player", () => {
    const { container } = render(<App />);

    const currentPlayer = container.getElementsByClassName("game-widget")[0];
    const currentPlayerText =
      currentPlayer.getElementsByClassName("game-state")[0];

    expect(currentPlayerText).toHaveTextContent("Current player: X");
  });
});
