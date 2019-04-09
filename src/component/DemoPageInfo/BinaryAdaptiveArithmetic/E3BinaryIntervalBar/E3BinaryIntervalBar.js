import React, {Component} from 'react';

import BinaryIntervalBar from '../BinaryIntervalBar/BinaryIntervalBar'
import classes from './E3BinaryIntervalBar.module.css';
class E3BinaryIntervalBar extends Component{
    render(){
        return(
            <div className={classes.E3}>
                <h2>E3 Scaling</h2>
                <BinaryIntervalBar intervalInfo = {this.props.intervalInfo}/>
                <span ><strong>s before update:{this.props.intervalInfo.prevS}</strong> </span>
                <span className={classes.s}><strong>s after update:{this.props.intervalInfo.s} </strong></span>
            </div>
        )
    }
}

export default E3BinaryIntervalBar;