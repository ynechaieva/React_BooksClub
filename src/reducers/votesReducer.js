import { FETCH_VOTED_BOOKS, ADD_VOTE } from "../actions/types";

export function votesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_VOTED_BOOKS:
      return [...action.payload];
    case ADD_VOTE:
      return [...state, action.payload];
    default:
      return state;
  }
}
