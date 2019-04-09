import React, {Component} from 'react';
import classes from './DecodedMsgBox.module.css'

class DecodedMsgBox extends Component{
    render(){
        return(
            <div className={classes.DecodedMsgBox}>
                <h5><b>Decoded Msg : </b>{this.props.decodedMsg}</h5>
            </div>
        )
    }
}

export default DecodedMsgBox;