import React, { Component } from "react";
import Date from "./date";
import "./dates-table.scss";

export class DatesTable extends Component {
  render() {
    var component = (
      <>
        <div className="dates-table">
          <label>Most rated date: </label>
          <ul className="dates-list">
            {this.props.dates.map((elem) => {
              return (
                <li key={elem.id} className="date-item">
                  <Date date={elem.date} />
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
