import axios from "axios";
import { Component } from "react";

const booksUrl = "http://localhost:3000/books";
const usersUrl = "http://localhost:3000/users";
const votesUrl = "http://localhost:3000/votes";
const archiveUrl = "http://localhost:3000/archive";
const datesUrl = "http://localhost:3000/dates";
const votedDatesUrl = "http://localhost:3000/voted-dates";

export class DbHandler extends Component {
  addUser = (user) => {
    let register = JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });

    axios
      .post(usersUrl, register, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  updateBook = (book, reduxFunc) => {
    let url = booksUrl + "/" + book.id;
    //console.log(url);
    axios
      .put(url, book, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        reduxFunc(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  addBook = (data, reduxFunc) => {
    let newBook = JSON.stringify({
      name: data.name,
      author: data.author,
      description: data.description,
      pages: data.pages,
      img: data.img,
    });

    axios
      .post(booksUrl, newBook, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        reduxFunc(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  addVote = (item, reduxFunc) => {
    let data = JSON.stringify({
      bookid: item.bookid,
      userid: item.userid,
      vote: item.vote,
    });

    axios
      .post(votesUrl, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        reduxFunc(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  addVotedDate = (item, reduxFunc) => {
    let data = JSON.stringify({
      id: item.id,
      dateid: item.dateid,
      userid: item.userid,
      vote: item.vote,
    });

    axios
      .post(votedDatesUrl, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        reduxFunc(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  addDate = (item, reduxFunc) => {
    let elem = JSON.stringify({
      date: item,
    });
    axios
      .post(datesUrl, elem, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        reduxFunc(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  addToArchive = (bookid, reduxFunc) => {
    let record = JSON.stringify({ bookid: bookid });
    axios
      .post(archiveUrl, record, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        reduxFunc(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
}
