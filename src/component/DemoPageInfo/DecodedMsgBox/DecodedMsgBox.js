import React, {Component} from 'react';
import classes from './DecodedMsgBox.module.css'

class DecodedMsgBox extends Component{
    render(){
        return(
            <div className={classes.DecodedMsgBox}>
                <h3>Decoded Msg :  </h3>
                <p>{this.props.decodedMsg}</p>
            </div>
        )
    }
}

export default DecodedMsgBox;