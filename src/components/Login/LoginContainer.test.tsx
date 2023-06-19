import React from "react";
import { render } from "@testing-library/react";

import LoginContainer from "./LoginContainer";

describe("LoginContainer", () => {


    let wrapper;
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => { });

        wrapper = render(<LoginContainer />);
    });
    it("should render", () => {
        expect(wrapper).toBeTruthy();

    });

    it("should render a form", () => {
        const form = wrapper.container.querySelector("form");

        expect(form).toBeTruthy();
    })

    it("should render a email input", () => {
        const emailInput = wrapper.container.querySelector("#email");

        expect(emailInput).toBeTruthy();
    })

    it("should render a password input", () => {
        const passwordInput = wrapper.container.querySelector("#password");

        expect(passwordInput).toBeTruthy();
    })

    it("should render a login button", () => {
        const loginButton = wrapper.container.querySelector("button");

        expect(loginButton).toBeTruthy();
    })

    it("should render a google button", () => {
        const googleButton = wrapper.container.querySelector(".o-auth-provider");

        expect(googleButton).toBeTruthy();
    })

    it("should render a facebook button", () => {
        const facebookButton = wrapper.container.querySelector(".o-auth-provider");

        expect(facebookButton).toBeTruthy();
    })

    it("should render a twitter button", () => {
        const twitterButton = wrapper.container.querySelector(".o-auth-provider");

        expect(twitterButton).toBeTruthy();
    })

    it("should render a login header", () => {
        const loginHeader = wrapper.container.querySelector("h3");

        expect(loginHeader).toBeTruthy();
    })

    it("should render a login header with text 'Login'", () => {
        const loginHeader = wrapper.container.querySelector("h3");

        expect(loginHeader.textContent).toBe("Login");
    })

    
});