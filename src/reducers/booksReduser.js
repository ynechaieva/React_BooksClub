import { FETCH_BOOKS } from "../actions/types";

export function booksReducer(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return [...action.payload];
    default:
      return state;
  }
}
