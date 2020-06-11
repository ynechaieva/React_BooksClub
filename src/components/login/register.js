import React, { Component } from "react";
import loginImg from "../../img/books.png";
import "./style.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { DbHandler } from "../../dbHandler";
import { fetchUsers, addUser } from "../../actions";

const db = new DbHandler();
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export class Register extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  state = {
    username: "",
    password: "",
    email: "",
    isLogged: false,
  };

  handleRegister = (e) => {
    if (
      this.state.username != "" &&
      this.state.password != "" &&
      this.state.email != ""
    ) {
      let user_id = this.props.users.length + 1;
      var newUser = {
        id: user_id,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        isAdmin: false,
      };

      //db.addUser(newUser, (dbItem) => this.props.dispatch(addUser(dbItem)));

      this.setState({
        isLogged: true,
      });

      db.addUser(newUser);
      this.props.dispatch(addUser(newUser));
      this.props.setUser(newUser);
      localStorage.setItem(
        "active_user",
        JSON.stringify({
          id: newUser.id,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
        })
      );
    }
  };

  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <>
        {this.state.isLogged === false && (
          <div className="base-container">
            <div className="header">Register</div>
            <div className="content">
              <div className="image">
                <img src={loginImg} alt="" />
              </div>

              <div className="form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={this.handleChangeUsername}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={this.handleChangeEmail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChangePassword}
                  />
                </div>
              </div>
            </div>
            <div className="footer">
              <button
                type="button"
                className="btn"
                onClick={this.handleRegister}
              >
                Register
              </button>
              <a className="back" href="/">
                {" "}
                &lt;&lt;Back{" "}
              </a>
            </div>
          </div>
        )}
        {this.state.isLogged === true && <Redirect push to="/home" />}
      </>
    );
  }
}

export default connect(mapStateToProps, null)(Register);
