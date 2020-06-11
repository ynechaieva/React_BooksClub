import React, { Component } from "react";
import "../index.scss";
import { connect } from "react-redux";
import Book from "../components/books/book";
import { FormContainer } from "../components/books/modal/form-container";
import {
  addToArchive,
  addBook,
  fetchBooks,
  fetchVotes,
  fetchArchive,
} from "../actions";
import "./home.scss";
import { DbHandler } from "../dbHandler";
import book_img from "../img/open-book.png";

const db = new DbHandler();
const triggerText = "add book";
const bookUpdate = "add book";
const mapStateToProps = (state) => {
  return {
    books: state.books,
    votes: state.votes,
    archive: state.archive,
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchBooks());
    this.props.dispatch(fetchVotes());
    this.props.dispatch(fetchArchive());
  }

  handleArchive = (book) => {
    db.addToArchive(book, (dbItem) =>
      this.props.dispatch(addToArchive(dbItem))
    );
    alert("book is added to archive");
  };

  onSubmit = (event) => {
    event.preventDefault(event);
    let newBook = {
      name: event.target.name.value,
      author: event.target.author.value,
      description: event.target.description.value,
      pages: event.target.pages.value,
      img: "",
    };
    console.log(newBook);
  };

  onEdit = (event) => {
    event.preventDefault(event);
    let newBook = {
      name: event.target.name.value,
      author: event.target.author.value,
      description: event.target.description.value,
      pages: event.target.pages.value,
      img: "",
    };
    console.log(newBook);
  };

  getNotArchived = () => {
    let activeBooks = this.props.books.filter((book) => {
      if (
        this.props.archive.filter((elem) => elem.bookid === book.id).length > 0
      ) {
        return false;
      } else {
        return true;
      }
    });

    return activeBooks;
  };

  getRate = (book) => {
    let bookVotes = this.props.votes.filter((elem) => {
      return elem.bookid === book.id;
    });

    if (bookVotes.length > 0) {
      return bookVotes.reduce((sum, next) => {
        return (sum += next.vote);
      }, 0);
    } else {
      return "not voted";
    }
  };

  render() {
    const books_list = this.getNotArchived();
    return (
      <div className="home-page">
        <FormContainer
          triggerText={triggerText}
          onSubmit={this.onSubmit}
          book={{ name: "", author: "", description: "", pages: "", img: "" }}
          isShown={false}
        />
        <ul>
          {books_list.map((elem) => {
            return (
              <>
                <li key={elem.id} id={elem.id} className="book-item">
                  <div className="book-image">
                    <img src={book_img} alt="book-img" />
                  </div>
                  <Book
                    showVotes={true}
                    book={elem}
                    rate={this.getRate(elem)}
                  />
                </li>
                <FormContainer
                  triggerText={bookUpdate}
                  onSubmit={this.onEdit}
                  book={elem}
                />
                <button
                  key={"btn" + elem.id}
                  type="button"
                  className="btn"
                  onClick={() => this.handleArchive(elem.id)}
                >
                  archive book
                </button>
              </>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
