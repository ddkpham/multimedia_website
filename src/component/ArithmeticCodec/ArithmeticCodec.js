import React, { Component } from 'react'

import classes from './ArithmeticCodec.module.css'
class ArithmeticCodec extends Component{
    state = {
        letterFrequency : {
            a : 0.08167,
            b: 0.01492,
            c: 0.02782,
            d: 0.04253,
            e: 0.12702,
            f: 0.02228,
            g: 0.02015,
            h: 0.06094,
            i: 0.06966,
            j: 0.00153,
            k: 0.00772,
            l: 0.04025,
            m: 0.02405,
            n: 0.06748,
            o: 0.07506,
            p: 0.01928,
            q: 0.00094,
            r: 0.05986,
            s: 0.06326,
            t: 0.09055,
            u: 0.02757, 
            v: 0.00977, 
            w: 0.02360, 
            x: 0.00150,
            y: 0.01973,
            z: 0.00073, 
            $: 0.00007,
            space: 0.00007
        }, 
        lowFreq : [],
        highFreq: [],
        cumulativeFreqCheck: false,
        messageToBeDecoded: ""
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
        //console.log("highFreq[]",highFreq)
        this.setState({highFreq: highFreq}, this.Encoder)

    }

    Encoder = () => {
        let messageToBeDecoded = this.state.messageToBeDecoded;
        console.log("messageToBeDecoded: ",messageToBeDecoded)
        let a = 0.0;
        let b = 1.0;
        let width = 1.0;
        let bitString = "";
        let letterIndex = null;
        //console.log('message length: ', len)
        let messageArr = messageToBeDecoded.split("")
        //add terminating character to message
        messageArr.push('$')
        let len = messageToBeDecoded.length + 1

        //console.log(messageArr)
        const highFreq = Object.values(this.state.highFreq)
        const lowFreq = Object.values(this.state.lowFreq)
        console.log("highFreq:", highFreq)
        for(let i =0; i<len; i++){
            console.log("letter to be decoded: ", messageArr[i])
            letterIndex = this.findLetterIndex(messageArr[i])
            // console.log("before a: ", a)
            // console.log("before b: ", b)
            width = b - a;
            // console.log("width:", width)
            console.log("letterIndex:", letterIndex)
            b = a + width * (highFreq[letterIndex])
            a = a + width * (lowFreq[letterIndex])
            console.log("lowFreq: ", lowFreq);
            console.log("highFreq: ", highFreq);
            console.log("a: ", a)
            console.log("b: ", b)

            //Check if scaling is required
            //E1/E2 
            while (b<= 0.5 || a >= 0.5){
                console.log("im in e1/2 scaling")
                if(b <=0.5){ //E1 Scaling
                    this.e1Scaling( a ,b , bitString );
                }   //E2 Scaling
                else{
                    this.e2Scaling( a ,b , bitString );
                }
            }
            //E3
            let s = 0; 
            if(a > 0.25 && b < 0.75){
                this.e3Scaling( a , b, s , bitString )
            }
            
        }
        console.log("bitString: ", bitString)
    }

    e1Scaling = (a, b, bitString) =>{
        bitString.concat(bitString, '0')
            a = 2 * a;
            b = 2 * b;
    }

    e2Scaling = (a, b, bitString) =>{
        bitString.concat(bitString, '1')
            a = 2 * (a - 0.5)
            b = 2 * (b - 0.5)
    }

    e3Scaling = (a, b, s, bitString) => {
        while (a > 0.25 && b < 0.75){
            s += 1;
            a = 2 * (a - 0.25)
            b = 2 * (b - 0.25)
            console.log("im in e3 scaling")
        }
        if(a < 0.25){
            bitString.concat(bitString, '0');
            for (let i = 0; i < s; i++){
                bitString.concat(bitString, '1');
            }
        } else {
            bitString.concat(bitString, '1');
            for (let i = 0; i < s; i++){
                bitString.concat(bitString, '0');
            }
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
        
        
        return (
           <div className={classes.ArithmeticCodec}>
               <h1>Arithmetic Codec</h1>
               <input type="text" onChange={this.MsgHandler}></input>
               <button onClick= {this.FrequencyInitiation}>Click me</button>
           </div>
        )
    }
}

export default ArithmeticCodec;