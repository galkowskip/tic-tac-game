import React from "react";
import { render } from "@testing-library/react";

import ProfileFloatingActionButton from "./ProfileFloatingActionButton.tsx";

import { AuthContext } from "../../contexts.ts";

describe("ProfileFloatingActionButton", () => {
  test("renders profile floating action button", () => {
    const { container } = render(
      <AuthContext.Provider value={{ user: {} }}>
        <ProfileFloatingActionButton />
      </AuthContext.Provider>
    );

    const profileFloatingActionButtonContainer =
      container.getElementsByClassName("floating-action-button");

    expect(profileFloatingActionButtonContainer).toHaveLength(1);
  });

  test("renders login button if user is not logged in", () => {
    const { container } = render(
      <AuthContext.Provider value={null}>
        <ProfileFloatingActionButton />
      </AuthContext.Provider>
    );

    const profileFloatingActionButtonContainer =
      container.getElementsByClassName("floating-action-button");
    const loginButton =
      profileFloatingActionButtonContainer[0].getElementsByTagName("button")[0];

    expect(loginButton).toHaveTextContent("Login");
  });

  test("renders logout button if user is logged in", () => {
    const { container } = render(
      <AuthContext.Provider value={{ user: {} }}>
        <ProfileFloatingActionButton />
      </AuthContext.Provider>
    );
    const profileFloatingActionButtonContainer =
      container.getElementsByClassName("floating-action-button");

    const logoutButton =
      profileFloatingActionButtonContainer[0].getElementsByTagName("button")[0];

    expect(logoutButton).toHaveTextContent("Logout");
  });
});
