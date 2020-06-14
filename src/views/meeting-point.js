import React, { Component } from "react";
import { connect } from "react-redux";
import "./meeting-point.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { DatesTable } from "../components/dates/dates-table";
import { fetchDates, addDate, fetchVotedDates, addVotedDate } from "../actions";
import { DbHandler } from "../dbHandler";

const db = new DbHandler();

const mapStateToProps = (state) => {
  return {
    users: state.users,
    dates: state.dates,
    votedDates: state.votedDates,
  };
};

class MeetingPoint extends Component {
  state = {
    startDate: new Date(),
    showDatesArea: true,
  };

  componentDidMount() {
    this.props.dispatch(fetchDates());
    this.props.dispatch(fetchVotedDates());
  }

  handleChange = (value) => {
    this.setState({
      startDate: value,
    });
  };

  addDate = () => {
    const valueOfInput = format(this.state.startDate, "yyyy/MM/dd");
    if (
      this.props.dates.filter((rec) => rec.date === valueOfInput).length > 0
    ) {
      alert("Date is already present in the list");
    } else {
      db.addDate(valueOfInput, (dbItem) =>
        this.props.dispatch(addDate(dbItem))
      );
    }
  };

  getMostRatedDate = () => {};

  addVoteForDate = (e, rate, date) => {
    e.preventDefault();
    let data = {
      dateid: date.id,
      userid: this.props.activeUser.id,
      vote: rate,
    };
    let votedByActiveUser = this.props.votedDates.filter(
      (rec) => rec.userid === this.props.activeUser.id
    );
    if (votedByActiveUser.filter((rec) => rec.dateid === date.id).length > 0) {
      alert("You have already voted for this date");
    } else {
      db.addVotedDate(data, (dbItem) =>
        this.props.dispatch(addVotedDate(dbItem))
      );
      alert("vote is added");
    }
  };

  getRate = (e, dateid) => {
    e.preventDefault(e);
    const rate = 0;
    this.props.votedDates.map((rec) => {
      if (rec.dateid === dateid) {
        rate += rec.vote;
      }
    });
    console.log(rate);
    return rate;
  };

  render() {
    return (
      <div className="meeting-point-page content-wrap">
        <div className="calendar-area">
          <label>Select date to discussion a book:</label>
          <DatePicker
            selected={this.state.startDate}
            dateFormat="yyyy/MM/dd"
            className="datepicker"
            minDate={new Date()}
            onSelect={(value) => this.handleChange(value)}
            inline
          />
          <div>
            <button type="submit" className="btn" onClick={this.addDate}>
              select date
            </button>
          </div>
        </div>
        <div className="dates-area">
          {this.state.showDatesArea ? (
            <DatesTable
              dates={this.props.dates}
              getRate={this.getRate}
              votedDates={this.props.votedDates}
              addVote={this.addVoteForDate}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MeetingPoint);
