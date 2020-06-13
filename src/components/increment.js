import React from "react";
import "./vote.scss";

export class Increment extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };

    this.increment = this.increment.bind(this);
    //this.decrement = this.decrement.bind(this);
  }

  render() {
    return (
      <div className="vote-container">
        {/* <div>{this.state.score}</div> */}
        <button className="btn countDown" onClick={this.decrement}>
          &lt;
        </button>
        <div>{this.state.score}</div>
        <button className="btn countUp" onClick={this.increment}>
          &gt;
        </button>
      </div>
    );
  }

  increment() {
    this.setState({
      score: this.state.score + 1,
    });
  }

  decrement() {
    this.setState({
      score: this.state.score - 1,
    });
  }
}
