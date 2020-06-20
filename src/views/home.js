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
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const db = new DbHandler();
const addNewBookText = "add book";
const updateBookText = "edit book";
const options = ["name", "author", "description", "pages", "rate"];

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
    this.booksIsNotLoaded = true;
    this.votesIsNotLoaded = true;
    this.archivesIsNotLoaded = true;
    this.editRef = [];
    this.state = {
      books_state: [],
      selectedSortOption: "",
      filterInputVal: "",
      filterDropdown: "",
    };

    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.booksIsNotLoaded = true;
        this.votesIsNotLoaded = true;
        this.archivesIsNotLoaded = true;
      }
    }
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
    event.preventDefault();
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
      alert("Book with such name is already exist!");
    } else {
      db.addBook(newBook, (dbItem) => this.props.dispatch(addBook(dbItem)));
      newBook = { ...newBook, rate: "not voted" };
      this.setState({ books_state: [...this.state.books_state, newBook] });
      this.addBookRef.closeModal();
    }
  };

  onEdit = (event, id) => {
    event.preventDefault();
    let updatedBook = {
      name: event.target.name.value,
      author: event.target.author.value,
      description: event.target.description.value,
      pages: event.target.pages.value,
      id: id,
      img: "",
    };

    let newRate = this.getRate(updatedBook);
    if (updatedBook.id === "undefined") {
      alert("Something goes wrong, can't update this book!");
    } else {
      db.updateBook(updatedBook, (dbItem) =>
        this.props.dispatch(updateBook(dbItem))
      );

      updatedBook = { ...updatedBook, rate: newRate };
      let tmp = this.state.books_state.filter(
        (book) => book.id !== updatedBook.id
      );
      this.setState({
        books_state: [...tmp, updatedBook],
      });

      alert("Book is updated!");
      this.editRef
        .filter((elem) => elem[0] != null && elem[1] === id)[0][0]
        .closeModal();
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

  buildBooksList = () => {
    let arr = this.state.books_state.map((rec) => {
      let rate = this.getRate(rec);
      return {
        name: rec.name,
        author: rec.author,
        description: rec.description,
        pages: rec.pages,
        id: rec.id,
        rate: rate,
        img: rec.img,
      };
    });
    return arr;
  };

  sortBy = (param) => {
    let arr = [];
    switch (param) {
      case "pages":
        arr = this.state.books_state.sort((a, b) => b.pages - a.pages);
        this.setState({ books_state: arr, selectedSortOption: "pages" });
        break;
      case "rate":
        arr = this.state.books_state
          .filter((book) => book.rate !== "not voted")
          .sort((a, b) => b.rate - a.rate);
        this.setState({
          books_state: [
            ...arr,
            ...this.state.books_state.filter(
              (book) => book.rate === "not voted"
            ),
          ],
          selectedSortOption: "rate",
        });
        break;
    }
  };

  // handleChangeFilter = (e) => {
  //   this.setState({ filterInputVal: e.target.value });
  // };

  // handleChangeDropdown = (e) => {
  //   this.setState({ filterDropdown: e.value });
  // };

  // filterData = (e, books) => {
  //   let arr = [];
  //   if (this.state.filterDropdown != "" && this.state.filterInputVal != "") {
  //     switch (this.state.filterDropdown) {
  //       case "name":
  //         arr = books.filter((rec) => {
  //           console.log(rec.name.includes(this.state.filterInputVal));
  //           return rec.name.includes(this.state.filterInputVal);
  //         });
  //         this.setState({ filtered_list: arr });
  //         break;
  //       case "author":
  //         arr = books.filter((rec) => {
  //           console.log(rec.author.includes(this.state.filterInputVal));
  //           return rec.author.includes(this.state.filterInputVal);
  //         });
  //         this.setState({ filtered_list: arr });
  //         break;
  //       case "description":
  //         arr = books.filter((rec) => {
  //           console.log(rec.description.includes(this.state.filterInputVal));
  //           return rec.description.includes(this.state.filterInputVal);
  //         });
  //         this.setState({ filtered_list: arr });
  //         break;
  //       case "pages":
  //         arr = books.filter((rec) => {
  //           console.log(rec.pages.includes(this.state.filterInputVal));
  //           return rec.pages.includes(this.state.filterInputVal);
  //         });
  //         this.setState({ filtered_list: arr });
  //         break;
  //       case "rate":
  //         arr = books.filter((rec) => {
  //           return rec.rate == this.state.filterInputVal;
  //         });
  //         this.setState({ filtered_list: arr });
  //         break;
  //     }
  //   } else {
  //     alert("Not all input filter fields are set");
  //   }
  // };

  // clearFilter = () => {
  //   this.setState({
  //     filtered_list: [],
  //     selectedSortOption: "",
  //     filterInputVal: "",
  //     filterDropdown: "",
  //   });
  // };

  componentDidUpdate() {
    let books_list = this.props.books;
    if (this.booksIsNotLoaded && books_list.length !== 0) {
      this.state.books_state = books_list;
      this.forceUpdate();
      this.booksIsNotLoaded = false;
    }
    if (
      !this.booksIsNotLoaded &&
      this.votesIsNotLoaded &&
      this.props.votes.length !== 0
    ) {
      this.state.books_state = this.buildBooksList();
      this.forceUpdate();
      this.votesIsNotLoaded = false;
    }
    if (
      !this.booksIsNotLoaded &&
      this.archivesIsNotLoaded &&
      this.props.archive.length !== 0
    ) {
      this.state.books_state = this.getNotArchived();
      this.state.books_state = this.buildBooksList();
      this.forceUpdate();
      this.archivesIsNotLoaded = false;
    }
  }

  render() {
    return (
      <div className="home-page content-wrap">
        <div className="sort-filter-wrapper">
          <div className="sortBy radio">
            <label>
              <input
                type="radio"
                value="rate"
                checked={this.state.selectedSortOption === "rate"}
                onClick={() => this.sortBy("rate")}
              />
              sort by rate
            </label>
            <label>
              <input
                type="radio"
                value="pages"
                checked={this.state.selectedSortOption === "pages"}
                //onChange={() => this.sortBy("pages")}
                onClick={() => this.sortBy("pages")}
              />
              sort by pages
            </label>
          </div>
          <div className="filterBy">
            <label>Filter by</label>
            <Dropdown
              className="dropdown"
              options={options}
              value={this.state.filterDropdown}
              //onChange={this.handleChangeDropdown}
              placeholder="select an option"
            />
            <label> with value</label>
            <input
              className="filter-input"
              value={this.state.filterInputVal}
              //onChange={this.handleChangeFilter}
            />
            <button
              className="btn filter-btn"
              // onClick={this.filterData}
            >
              Filter
            </button>
            <button
              className="btn cler-sort-filter-btn"
              //onClick={this.clearFilter}
            >
              Clear
            </button>
          </div>
        </div>
        <FormContainer
          key={"add-book-modal"}
          triggerText={addNewBookText}
          onSubmit={this.onSubmit}
          book={{ name: "", author: "", description: "", pages: "", img: "" }}
          ref={(ref) => {
            this.addBookRef = ref;
          }}
          btn-style={{ color: "red" }}
        />
        <ul>
          {this.state.books_state.map((elem) => {
            return (
              <div className="full-book-item">
                <li key={elem.id} id={elem.id} className="book-item">
                  {/* <div className="book-image">
                    <img src={book_img} alt="book-img" />
                  </div> */}
                  <Book showVotes={true} book={elem} rate={elem.rate} />
                </li>
                <FormContainer
                  key={"edit-book-modal" + elem.id}
                  triggerText={updateBookText}
                  onSubmit={this.onEdit}
                  book={elem}
                  ref={(ref) => {
                    this.editRef.push([ref, elem.id]);
                  }}
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
