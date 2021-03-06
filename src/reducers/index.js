import { combineReducers } from "redux";
import { booksReducer } from "./booksReduser";
import { archiveReducer } from "./archiveReducer";
import { usersReducer } from "./usersReducer";
import { votesReducer } from "./votesReducer";
import { datesReducer } from "./datesReducer";
import { votesDatesReducer } from "./votedDatesReducer";

export default combineReducers({
  users: usersReducer,
  books: booksReducer,
  votes: votesReducer,
  archive: archiveReducer,
  dates: datesReducer,
  votedDates: votesDatesReducer,
});
