import React, { Component } from "react";

import classes from "./IntroNavItems.module.css";

class IntroNavItems extends Component {
  render() {
    return (
      <div className={classes.IntroNavItems}>
        <div>
          <h1>Compression Algo</h1>
          <h3>Visualization Demos</h3>
        </div>
      </div>
    );
  }
}

export default IntroNavItems;
