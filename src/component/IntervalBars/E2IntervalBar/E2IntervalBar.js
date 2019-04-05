import React, {Component} from 'react';

import IntervalBar from '../IntervalBar/IntervalBar'
import classes from './E2IntervalBar.module.css';

class E2IntervalBar extends Component{
    render(){
        return(
            <div className={classes.E2}>
                <h1>E2 Scaling</h1>
                <IntervalBar start={this.props.start} end={this.props.end}/>
                <h2>Emit "1"</h2>
                <h3>Encoded BitString so far : {this.props.bitString}</h3>
            </div>
        )
    }
}

export default E2IntervalBar;