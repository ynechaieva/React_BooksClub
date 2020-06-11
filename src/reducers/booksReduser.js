import { FETCH_BOOKS, ADD_NEW_BOOK } from "../actions/types";

export function booksReducer(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return [...action.payload];
    case ADD_NEW_BOOK:
      return [...state, action.payload];
    default:
      return state;
  }
}
