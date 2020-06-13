import { FETCH_BOOKS, ADD_NEW_BOOK, UPDATE_BOOK } from "../actions/types";

export function booksReducer(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return [...action.payload];
    case ADD_NEW_BOOK:
      return [...state, action.payload];
    case UPDATE_BOOK:
      let updatedState = state.map((book) => {
        if (book.id === action.payload.id) {
          book = action.payload;
          return book;
        } else return book;
      });
      return updatedState;
    default:
      return state;
  }
}
