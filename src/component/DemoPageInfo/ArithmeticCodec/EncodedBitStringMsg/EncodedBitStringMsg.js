import React, {Component} from 'react';

import classes from './EncodedBitStringMsg.module.css'

class EncodedBitStringMsg extends Component{
    render(){
        return(
            <div className={classes.EncodedBitStringMsg}>
                <h4>Encoded BitString : </h4>
                <h5>{this.props.encodedBitString}</h5>
                <h4>Encoded BitStringLength : </h4>
                <h5>{this.props.encodedBitStringLength}</h5>
                <h4>Compression Ratio : </h4>
                <h5>{this.props.compressionRatio}</h5>
            </div>
        )
    }
}

export default EncodedBitStringMsg;