import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Thunk from "redux-thunk";
import throttle from "lodash/throttle";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

import Navigation from "./navigation";
import fb from "../utilities/firebase-mock";
import rootReducer from "../reducers/root";
import { loadState, saveState } from "../utilities/persistance";

const Logger = createLogger({ collapsed: true });
const enhancer = composeWithDevTools(applyMiddleware(Thunk, Logger));
const initialState = loadState();
const store = createStore(rootReducer, initialState, enhancer);
store.subscribe(
  throttle(() => {
    const state = store.getState();

    saveState(state);
  }, 1000)
);

if (typeof firebase === "undefined") {
  window.firebase = fb;
}

const Layout = ({ children }) => (
  <Provider store={store}>
    <Navigation />
    <Container>{children}</Container>
  </Provider>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {};

export default Layout;
