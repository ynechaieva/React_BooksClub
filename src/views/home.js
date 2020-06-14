import React, { Component } from "react";
import "../index.scss";
import { connect } from "react-redux";
import Book from "../components/books/book";
import { FormContainer } from "../components/books/modal/form-container";
import {
  addToArchive,
  addBook,
  updateBook,
  fetchBooks,
  fetchVotes,
  fetchArchive,
} from "../actions";
import "./home.scss";
import { DbHandler } from "../dbHandler";
import book_img from "../img/notebook.png";

const db = new DbHandler();
const addNewBookText = "add book";
const updateBookText = "edit book";
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

    if (
      this.props.books.filter((rec) => rec.name === newBook.name).length > 0
    ) {
      //this.addBookRef.closeModal();
      alert("Book with such name is already exist!");
    } else {
      db.addBook(newBook, (dbItem) => this.props.dispatch(addBook(dbItem)));
      this.addBookRef.closeModal();
    }
  };

  onEdit = (event, id) => {
    event.preventDefault(event);

    let updatedBook = {
      name: event.target.name.value,
      author: event.target.author.value,
      description: event.target.description.value,
      pages: event.target.pages.value,
      id: id,
      img: "",
    };

    if (updatedBook.id === "undefined") {
      alert("Something goes wrong, can't update this book!");
    } else {
      db.updateBook(updatedBook, (dbItem) =>
        this.props.dispatch(updateBook(dbItem))
      );
      alert("Book is updated!");
    }
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
      <div className="home-page content-wrap">
        <FormContainer
          key={"add-book-modal"}
          triggerText={addNewBookText}
          onSubmit={this.onSubmit}
          book={{ name: "", author: "", description: "", pages: "", img: "" }}
          ref={(ref) => {
            this.addBookRef = ref;
          }}
        />
        <ul>
          {books_list.map((elem) => {
            return (
              <div className="full-book-item">
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
                  key={"edit-book-modal" + elem.id}
                  triggerText={updateBookText}
                  onSubmit={this.onEdit}
                  book={elem}
                  // ref={(ref) => {
                  //   eval("this." + elem.name + "=ref;");
                  // }}
                />
                <button
                  key={"archive-btn" + elem.id}
                  type="button"
                  className="btn"
                  onClick={() => this.handleArchive(elem.id)}
                >
                  archive book
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
