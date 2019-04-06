import React, {Component} from 'react';

import classes from './BinaryAdaptiveArithmetic.module.css';

class BinaryAdaptiveArithmetic extends Component{
    state = {
        encodedBitString: null, 
        decodedMsg: null, 
        messageToBeEncoded: "", 
        lowFreq: null, 
        highFreq: null

    }

    MsgHandler = ( event ) =>{
        //console.log(event)
        const messageToBeEncoded = event.target.value;
        console.log(messageToBeEncoded)
        this.setState({messageToBeEncoded: messageToBeEncoded})
    }

    render(){
        let encodedBitString = null;
        let encodedBitStringLength = null; 
        let decodedMsg = null; 
        return(
            <div className={classes.ArithmeticCodec}>
                <div className={classes.ArithmeticAlgorithm}>
                <h1>Arithmetic Codec</h1>
                <div>
                    <input type="text" onChange={this.MsgHandler}></input>
                    <button onClick= {this.FrequencyInitiation}>Encode MSG</button>
                    <br></br>
                    <h3>Encoded BitString : {encodedBitString} </h3>
                    <h3>Encoded BitStringLength : {encodedBitStringLength} </h3>
               </div>
               <div>
                    <input type="text" onChange={this.decodeMsgHandler}></input>
                    <button onClick= {this.MessageDecoderWithScaling}>Decode MSG</button>
                    <h3>Decoded Msg : {decodedMsg} </h3>
                    
               </div>
               </div>
           </div>
        )
    }
}

export default BinaryAdaptiveArithmetic; 