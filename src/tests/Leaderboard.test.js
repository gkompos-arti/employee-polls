import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {Provider} from "react-redux";
import {store} from "../store";
import {BrowserRouter} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";
import '@testing-library/jest-dom';
import { handleInitialData } from '../actions/shared';
import Leaderboard from '../components/Leaderboard';

describe("Leaderboard", () => {
    it("should show the Leaderboard with all the info ", () => {
        store.dispatch(setAuthedUser("mtsamis"));
        store.dispatch(handleInitialData());
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Leaderboard/>
                </BrowserRouter>
            </Provider>
        );
        const usersCol = component.getByTestId('users-column');
        const answerCol = component.getByTestId('answer-column');
        const createdCol = component.getByTestId('created-column');

        expect(usersCol).toBeInTheDocument();
        expect(answerCol).toBeInTheDocument();
        expect(createdCol).toBeInTheDocument();
    });

});