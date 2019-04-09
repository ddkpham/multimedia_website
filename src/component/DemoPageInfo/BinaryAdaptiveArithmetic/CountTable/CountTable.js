import React, { Component } from 'react';

import classes from './CountTable.module.css';

class CountTable extends Component{
    render(){
        let aProb = this.props.symbolProb[0]
        aProb = aProb.toFixed(2)
        let bProb = this.props.symbolProb[1]
        bProb = bProb.toFixed(2)
        return (
            <div className={classes.CountTable}>
                <div className={classes.Text}>
                    <span>A</span>
                    <span>B</span>
                </div>
                <div className={classes.countStats}>
                    <div className={classes.aStats}>
                            Count: {this.props.symbolCount[0]}
                    </div>
                    <div className={classes.bStats}>
                            Count: {this.props.symbolCount[1]}
                    </div>
                </div>
                <div className={classes.probStats}>
                    <div className={classes.aStats}>
                            Prob: {aProb}
                    </div>
                    <div className={classes.bStats}>
                            Prob: {bProb}
                    </div>
                </div>

            </div>
        )
    }
}

export default CountTable;