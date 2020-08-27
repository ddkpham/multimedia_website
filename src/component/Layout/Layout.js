import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Aux";

import ResourcePage from "../../Pages/ResourcePage/ResourcePage";
import ArithmetricCodec from "../DemoPageInfo/ArithmeticCodec/ArithmeticCodec";
import AdaptiveArithmeticCodec from "../DemoPageInfo/BinaryAdaptiveArithmetic/BinaryAdaptiveArithmetic";
import HomePage from "../../Pages/HomePage/HomePage";
import CourseContentPage from "../../Pages/CourseContentPage/CourseContentPage";
import CourseWorkPage from "../../Pages/CourseWorkPage/CourseWorkPage";
import Huffman from "../DemoPageInfo/Huffman/Huffman";
import JPEG from "../DemoPageInfo/JPEG/JPEG";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import AdaptiveHuffman from "../DemoPageInfo/AdaptiveHuffman/AdaptiveHuffman";

//import Toolbar from '../Navigation/Toolbar/Toolbar';

class layout extends Component {
  state = {
    user: {
      name: "visitor",
      // roles: ['user'],
      // rights:['can-view-website'],
      authenticated: false,
      validTokenTime: 0,
    },
  };

  authenticateUser = () => {
    const user = {
      name: "student",
      authenticated: true,
    };
    this.setState({ user: user });
  };

  render() {
    let tokenAuthTime = localStorage.getItem("authToken");
    if (tokenAuthTime === null) {
      tokenAuthTime = 0;
    } else {
      tokenAuthTime = parseInt(tokenAuthTime);
    }
    const user = this.state.user;
    let routes = (
      <Switch>
        {/* --------------------- Temporary anon functions for Pages --------------------*/}
        <Route path="/course-content" component={CourseContentPage} />
        <Route path="/resources" component={ResourcePage} />
        <Route path="/course-work" component={CourseWorkPage} />
        <Route path="/arithmetic_encoding" component={ArithmetricCodec} />
        <Route
          path="/adaptive-arithmetic"
          component={AdaptiveArithmeticCodec}
        />
        <Route path="/huffman" component={Huffman} />
        <Route path="/adaptive-huffman" component={AdaptiveHuffman} />
        <Route path="/jpeg" component={JPEG} />
        <Route path="/" component={HomePage} />
      </Switch>
    );
    let date = new Date();
    let currTime = date.getTime();
    currTime = currTime / 1000;
    console.log("currTime: ", currTime);

    return (
      <Aux>
        {/* ----------- Toolbar/Navbar --------------------*/}
        <Toolbar />

        {/* --------------------- Routes --------------------*/}
        {routes}
      </Aux>
    );
  }
}

export default layout;
