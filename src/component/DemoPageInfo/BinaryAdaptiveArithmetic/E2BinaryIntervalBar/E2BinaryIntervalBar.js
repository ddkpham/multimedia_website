import React, {Component} from 'react';

import BinaryIntervalBar from '../BinaryIntervalBar/BinaryIntervalBar'
import classes from './E2BinaryIntervalBar.module.css';
class E2BinaryIntervalBar extends Component{
    render(){
        return(
            <div className={classes.E2}>
                <h2>E2 Scaling</h2>
                <BinaryIntervalBar intervalInfo = {this.props.intervalInfo}/>
                <span >s before update: </span>
                <span className={classes.s}>s after update: </span>
            </div>
        )
    }
}

export default E2BinaryIntervalBar;