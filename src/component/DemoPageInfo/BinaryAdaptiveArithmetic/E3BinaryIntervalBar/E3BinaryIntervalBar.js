import React, {Component} from 'react';

import BinaryIntervalBar from '../BinaryIntervalBar/BinaryIntervalBar'
import classes from './E3BinaryIntervalBar.module.css';
class E3BinaryIntervalBar extends Component{
    render(){
        return(
            <div className={classes.E3}>
                <h2>E3 Scaling</h2>
                <BinaryIntervalBar intervalInfo = {this.props.intervalInfo}/>
                <span >s before update: </span>
                <span className={classes.s}>s after update: </span>
            </div>
        )
    }
}

export default E3BinaryIntervalBar;