import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import "./index.css";
import App from "./components/App";
import {store} from './store';
import { Provider } from 'react-redux';

import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
