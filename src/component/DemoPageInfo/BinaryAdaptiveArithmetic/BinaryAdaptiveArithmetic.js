import React, {Component} from 'react';

import classes from './BinaryAdaptiveArithmetic.module.css';


class BinaryAdaptiveArithmetic extends Component{
    state = {
        encodedBitString: null, 
        encodedBitStringLength: 0,
        decodedMsg: null, 
        messageToBeEncoded: "", 
        msgLength:0,
        symbolCount :[1,1],
        symbolProbability: [],
        lowFreq: null, 
        highFreq: null,
        totalSymbolCount: 2,
        encoderInitiated: false,
        messageToBeDecoded: ""

    }

    MsgHandler = ( event ) =>{
        //console.log(event)
        const messageToBeEncoded = event.target.value;
        //console.log(messageToBeEncoded)
        let msgLength = messageToBeEncoded.split("").length
        this.setState({messageToBeEncoded: messageToBeEncoded, msgLength:msgLength})
    }

    encoder = () =>{
        this.setState({encoderInitiated:true})
        //initiate symbol count to 1 for all symbols. 
        this.symbolCountInitiation()

        //calculate initial Probability of Symbols and Ranges
        //this.calculateSymbolProbabilty()

        let messageToBeEncoded = this.state.messageToBeEncoded;
        let letterIndex = null;
        let messageArr = messageToBeEncoded.split("")
        let msgLength = messageArr.length
        this.setState({msgLength: msgLength})
        
        //add terminating character to message
        // messageArr.push('$')
        // let len = messageToBeEncoded.length + 1
        // this.setState({encodedMsgLength: len})

        let a = 0.0;
        let b = 1.0;
        let width = 1.0;
        let s = 0;
        let bitString = "";
        //set high and low Frequency arrays
        let lowFreq = this.state.lowFreq;
        let highFreq = this.state.highFreq;
        let symbolCount = this.state.symbolCount;
        let totalSymbolCount = this.state.totalSymbolCount
        let symbolProbability = [];
        //console.log("lowFreq and HighFreq:", lowFreq, highFreq)
        let len = this.state.msgLength
        for(let i = 0; i<len; i++){
            letterIndex = this.findLetterIndex(messageArr[i])
            width = b - a;
            // update start and end intervals
            b = a + width * (highFreq[letterIndex])
            a = a + width * (lowFreq[letterIndex])

            //increase symbol count and total symbol count
            symbolCount[letterIndex] = symbolCount[letterIndex] + 1;
            totalSymbolCount = totalSymbolCount + 1;

            //E1/E2/E3 Scaling
            let scaledValues = null;
            while (b<= 0.5 || a >= 0.5){
                
                if(b <=0.5){ //E1 Scaling
                    console.log("E1 scaling")
                    scaledValues = this.e1Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                }   
                else{ //E2 Scaling
                    console.log("E2 scaling")
                    scaledValues = this.e2Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                }
            }
            //E3 Scaling
            
            if(a > 0.25 && b < 0.75){
                console.log("E3 scaling")
                scaledValues = null; 
                scaledValues = this.e3Scaling( a , b, s , bitString )
                a = scaledValues.a
                b = scaledValues.b
                s = scaledValues.s
                bitString = scaledValues.bitString
            }
            //update Probabilities and Frequency arrays 
            symbolProbability = this.updateSymbolProbabilty(symbolCount, totalSymbolCount);
            //console.log("[symbolProbability]: ", symbolProbability)
            lowFreq = this.updateLowFrequencies(symbolProbability);
            // console.log("[lowFreq]: ", lowFreq)
            highFreq = this.updateHighFrequencies(symbolProbability)
            // console.log("[highFreq]: ", highFreq)
             //console.log(symbolCount)
        }
        s = s + 1;
        if(a <= 0.25){
            bitString = bitString.concat('0')
            for (let i = 0; i < s; i++){
                bitString = bitString.concat( '1')
            }
        } else {
            bitString = bitString.concat( '1')
            for (let i = 0; i < s; i++){
                bitString = bitString.concat( '0')
            }
            //console.log("[bitString]: ", bitString)

        }
        // console.log("[bitString]: ", bitString)
        let bitStringLength = bitString.length
        // console.log("bitStringLength", bitStringLength)
        this.setState({encodedBitString: bitString, encodedBitStringLength: bitStringLength })

    }

    updateSymbolProbabilty = (symbolCount, totalSymbolCount) =>{
        //console.log("[updating Symbol Pr]",symbolCount, totalSymbolCount)
        let symbolProbability = [];
        let len = symbolCount.length;
        for(let i = 0; i< len; i++){
            symbolProbability[i] = symbolCount[i] / totalSymbolCount
        }
        console.log("[updateSymbol Probability function]",symbolProbability)
        return symbolProbability
        
        //this.setState({symbolProbability: symbolProbability}, this.calculateLowFrequencies)
        
    }

    updateLowFrequencies = (symbolProbability) =>{
        //console.log(symbolProbability)
        let lowFreq = [];
        let cumulativeTotal = 0;
        // let symbolProbability = this.state.symbolProbability;
        // console.log("symbolProb", symbolProbability)
        lowFreq.push(0)
        for (let i=0; i<1; i++ ){
            cumulativeTotal += symbolProbability[i]
            lowFreq.push(parseFloat(cumulativeTotal))
        }
        //this.setState({lowFreq:lowFreq}, this.calculateHighFrequencies)
        return lowFreq
        
    }
    updateHighFrequencies = (symbolProbability) =>{
        let highFreq = [];
        //let symbolProbability = this.state.symbolProbability;
        let cumulativeTotal = 0;
        for (let i=0; i<2; i++){
            cumulativeTotal += symbolProbability[i];
            highFreq.push(parseFloat(cumulativeTotal));
        }
        // console.log("[highFreq]",highFreq)
        // this.setState({highFreq:highFreq}, this.encoderWithCheck)
        return highFreq
        
    }

    e1Scaling = (a, b, s,  bitString) =>{
        bitString = bitString.concat( '0')
        for(let i = 0; i < s; i++){
            bitString = bitString.concat('1');
        }
            s = 0;
            a = 2 * a;
            b = 2 * b;
            return {
                a: a,
                b: b,
                s: s,
                bitString: bitString
            }
    }

    e2Scaling = (a, b, s, bitString) =>{
        bitString = bitString.concat( '1')
        for(let i = 0; i < s; i++){
            bitString = bitString.concat('0');
        }
            s = 0;
            a = 2 * Math.abs(a - 0.5)
            b = 2 * Math.abs(b - 0.5)
            return {
                a: a,
                b: b,
                s:s,
                bitString: bitString
            }
    }

    e3Scaling = (a, b, s, bitString) => {
        while (a > 0.25 && b < 0.75){
            s += 1;
            a = 2 * Math.abs(a - 0.25)
            b = 2 * Math.abs(b - 0.25)
           
        }
        return {
            a: a,
            b: b,
            s: s,
            bitString: bitString
        }
    }


    findLetterIndex = (letter)=>{
        if(letter === 'a'){
            return 0
        } else{
            return 1
        }
    }

    symbolCountInitiation = ()=>{
        let symbolCount = [1, 1];
        this.setState ({symbolCount: symbolCount})
    }

    calculateSymbolProbabilty = () =>{
        let symbolCount = this.state.symbolCount
        let symbolProbability = symbolCount.map((symbolCount)=>{
            let totalSymbolCount = this.state.totalSymbolCount;
            return symbolCount/totalSymbolCount
        })
        // console.log(symbolProbability)
        this.setState({symbolProbability: symbolProbability}, this.calculateLowFrequencies)
        
    }

    calculateLowFrequencies = () =>{
        let lowFreq = [];
        let cumulativeTotal = 0;
        let symbolProbability = this.state.symbolProbability;
        // console.log("symbolProb", symbolProbability)
        lowFreq.push(0)
        for (let i=0; i<1; i++ ){
            cumulativeTotal += symbolProbability[i]
            lowFreq.push(parseFloat(cumulativeTotal))
        }
        this.setState({lowFreq:lowFreq}, this.calculateHighFrequencies)
        
    }
    calculateHighFrequencies = () =>{
        let highFreq = [];
        let symbolProbability = this.state.symbolProbability;
        let cumulativeTotal = 0;
        for (let i=0; i<2; i++){
            cumulativeTotal += symbolProbability[i];
            highFreq.push(parseFloat(cumulativeTotal));
        }
        //console.log("[highFreq]",highFreq)
        this.setState({highFreq:highFreq}, this.encoder)
        
    }

    encoderWithCheck = () =>{
        if(this.state.encoderInitiated){
            return
        } else {
            this.encoder();
        }
    }

    decodeMsgHandler = ( event ) =>{
        //console.log(event)
        const messageToBeDecoded = event.target.value;
        // console.log(messageToBeDecoded)
        this.setState({messageToBeDecoded: messageToBeDecoded})
    }

    MessageDecoderWithScaling = ()=>{
        console.log('----------------Decoding Message---------------------')
        //find symbol with min frequency
        //1. find symbol with minFrequency
        // let minFreqSymbolFreq = this.symbolIndexWithMinFrequency()
        // console.log(minFreqSymbolFreq)

        //2. find length of bits for window size
        // let windowSize = this.findBitsForWindowSize(minFreqSymbolFreq)

        let windowSize = this.state.encodedBitStringLength;

        //3. set window size 
        // start = 0  end = l - 1
        let bitStringToBeDecoded = this.state.encodedBitString;
        //console.log(bitStringToBeDecoded)
        let bitStringArr = bitStringToBeDecoded.split("");
        let start = 0;
        let end = start + windowSize; 
        // while symbol is not EOF 
        // take in window size number of bits from bitstream
        // find symbol range that fits in that window
        // once you find a symbol, shift 1 bit right performing E1/E2 scaling
        // if symbol is EOF break 
    
        // let letterArr = Object.keys(this.state.letterFrequency)
        let symbolListLength = this.state.symbolCount.length;
        let symbol = null;
        let tempBitStringArr = null;
        //slice is not inclusive
        //set up initial parameters for scaling. 
        let x = 0;
        let val = 0;
        let a = 0;
        let b = 1;
        let atemp = 0;
        let btemp = 1;
        let width = b-a;
        let symbolCount = [1,1]
        let symbolProbability = [0.5,0.5]
        let highFreq = [0.5,1.0]
        let lowFreq = [0,0.5]
        let decodedMsg = ""
        let charLimit = 20
        let decodedSequenceLengthSoFar = 0;
        let msgLength = this.state.msgLength;
        let totalSymbolCount = 2;
        


        while(x < charLimit && decodedSequenceLengthSoFar < msgLength){
            x +=1; 
            tempBitStringArr = bitStringArr.slice(start, end);
            //convert bitstring to interval value
            val = this.bitStringArrToTargetValue(tempBitStringArr);

            //check to see if val fits in any of the symbol high-low ranges
            for(let i = 0; i< symbolListLength; i++){
                console.log('[before update a]: ', a)
                console.log('[before update b]: ', b)
                console.log('Letter being tested: ', this.decodedLetter(i))
                width = b - a;
                btemp = a + width * (highFreq[i])
                atemp = a + width * (lowFreq[i])
                console.log('[width]: ', width)
                console.log('[highFreq]: ', highFreq)
                console.log('[lowFreq]: ', lowFreq)
                console.log('[after update atemp]: ', atemp)
                console.log('[after update btemp]: ', btemp)
                console.log('[val]:', val)

                if(val >= atemp && val < btemp){
                    let decodedLetter = this.decodedLetter(i);
                    //increase symbol count and total symbol count
                    symbolCount[i] = symbolCount[i] + 1;
                    totalSymbolCount = totalSymbolCount + 1;

                    console.log('[TARGET FOUND]:', decodedLetter)

                    decodedMsg = decodedMsg.concat(decodedLetter)
                    decodedSequenceLengthSoFar += 1;
                    console.log('[Decoded MsgsoFar]:', decodedMsg)


                    // if(decodedSequenceLengthSoFar == msgLength){
                    //     break;
                    // }
                    a = atemp;
                    b = btemp;
                    symbol = decodedLetter;
                    
                }
                // E1/E2 scaling. Will Implement if there is time. 
                // while (b < 0.5 || a > 0.5){ 
                //     //console.log("E1/E2 scaling...")
                //     if(b < 0.5){ //E1 scaling 
                //         console.log('E1 Scaling...')
                //         console.log('[before update a]: ', a)
                //         console.log('[before update b]: ', b)
                //         a = 2 * a;
                //         b = 2 * b;
                //         console.log('[after update a]: ', a)
                //         console.log('[after update b]: ', b)
                //         //shift bits 
                //         start += 1;
                //         end += 1;

                //     } else { //E2 scaling
                //         console.log('E2 Scaling...')
                //         console.log('[before update a]: ', a)
                //         console.log('[before update b]: ', b)
                //         a = 2 * (a - 0.5);
                //         b = 2 * (b - 0.5);
                //         console.log('[after update a]: ', a)
                //         console.log('[after update b]: ', b)
                //         //shift bits
                //         start += 1;
                //         end += 1;
                //     }
                // }
                console.log('[before update symbolProbability]', symbolProbability)
                console.log('[before update lowFreq]', lowFreq)
                console.log('[before update highFreq]', highFreq)
                 //update Probabilities and Frequency arrays 
                symbolProbability = this.updateSymbolProbabilty(symbolCount, totalSymbolCount);
                //console.log("[symbolProbability]: ", symbolProbability)
                lowFreq = this.updateLowFrequencies(symbolProbability);
                // console.log("[lowFreq]: ", lowFreq)
                highFreq = this.updateHighFrequencies(symbolProbability)
                console.log('[after update symbolProbability]', symbolProbability)
                console.log('[after update lowFreq]', lowFreq)
                console.log('[after update highFreq]', highFreq)
                // console.log("[highFreq]: ", highFreq)
                //console.log(symbolCount)
                // console.log("updated Probabilities and Frequency arrays")
                
                
            }
            
        }
        this.setState({decodedMsg: decodedMsg})

    }

    decodedLetter = (index)=>{
        if(index === 0){
            return 'a'
        } else{
            return 'b'
        }
    }
    
    bitStringArrToTargetValue = (bitStringArr)=>{
        let len = bitStringArr.length
        let value = 0;
        let target = 0; 
        //compute target/binary string value
        for(let i=1; i< len+1; i++){
            value = parseInt(bitStringArr[i-1]);
            if (value === 1){
                // console.log("i", i)
                let currAddition = 1/(Math.pow(2,i))
                // console.log(currAddition)
                target += currAddition
            }

        }
        //console.log("[bitStringArrToTargetValue] target", target)
        return target
        //console.log(target)
    }

    bitStringToTargetValue = (bitString)=>{
        let bitStringArr = bitString.split("")
        let len = bitStringArr.length
        let value = 0;
        let target = 0; 
        //compute target/binary string value
        for(let i=1; i< len+1; i++){
            value = parseInt(bitStringArr[i-1]);
            if (value === 1){
                // console.log("i", i)
                let currAddition = 1/(Math.pow(2,i))
                // console.log(currAddition)
                target += currAddition
            }

        }
        return target
        //console.log(target)
    }


    


    render(){
        let encodedBitString = this.state.encodedBitString;
        let encodedBitStringLength = this.state.encodedBitStringLength; 
        let decodedMsg = this.state.decodedMsg; 
        return(
            <div className={classes.ArithmeticCodec}>
                <div className={classes.ArithmeticAlgorithm}>
                <h1>Binary Arithmetic Codec</h1>
                <div>
                    <input type="text" onChange={this.MsgHandler}></input>
                    <button onClick= {this.calculateSymbolProbabilty}>Encode MSG</button>
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