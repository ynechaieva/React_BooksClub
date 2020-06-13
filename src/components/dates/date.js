import React, { Component } from "react";
import agree_thumb from "../../img/agree_thumb.png";

export default class Date extends Component {
  render() {
    var component = (
      <>
        <div className="date-vote">
          <div className="shown-date">{this.props.currDate.date}</div>
          <div className="thumb-up">
            <img
              src={agree_thumb}
              onClick={(event) =>
                this.props.addVote(
                  event,
                  this.props.rate + 1,
                  this.props.currDate
                )
              }
            />
            <lable className="data-rate">+{this.props.rate}</lable>
          </div>
        </div>
      </>
    );

    return component;
  }
}
