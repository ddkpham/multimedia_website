import React, { Component } from 'react';
import classes from './EncodingIntroMsg.module.css'

class EncodingIntroMsg extends Component{
    render (){
        return (
            <div className={classes.EncodingIntroMsg}>
                {this.props.beforeUpdateMsg}
                {this.props.letterToBeEncodedMsg}
                {this.props.afterUpdateMsg}
            </div>
        )
    }
}
export default EncodingIntroMsg;