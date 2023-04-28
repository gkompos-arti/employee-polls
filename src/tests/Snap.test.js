import * as React from 'react';
import { render } from '@testing-library/react';
import PageNotFound from '../components/PageNotFound';
import { connect } from "react-redux";
import Nav from '../components/Nav';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../store";
import {setAuthedUser} from "../actions/authedUser";


describe("Nav", () => {
  it("should render the component", () => {
      store.dispatch(setAuthedUser("sarahedo"));

      const component = render(
          <Provider store={store}>
              <BrowserRouter>
                  <PageNotFound/>
              </BrowserRouter>
          </Provider>
      );
      expect(component).toBeDefined();
      expect(component).toMatchSnapshot();
  });
});