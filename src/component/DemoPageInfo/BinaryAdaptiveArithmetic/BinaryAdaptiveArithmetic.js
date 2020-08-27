import React, { Component } from "react";

import classes from "./BinaryAdaptiveArithmetic.module.css";
import E1BinaryIntervalBar from "../BinaryAdaptiveArithmetic/E1BinaryIntervalBar/E1BinaryIntervalBar";
import E2BinaryIntervalBar from "../BinaryAdaptiveArithmetic/E2BinaryIntervalBar/E2BinaryIntervalBar";
import E3BinaryIntervalBar from "../BinaryAdaptiveArithmetic/E3BinaryIntervalBar/E3BinaryIntervalBar";
import BinaryIntervalBar from "../BinaryAdaptiveArithmetic/BinaryIntervalBar/BinaryIntervalBar";
// import Button from '../../../component/UI/Button/Button'
import DecodedMsgBox from "../DecodedMsgBox/DecodedMsgBox";
import EncodingIntroMsg from "../EncodingIntroMsg/EncodingIntroMsg";
import DemoNav from "../DemoNav/DemoNav";
import EncodedBitStringMsg from "../ArithmeticCodec/EncodedBitStringMsg/EncodedBitStringMsg";
import FinalEmissionMsg from "../ArithmeticCodec/FinalEmissionMsg/FinalEmissionMsg";
import CountTableBefore from "./CountTableBefore/CountTableBefore";
import CountTableAfter from "./CountTableAfter/CountTableAfter";
import { Button } from "reactstrap";
class BinaryAdaptiveArithmetic extends Component {
  state = {
    encodedBitString: "",
    encodedBitStringLength: 0,
    decodedMsg: null,
    messageToBeEncoded: null,
    msgLength: 0,
    prevSymbolCount: [1, 1],
    symbolCount: [1, 1],
    prevSymbolProbability: [0.5, 0.5],
    prevLowFreq: null,
    symbolProbability: [0.5, 0.5],
    lowFreq: null,
    highFreq: null,
    totalSymbolCount: 2,
    encoderInitiated: false,
    messageToBeDecoded: "",
    lettersEncodedSoFar: 0,
    startBeforeUpdate: 0.0,
    endBeforeUpdate: 1.0,
    startAfterUpdate: 0.0,
    endAfterUpdate: 1.0,
    startAfterScaling: 0.0,
    endAfterScaling: 1.0,
    start: 0.0,
    end: 1.0,
    prevS: 0,
    s: 0,
    width: 1.0,
    e1IntervalInfo: [],
    e2IntervalInfo: [],
    e3IntervalInfo: [],
    e2test: 1,
    finalScalingInitiated: false,
    finalScalingfirstQuarter: false,
    finalScalingthirdQuarter: false,
    finalScalingSValue: 0,
  };

  MsgHandler = (event) => {
    //console.log(event)
    const messageToBeEncoded = event.target.value;
    //console.log(messageToBeEncoded)
    let msgLength = messageToBeEncoded.split("").length;
    this.setState({
      messageToBeEncoded: messageToBeEncoded,
      msgLength: msgLength,
    });
  };
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  encoderWithUI = () => {
    let messageCheck = this.state.messageToBeEncoded.split("");
    if (messageCheck.length <= 0) {
      alert("dont forget to enter a message");
      return;
    }

    if (messageCheck.length >= 15) {
      alert("keep your messages to under 15. Trust me. Its for your good");
    }
    for (let i = 0; i < messageCheck.length; i++) {
      if (messageCheck[i] === "a" || messageCheck[i] === "b") {
        continue;
      } else {
        alert('only symbols "a" and "b" are allowed');
        return;
      }
    }
    if (this.state.lettersEncodedSoFar === 0) {
      this.symbolCountInitiation();
      this.setState({ encoderInitiated: true });
    }
    let msgLength = this.state.msgLength;
    let lettersEncodedSoFar = this.state.lettersEncodedSoFar;
    if (lettersEncodedSoFar >= msgLength) {
      console.log("finished Encoding!");
    } else {
      //reset all E1/E2/E3 components
      let reset = [];
      this.setState(
        { e1IntervalInfo: reset, e2IntervalInfo: reset, e3IntervalInfo: reset },
        () => {
          console.log("reseted:", this.state.e1IntervalInfo);
        }
      );

      //set up parameters
      let messageToBeEncoded = this.state.messageToBeEncoded;
      let a = this.state.start;
      let b = this.state.end;
      let width = this.state.width;
      let s = this.state.s;
      let bitString = this.state.encodedBitString;
      let letterIndex = null;
      //update previous states
      let prevLowFreq = this.state.lowFreq;
      let prevSymbolProbability = this.state.symbolProbability;
      let prevSymbolCount = this.state.symbolCount.slice(0);
      console.log(
        "[updating prevSymbol Count to symbol count]",
        prevSymbolCount
      );
      this.setState(
        {
          prevLowFreq: prevLowFreq,
          prevSymbolProbability: prevSymbolProbability,
          prevSymbolCount: prevSymbolCount,
        },
        () =>
          console.log("[setting prevSymbolCount]:", this.state.prevSymbolCount)
      );
      let lowFreq = this.state.lowFreq;
      let highFreq = this.state.highFreq;

      let symbolCount = this.state.symbolCount;
      let totalSymbolCount = this.state.totalSymbolCount;
      let symbolProbability = this.state.symbolProbability;
      let messageArr = messageToBeEncoded.split("");
      //obtain letter to be encoded
      lettersEncodedSoFar = this.state.lettersEncodedSoFar;

      let letterToBeEncoded = messageArr[lettersEncodedSoFar];
      letterIndex = this.findLetterIndex(letterToBeEncoded);
      width = b - a;
      // console.log("width: ", width)
      this.setState({ startBeforeUpdate: a, endBeforeUpdate: b });
      b = a + width * highFreq[letterIndex];
      a = a + width * lowFreq[letterIndex];
      this.setState({ startAfterUpdate: a, endAfterUpdate: b });

      //increase symbol count and total symbol count
      symbolCount[letterIndex] = symbolCount[letterIndex] + 1;
      totalSymbolCount = totalSymbolCount + 1;

      //E1/E2/E3 Scaling
      let scaledValues = null;
      let e1IntervalInfo = [];
      let e2IntervalInfo = [];
      while (b <= 0.5 || a >= 0.5) {
        if (b <= 0.5) {
          //E1 Scaling
          // console.log("E1 scaling")
          // console.log("before scaling a,b,s,bitString", a,b,s,bitString)
          let prevS = s;
          scaledValues = this.e1Scaling(a, b, s, bitString);
          a = scaledValues.a;
          b = scaledValues.b;
          s = scaledValues.s;
          bitString = scaledValues.bitString;
          // console.log("after scaling a,b,s,bitString", a,b,s,bitString)
          let aWidth = symbolProbability[0] * 100;
          aWidth = parseInt(aWidth);
          let bWidth = symbolProbability[1] * 100;
          bWidth = parseInt(bWidth);
          if (aWidth + bWidth !== 100) {
            bWidth = bWidth + 1;
          }
          // console.log('mid: ', lowFreq[1])
          let mid = (b - a) * lowFreq[1];
          mid = mid + a;
          // console.log('after mid: ', mid)
          let intervalInfo = {
            aWidth: aWidth,
            bWidth: bWidth,
            start: a.toFixed(2),
            mid: mid.toFixed(2),
            end: b.toFixed(2),
            prevS: prevS,
            s: s,
            bitString: bitString,
          };
          e1IntervalInfo.push(intervalInfo);

          //let e1IntervalInfo = [...this.state.e1IntervalInfo, intervalInfo];
          //console.log('e1IntervalInfo', e1IntervalInfo)
          //this.setState({e1IntervalInfo: e1IntervalInfo, s:s})
        } else {
          //E2 Scaling

          let prevS = s;
          scaledValues = this.e2Scaling(a, b, s, bitString);
          a = scaledValues.a;
          b = scaledValues.b;
          s = scaledValues.s;
          bitString = scaledValues.bitString;
          // console.log("a,b,s,bitString", a,b,s,bitString)
          // console.log("bitstring", bitString)
          let aWidth = symbolProbability[0] * 100;
          aWidth = parseInt(aWidth);
          let bWidth = symbolProbability[1] * 100;
          bWidth = parseInt(bWidth);
          // console.log('before mid: ', lowFreq[1])
          let mid = (b - a) * lowFreq[1];
          mid = mid + a;
          // console.log('after mid: ', mid)
          if (aWidth + bWidth !== 100) {
            bWidth = bWidth + 1;
          }
          let intervalInfo = {
            aWidth: aWidth,
            bWidth: bWidth,
            start: a.toFixed(2),
            mid: mid.toFixed(2),
            end: b.toFixed(2),
            prevS: prevS,
            s: s,
            bitString: bitString,
          };
          e2IntervalInfo.push(intervalInfo);
          // let e2IntervalInfo = [...this.state.e2IntervalInfo, intervalInfo];
          // console.log('e2IntervalInfo', e2IntervalInfo)
          // this.setState({e2IntervalInfo: e2IntervalInfo, s:s})
        }
      }
      //END of E1/E2 scaling
      this.setState({
        e1IntervalInfo: e1IntervalInfo,
        e2IntervalInfo: e2IntervalInfo,
        s: s,
      });

      //E3 Scaling
      let e3IntervalInfo = [];
      if (a > 0.25 && b < 0.75) {
        console.log("E3 scaling");
        scaledValues = null;
        let prevS = s;
        scaledValues = this.e3Scaling(a, b, s, bitString);
        a = scaledValues.a;
        b = scaledValues.b;
        s = scaledValues.s;
        bitString = scaledValues.bitString;
        //update E3 interval info
        let aWidth = symbolProbability[0] * 100;
        aWidth = parseInt(aWidth);
        let bWidth = symbolProbability[1] * 100;
        bWidth = parseInt(bWidth);
        if (aWidth + bWidth !== 100) {
          bWidth = bWidth + 1;
        }
        let mid = (b - a) * lowFreq[1];
        mid = mid + a;
        let intervalInfo = {
          aWidth: aWidth,
          bWidth: bWidth,
          start: a.toFixed(2),
          mid: mid.toFixed(2),
          end: b.toFixed(2),
          prevS: prevS,
          s: s,
          bitString: bitString,
        };
        e3IntervalInfo.push(intervalInfo);
        // let e3IntervalInfo = [...this.state.e3IntervalInfo, intervalInfo];
        console.log("e3IntervalInfo", e3IntervalInfo);
        // this.setState({e3IntervalInfo: e3IntervalInfo, s:s})
      }
      this.setState({ e3IntervalInfo: e3IntervalInfo, s: s });
      //update Probabilities and Frequency arrays
      // console.log("before updating symbolProbability, symbolCount, totalSymbolCount", symbolCount, totalSymbolCount)
      symbolProbability = this.updateSymbolProbabilty(
        symbolCount,
        totalSymbolCount
      );
      //console.log("[symbolProbability]: ", symbolProbability)
      lowFreq = this.updateLowFrequencies(symbolProbability);
      // console.log("[lowFreq]: ", lowFreq)
      highFreq = this.updateHighFrequencies(symbolProbability);
      // console.log("[highFreq]: ", highFreq)
      //console.log(symbolCount)

      let lettersEncodedSoFar = this.state.lettersEncodedSoFar + 1;
      this.setState({
        lettersEncodedSoFar: lettersEncodedSoFar,
        symbolProbability: symbolProbability,
        lowFreq: lowFreq,
        highFreq: highFreq,
        symbolCount: symbolCount,
        totalSymbolCount: totalSymbolCount,
      });

      if (lettersEncodedSoFar === msgLength) {
        s = s + 1;
        if (a <= 0.25) {
          this.setState({
            finalScalingInitiated: true,
            finalScalingfirstQuarter: true,
            finalScalingSValue: s,
          });
          bitString = bitString.concat("0");
          for (let i = 0; i < s; i++) {
            bitString = bitString.concat("1");
          }
        } else {
          this.setState({
            finalScalingInitiated: true,
            finalScalingthirdQuarter: true,
            finalScalingSValue: s,
          });
          bitString = bitString.concat("1");
          for (let i = 0; i < s; i++) {
            bitString = bitString.concat("0");
          }
          //console.log("[bitString]: ", bitString)
        }

        this.setState({ encodedBitString: bitString });
      }

      // console.log("[bitString]: ", bitString)
      this.setState({
        encodedBitString: bitString,
        start: a,
        end: b,
        width: width,
        s: s,
      });
    }
  };

  encoder = () => {
    this.setState({ encoderInitiated: true });
    //initiate symbol count to 1 for all symbols.
    this.symbolCountInitiation();

    //calculate initial Probability of Symbols and Ranges
    //this.calculateSymbolProbabilty()

    let messageToBeEncoded = this.state.messageToBeEncoded;
    let letterIndex = null;
    let messageArr = messageToBeEncoded.split("");
    let msgLength = messageArr.length;
    this.setState({ msgLength: msgLength });

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
    let totalSymbolCount = this.state.totalSymbolCount;
    let symbolProbability = [];
    //console.log("lowFreq and HighFreq:", lowFreq, highFreq)
    let len = this.state.msgLength;
    for (let i = 0; i < len; i++) {
      letterIndex = this.findLetterIndex(messageArr[i]);
      width = b - a;
      // update start and end intervals
      this.setState({ startBeforeUpdate: a, endBeforeUpdate: b });
      b = a + width * highFreq[letterIndex];
      a = a + width * lowFreq[letterIndex];
      this.setState({ startAfterUpdate: a, endAfterUpdate: b });

      //increase symbol count and total symbol count
      symbolCount[letterIndex] = symbolCount[letterIndex] + 1;
      totalSymbolCount = totalSymbolCount + 1;

      //E1/E2/E3 Scaling
      let scaledValues = null;
      while (b <= 0.5 || a >= 0.5) {
        if (b <= 0.5) {
          //E1 Scaling
          // console.log("E1 scaling")
          scaledValues = this.e1Scaling(a, b, s, bitString);
          a = scaledValues.a;
          b = scaledValues.b;
          s = scaledValues.s;
          bitString = scaledValues.bitString;
        } else {
          //E2 Scaling
          // console.log("E2 scaling")
          scaledValues = this.e2Scaling(a, b, s, bitString);
          a = scaledValues.a;
          b = scaledValues.b;
          s = scaledValues.s;
          bitString = scaledValues.bitString;
        }
      }
      //E3 Scaling

      if (a > 0.25 && b < 0.75) {
        // console.log("E3 scaling")
        scaledValues = null;
        scaledValues = this.e3Scaling(a, b, s, bitString);
        a = scaledValues.a;
        b = scaledValues.b;
        s = scaledValues.s;
        bitString = scaledValues.bitString;
      }
      //update Probabilities and Frequency arrays
      // console.log("before updating symbolProbability, symbolCount, totalSymbolCount", symbolCount, totalSymbolCount)
      symbolProbability = this.updateSymbolProbabilty(
        symbolCount,
        totalSymbolCount
      );
      //console.log("[symbolProbability]: ", symbolProbability)
      lowFreq = this.updateLowFrequencies(symbolProbability);
      // console.log("[lowFreq]: ", lowFreq)
      highFreq = this.updateHighFrequencies(symbolProbability);
      // console.log("[highFreq]: ", highFreq)
      //console.log(symbolCount)
    }
    s = s + 1;
    if (a <= 0.25) {
      bitString = bitString.concat("0");
      for (let i = 0; i < s; i++) {
        bitString = bitString.concat("1");
      }
    } else {
      bitString = bitString.concat("1");
      for (let i = 0; i < s; i++) {
        bitString = bitString.concat("0");
      }
      //console.log("[bitString]: ", bitString)
    }
    // console.log("[bitString]: ", bitString)
    let bitStringLength = bitString.length;
    // console.log("bitStringLength", bitStringLength)
    this.setState({
      encodedBitString: bitString,
      encodedBitStringLength: bitStringLength,
    });
  };

  updateSymbolProbabilty = (symbolCount, totalSymbolCount) => {
    console.log("[updating Symbol Pr]", symbolCount, totalSymbolCount);
    let symbolProbability = [];
    let len = symbolCount.length;
    for (let i = 0; i < len; i++) {
      symbolProbability[i] = symbolCount[i] / totalSymbolCount;
    }
    console.log("[updateSymbol Probability function]", symbolProbability);
    return symbolProbability;

    //this.setState({symbolProbability: symbolProbability}, this.calculateLowFrequencies)
  };

  updateLowFrequencies = (symbolProbability) => {
    //console.log(symbolProbability)
    let lowFreq = [];
    let cumulativeTotal = 0;
    // let symbolProbability = this.state.symbolProbability;
    // console.log("symbolProb", symbolProbability)
    lowFreq.push(0);
    for (let i = 0; i < 1; i++) {
      cumulativeTotal += symbolProbability[i];
      lowFreq.push(parseFloat(cumulativeTotal));
    }
    //this.setState({lowFreq:lowFreq}, this.calculateHighFrequencies)
    return lowFreq;
  };
  updateHighFrequencies = (symbolProbability) => {
    let highFreq = [];
    //let symbolProbability = this.state.symbolProbability;
    let cumulativeTotal = 0;
    for (let i = 0; i < 2; i++) {
      cumulativeTotal += symbolProbability[i];
      highFreq.push(parseFloat(cumulativeTotal));
    }
    // console.log("[highFreq]",highFreq)
    // this.setState({highFreq:highFreq}, this.encoderWithCheck)
    return highFreq;
  };

  e1Scaling = (a, b, s, bitString) => {
    bitString = bitString.concat("0");
    for (let i = 0; i < s; i++) {
      bitString = bitString.concat("1");
    }
    s = 0;
    a = 2 * a;
    b = 2 * b;
    return {
      a: a,
      b: b,
      s: s,
      bitString: bitString,
    };
  };

  e2Scaling = (a, b, s, bitString) => {
    bitString = bitString.concat("1");
    for (let i = 0; i < s; i++) {
      bitString = bitString.concat("0");
    }
    s = 0;
    a = 2 * Math.abs(a - 0.5);
    b = 2 * Math.abs(b - 0.5);
    return {
      a: a,
      b: b,
      s: s,
      bitString: bitString,
    };
  };

  e3Scaling = (a, b, s, bitString) => {
    while (a > 0.25 && b < 0.75) {
      s += 1;
      a = 2 * Math.abs(a - 0.25);
      b = 2 * Math.abs(b - 0.25);
    }
    return {
      a: a,
      b: b,
      s: s,
      bitString: bitString,
    };
  };

  findLetterIndex = (letter) => {
    if (letter === "a") {
      return 0;
    } else {
      return 1;
    }
  };

  symbolCountInitiation = () => {
    let symbolCount = [1, 1];
    this.setState({ symbolCount: symbolCount });
  };

  calculateSymbolProbabilty = () => {
    let symbolCount = this.state.symbolCount;
    let symbolProbability = symbolCount.map((symbolCount) => {
      let totalSymbolCount = this.state.totalSymbolCount;
      return symbolCount / totalSymbolCount;
    });
    // console.log(symbolProbability)
    this.setState(
      { symbolProbability: symbolProbability },
      this.calculateLowFrequencies
    );
  };

  calculateLowFrequencies = () => {
    let lowFreq = [];
    let cumulativeTotal = 0;
    let symbolProbability = this.state.symbolProbability;
    // console.log("symbolProb", symbolProbability)
    lowFreq.push(0);
    for (let i = 0; i < 1; i++) {
      cumulativeTotal += symbolProbability[i];
      lowFreq.push(parseFloat(cumulativeTotal));
    }
    this.setState({ lowFreq: lowFreq }, this.calculateHighFrequencies);
  };
  calculateHighFrequencies = () => {
    let highFreq = [];
    let symbolProbability = this.state.symbolProbability;
    let cumulativeTotal = 0;
    for (let i = 0; i < 2; i++) {
      cumulativeTotal += symbolProbability[i];
      highFreq.push(parseFloat(cumulativeTotal));
    }
    //console.log("[highFreq]",highFreq)
    this.setState({ highFreq: highFreq }, this.encoderWithUI);
  };

  encoderWithCheck = () => {
    if (this.state.encoderInitiated) {
      return;
    } else {
      this.encoder();
    }
  };

  decodeMsgHandler = (event) => {
    //console.log(event)
    const messageToBeDecoded = event.target.value;
    // console.log(messageToBeDecoded)
    this.setState({ messageToBeDecoded: messageToBeDecoded });
  };

  MessageDecoderWithScaling = () => {
    // console.log('----------------Decoding Message---------------------')
    //find symbol with min frequency
    //1. find symbol with minFrequency
    // let minFreqSymbolFreq = this.symbolIndexWithMinFrequency()
    // console.log(minFreqSymbolFreq)

    //2. find length of bits for window size
    // let windowSize = this.findBitsForWindowSize(minFreqSymbolFreq)

    let windowSize = this.state.encodedBitString.length;

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
    let symbolListLength = 2;
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
    let width = b - a;
    let symbolCount = [1, 1];
    let symbolProbability = [0.5, 0.5];
    let highFreq = [0.5, 1.0];
    let lowFreq = [0, 0.5];
    let decodedMsg = "";
    let charLimit = 20;
    let decodedSequenceLengthSoFar = 0;
    let msgLength = this.state.msgLength;
    let totalSymbolCount = 2;

    while (x < charLimit && decodedSequenceLengthSoFar < msgLength) {
      x += 1;
      // console.log('bitStringArr',bitStringArr)
      // console.log('start', start)
      // console.log('end', end)
      tempBitStringArr = bitStringArr.slice(start, end);
      //convert bitstring to interval value
      val = this.bitStringArrToTargetValue(tempBitStringArr);

      //check to see if val fits in any of the symbol high-low ranges
      for (let i = 0; i < symbolListLength; i++) {
        // console.log('[before update a]: ', a)
        // console.log('[before update b]: ', b)
        // console.log('Letter being tested: ', this.decodedLetter(i))
        width = b - a;
        btemp = a + width * highFreq[i];
        atemp = a + width * lowFreq[i];
        // console.log('[width]: ', width)
        // console.log('[highFreq]: ', highFreq)
        // console.log('[lowFreq]: ', lowFreq)
        // console.log('[after update atemp]: ', atemp)
        // console.log('[after update btemp]: ', btemp)
        // console.log('[val]:', val)

        if (val >= atemp && val < btemp) {
          let decodedLetter = this.decodedLetter(i);
          //increase symbol count and total symbol count
          symbolCount[i] = symbolCount[i] + 1;
          totalSymbolCount = totalSymbolCount + 1;

          // console.log('[TARGET FOUND]:', decodedLetter)

          decodedMsg = decodedMsg.concat(decodedLetter);
          decodedSequenceLengthSoFar += 1;
          // console.log('[Decoded MsgsoFar]:', decodedMsg)

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

        // console.log('[before update symbolProbability]', symbolProbability)
        // console.log('[before update lowFreq]', lowFreq)
        // console.log('[before update highFreq]', highFreq)
        //update Probabilities and Frequency arrays
        symbolProbability = this.updateSymbolProbabilty(
          symbolCount,
          totalSymbolCount
        );
        lowFreq = this.updateLowFrequencies(symbolProbability);
        highFreq = this.updateHighFrequencies(symbolProbability);
        // console.log('[after update symbolProbability]', symbolProbability)
        // console.log('[after update lowFreq]', lowFreq)
        // console.log('[after update highFreq]', highFreq)
      }
    }
    this.setState({ decodedMsg: decodedMsg });
  };

  decodedLetter = (index) => {
    if (index === 0) {
      return "a";
    } else {
      return "b";
    }
  };

  bitStringArrToTargetValue = (bitStringArr) => {
    let len = bitStringArr.length;
    let value = 0;
    let target = 0;
    //compute target/binary string value
    for (let i = 1; i < len + 1; i++) {
      value = parseInt(bitStringArr[i - 1]);
      if (value === 1) {
        // console.log("i", i)
        let currAddition = 1 / Math.pow(2, i);
        // console.log(currAddition)
        target += currAddition;
      }
    }
    //console.log("[bitStringArrToTargetValue] target", target)
    return target;
    //console.log(target)
  };

  bitStringToTargetValue = (bitString) => {
    let bitStringArr = bitString.split("");
    let len = bitStringArr.length;
    let value = 0;
    let target = 0;
    //compute target/binary string value
    for (let i = 1; i < len + 1; i++) {
      value = parseInt(bitStringArr[i - 1]);
      if (value === 1) {
        // console.log("i", i)
        let currAddition = 1 / Math.pow(2, i);
        // console.log(currAddition)
        target += currAddition;
      }
    }
    return target;
    //console.log(target)
  };

  render() {
    let encodeBtn = null;
    let continueEncodingBtn = null;
    if (this.state.encoderInitiated && !this.state.finalScalingInitiated) {
      continueEncodingBtn = (
        <Button
          btnType="Success"
          color="danger"
          onClick={this.calculateSymbolProbabilty}
        >
          Continue Encoding
        </Button>
      );
    } else {
      encodeBtn = (
        <Button
          disabled={!this.state.messageToBeEncoded}
          btnType="Success"
          color="danger"
          onClick={this.calculateSymbolProbabilty}
        >
          Encode MSG
        </Button>
      );
    }
    let encodedBitString = this.state.encodedBitString;
    let encodedBitStringLength = this.state.encodedBitString;
    encodedBitStringLength = encodedBitStringLength.split("").length;
    let decodedMsg = this.state.decodedMsg;
    let letterToBeEncodedMsg = null;
    let beforeUpdateMsg = null;
    let afterUpdateMsg = null;
    let E1 = null;
    let E2 = null;
    let E3 = null;
    let e1IntervalInfo = this.state.e1IntervalInfo;
    if (e1IntervalInfo.length > 0) {
      //E1 = <E1IntervalBar start="0.0" end="1.0"  bitString={bitString}/>
      E1 = this.state.e1IntervalInfo.map((info, index) => {
        return <E1BinaryIntervalBar key={index} intervalInfo={info} />;
      });
    }
    let e2IntervalInfo = this.state.e2IntervalInfo;
    if (e2IntervalInfo.length > 0) {
      //E1 = <E1IntervalBar start="0.0" end="1.0"  bitString={bitString}/>
      E2 = this.state.e2IntervalInfo.map((info, index) => {
        return <E2BinaryIntervalBar key={index} intervalInfo={info} />;
      });
    }
    let e3IntervalInfo = this.state.e3IntervalInfo;
    console.log("checking e3 length: ", e3IntervalInfo);
    if (e3IntervalInfo.length > 0) {
      //E1 = <E1IntervalBar start="0.0" end="1.0"  bitString={bitString}/>
      E3 = this.state.e3IntervalInfo.map((info, index) => {
        return <E3BinaryIntervalBar key={index} intervalInfo={info} />;
      });
    }
    if (this.state.encoderInitiated) {
      console.log("encoder initated!");
      //Letter to be encoded message
      let msgArr = this.state.messageToBeEncoded.split("");
      let letterToBeEncoded = msgArr[this.state.lettersEncodedSoFar - 1];
      letterToBeEncodedMsg = (
        <div>
          <h3>Letter to be encoded: </h3>
          <p>
            <strong>{letterToBeEncoded}</strong>
          </p>
        </div>
      );

      //Interval bar before update
      let startBeforeUpdate = this.state.startBeforeUpdate;
      startBeforeUpdate = startBeforeUpdate.toFixed(2);
      let endBeforeUpdate = this.state.endBeforeUpdate;
      endBeforeUpdate = endBeforeUpdate.toFixed(2);
      let aWidth = this.state.prevSymbolProbability[0] * 100;
      aWidth = parseInt(aWidth);
      let bWidth = this.state.prevSymbolProbability[1] * 100;
      bWidth = parseInt(bWidth);
      if (aWidth + bWidth !== 100) {
        bWidth = bWidth + 1;
      }
      let mid =
        (this.state.endBeforeUpdate - this.state.startBeforeUpdate) *
        this.state.prevLowFreq[1];
      mid = mid + this.state.startBeforeUpdate;
      mid = mid.toFixed(2);
      let intervalInfo = {
        aWidth: aWidth,
        bWidth: bWidth,
        start: startBeforeUpdate,
        mid: mid,
        end: endBeforeUpdate,
      };
      beforeUpdateMsg = (
        <div>
          <h3>Before Interval Update</h3>
          <BinaryIntervalBar intervalInfo={intervalInfo} />
        </div>
      );
      //Interval bar after update
      let startAfterUpdate = this.state.startAfterUpdate;
      startAfterUpdate = startAfterUpdate.toFixed(2);
      let endAfterUpdate = this.state.endAfterUpdate;
      endAfterUpdate = endAfterUpdate.toFixed(2);
      // console.log("[startAfterUpdate]",startAfterUpdate)
      // console.log('symbolProbability: ', this.state.symbolProbability)
      let symbolProbability = this.state.prevSymbolProbability;
      // console.log('[symbolProbability check ]', this.state.prevSymbolProbability)
      aWidth = symbolProbability[0] * 100;
      aWidth = parseInt(aWidth);
      bWidth = symbolProbability[1] * 100;
      bWidth = parseInt(bWidth);
      if (aWidth + bWidth !== 100) {
        bWidth = bWidth + 1;
      }
      mid =
        (this.state.endAfterUpdate - this.state.startAfterUpdate) *
        this.state.prevLowFreq[1];
      mid = mid + this.state.startAfterUpdate;
      mid = mid.toFixed(2);
      intervalInfo = {
        aWidth: aWidth,
        bWidth: bWidth,
        start: startAfterUpdate,
        mid: mid,
        end: endAfterUpdate,
      };

      afterUpdateMsg = (
        <div>
          <h3>After Interval Update</h3>
          <BinaryIntervalBar intervalInfo={intervalInfo} />
        </div>
      );
    }
    let finalScaling = null;
    let compressionRatio = null;
    if (this.state.finalScalingInitiated) {
      if (this.state.finalScalingfirstQuarter) {
        finalScaling = (
          <div>
            <h2>Final Emission</h2>
            <h3>Emit "0"</h3>
            <h3>Emit {this.state.finalScalingSValue} "1"s</h3>
          </div>
        );
      } else {
        finalScaling = (
          <div>
            <h2>Final Emission</h2>
            <h3>Emit "1"</h3>
            <h3>Emit {this.state.finalScalingSValue} "0"s</h3>
          </div>
        );
      }
      let messageLen = this.state.msgLength * 8;

      let compressRate = messageLen / encodedBitStringLength;
      compressionRatio = (
        <p>
          <strong>{compressRate}</strong>
        </p>
      );
    }
    let prevSymbolCount = this.state.prevSymbolCount;
    console.log("[assigning prevSymbolCount]", this.state.prevSymbolCount);
    let prevSymbolProbability = this.state.prevSymbolProbability;
    let symbolCount = this.state.symbolCount;
    let symbolProb = this.state.symbolProbability;

    let statsBefore = null;
    let statsAfter = null;
    if (this.state.encoderInitiated) {
      statsBefore = (
        <CountTableBefore
          symbolCount={prevSymbolCount}
          symbolProb={prevSymbolProbability}
        />
      );

      statsAfter = (
        <CountTableAfter symbolCount={symbolCount} symbolProb={symbolProb} />
      );
    }

    return (
      <div className={classes.ArithmeticCodec}>
        <div className={classes.ArithmeticAlgorithm}>
          <h1>Binary Adaptive Arithmetic Coding Demo</h1>
          <div>
            <input
              type="text"
              placeholder="enter msg for encoding"
              onChange={this.MsgHandler}
            ></input>
            <br></br>
            <br></br>
            {encodeBtn}
            <br></br>
            {statsBefore}
            <EncodingIntroMsg
              show={this.state.encoderInitiated}
              beforeUpdateMsg={beforeUpdateMsg}
              letterToBeEncodedMsg={letterToBeEncodedMsg}
              afterUpdateMsg={afterUpdateMsg}
            />
            {E1}
            {E2}
            {E3}
            <FinalEmissionMsg
              show={this.state.finalScalingInitiated}
              finalScaling={finalScaling}
            />

            {statsAfter}
            <br></br>
            {continueEncodingBtn}
            <EncodedBitStringMsg
              encodedBitString={encodedBitString}
              encodedBitStringLength={encodedBitStringLength}
              compressionRatio={compressionRatio}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="enter encoded bitstring"
              onChange={this.decodeMsgHandler}
            ></input>
            <br></br>
            <br></br>
            <Button
              disabled={!this.state.finalScalingInitiated}
              btnType="Success"
              color="success"
              onClick={this.MessageDecoderWithScaling}
            >
              Decode MSG
            </Button>
            <DecodedMsgBox decodedMsg={decodedMsg} />
          </div>
        </div>
      </div>
    );
  }
}

export default BinaryAdaptiveArithmetic;
