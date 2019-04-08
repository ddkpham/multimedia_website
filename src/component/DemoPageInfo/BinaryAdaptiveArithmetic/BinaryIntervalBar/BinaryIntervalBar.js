import React, { Component } from 'react';

import classes from './BinaryIntervalBar.module.css'
class BinaryIntervalBar extends Component{
    render(){
        


        return(
            <div className={classes.BinaryIntervalBarContent}>
                <div className={classes.Text}>
                    <span className={classes.start}>{this.props.intervalInfo.start}</span>
                    <span style={{paddingLeft: this.props.intervalInfo.aWidth -5 + "%"}} className={classes.mid}>{this.props.intervalInfo.mid}</span>
                    <span className={classes.end}>{this.props.intervalInfo.end}</span>
                </div>
                <div className={classes.BinaryIntervalBar}>
                    <div style={{width: `${this.props.intervalInfo.aWidth}%`}} className={classes.a}>a</div>
                    <div style={{width: `${this.props.intervalInfo.bWidth}%`}} className={classes.b}>b</div>
                </div>
            </div>

        )
    }
}

export default BinaryIntervalBar;