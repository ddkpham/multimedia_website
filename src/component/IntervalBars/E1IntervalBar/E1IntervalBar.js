import React, {Component} from 'react';

import IntervalBar from '../IntervalBar/IntervalBar'
import classes from './E1IntervalBar.module.css'

class E1IntervalBar extends Component{
    render(){
        return(
            <div className={classes.E1}>
                <h1>E1 Scaling</h1>
                <IntervalBar start={this.props.start} end={this.props.end}/>
                <h2>Emit "0"</h2>
                <h3>Encoded BitString so far : {this.props.bitString}</h3>
            </div>
        )
    }
}

export default E1IntervalBar;