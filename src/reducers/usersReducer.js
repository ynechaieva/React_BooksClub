import { FETCH_USERS, ADD_NEW_USER, ACTIVE_USER } from "../actions/types";

export function usersReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return [...action.payload];
    case ADD_NEW_USER:
      return [...state, action.payload];
    default:
      return state;
  }
}
