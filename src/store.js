import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

const saveState = (state) => {
  if (
    state.books.length !== 0 ||
    state.votes.length !== 0 ||
    state.users.length !== 0 ||
    state.archive.length !== 0
  ) {
    localStorage.setItem("state", JSON.stringify(state));
  }
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
const initialState = getState();
const store = createStore(
  combineReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    books: store.getState().books,
    users: store.getState().users,
    votes: store.getState().votes,
    archive: store.getState().archive,
  });
});

export default store;
