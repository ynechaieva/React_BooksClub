import React, { Component } from "react";
import "./meeting-point.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";

export class Results extends Component {
  render() {
    return <div>here will be table with dates</div>;
  }
}

export default class MeetingPoint extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    startDate: new Date(),
    showDatesArea: false,
  };

  handleChange = (value) => {
    this.setState({
      startDate: value,
    });
  };

  onClick = () => {
    const valueOfInput = format(this.state.startDate, "yyyy/MM/dd");
    //setShowResults(true);
    this.setState({
      showDatesArea: true,
    });
  };

  render() {
    return (
      <div className="meeting-point-page">
        <div className="calendar-area">
          <label>Please, select date to meet for discussion:</label>
          <DatePicker
            selected={this.state.startDate}
            dateFormat="yyyy/MM/dd" //"MMMM d, yyyy"
            className="datepicker"
            minDate={new Date()}
            onSelect={(value) => this.handleChange(value)}
            inline
          />
          <div>
            <button type="submit" className="btn" onClick={this.onClick}>
              select
            </button>
            {this.state.showDatesArea ? <Results /> : null}
          </div>
        </div>
      </div>
    );
  }
}
