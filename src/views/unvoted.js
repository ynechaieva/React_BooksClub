import React, { Component } from "react";
import { connect } from "react-redux";
import Book from "../components/books/book";
import { addVote } from "../actions";
import { DbHandler } from "../dbHandler";
import { RatingComponent } from "../components/vote/rating";
import sheriff from "../img/sheriff.png";
import "./style-views.scss";

const mapStateToProps = (state) => {
  return {
    books: state.books,
    votes: state.votes,
    archive: state.archive,
  };
};

const db = new DbHandler();
class UnvotedBooks extends Component {
  addNewVote = (rate, bookid) => {
    var data = {
      bookid: bookid,
      userid: this.props.activeUser.id,
      vote: rate,
    };
    db.addVote(data, (dbItem) => this.props.dispatch(addVote(dbItem)));
  };

  getUnvoted = () => {
    let votedByUser = this.props.votes.filter((rec) => {
      if (rec.userid === this.props.activeUser.id) {
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
      <div className="unvoted-page content-wrap">
        <div className="greetings">
          <div className="image">
            <img src={sheriff} alt="" />
          </div>
          <div className="image-text">Vote or die</div>
        </div>
        <ul className="books-list">
          {unvoted.map((elem) => {
            return (
              <>
                <li key={elem.id} id={elem.id} className="book-item">
                  <Book showVotes={false} book={elem} />
                  <RatingComponent
                    addNewVote={this.addNewVote}
                    bookid={elem.id}
                    key={"rate" + elem.id}
                  />
                </li>
              </>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UnvotedBooks);
