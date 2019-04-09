import React, { Component } from 'react';
import CountTable from '../CountTable/CountTable'
import classes from './CountTableBefore.module.css'
class CountTableBefore extends Component{
    render(){
        return(
            <div className={classes.CountTableBefore}>
                <h2>Statistics before Update</h2>
                <CountTable 
                    symbolCount={this.props.symbolCount}
                    symbolProb={this.props.symbolProb}/>
            </div>

        )
    }
}

export default CountTableBefore;    