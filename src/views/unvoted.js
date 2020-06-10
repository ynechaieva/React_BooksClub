import React, { Component } from "react";
import { connect } from "react-redux";
import Book from "../components/books/book";
import { addVote } from "../actions";

import "./unvoted.scss";
import { RatingComponent } from "../components/vote/rating";

const mapStateToProps = (state) => {
  return {
    books: state.books,
    votes: state.votes,
    archive: state.archive,
  };
};

class UnvotedBooks extends Component {
  constructor(props) {
    super(props);
  }

  addNewVote = (parameter) => this.props.dispatch(addVote(parameter));
  getUnvoted = () => {
    let votedByUser = this.props.votes.filter((rec) => {
      if (rec.userid == this.props.activeUser.id) {
        return rec;
      }
    });

    let unvoted_books = this.props.books.filter((book) => {
      if (
        this.props.archive.filter((elem) => elem.bookid === book.id).length > 0
      ) {
        return false;
      } else if (
        votedByUser.filter((rec) => rec.bookid === book.id).length > 0
      ) {
        return false;
      } else return true;
    });

    return unvoted_books;
  };

  render() {
    const unvoted = this.getUnvoted();

    return (
      <div className="unvoted-page">
        <ul>
          {unvoted.map((elem) => {
            return (
              <>
                <li key={elem.id} id={elem.id} className="book-item">
                  <Book showVotes={false} book={elem} />
                </li>
                <RatingComponent
                  addNewVote={this.addNewVote}
                  curr_book={elem}
                  activeUser={this.props.activeUser}
                />
              </>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UnvotedBooks);
