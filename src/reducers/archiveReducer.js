import { ADD_TO_ARCHIVE, FETCH_ARCHIVE } from "../actions/types";

export function archiveReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ARCHIVE:
      return [...action.payload];
    case ADD_TO_ARCHIVE:
      return [...state, action.payload];
    default:
      return state;
  }
}
