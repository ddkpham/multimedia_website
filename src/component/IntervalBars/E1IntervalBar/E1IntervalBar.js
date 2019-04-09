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
                <h4>E1 Scaling</h4>
                <IntervalBar start={start} end={end}/>
                <div>
                    <span ><strong>"s" before scaling:{this.props.prevS}</strong> </span>
                    <span className={classes.s}><strong>"s" after scaling:{this.props.s} </strong></span>
                </div>
                <br></br>
                <h5>Emit "0"</h5>
                <h5>Emit {this.props.prevS} "1"s </h5>
                <h5>Encoded BitString so far : {this.props.bitString}</h5>
            </div>
        )
    }
}

export default E1IntervalBar;