import React, { Component } from "react";
import filled_star from "../../img/filled-star.png";

export default class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let votesDiv;

    if (this.props.showVotes) {
      votesDiv = <div className="book-votes">rate: {this.props.rate}</div>;
    }
    var component = (
      <>
        <div className="book-short-content">
          <div className="book-name book-elem">
            <p>{this.props.book.name}</p>
          </div>
          <div className="book-author book-elem">{this.props.book.author}</div>
          <div className="book-pages book-elem">
            {this.props.book.pages} pages
          </div>
          {votesDiv}
        </div>
        <div className="book-description book-elem">
          <p>{this.props.book.description}</p>
        </div>
      </>
    );

    return component;
  }
}
