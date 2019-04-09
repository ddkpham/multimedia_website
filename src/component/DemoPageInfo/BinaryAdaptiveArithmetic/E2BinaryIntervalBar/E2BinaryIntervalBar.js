import React, {Component} from 'react';

import BinaryIntervalBar from '../BinaryIntervalBar/BinaryIntervalBar'
import classes from './E2BinaryIntervalBar.module.css';
class E2BinaryIntervalBar extends Component{
    render(){
        return(
            <div className={classes.E2}>
                <h2>E2 Scaling</h2>
                <BinaryIntervalBar intervalInfo = {this.props.intervalInfo}/>
                <div>
                    <span ><strong>s before update:{this.props.intervalInfo.prevS}</strong> </span>
                    <span className={classes.s}><strong>s after update:{this.props.intervalInfo.s} </strong></span>
                </div>
                <h2>Emit "1"</h2>
                <h2>Emit {this.props.intervalInfo.prevS} "0"s </h2>
                <h2>Encoded BitString so far : {this.props.intervalInfo.bitString}</h2>
                
            </div>
        )
    }
}

export default E2BinaryIntervalBar;