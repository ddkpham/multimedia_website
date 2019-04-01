import React , {Component} from 'react';

import classes from '../IntervalBar/IntervalBar.module.css'

class IntervalBar extends Component{
    render(){
        return(
            <div className={classes.IntervalBar}>
                symbol: {this.props.z}
                <div className={classes.start}>a : {this.props.a}</div>
                <div className={classes.end}>b : {this.props.b}</div>
            </div>
        )
    }
}

export default IntervalBar;