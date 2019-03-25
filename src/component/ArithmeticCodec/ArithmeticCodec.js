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
            a: 0.2,
            b: 0.1,
            c: 0.2,
            d: 0.05,
            e: 0.3,
            f: 0.05,
            $: 0.1
            
        }, 
        lowFreq : [],
        highFreq: [],
        cumulativeFreqCheck: false,
        messageToBeDecoded: "",
        encodedBitString: "",
        encodedBitStringLength: null
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
        let messageToBeDecoded = this.state.messageToBeDecoded;
        // console.log("messageToBeDecoded: ",messageToBeDecoded)
        let a = 0.0;
        let b = 1.0;
        let width = 1.0;
        let s = 0;
        let bitString = "";
        let letterIndex = null;
        let messageArr = messageToBeDecoded.split("")
        //add terminating character to message
        messageArr.push('$')
        let len = messageToBeDecoded.length + 1

        const highFreq = Object.values(this.state.highFreq)
        const lowFreq = Object.values(this.state.lowFreq)
        for(let i =0; i<len; i++){
            letterIndex = this.findLetterIndex(messageArr[i])
            width = b - a;
            console.log("width: ", width)
            b = a + width * (highFreq[letterIndex])
            a = a + width * (lowFreq[letterIndex])

            console.log("letter to be encoded", messageArr[i])
            console.log("s: ", s)
            console.log("a: ", a)
            console.log("b: ", b)
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
                    console.log("E1 Scaling...")
                    console.log("s: ", s)
                    console.log("a: ", a)
                    console.log("b: ", b)
                    console.log("[bitString]: ", bitString)
                }   //E2 Scaling
                else{
                    scaledValues = this.e2Scaling( a ,b ,s, bitString );
                    a = scaledValues.a
                    b = scaledValues.b
                    s = scaledValues.s
                    bitString = scaledValues.bitString
                    console.log("E2 Scaling...")
                    console.log("s: ", s)
                    console.log("a: ", a)
                    console.log("b: ", b)
                    console.log("[bitString]: ", bitString)
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
                    console.log("E3 Scaling...")
                    console.log("s: ", s)
                    console.log("a: ", a)
                    console.log("b: ", b)
                    console.log("[bitString]: ", bitString)
                
            }
        
        console.log("Letter has been encoded")
        }
        console.log("exited for loop")
        s = s+1;
        if(a <= 0.25){
            bitString = bitString.concat('0')
            for (let i = 0; i < s; i++){
                bitString = bitString.concat( '1')
            }
            console.log("s: ", s)
            console.log("a: ", a)
            console.log("b: ", b)
            console.log("[bitString]: ", bitString)

            
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
            console.log("s: ", s)
            console.log("a: ", a)
            console.log("b: ", b)
           
        }
        // if(a <= 0.25){
        //     bitString = bitString.concat( '0')
        //     for (let i = 0; i < s; i++){
        //         bitString = bitString.concat( '1')
        //     }
        //     console.log("a: ", a)
        //     console.log("b: ", b)
        //     console.log("[bitString]: ", bitString)

            
        // } else {
        //     bitString = bitString.concat( '1')
        //     for (let i = 0; i < s; i++){
        //         bitString = bitString.concat( '0')
        //     }
        //     console.log("a: ", a)
        //     console.log("b: ", b)
        //     console.log("[bitString]: ", bitString)

        // }
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
        let letterArr = Object.keys(this.state.letterFrequency);
        //console.log("[findLetterIndex fn]:",letterArr);
        let letterIndex = alphabetArr.indexOf(letter);
        //console.log("letter index", letterIndex);
        return letterIndex
    }

    MsgHandler = ( event ) =>{
        //console.log(event)
        const messageToBeDecoded = event.target.value;
        console.log(messageToBeDecoded)
        this.setState({messageToBeDecoded: messageToBeDecoded})
    }

    render(){
        this.frequencyTotalCheck();
        //this.lowFrequencyInitiation();
        let encodedBitString = <p>{this.state.encodedBitString}</p>
        let encodedBitStringLength = <p>{this.state.encodedBitStringLength}</p>
        
        
        return (
           <div className={classes.ArithmeticCodec}>
               <h1>Arithmetic Codec</h1>
               <input type="text" onChange={this.MsgHandler}></input>
               <button onClick= {this.FrequencyInitiation}>Click me</button>

               <h1>Encoded BitString : {encodedBitString} </h1>
               <h1>Encoded BitStringLength : {encodedBitStringLength} </h1>
           </div>
        )
    }
}

export default ArithmeticCodec;