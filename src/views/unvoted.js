import React, { Component } from "react";
import { connect } from "react-redux";
import Book from "../components/books/book";
import { addVote } from "../actions";
import { DbHandler } from "../dbHandler";
import "./unvoted.scss";
import { RatingComponent } from "../components/vote/rating";

const mapStateToProps = (state) => {
  return {
    books: state.books,
    votes: state.votes,
    archive: state.archive,
  };
};

const db = new DbHandler();
class UnvotedBooks extends Component {
  constructor(props) {
    super(props);
  }

  addNewVote = (rate, bookid) => {
    var data = {
      bookid: bookid,
      userid: this.props.activeUser.id,
      vote: rate,
    };
    db.addVote(data);
    this.props.dispatch(addVote(data));
  };

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
                  bookid={elem.id}
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
