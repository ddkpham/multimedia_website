import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem
      link="/arithmetic_encoding"
      active={true}
      page="Arithmetic"
    ></NavigationItem>
    <NavigationItem
      link="/adaptive-arithmetic"
      page="Adaptive Arithmetic"
    ></NavigationItem>
    <NavigationItem link="/huffman" page="Huffman"></NavigationItem>
    <NavigationItem
      link="/adaptive-huffman"
      page="Adaptive Huffman"
    ></NavigationItem>
    <NavigationItem link="/jpeg" page="JPEG"></NavigationItem>
  </ul>
);

export default navigationItems;
