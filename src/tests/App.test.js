import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import App from '../components/App';
import {Provider} from "react-redux";
import {store} from "../store";
import {BrowserRouter} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";
import '@testing-library/jest-dom';

describe("App", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

});