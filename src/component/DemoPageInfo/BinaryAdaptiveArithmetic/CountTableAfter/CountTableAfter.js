import React, { Component } from 'react';
import CountTable from '../CountTable/CountTable'

import classes from './CountTableAfter.module.css'
class CountTableAfter extends Component{
    render(){
        return(
            <div className={classes.CountTableAfter}>
                <h2>Statistics After Update</h2>
                <CountTable 
                    symbolCount={this.props.symbolCount}
                    symbolProb={this.props.symbolProb}/>
            </div>

        )
    }
}

export default CountTableAfter;    