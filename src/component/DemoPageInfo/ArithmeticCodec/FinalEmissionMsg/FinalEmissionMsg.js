import React, {Component} from 'react';

import classes from './FinalEmissionMsg.module.css'

class FinalEmissionMsg extends Component{
    render(){
        let style = {}
        if(!this.props.show){
            style ={
                visibility: 'hidden'
            }
        }
        return(
            <div style={style} className={classes.FinalEmissionMsg}>
                {this.props.finalScaling}
            </div>

        )
    }
}

export default FinalEmissionMsg;