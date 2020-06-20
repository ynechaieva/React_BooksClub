import React, { Component } from "react";
import Date from "./date";
import "./dates-table.scss";

export class DatesTable extends Component {
  mostRatedDate = () => {
    let rate = 0;
    let ratedDate = "";
    let arr = [];
    this.props.dates.map((date) => {
      let tmpRate = this.props.votedDates.filter(
        (rec) => rec.dateid === date.id
      ).length;
      if (tmpRate > rate) {
        rate = tmpRate;
        ratedDate = date.date;
      }
    });

    console.log(ratedDate);
    return ratedDate;
  };

  render() {
    var component = (
      <>
        <div className="dates-table">
          <p style={{ "font-weight": "bold" }}>
            Most rated date: {this.mostRatedDate()}
          </p>
          <ul className="dates-list">
            {this.props.dates.map((elem) => {
              let rate = this.props.votedDates.filter((rec) => {
                return rec.dateid === elem.id;
              }).length;
              return (
                <li key={elem.id} className="date-item">
                  <Date
                    currDate={elem}
                    rate={rate}
                    addVote={this.props.addVote}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
    return component;
  }
}
