import React, {Component} from 'react';

import BinaryIntervalBar from '../BinaryIntervalBar/BinaryIntervalBar'
import classes from './E1BinaryIntervalBar.module.css';
class E1BinaryIntervalBar extends Component{
    render(){
        console.log('[E1BinaryIntervalBar]:', this.props.intervalInfo)
        return(
            <div className={classes.E1}>
                <h2>E1 Scaling</h2>
                <BinaryIntervalBar intervalInfo = {this.props.intervalInfo}/>
                <div>
                    <span ><strong>s before update:{this.props.intervalInfo.prevS}</strong> </span>
                    <span className={classes.s}><strong>s after update:{this.props.intervalInfo.s} </strong></span>
                </div>
                <h2>Emit "0"</h2>
                <h2>Emit {this.props.intervalInfo.prevS} "1"s </h2>
                <h2>Encoded BitString so far : {this.props.intervalInfo.bitString}</h2>
            </div>
        )
    }
}

export default E1BinaryIntervalBar;