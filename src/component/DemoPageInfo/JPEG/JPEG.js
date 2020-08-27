import React, { Component } from "react";

import classes from "./JPEG.module.css";
import DemoNav from "../DemoNav/DemoNav";
import ImageManager from "../../../containers/ImageManager/ImageManager";
import Intro from "./JPEGIntro/Intro";
class JPEG extends Component {
  render() {
    return (
      <div className={classes.JPEG}>
        <div className={classes.JPEGAlgorithm}>
          <ImageManager />
        </div>
      </div>
    );
  }
}

export default JPEG;
