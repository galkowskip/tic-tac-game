import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  const { container } = render(<App />);

  const appContainer = container.getElementsByClassName("App");

  expect(appContainer).toHaveLength(1);
});
