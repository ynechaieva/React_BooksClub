import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";
import { fetchUsers, fetchBooks, fetchVotes, fetchArchive } from "./actions";

const saveState = (state) => {
  // if (state.users.length !== 0) {
  //   localStorage.setItem("state", JSON.stringify(state));
  // }
  localStorage.setItem("state", JSON.stringify(state));
};

const getState = () => {
  try {
    const s = localStorage.getItem("state");

    if (s === null) return undefined;
    return JSON.parse(s);
  } catch (e) {
    return undefined;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const initialState = getState();
const store = createStore(
  combineReducers,
  [],
  composeEnhancers(applyMiddleware(thunk))
);

//store.dispatch(fetchUsers());
store.dispatch(fetchBooks());
//store.dispatch(fetchVotes());
//store.dispatch(fetchArchive());

store.subscribe(() => {
  saveState(
    store.getState()
    // {
    //   //users: store.getState().users,
    //   //books: store.getState().books,
    //   votes: store.getState().votes,
    //   archive: store.getState().archive,
    // }
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
