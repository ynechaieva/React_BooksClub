import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/login/register";
import Login from "./components/login/login";
import Archive from "./views/archive";
import Home from "./views/home";
import UnvotedBooks from "./views/unvoted";
import MeetingPoint from "./views/meeting-point";
import "./App.scss";
import { Wrapper } from "./wrapper";
import Cookies from "universal-cookie";
import { COOKIE } from "./actions/types";

//images from https://ya-webdesign.com/imgdownload.html
const cookies = new Cookies();
class App extends Component {
  state = {
    user: {},
  };

  changeState = (user) => {
    this.setState({
      user: user,
    });
    cookies.set(COOKIE, {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  };

  render() {
    return (
      <BrowserRouter>
        <section>
          <Switch>
            <Route
              exact
              path={"/home"}
              render={(props) => (
                <Wrapper
                  activeUser={JSON.parse(localStorage.getItem("active_user"))}
                >
                  <Home
                    activeUser={JSON.parse(localStorage.getItem("active_user"))}
                  />
                </Wrapper>
              )}
            />
            <Route
              exact
              path={"/unvoted"}
              render={(props) => (
                <Wrapper>
                  <UnvotedBooks
                    activeUser={JSON.parse(localStorage.getItem("active_user"))}
                  />
                </Wrapper>
              )}
            />
            <Route
              exact
              path={"/archive"}
              render={(props) => (
                <Wrapper>
                  <Archive
                    activeUser={JSON.parse(localStorage.getItem("active_user"))}
                  />
                </Wrapper>
              )}
            />
            <Route
              exact
              path={"/place"}
              render={(props) => (
                <Wrapper>
                  <MeetingPoint
                    activeUser={JSON.parse(localStorage.getItem("active_user"))}
                  />
                </Wrapper>
              )}
            />
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Login {...props} setUser={this.changeState} />
              )}
            />
            <Route
              exact
              path={"/register"}
              render={(props) => (
                <Register {...props} setUser={this.changeState} />
              )}
            />
          </Switch>
        </section>
      </BrowserRouter>
    );
  }
}

export default App;
