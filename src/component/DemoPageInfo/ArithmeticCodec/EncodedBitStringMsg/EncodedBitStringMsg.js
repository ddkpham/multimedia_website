import React, {Component} from 'react';

import classes from './EncodedBitStringMsg.module.css'

class EncodedBitStringMsg extends Component{
    render(){
        return(
            <div className={classes.EncodedBitStringMsg}>
                <h3>Encoded BitString :  </h3>
                <h4>{this.props.encodedBitString}</h4>
                <h3>Encoded BitStringLength :  </h3>
                <h4>{this.props.encodedBitStringLength}</h4>
                <h3>Compression Ratio : </h3>
                <h4>{this.props.compressionRatio}</h4>
            </div>
        )
    }
}

export default EncodedBitStringMsg;