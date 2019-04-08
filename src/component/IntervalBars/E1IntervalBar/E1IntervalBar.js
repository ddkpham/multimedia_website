import React, {Component} from 'react';

import IntervalBar from '../IntervalBar/IntervalBar'
import classes from './E1IntervalBar.module.css'

class E1IntervalBar extends Component{
    render(){
        let start = parseFloat(this.props.start) 
        start = start.toFixed(2)
        let end = parseFloat(this.props.end) 
        end = end.toFixed(2)
        return(
            <div className={classes.E1}>
                <h1>E1 Scaling</h1>
                <IntervalBar start={start} end={end}/>
                <div>
                    <span ><strong>"s" before scaling:{this.props.prevS}</strong> </span>
                    <span className={classes.s}><strong>"s" after scaling:{this.props.s} </strong></span>
                </div>
                <h2>Emit "0"</h2>
                <h2>Emit {this.props.prevS} "1"s </h2>
                <h3>Encoded BitString so far : {this.props.bitString}</h3>
            </div>
        )
    }
}

export default E1IntervalBar;