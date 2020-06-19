import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { COOKIE } from "../../actions/types";

const cookie = new Cookies();
class Nav extends Component {
  handleLogout = (e) => {
    cookie.remove(COOKIE);
    localStorage.clear();
  };

  render() {
    return (
      <ul className="nav-list">
        <div className="nav-links">
          <li id="nav-home" className="nav-list-item">
            <NavLink exact to="/home">
              Home
            </NavLink>
          </li>
          <li id="nav-unvoted" className="nav-list-item">
            <NavLink exact to="/unvoted">
              Unvoted books
            </NavLink>
          </li>
          <li id="nav-archive" className="nav-list-item">
            <NavLink exact to="/archive">
              Archive
            </NavLink>
          </li>
          <li id="nav-place" className="nav-list-item">
            <NavLink to="/place">Let's meet</NavLink>
          </li>
        </div>

        <div className="nav-user">
          <li id="nav-user" className="nav-list-item">
            user: {this.props.activeUser.username}
          </li>
          <li id="logout" className="nav-list-item">
            <a href="/" onClick={this.handleLogout}>
              Logout
            </a>
          </li>
        </div>
      </ul>
    );
  }
}

export { Nav };
