import React, { Component } from "react";
import { connect } from "react-redux";
import Book from "../components/books/book";
import { addToArchive, fetchBooks, fetchVotes, fetchArchive } from "../actions";
import "./home.scss";
import { DbHandler } from "../dbHandler";
import book_img from "../img/open-book.png";

const db = new DbHandler();
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

  handleArchive = (id) => {
    db.addToArchive(id);
    this.props.dispatch(addToArchive(id));
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
