import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom';
import React from "react";
import Login from "../components/Login";


describe("Login", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('renders the dropdown and submit button', () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        // Get the dropdown and submit button by their data-testid attributes
        const dropdown = component.getByTestId('username');
        const submitButton = component.getByTestId('login');
    
        // Assert that the dropdown and submit button are both in the document
        expect(dropdown).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
      });

      it('the login button must unlock', () => {

        const wrapper = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        
        const loginHeadingElement = wrapper.getByTestId("loginPage");
        const userSelectElement = wrapper.getByTestId("select-user");
        // const select = userSelectElement.childNodes[1]
        const loginButtonElement = wrapper.getByTestId("login");


        expect(loginButtonElement).toBeInTheDocument();
        expect(userSelectElement).toBeInTheDocument();
        expect(loginButtonElement).toBeInTheDocument();

        fireEvent.select(userSelectElement, {target: {value: "sarahedo"}});
        
        expect(loginButtonElement).toBeDisabled(false);
    });
});