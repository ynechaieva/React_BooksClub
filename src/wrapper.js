import React from "react";
import { Nav } from "./components/nav/nav";
import { Footer } from "./components/footer";
import "./components/nav/nav.scss";
import Cookies from "universal-cookie";
import { COOKIE } from "./actions/types";
import "./wrapper.scss";

const cookies = new Cookies();
const Wrapper = (props) => {
  return (
    <div className="wrapper">
      <Nav activeUser={cookies.get(COOKIE).user} />
      {props.children}
      <Footer />
    </div>
  );
};

export { Wrapper };
