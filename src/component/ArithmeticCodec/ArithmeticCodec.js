import React, { Component } from 'react'

import classes from './ArithmeticCodec.module.css'
class ArithmeticCodec extends Component{
    state = {
        letterFrequency : {
            // a : 0.08167,
            // b: 0.01492,
            // c: 0.02782,
            // d: 0.04253,
            // e: 0.12702,
            // f: 0.02228,
            // g: 0.02015,
            // h: 0.06094,
            // i: 0.06966,
            // j: 0.00153,
            // k: 0.00772,
            // l: 0.04025,
            // m: 0.02405,
            // n: 0.06748,
            // o: 0.07506,
            // p: 0.01928,
            // q: 0.00094,
            // r: 0.05986,
            // s: 0.06326,
            // t: 0.09055,
            // u: 0.02757, 
            // v: 0.00977, 
            // w: 0.02360, 
            // x: 0.00150,
            // y: 0.01973,
            // z: 0.00073, 
            // $: 0.00007,
            // space: 0.00007
            
            // a: 0.2,
            // b: 0.1,
            // c: 0.2,
            // d: 0.05,
            // e: 0.3,
            // f: 0.05,
            // $: 0.1

            a: 0.5,
            b: 0.2, 
            c: 0.2999,
            $: 0.0001
            
        }, 
        lowFreq : [],
        highFreq: [],
        cumulativeFreqCheck: false,
        messageToBeEncoded: "",
        encodedBitString: "",
        encodedBitStringLength: null,
        messageToBeDecoded: "",
        decodedMsg: "",
        encodedMsgLength: null
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log(nextState.cumulativeFreq !== this.state.cumulativeFreq)
        return nextState !== this.state;
        
    }

    frequencyTotalCheck = () => {
        let letterFrequency = this.state.letterFrequency;
        let totalFrequency = Object.values(letterFrequency).reduce(( total, el) =>{
            //console.log(el)
            return el + total
        }, 0);

        //console.log(typeof(letterFrequency))
        //console.log(totalFrequency)
    }

    FrequencyInitiation = () =>{
        let letterFrequency = Object.values(this.state.letterFrequency)
        let len = letterFrequency.length
        //console.log(letterFrequency)
        //console.log(len)
        let lowFreq = []
        let cumulativeTotal = 0
        //set cumulative frequency for letter 'a'
        lowFreq.push(0)
        for (let i=0; i<len-1; i++ ){
            cumulativeTotal += letterFrequency[i]
            lowFreq.push(parseFloat(cumulativeTotal))
        }
        //console.log(cumulativeFreq)
        //console.log(cumulativeFreq.length)
        this.setState({lowFreq: lowFreq, cumulativeFreqCheck:true}, this.highFrequencyInitiation)

    }

    highFrequencyInitiation = () =>{
        //console.log("starting high freq")
        let letterFreq = this.state.letterFrequency;
        let letterFreqArr = Object.values(letterFreq);
        //console.log("letter Freq: ",letterFreq)
        let cumulativeFreq = this.state.lowFreq;
        //console.log("cumulative Freq: ",cumulativeFreq)
        let len = Object.keys(letterFreq).length
        //console.log("length:", len)
        let highFreq = []
        let letterHighFreq;
        for (let i=0; i<len; i++){
            //console.log(letterFreqArr[i])
            letterHighFreq = letterFreqArr[i] + cumulativeFreq[i];
            highFreq.push(letterHighFreq)
        }
        console.log("lowFreq[]",this.state.lowFreq)
        console.log("highFreq[]",highFreq)
        this.setState({highFreq: highFreq}, this.Encoder)

    }

    Encoder = () => {
        let messageToBeEncoded = this.state.messageToBeEncoded;
        let a = 0.0;
        let b = 1.0;
        let width = 1.0;
        let s = 0;
        let bitString = "";
        let letterIndex = null;
        let messageArr = messageToBeEncoded.split("")
        
        //add terminating character to message
        messageArr.push('$')
        let len = messageToBeEncoded.length + 1
        this.setState({encodedMsgLength: len})

        const highFreq = Object.values(this.state.highFreq)
        const lowFreq = Object.values(this.state.lowFreq)
        for(let i =0; i<len; i++){
            letterIndex = this.findLetterIndex(messageArr[i])
            width = b - a;
            // console.log("width: ", width)
            b = a + width * (highFreq[letterIndex])
            a = a + width * (lowFreq[letterIndex])

            // console.log("letter to be encoded", messageArr[i])
            // console.log("s: ", s)
            // console.log("a: ", a)
            // console.log("b: ", b)
            //Check if scaling is required
            //E1/E2 
            let scaledValues = null;
            console.log("before entering scaling check s: ", s)
            while (b<= 0.5 || a >= 0.5){
                
                if(b <=0.5){ //E1 Scaling
                    scaledValues = this.e1Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                    // console.log("E1 Scaling...")
                    // console.log("s: ", s)
                    // console.log("a: ", a)
                    // console.log("b: ", b)
                    // console.log("[bitString]: ", bitString)
                }   //E2 Scaling
                else{
                    scaledValues = this.e2Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                    // console.log("E2 Scaling...")
                    // console.log("s: ", s)
                    // console.log("a: ", a)
                    // console.log("b: ", b)
                    // console.log("[bitString]: ", bitString)
                }
                
                

            }
            //E3
            
            if(a > 0.25 && b < 0.75){
                scaledValues = null; 
                scaledValues = this.e3Scaling( a , b, s , bitString )
                a = scaledValues.a
                b = scaledValues.b
                s = scaledValues.s
                bitString = scaledValues.bitString
                    // console.log("E3 Scaling...")
                    // console.log("s: ", s)
                    // console.log("a: ", a)
                    // console.log("b: ", b)
                    // console.log("[bitString]: ", bitString)
                
            }
        
        
        }
        
        s = s+1;
        if(a <= 0.25){
            bitString = bitString.concat('0')
            for (let i = 0; i < s; i++){
                bitString = bitString.concat( '1')
            }
            // console.log("s: ", s)
            // console.log("a: ", a)
            // console.log("b: ", b)
            // console.log("[bitString]: ", bitString)

            
        } else {
            bitString = bitString.concat( '1')
            for (let i = 0; i < s; i++){
                bitString = bitString.concat( '0')
            }
            console.log("[bitString]: ", bitString)

        }
        console.log("[bitString]: ", bitString)
        let bitStringLength = bitString.length
        this.setState({encodedBitString: bitString, encodedBitStringLength: bitStringLength })
        
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
            a = 2 * (a - 0.5)
            b = 2 * (b - 0.5)
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
            a = 2 * (a - 0.25)
            b = 2 * (b - 0.25)
           
        }
        return {
            a: a,
            b: b,
            s: s,
            bitString: bitString
        }
    }

    findLetterIndex = (letter) =>{
        let alphabetArr = Object.keys(this.state.letterFrequency)
        if(letter === " "){
            letter = "space"
        }
        let letterIndex = alphabetArr.indexOf(letter);
        //console.log("letter index", letterIndex);
        return letterIndex
    }

    MsgHandler = ( event ) =>{
        //console.log(event)
        const messageToBeEncoded = event.target.value;
        console.log(messageToBeEncoded)
        this.setState({messageToBeEncoded: messageToBeEncoded})
    }

    decodeMsgHandler = ( event ) =>{
        //console.log(event)
        const messageToBeDecoded = event.target.value;
        console.log(messageToBeDecoded)
        this.setState({messageToBeDecoded: messageToBeDecoded})
    }

    MessageDecoderWithScaling = ()=>{
        let bitString = this.state.messageToBeDecoded;
        //find symbol with min frequency
        //1. find symbol with minFrequency
        let minFreqSymbolFreq = this.symbolIndexWithMinFrequency()
        console.log(minFreqSymbolFreq)

        //2. find length of bits for window size
        let windowSize = this.findBitsForWindowSize(minFreqSymbolFreq)
        //3. set window size 
        // start = 0  end = l - 1
        let bitStringToBeDecoded = this.state.encodedBitString;
        console.log(bitStringToBeDecoded)
        let bitStringArr = bitStringToBeDecoded.split("");
        let start = 0;
        let end = start + windowSize; 
        // while symbol is not EOF 
        // take in window size number of bits from bitstream
        // find symbol range that fits in that window
        // once you find a symbol, shift 1 bit right performing E1/E2 scaling
        // if symbol is EOF break 
        
        
        console.log(bitStringArr.slice(start, end))
        let letterArr = Object.keys(this.state.letterFrequency)
        let symbolListLength = letterArr.length
        let symbol = null;
        let tempBitStringArr = null;
        //slice is not inclusive
        let x = 0;
        let val = 0;
        let a = 0;
        let b = 1;
        let atemp = 0;
        let btemp = 1;
        let width = b-a;
        let highFreq = this.state.highFreq;
        let lowFreq = this.state.lowFreq;
        let decodedMsg = ""
        let charLimit = 100
        let decodedSequenceLengthSoFar = 0;
        let msgLength = this.state.encodedMsgLength;
        


        while(symbol !== "$" && x < charLimit && decodedSequenceLengthSoFar < msgLength-1){
            console.log("[Beggining of loop]")
            console.log("[decoded sequence length]:", decodedSequenceLengthSoFar)
            console.log("[msg length]:", msgLength-1 )
            x +=1; 
            tempBitStringArr = bitStringArr.slice(start, end);
            //convert bitstring to Freq
            val = this.bitStringArrToTargetValue(tempBitStringArr);
            console.log(val)
            //check to see if val fits in any of the symbol high-low ranges
            for(let i = 0; i< symbolListLength; i++){
                width = b - a;
                btemp = a + width * (highFreq[i])
                atemp = a + width * (lowFreq[i])
                console.log("trying symbol: ", letterArr[i])
                console.log("atemp: ", atemp)
                console.log("btemp: ", btemp)
                console.log("val: ", val)
                if(val >= atemp && val < btemp){
                    console.log("TARGET FOUND")
                    console.log("decodedletter: ", letterArr[i])
                    let decodedLetter = String(letterArr[i])
                    if(decodedLetter === "space"){
                        decodedLetter = " "
                    }
                    decodedMsg = decodedMsg.concat(decodedLetter)
                    console.log("decoded MSG so far:", decodedMsg)
                    
                    decodedSequenceLengthSoFar += 1;
                    console.log("[decoded sequence length]:", decodedSequenceLengthSoFar)
                    console.log("[msg length]:", msgLength-1 )
                    if(decodedSequenceLengthSoFar == msgLength-1){
                        break;
                    }
                    a = atemp;
                    b = btemp;
                    symbol = decodedLetter;
                    
                }
                while (b < 0.5 || a > 0.5){
                    console.log("E1/E2 scaling...")
                    if(b < 0.5){
                        a = 2 * a;
                        b = 2 * b;
                        //shift bits 
                        start += 1;
                        end += 1;

                    } else {
                        a = 2 * (a - 0.5);
                        b = 2 * (b - 0.5);
                        //shift bits
                        start += 1;
                        end += 1;
                    }
                }
                
                
            }
            console.log('[x]', x)
            console.log('[symbol]', symbol)
            console.log("exiting letter check")
            
        }
        this.setState({decodedMsg: decodedMsg})

    }

    symbolIndexWithMinFrequency = () => {
        console.log("finding symbol with min freq")
        let lowFreqArr = this.state.letterFrequency;
        lowFreqArr = Object.values(lowFreqArr)
        let len = lowFreqArr.length
        console.log("length: ", len)
        let minFreq = 1;
        //let minIndex = -1;
        for(let i =0; i<len; i++){
            if(lowFreqArr[i] < minFreq){
                minFreq = lowFreqArr[i];
                //minIndex = i;
            }
        }
        return minFreq
    }

    findBitsForWindowSize = (minFreq) =>{
        console.log("finding window size")
        let windowSize = -Math.log2(minFreq)
        windowSize = Math.ceil(windowSize)
        console.log(windowSize)
        return windowSize
    }

    MessageDecoder = () =>{
        let bitString = this.state.messageToBeDecoded;
        let targetVal = this.bitStringToTargetValue(bitString)
        let decodedMsg = ""
        const highFreq = Object.values(this.state.highFreq)
        const lowFreq = Object.values(this.state.lowFreq)
        console.log('highFreq:' , highFreq)
        console.log('lowFreq:' , lowFreq)
        let a = 0;
        let b = 1;
        let atemp = 0;
        let btemp = 1;
        let width = b - a;
        let notEndOfString = true;
        let letterArr = Object.keys(this.state.letterFrequency)
        let len = letterArr.length
        let x = 0;
        let messageCharLimit = 100
        while(notEndOfString && x < messageCharLimit){
            for(let i=0; i<len; i++){
                width = b - a;
                btemp = a + width * (highFreq[i])
                atemp = a + width * (lowFreq[i])
                
                console.log("atemp: ", atemp)
                console.log("btemp: ", btemp)
                console.log("targetVal", targetVal)

                if(targetVal >= atemp && targetVal <btemp){
                    console.log("TARGET FOUND")
                    console.log("decodedletter: ", letterArr[i])
                    let decodedLetter = String(letterArr[i])
                    if(decodedLetter === "space"){
                        decodedLetter = " "
                    }
                    decodedMsg = decodedMsg.concat(decodedLetter)
                    console.log("decoded MSG so far:", decodedMsg)
                    a = atemp;
                    b = btemp;
                    if(letterArr[i]=== '$' ){
                        notEndOfString = false;
                    }
                }
                
            }
            x++;
        }

        console.log("decodedMsg: ", decodedMsg);
        this.setState({decodedMsg: decodedMsg})
        
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
        this.frequencyTotalCheck();
        //this.lowFrequencyInitiation();
        let encodedBitString = <p>{this.state.encodedBitString}</p>
        let encodedBitStringLength = <p>{this.state.encodedBitStringLength}</p>
        let decodedMsg = this.state.decodedMsg.split("$")
        decodedMsg = decodedMsg[0]
        decodedMsg = <p>{decodedMsg}</p>
        
        
        return (
           <div className={classes.ArithmeticCodec}>
               <h1>Arithmetic Codec</h1>
               <div>
                    <input type="text" onChange={this.MsgHandler}></input>
                    <button onClick= {this.FrequencyInitiation}>Encode MSG</button>

                    <h1>Encoded BitString : {encodedBitString} </h1>
                    <h1>Encoded BitStringLength : {encodedBitStringLength} </h1>
               </div>
               <div>
                    <input type="text" onChange={this.decodeMsgHandler}></input>
                    <button onClick= {this.MessageDecoderWithScaling}>Decode MSG</button>
                    <h1>Decoded Msg : {decodedMsg} </h1>
                    
               </div>
           </div>
        )
    }
}

export default ArithmeticCodec;