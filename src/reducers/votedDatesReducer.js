import { FETCH_VOTED_DATES, ADD_VOTED_DATE } from "../actions/types";

export function votesDatesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_VOTED_DATES:
      return [...action.payload];
    case ADD_VOTED_DATE:
      return [...state, action.payload];
    default:
      return state;
  }
}
