import React, { Component } from "react";
import Rating from "react-rating";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import filled_star from "../../img/filled-star.png";
import empty_star from "../../img/empty-star.png";
import "./rating.scss";
import { DbHandler } from "../../dbHandler";

const db = new DbHandler();
export class RatingComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    readonly: false,
  };

  handleRate = (rate) => {
    var data = {
      bookid: this.props.curr_book.id,
      userid: this.props.activeUser.id,
      vote: rate,
    };
    this.props.addNewVote(data);
    db.addVote(data);
    this.setState({ readonly: true });
    alert("vote is saved");
  };

  render() {
    return (
      <div className="rating-container">
        <Rating
          {...this.state}
          emptySymbol={<img src={empty_star} className="icon" />}
          fullSymbol={<img src={filled_star} className="icon" />}
          direction={"ltr"}
          display="inline"
          stop={5}
          onClick={(rate) => this.handleRate(rate)}
        />
      </div>
    );
  }
}

//export default connect(mapStateToProps)(RatingComponent);
