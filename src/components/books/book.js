import React, { Component } from "react";
import { connect } from "react-redux";
import filled_star from "../../img/filled-star.png";

const mapStateToProps = (state) => {
  return {
    users: state.users,
    books: state.books,
    votes: state.votes,
    archive: state.archive,
  };
};

class Book extends Component {
  constructor(props) {
    super(props);
  }

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
    let votesDiv;

    if (this.props.showVotes) {
      votesDiv = (
        <div className="book-votes">{this.getRate(this.props.book)}</div>
      );
    }
    var component = (
      <>
        <div className="book-short-content">
          <div className="book-name book-elem">{this.props.book.name}</div>
          <div className="book-author book-elem">{this.props.book.author}</div>
          <div className="book-pages book-elem">{this.props.book.pages}</div>
          {votesDiv}
        </div>
        <div className="book-description book-elem">
          {this.props.book.description}
        </div>
      </>
    );

    return component;
  }
}

export default connect(mapStateToProps)(Book);
