import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import throttle from "lodash/throttle";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from "redux-logger";

import "../styles/main.scss";
import Navigation from "./navigation";
import { loadState, saveState } from "../utilities/persistance";

import items from '../reducers/items';
import item_search from '../reducers/item-search';
import formula_search from '../reducers/formula-search';
import loader from '../reducers/loader';
import styles from '../reducers/styles';
import user from '../reducers/user';

const Logger = createLogger({ collapsed: true });
const initialState = loadState();
const store = configureStore({
  reducer: { items, item_search, loader, user, styles, formula_search },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      actionCreatorCheck: false
    }).concat(Logger),
  devTools: true,
});

store.subscribe(
  throttle(() => {
    const state = store.getState();

    saveState(state);
  }, 1000)
);

const Layout = ({ children }) => (
  <Provider store={store}>
    <Navigation />
    <Container>{children}</Container>
  </Provider>
);

Layout.propTypes = {
  children: PropTypes.node,
};


export default Layout;
