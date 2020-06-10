import React, { Component } from "react";
import Rating from "react-rating";
import filled_star from "../../img/filled-star.png";
import empty_star from "../../img/empty-star.png";
import "./rating.scss";

export class RatingComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    readonly: false,
  };

  handleRate = (rate) => {
    this.props.addNewVote(rate, this.props.bookid);
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
