import React, { Component } from 'react';
import CountTable from '../CountTable/CountTable'

class CountTableBefore extends Component{
    render(){
        return(
            <div>
                <h1>Statistics before Update</h1>
                <CountTable 
                    symbolCount={this.props.symbolCount}
                    symbolProb={this.props.symbolProb}/>
            </div>

        )
    }
}

export default CountTableBefore;    