import React, { Component } from "react";
import filled_star from "../../img/filled-star.png";

export default class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let votesDiv;

    if (this.props.showVotes) {
      votesDiv = <div className="book-votes">{this.props.rate}</div>;
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
