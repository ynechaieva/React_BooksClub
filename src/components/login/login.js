import React, { Component } from "react";
import loginImg from "../../img/books.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./style-login-register.scss";
import { fetchUsers } from "../../actions";

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  state = {
    username: "",
    password: "",
    isLogged: false,
  };

  handleLogin = (e) => {
    this.props.users.map((item) => {
      if (
        this.state.username === item.username &&
        this.state.password === item.password
      ) {
        this.setState({
          isLogged: true,
        });
        this.props.setUser(item);
        localStorage.setItem(
          "active_user",
          JSON.stringify({
            id: item.id,
            username: item.username,
            isAdmin: item.isAdmin,
          })
        );
      }
    });
  };

  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <>
        {this.state.isLogged === false && (
          <div className="base-container">
            <div className="header"> Login </div>
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
            <div className="login-btn-area">
              <button type="button" className="btn" onClick={this.handleLogin}>
                Login
              </button>
              <label>Do not have an account yet?</label>
              <a href="/register">Register &gt;&gt;</a>
            </div>
          </div>
        )}

        {this.state.isLogged === true && <Redirect push to="/home" />}
      </>
    );
  }
}

export default connect(mapStateToProps)(Login);
