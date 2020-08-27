import React from "react";

import classes from "./Intro.module.css";

const intro = (props) => (
  <div className={classes.Intro}>
    <h1 style={h1Style}>JPEG Compression Demo</h1>
  </div>
);

const h1Style = {
  marginBottom: "30px",
  textDecoration: "none",
  textAlign: "center",
};
export default intro;
