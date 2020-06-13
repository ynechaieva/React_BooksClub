import React, { Component } from "react";
import agree_thumb from "../../img/agree_thumb.png";

export default class Date extends Component {
  render() {
    var component = (
      <>
        <div className="date-vote">
          <div className="shown-date">{this.props.date}</div>
          <div className="thumb-up">
            <img src={agree_thumb} onClick={this.addVoteForDate} />
            <lable className="data-rate">+5</lable>
          </div>
        </div>
      </>
    );

    return component;
  }
}
