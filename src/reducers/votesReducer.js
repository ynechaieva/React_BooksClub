import { FETCH_VOTES, ADD_VOTE } from "../actions/types";

export function votesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_VOTES:
      return [...action.payload];
    case ADD_VOTE:
      return [...state, action.payload];
    default:
      return state;
  }
}
