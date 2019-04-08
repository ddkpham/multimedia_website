import React, {Component} from 'react';

import classes from './ArithmeticCodecUpdateMsg.module.css';
import Aux from '../../../../hoc/Aux'
class ArithmeticCodecUpdateMsg extends Component{
    render(){
 
        let style ={}
        if(!this.props.show){
            style = {
                visibility: 'hidden'
            }
        }
        return (
            <div style={style} className={classes.ArithmeticCodecUpdateMsg}>
                {this.props.beforeUpdateMsg}
                {this.props.letterToBeEncodedMsg}
                {this.props.afterUpdateMsg}
            </div>
        )
    }
}

export default ArithmeticCodecUpdateMsg;