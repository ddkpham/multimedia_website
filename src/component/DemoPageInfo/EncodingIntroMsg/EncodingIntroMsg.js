import React, { Component } from 'react';
import classes from './EncodingIntroMsg.module.css'

class EncodingIntroMsg extends Component{
    render (){
        let style = {}; 
        if(!this.props.show){
            style = {
                visibility: 'hidden'
            }
        }
        //console.log('[EncodingIntroMsg]; ', this.props.show)
        return (
            <div style={style} className={classes.EncodingIntroMsg}>
                {this.props.beforeUpdateMsg}
                {this.props.letterToBeEncodedMsg}
                {this.props.afterUpdateMsg}
            </div>
        )
    }
}
export default EncodingIntroMsg;