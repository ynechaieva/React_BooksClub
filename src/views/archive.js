import React, { Component } from "react";
import { connect } from "react-redux";
import Book from "../components/books/book";

const mapStateToProps = (state) => {
  return {
    books: state.books,
    archive: state.archive,
  };
};

class Archive extends Component {
  constructor(props) {
    super(props);
  }

  getArchived = () => {
    let archivedBooks = this.props.books.filter((book) => {
      if (
        this.props.archive.filter((elem) => elem.bookid === book.id).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    });

    return archivedBooks;
  };

  render() {
    const archive_list = this.getArchived();

    return (
      <div className="archive-page">
        <ul>
          {archive_list.map((elem) => {
            return (
              <>
                <li key={elem.id} id={elem.id} className="book-item">
                  <Book book={elem} />
                </li>
              </>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Archive);
