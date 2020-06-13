import { FETCH_VOTED_DATES, ADD_VOTE_FOR_DATE } from "../actions/types";

export function votesDatesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_VOTED_DATES:
      return [...action.payload];
    case ADD_VOTE_FOR_DATE:
      return [...state, action.payload];
    default:
      return state;
  }
}
