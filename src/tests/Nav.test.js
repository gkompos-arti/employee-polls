import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {Provider} from "react-redux";
import {store} from "../store";
import {BrowserRouter} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";
import '@testing-library/jest-dom';
import Nav from '../components/Nav';
import { handleInitialData } from '../actions/shared';

describe("Nav", () => {
    it("should show the nav with all the links ", () => {
        store.dispatch(setAuthedUser("mtsamis"));
        store.dispatch(handleInitialData());
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Nav/>
                </BrowserRouter>
            </Provider>
        );
        const home = component.getByTestId('home-link');
        const leaderboard = component.getByTestId('leaderboard-link');
        const add = component.getByTestId('add-link');
        const userInfo = component.getByTestId('user-information');
        const logout = component.getByTestId('logout-link');
        expect(home).toBeInTheDocument();
        expect(leaderboard).toBeInTheDocument();
        expect(add).toBeInTheDocument();
        expect(userInfo).toBeInTheDocument();
        expect(logout).toBeInTheDocument();
    });

});