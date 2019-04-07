import React, {Component} from 'react';

import BinaryIntervalBar from '../BinaryIntervalBar/BinaryIntervalBar'
import classes from './E1BinaryIntervalBar.module.css';
class E1BinaryIntervalBar extends Component{
    render(){
        return(
            <div className={classes.E1}>
                <h2>E1 Scaling</h2>
                <BinaryIntervalBar intervalInfo = {this.props.intervalInfo}/>
                <span >s before update: </span>
                <span className={classes.s}>s after update: </span>
            </div>
        )
    }
}

export default E1BinaryIntervalBar;