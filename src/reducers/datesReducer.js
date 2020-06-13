import { FETCH_DATES, ADD_DATE } from "../actions/types";

export function datesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_DATES:
      return [...action.payload];
    case ADD_DATE:
      return [...state, action.payload];
    default:
      return state;
  }
}
