import React, { Component } from "react";
import { connect } from "react-redux";
import "./meeting-point.scss";

const mapStateToProps = (state) => {
  return {
    users: state.books,
  };
};

class MeetingPoint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="meeting-point-page">
        <input placeholder={new Date().toLocaleDateString("en-US")} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MeetingPoint);
