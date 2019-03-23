import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = () =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true} page="Home"></NavigationItem>
        <NavigationItem link="/course-content" page="Course Content"></NavigationItem>
        <NavigationItem link="/course-work" page="Course Work"></NavigationItem>
        <NavigationItem link="/resources" page="Resources"></NavigationItem>
    </ul>
)

export default navigationItems;