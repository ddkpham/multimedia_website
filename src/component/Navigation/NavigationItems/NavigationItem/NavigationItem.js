import React from 'react';

import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={{
            pathname: props.link
        }} >{props.page}</NavLink>
    </li>
);

export default navigationItem;