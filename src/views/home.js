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
    this.editRef = [];
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

      this.editRef
        .filter((elem) => elem[0] != null && elem[1] === id)[0][0]
        .closeModal();
    }
  };

  getNotArchived = (books) => {
    let activeBooks = books.filter((book) => {
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
    const books_list = this.getNotArchived(this.props.books);
    return books_list.map((rec) => {
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
  };

  sortBy = (param) => {
    const books = this.buildBooksList();
    let arr = [];
    switch (param) {
      case "rate":
        arr = books.sort((a, b) => b.rate - a.rate);
        return arr;
      case "pages":
        arr = books.sort((a, b) => b.pages - a.pages);
        return arr;
      default:
        return books;
    }
  };

  state = {
    books_list: this.buildBooksList(),
    selectedSortOption: "",
    filterInputVal: "",
    filterDropdown: "",
  };

  handleChangeFilter = (e) => {
    this.setState({ filterInputVal: e.target.value });
  };

  handleChangeDropdown = (e) => {
    this.setState({ filterDropdown: e.value });
  };

  filterData = (e) => {
    let arr = [];
    if (this.state.filterDropdown != "" && this.state.filterInputVal != "") {
      switch (this.state.filterDropdown) {
        case "name":
          arr = this.state.books_list.filter((rec) => {
            console.log(rec.name.includes(this.state.filterInputVal));
            return rec.name.includes(this.state.filterInputVal);
          });
          this.setState({ books_list: arr });
          break;
        case "author":
          arr = this.state.books_list.filter((rec) => {
            console.log(rec.author.includes(this.state.filterInputVal));
            return rec.author.includes(this.state.filterInputVal);
          });
          this.setState({ books_list: arr });
          break;
        case "description":
          arr = this.state.books_list.filter((rec) => {
            console.log(rec.description.includes(this.state.filterInputVal));
            return rec.description.includes(this.state.filterInputVal);
          });
          this.setState({ books_list: arr });
          break;
        case "pages":
          arr = this.state.books_list.filter((rec) => {
            console.log(rec.pages.includes(this.state.filterInputVal));
            return rec.pages.includes(this.state.filterInputVal);
          });
          this.setState({ books_list: arr });
          break;
        case "rate":
          arr = this.state.books_list.filter((rec) => {
            //console.log(rec.rate.includes(this.state.filterInputVal));
            return rec.rate == this.state.filterInputVal;
          });
          this.setState({ books_list: arr });
          break;
      }
    } else {
      alert("Not all input filter fields are set");
    }
  };

  clearAll = () => {
    this.setState({
      books_list: this.sortBy(this.state.selectedSortOption),
      filterInputVal: "",
      filterDropdown: "",
    });
  };

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
                onChange={() => {
                  this.setState({
                    books_list: this.sortBy("rate"),
                    selectedSortOption: "rate",
                  });
                }}
              />
              sort by rate
            </label>
            <label>
              <input
                type="radio"
                value="rate"
                checked={this.state.selectedSortOption === "pages"}
                onChange={() => {
                  this.setState({
                    books_list: this.sortBy("pages"),
                    selectedSortOption: "pages",
                  });
                }}
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
              onChange={this.handleChangeDropdown}
              placeholder="select an option"
            />
            <label> with value</label>
            <input
              className="filter-input"
              value={this.state.filterInputVal}
              onChange={this.handleChangeFilter}
            />
            <button className="btn filter-btn" onClick={this.filterData}>
              Filter
            </button>
            <button
              className="btn cler-sort-filter-btn"
              onClick={this.clearAll}
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
          {this.state.books_list.map((elem) => {
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
