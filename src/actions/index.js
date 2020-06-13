import {
  FETCH_BOOKS,
  FETCH_USERS,
  FETCH_VOTED_BOOKS,
  FETCH_ARCHIVE,
  FETCH_DATES,
  FETCH_VOTED_DATES,
  ADD_TO_ARCHIVE,
  ADD_NEW_USER,
  ADD_NEW_BOOK,
  UPDATE_BOOK,
  ADD_VOTE,
  ADD_DATE,
  ADD_VOTE_FOR_DATE,
} from "./types.js";
import axios from "axios";

const booksUrl = "http://localhost:3000/books";
const usersUrl = "http://localhost:3000/users";
const votesUrl = "http://localhost:3000/votes";
const archiveUrl = "http://localhost:3000/archive";
const datesUrl = "http://localhost:3000/dates";
const votedDatesUrl = "http://localhost:3000/voted-dates";

export const addUser = (data) => {
  return {
    type: ADD_NEW_USER,
    payload: {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
    },
  };
};

export const addVote = (data) => {
  return {
    type: ADD_VOTE,
    payload: {
      id: data.id,
      bookid: data.bookid,
      userid: data.userid,
      vote: data.vote,
    },
  };
};

export const addDate = (data) => {
  return {
    type: ADD_DATE,
    payload: {
      id: data.id,
      date: data.date,
    },
  };
};

export const addVotedDate = (data) => {
  return {
    type: ADD_VOTE_FOR_DATE,
    payload: {
      id: data.id,
      dateid: data.dateid,
      userid: data.userid,
      vote: data.vote,
    },
  };
};

export const addBook = (data) => {
  return {
    type: ADD_NEW_BOOK,
    payload: {
      id: data.id,
      name: data.name,
      author: data.author,
      description: data.description,
      pages: data.pages,
      img: data.img,
    },
  };
};

export const updateBook = (data) => {
  return {
    type: UPDATE_BOOK,
    payload: {
      id: data.id,
      name: data.name,
      author: data.author,
      description: data.description,
      pages: data.pages,
      img: data.img,
    },
  };
};

export const addToArchive = (data) => {
  return {
    type: ADD_TO_ARCHIVE,
    payload: {
      id: data.id,
      bookid: data.bookid,
    },
  };
};

// --- fetch data functions ---
export const fetchBooks = () => {
  return (dispatch) => {
    return axios
      .get(booksUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({
          type: FETCH_BOOKS,
          payload: data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    return axios
      .get(usersUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({
          type: FETCH_USERS,
          payload: data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const fetchVotes = () => {
  return (dispatch) => {
    return axios
      .get(votesUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({
          type: FETCH_VOTED_BOOKS,
          payload: data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const fetchArchive = () => {
  return (dispatch) => {
    return axios
      .get(archiveUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({
          type: FETCH_ARCHIVE,
          payload: data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const fetchDates = () => {
  return (dispatch) => {
    return axios
      .get(datesUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({
          type: FETCH_DATES,
          payload: data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const fetchVotedDates = () => {
  return (dispatch) => {
    return axios
      .get(votedDatesUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({
          type: FETCH_VOTED_DATES,
          payload: data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};
