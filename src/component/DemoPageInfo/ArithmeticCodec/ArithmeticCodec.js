import React, { Component } from 'react'

import classes from './ArithmeticCodec.module.css';
import IntervalBar from '../../IntervalBars/IntervalBar/IntervalBar';
import E1IntervalBar from '../../IntervalBars/E1IntervalBar/E1IntervalBar'
import E2IntervalBar from '../../IntervalBars/E2IntervalBar/E2IntervalBar'
import E3IntervalBar from '../../IntervalBars/E3IntervalBar/E3IntervalBar'
import DemoNav from '../DemoNav/DemoNav';
import DecodedMsgBox from '../DecodedMsgBox/DecodedMsgBox'
import ArithmeticCodecUpdateMsg from './ArithmeticCodecUpdateMsg/ArithmeticCodecUpdateMsg'
import FinalEmissionMsg from './FinalEmissionMsg/FinalEmissionMsg'
import EncodedBitStringMsg from './EncodedBitStringMsg/EncodedBitStringMsg'
/*import Button from '../../../component/UI/Button/Button'*/
import { Button } from 'reactstrap';


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

            a: 0.4,
            b: 0.3, 
            c: 0.2,
            $: 0.1
            
        }, 
        lowFreq : [],
        highFreq: [],
        cumulativeFreqCheck: false,
        messageToBeEncoded: "",
        encodedBitString: "",
        encodedBitStringLength: null,
        messageToBeDecoded: "",
        EncodedMsgSoFar: "",
        lettersEncodedSoFar: 0,
        decodedMsg: "",
        letterToBeEncoded: "",
        encodedMsgLength: null,
        startBeforeUpdate: 0.0,
        endBeforeUpdate: 1.0,
        startAfterUpdate: 0.0,
        endAfterUpdate: 1.0,
        startAfterScaling: 0.0,
        endAfterScaling: 1.0,
        start: 0.0,
        end: 1.0,
        s: 0,
        width: 1.0,
        e1IntervalInfo : [],
        e2IntervalInfo : [],
        e3IntervalInfo : [],
        encoderInitated:false, 
        prevS: 0,
        finalScalingInitiated:false,
        finalScalingfirstQuarter:false,
        finalScalingthirdQuarter:false, 
        finalScalingSValue: 0

    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log(nextState.cumulativeFreq !== this.state.cumulativeFreq)
        return nextState !== this.state;
        
    }
    componentDidUpdate() {
        window.scrollTo(0, 0)
    }

    // frequencyTotalCheck = () => {
    //     let letterFrequency = this.state.letterFrequency;
    //     let totalFrequency = Object.values(letterFrequency).reduce(( total, el) =>{
       
    //         return el + total
    //     }, 0);

    // }

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
        this.setState({highFreq: highFreq}, this.EncoderWithUI)

    }

    EncoderWithUI = () => {
        // append terminator letter to sequence 
        if(this.state.lettersEncodedSoFar === 0){
            //console.log("0 letters coded so far")
            let msgArr = this.state.messageToBeEncoded.split("")
            msgArr.push('$')
            let msgLength = msgArr.length;
            let messageToBeEncoded = msgArr.join("")
            this.setState({encodedMsgLength:msgLength , messageToBeEncoded: messageToBeEncoded, encoderInitated:true})
            //console.log(messageToBeEncoded)

        }
        
        let msgLength = this.state.messageToBeEncoded;
        msgLength = msgLength.length
        let lettersEncodedSoFar = this.state.lettersEncodedSoFar;
        //console.log("[letters encoded so far]", lettersEncodedSoFar)
        if(lettersEncodedSoFar >= msgLength){
            //console.log('FINISHED ENCODING')
        } else{
            
            let reset = [];
            //RESET E1/2/3 states 
            //this.setState({e1IntervalInfo: reset, e2IntervalInfo: reset, e3IntervalInfo: reset})
            //initiate variables
            let messageToBeEncoded = this.state.messageToBeEncoded;
            let a = this.state.start;
            let b = this.state.end;
            //console.log("[a,b]: ", a, b)
            let width = this.state.width;
            let s = this.state.s;
            let bitString = this.state.encodedBitString;
            let letterIndex = null;
            let messageArr = messageToBeEncoded.split("")
            //obtain letter to be encoded
            lettersEncodedSoFar = this.state.lettersEncodedSoFar;
            
            //console.log("[lettersEncodedSoFar]:", lettersEncodedSoFar)
            let letterToBeEncoded = messageArr[lettersEncodedSoFar];

            //Initiate Freq Arrays 
            const highFreq = Object.values(this.state.highFreq)
            const lowFreq = Object.values(this.state.lowFreq)

            //Encode Letter
            letterIndex = this.findLetterIndex(letterToBeEncoded)
            //console.log("[letterIndex]: ", letterIndex)
            width = b - a;
            // console.log("width: ", width)
            this.setState({startBeforeUpdate:a, endBeforeUpdate:b})
            b = a + width * (highFreq[letterIndex])
            a = a + width * (lowFreq[letterIndex])
            this.setState({startAfterUpdate: a, endAfterUpdate:b})

            // console.log("[a]: ", a)
            // console.log("[b]: ", b)

            let scaledValues = null;
            // let test = {...this.state.e1IntervalInfo}
            // console.log("test: ", test.a)
            //console.log("before entering scaling check s: ", s)
            let e1IntervalInfo = [];
            let e2IntervalInfo = [];
            let e3IntervalInfo = [];
            while (b<= 0.5 || a >= 0.5){
                
                if(b <=0.5){ //E1 Scaling
                    //console.log("e1 scaling")
                    let prevS = null;
                    prevS = s.toString();
                    scaledValues = this.e1Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                    // console.log("[E1 prevS]", prevS)
                    // console.log("[E1 s]", s)
                    let data = {
                        a:a,
                        b:b,
                        bitString: bitString,
                        prevS: prevS,
                        s:s
                    }
                    e1IntervalInfo.push(data)
                    // let e1IntervalInfo = [...this.state.e1IntervalInfo, data];
                    
                    // //e1IntervalInfo.push(data)
                    // this.setState({e1IntervalInfo: e1IntervalInfo, s:s})
                    
                }   
                else{ //E2 Scaling
                    //console.log("e2 scaling")
                    let prevS = null;
                    prevS = s.toString();
                    scaledValues = this.e2Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                    console.log('[E2 scaling bitstring]', bitString)
                    let e2IntervalInfo = [...this.state.e2IntervalInfo];
                    let data = {
                        a:a,
                        b:b,
                        bitString: bitString,
                        prevS: prevS,
                        s:s
                    }
                    e2IntervalInfo.push(data)
                    // e2IntervalInfo.push(data)
                    // this.setState({e2IntervalInfo: e2IntervalInfo, s:s})
                }
            }

            //E3 Scaling 
            let data = []
            //console.log("[a,b]", a, b)
            if(a > 0.25 && b < 0.75){
                //console.log("e3 scaling...")
                scaledValues = null; 
                let prevS = null;
                prevS = s.toString();
                scaledValues = this.e3Scaling( a , b, s , bitString , data )
                a = scaledValues.a
                b = scaledValues.b
                s = scaledValues.s
                bitString = scaledValues.bitString
                // let data = {
                //     a:a,
                //     b:b,
                //     bitString: bitString,
                //     prevS: prevS,
                //     s:s
                // }

                for(let i = 0; i<data.length ; i++){
                    e3IntervalInfo.push(data[i])
                }

                //console.log("%c [E3 scaling info]:", 'color:red', e3IntervalInfo)
                //this.setState({e3IntervalInfo: e3IntervalInfo, s:s})
            }
            //update intervalInfo and a,b,s values 
            this.setState({e1IntervalInfo:e1IntervalInfo, e2IntervalInfo:e2IntervalInfo, e3IntervalInfo:e3IntervalInfo})
            
            let lettersEncodedSoFar = this.state.lettersEncodedSoFar + 1;
            this.setState({lettersEncodedSoFar: lettersEncodedSoFar})
            if(lettersEncodedSoFar === msgLength){
                
                s = s + 1;
                if(a <= 0.25){
                    this.setState({finalScalingInitiated:true, finalScalingfirstQuarter:true, finalScalingSValue:s})
                    bitString = bitString.concat('0')
                    for (let i = 0; i < s; i++){
                        bitString = bitString.concat( '1')
                    }
                } else {
                    this.setState({finalScalingInitiated:true, finalScalingthirdQuarter:true, finalScalingSValue:s})
                    bitString = bitString.concat( '1')
                    for (let i = 0; i < s; i++){
                        bitString = bitString.concat( '0')
                    }
                    //console.log("[bitString]: ", bitString)

                }
                
                this.setState({encodedBitString:bitString})
            }

            //console.log("[bitString]: ", bitString)
            this.setState({encodedBitString: bitString, start:a, end:b, width:width, s:s})

        }
        

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


            //Check if scaling is required
            //E1/E2 
            let scaledValues = null;
            //console.log("before entering scaling check s: ", s)
            while (b<= 0.5 || a >= 0.5){
                
                if(b <=0.5){ //E1 Scaling
                    scaledValues = this.e1Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                }   
                else{ //E2 Scaling
                    scaledValues = this.e2Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                }
            }
            //E3 Scaling
            
            if(a > 0.25 && b < 0.75){
                scaledValues = null; 
                scaledValues = this.e3Scaling( a , b, s , bitString )
                a = scaledValues.a
                b = scaledValues.b
                s = scaledValues.s
                bitString = scaledValues.bitString
            }
        
        
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
        //console.log("[bitString]: ", bitString)
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
            a = 2 * Math.abs(a - 0.5)
            b = 2 * Math.abs(b - 0.5)
            return {
                a: a,
                b: b,
                s:s,
                bitString: bitString
            }
    }

    e3Scaling = (a, b, s, bitString, data) => {
        let prevS = null;
        while (a > 0.25 && b < 0.75){
            prevS = s
            s += 1;
            a = 2 * Math.abs(a - 0.25)
            b = 2 * Math.abs(b - 0.25)
            let info = {
                a:a,
                b:b,
                bitString: bitString,
                prevS: prevS,
                s:s
            }
            data.push(info)
           
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
        //console.log(messageToBeDecoded)
        this.setState({messageToBeDecoded: messageToBeDecoded})
    }

    MessageDecoderWithScaling = ()=>{
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
    
        let letterArr = Object.keys(this.state.letterFrequency)
        let symbolListLength = letterArr.length
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
        let highFreq = this.state.highFreq;
        let lowFreq = this.state.lowFreq;
        let decodedMsg = ""
        let charLimit = 100
        let decodedSequenceLengthSoFar = 0;
        let msgLength = this.state.encodedMsgLength;
        


        while(symbol !== "$" && x < charLimit && decodedSequenceLengthSoFar < msgLength-1){
            x +=1; 
            tempBitStringArr = bitStringArr.slice(start, end);
            //convert bitstring to interval value
            val = this.bitStringArrToTargetValue(tempBitStringArr);

            //check to see if val fits in any of the symbol high-low ranges
            for(let i = 0; i< symbolListLength; i++){
                width = b - a;
                btemp = a + width * (highFreq[i])
                atemp = a + width * (lowFreq[i])

                if(val >= atemp && val < btemp){
                    let decodedLetter = String(letterArr[i])
                    if(decodedLetter === "space"){
                        decodedLetter = " "
                    }

                    decodedMsg = decodedMsg.concat(decodedLetter)
                    decodedSequenceLengthSoFar += 1;

                    if(decodedSequenceLengthSoFar == msgLength-1){
                        break;
                    }
                    a = atemp;
                    b = btemp;
                    symbol = decodedLetter;
                    
                }
                while (b < 0.5 || a > 0.5){ 
                    //console.log("E1/E2 scaling...")
                    if(b < 0.5){ //E1 scaling 
                        a = 2 * a;
                        b = 2 * b;
                        //shift bits 
                        start += 1;
                        end += 1;

                    } else { //E2 scaling
                        a = 2 * (a - 0.5);
                        b = 2 * (b - 0.5);
                        //shift bits
                        start += 1;
                        end += 1;
                    }
                }
                
                
            }
            
        }
        this.setState({decodedMsg: decodedMsg})

    }



    symbolIndexWithMinFrequency = () => {
        //console.log("finding symbol with min freq")
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
        //console.log("finding window size")
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
        // console.log('highFreq:' , highFreq)
        // console.log('lowFreq:' , lowFreq)
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
                
                // console.log("atemp: ", atemp)
                // console.log("btemp: ", btemp)
                // console.log("targetVal", targetVal)

                if(targetVal >= atemp && targetVal <btemp){
                    // console.log("TARGET FOUND")
                    // console.log("decodedletter: ", letterArr[i])
                    let decodedLetter = String(letterArr[i])
                    if(decodedLetter === "space"){
                        decodedLetter = " "
                    }
                    decodedMsg = decodedMsg.concat(decodedLetter)
                    //console.log("decoded MSG so far:", decodedMsg)
                    a = atemp;
                    b = btemp;
                    if(letterArr[i]=== '$' ){
                        notEndOfString = false;
                    }
                }
                
            }
            x++;
        }

        //console.log("decodedMsg: ", decodedMsg);
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
        let encodeBtn = null;
        let compressionRatio = null;
        let continueEncodingBtn = null;
        if(this.state.encoderInitated && !this.state.finalScalingInitiated){
            continueEncodingBtn = <Button btnType="Success" clicked= {this.FrequencyInitiation}>Continue Encoding</Button>
        } else {
            encodeBtn = <Button disabled={!this.state.messageToBeEncoded} color="danger" onClick= {this.FrequencyInitiation}>Encode MSG</Button>
        }
        //this.frequencyTotalCheck();
        //this.lowFrequencyInitiation();
        let encodedBitString = <p>{this.state.encodedBitString}</p>
        let encodedBitStringLen = this.state.encodedBitString;
        encodedBitStringLen = encodedBitStringLen.split("").length
        console.log('encodedBitStringLen', encodedBitStringLen)
        let encodedBitStringLength = <p>{encodedBitStringLen}</p>
        let decodedMsg = this.state.decodedMsg.split("$")
        decodedMsg = decodedMsg[0]
        decodedMsg = <p>{decodedMsg}</p>
        let E1 = null;
        let E2 = null;
        let E3 = null;
        let finalScaling = null;
        if(this.state.finalScalingInitiated){
            if(this.state.finalScalingfirstQuarter){
                finalScaling = (
                    <div>
                        <h4><b>Final Emission</b></h4>
                        <h4>Emit "0"</h4>
                        <h4>Emit {this.state.finalScalingSValue} "1"s</h4>
                    </div>
                )
            } else{
                finalScaling = (
                    <div>
                        <h4><b>Final Emission</b></h4>
                        <h4>Emit "1"</h4>
                        <h4>Emit {this.state.finalScalingSValue} "0"s</h4>
                    </div>
                )
            }
            let encodedBSLen = this.state.encodedBitString.split("").length
            let compressRate = (this.state.encodedMsgLength * 8) / encodedBSLen
            compressRate = compressRate.toFixed(2)
            compressionRatio = <p>{compressRate}</p>
        }
        let e1IntervalInfo = this.state.e1IntervalInfo;
        let e2IntervalInfo = this.state.e2IntervalInfo;
        let e3IntervalInfo = this.state.e3IntervalInfo;
        let bitString = this.state.encodedBitString;
        let letterToBeEncodedMsg = null;
        let beforeUpdateMsg = null;
        let afterUpdateMsg = null;
        let afterScalingMsg = null;
        if(this.state.encoderInitated){
            let msgArr = this.state.messageToBeEncoded.split("")
            let letterToBeEncoded = msgArr[this.state.lettersEncodedSoFar-1]
            letterToBeEncodedMsg = (
                <div className={classes.updateMsg}>
                     <h4>Letter to be encoded: </h4>
                     <h5>{letterToBeEncoded}</h5>
                </div>
            )
            
            let startBeforeUpdate = this.state.startBeforeUpdate
            startBeforeUpdate = startBeforeUpdate.toFixed(2)
            let endBeforeUpdate = this.state.endBeforeUpdate
            endBeforeUpdate = endBeforeUpdate.toFixed(2)

            let startAfterUpdate = this.state.startAfterUpdate
            startAfterUpdate = startAfterUpdate.toFixed(2)
            let endAfterUpdate = this.state.endAfterUpdate
            endAfterUpdate = endAfterUpdate.toFixed(2)
            console.log("[startAfterUpdate]",startAfterUpdate)

            beforeUpdateMsg = (
                <div className={classes.updateMsg}>
                    <h4>Before Interval Update: </h4>
                    <IntervalBar start={startBeforeUpdate} end={endBeforeUpdate} />
                </div>
            )
            afterUpdateMsg = (
                <div className={classes.updateMsg}>
                    <h4>After Interval Update: </h4>
                    <IntervalBar start={startAfterUpdate} end={endAfterUpdate} />
                </div>
            )
        }
        //console.log(e1IntervalInfo)
        if(e1IntervalInfo.length > 0){
            //E1 = <E1IntervalBar start="0.0" end="1.0"  bitString={bitString}/>
            E1 = this.state.e1IntervalInfo.map((info, index)=>{
                let a = info.a
                a = a.toFixed(2)
                let b = info.b
                b = b.toFixed(2)
                return <E1IntervalBar key={index} start={info.a} end={info.b} bitString={info.bitString} s={info.s} prevS={info.prevS}/>
            })
            //console.log("E1 : ", E1)
            
        }
        if(e2IntervalInfo.length > 0){
            E2 = this.state.e2IntervalInfo.map((info, index)=>{
                let a = info.a
                a = a.toFixed(2)
                let b = info.b
                b = b.toFixed(2)
                return <E2IntervalBar key={index} start={a} end={b} bitString={info.bitString} s={info.s} prevS={info.prevS}/>
            })
            //console.log("E2 : ", E2)
        }
        //console.log('E3INTERVALINFOLENGTH: ', e3IntervalInfo)
        if(e3IntervalInfo.length > 0){
            //console.log('detected e3')
            E3 = this.state.e3IntervalInfo.map((info, index)=>{
                let a = info.a
                a = a.toFixed(2)
                let b = info.b
                b = b.toFixed(2)
                //console.log(b)
                return <E3IntervalBar key={index} start={a} end={b} bitString={info.bitString} s={info.s} prevS={info.prevS}/>
            })
            //console.log("E3 : ", E3)
        }

        // let msgStyle = {
        //     border: '5px dotted blue',
        //     height: '200px'
        // }
        
        
        return (
           <div className={classes.ArithmeticCodec}>
                <DemoNav></DemoNav>
                <div className={classes.ArithmeticAlgorithm}>
                <h1>Arithmetic Codec</h1>
                    <div>
                        <div className={classes.encoding}>
                            <input type="text" placeholder=" please enter the msg" onChange={this.MsgHandler}></input>
                            {encodeBtn}
                        </div>
                        
                        <ArithmeticCodecUpdateMsg 
                            show={this.state.encoderInitated}
                            beforeUpdateMsg={beforeUpdateMsg}
                            letterToBeEncodedMsg={letterToBeEncodedMsg}
                            afterUpdateMsg={afterUpdateMsg} />
                        {E1}
                        {E2}
                        {E3}
                        <FinalEmissionMsg 
                            finalScaling={finalScaling}
                            show={this.state.finalScalingInitiated} />
                        {continueEncodingBtn}
                        <EncodedBitStringMsg 
                            encodedBitString={encodedBitString} 
                            encodedBitStringLength={encodedBitStringLength} 
                            compressionRatio ={compressionRatio}
                        />
                </div>
               <div>
                   <div className={classes.decoding}>
                        <input type="text" onChange={this.decodeMsgHandler} placeholder=" please enter the msg"></input>
                        <Button 
                            disabled={!this.state.messageToBeDecoded}color="warning" onClick= {this.MessageDecoderWithScaling}>Decode MSG</Button>
                        <DecodedMsgBox decodedMsg={decodedMsg} />
                    </div>
               </div>
               </div>
           </div>
        )
    }
}

export default ArithmeticCodec;