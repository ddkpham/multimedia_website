import React, { Component } from 'react';

import classes from './Huffman.module.css'
import DemoNav from '../DemoNav/DemoNav';

class HuffmanTree {

    constructor( symbol, count){
        this.left = null;
        this.right = null;
        this.parent = null;
        this.symbol = symbol;
        this.count = count; 
    }

}




// User defined class 
// to store element and its priority 
class QElement { 
    constructor(element, priority) 
    { 
        this.element = element; 
        this.priority = priority; 
    } 
} 

    // PriorityQueue class 
class PriorityQueue { 
  
    // An array is used to implement priority 
    constructor() 
    { 
        this.items = []; 
    } 
  
    // functions to be implemented 
    enqueue = (huffTree) => {
        'use strict';
        //console.log('enqueing...')
        var contain = false;

        // if queue is empty 
        // let list = JSON.stringify(this.items)
        // console.log("[items before empty]", list)
        if(this.isEmpty()){
            this.items.push(huffTree)
            return
        }
        //find where to put element into queue
        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].count >= huffTree.count) { 
                console.log("adding another item")
                // enqueued 
                let beforeInsertTree = this.items
                console.log('[Before Insertion]',beforeInsertTree)
                
                this.items.splice(i, 0, huffTree); 
                let afterInsertTree = this.items
                console.log('[After Insertion]',afterInsertTree)
                contain = true; 
                break; 
            } 
        } 
        //if the element has the highest priority push to end 
        // console.log("item is largest")
        // console.log(contain)
        if(!contain){
            // console.log('large item pushing to back...')
            this.items.push(huffTree); 
            // let test = this.items
            // console.log(test)
        }
        

    }
    dequeue = ()=>{
        // return the dequeued element 
        // and remove it. 
        // if the queue is empty 
        // returns Underflow 
        if (this.isEmpty()){
            return "Underflow"; 
        } 
        return this.items.shift();
    }

    front = ()=>{
        if(this.isEmpty()){
            return "Empty Queue"
        }
        return this.items[0]
    }
    
    rear = ()=>{
        // returns the lowest priorty 
        // element of the queue 
        if (this.isEmpty()){
            return "No elements in Queue";
        } 
         
        return this.items[this.items.length - 1]; 
    }

    isEmpty =()=>{
        return this.items.length == 0;
    }

    getLength = () =>{
        return this.items.length
    }

    printQueue = ()=>{
        //console.log("inside printQueue")
        if(this.isEmpty()){
            return "Queue is empty"
        }
        var str = ""; 
        let len = this.items.length
        let list = {...this.items}
        console.log(list)
        for (var i = 0; i < len; i++){
            str += list[i].symbol + " ";
        } 
            
        return str;
    }
}

class Huffman extends Component{
    state = {
        msgToBeDecoded: null, 
        symbolToCodeWord: null, 
        codeWordToSymbol: null,
        encodedMsg: "", 
        BitStringLength: null
    }

    inputHandler = (event) =>{
        //console.log(event.target.value)
        let msgToBeDecoded = event.target.value
        this.setState({msgToBeDecoded:msgToBeDecoded})
    }
    

    HuffmanEncoder = ()=>{
        console.log("[Huffman] Encoding....")
        let symbolList = []
        let msgToBeDecoded = this.state.msgToBeDecoded;
        let msgArr = msgToBeDecoded.split("");
        var map = this.frequencyCalculate(msgArr);
        //console.log(map)
        let pQueue = new PriorityQueue()
        for (var [key, value] of map){
            let newHuffTree = new HuffmanTree(key, value)
            console.log(newHuffTree)
            pQueue.enqueue(newHuffTree)
            symbolList.push(newHuffTree)

        }
        // console.log(symbolList)
        // pQueue.printQueue();
        while (pQueue.getLength() > 1){
            let subTree1 = pQueue.dequeue();
            let subTree2 = pQueue.dequeue();
            let metaTree = new HuffmanTree(null, subTree1.count + subTree2.count)
            metaTree.left = subTree1;
            metaTree.right = subTree2;
            subTree1.parent = metaTree;
            subTree2.parent = metaTree;
            pQueue.enqueue(metaTree);
            
        }

        pQueue.printQueue()
        console.log("creating maps....")

        let symbolListLen = symbolList.length
        console.log(symbolListLen)
        let symbolToCodeWord = new Map();
        let codeWordToSymbol = new Map();
        for(let i=0; i< symbolListLen; i++ ){
            console.log("going through symbol list...")
            let node = symbolList[i];
            let currNode = node; 
            let prevNode = null; 
            let codeWord = ""
            while(currNode.parent !== null){
                console.log("traversing tree....")
                prevNode = currNode;
                currNode = currNode.parent; 
                if(prevNode === currNode.left){
                    codeWord = "0" + codeWord;
                } else if (prevNode === currNode.right){
                    codeWord = "1" + codeWord;
                }
                else {
                    console.log("idiot")
                }
            }
            symbolToCodeWord.set(node.symbol, codeWord)
            codeWordToSymbol.set(codeWord, node.symbol)

            console.log("[symbolToCodeWord]:",symbolToCodeWord)
            console.log("[codeWordToSymbol]",codeWordToSymbol)

            

            

        }
        let encodedMsg = ""
        let msgArrLen = msgArr.length
        for(let i = 0; i< msgArrLen; i++ ){
            let symbol = msgArr[i]
            let bitString = symbolToCodeWord.get(symbol)
            encodedMsg = encodedMsg + bitString
        }
        console.log("[symbolToCodeWord]:",symbolToCodeWord)
        console.log("[codeWordToSymbol]",codeWordToSymbol)
        this.setState({symbolToCodeWord:symbolToCodeWord, codeWordToSymbol: codeWordToSymbol, encodedMsg:encodedMsg}, ()=>{
            console.log(this.state.symbolToCodeWord, this.state.codeWordToSymbol, this.state.encodedMsg)
        })
        console.log(encodedMsg)
        let BitStringLength = encodedMsg.split("").length
        this.setState({BitStringLength:BitStringLength})
    
        // let symbol2code = this.state.symbolToCodeWord;
        // let code2symbol = this.state.codeWordToSymbol;
        // console.log("testing map set", symbol2code, code2symbol)

        

    }

    decodeMsgHandler = ()=>{
        let decodedMsg = "";
        let currCodeWord = "";
        let encodedMsg = this.state.encodedMsg;
        let encodedMsgArr = encodedMsg.split("");
        let encodedMsgArrLen = encodedMsgArr.length
        let codeWordToSymbol = this.state.codeWordToSymbol;
        for(let i = 0; i<encodedMsgArrLen; i++){
            currCodeWord = currCodeWord + encodedMsgArr[i];
            if(codeWordToSymbol.get(currCodeWord) !== undefined){
                decodedMsg = decodedMsg + codeWordToSymbol.get(currCodeWord);
                currCodeWord = "";
            }
        }
        console.log("[decodedMSG]", decodedMsg)
        this.setState({decodedMsg: decodedMsg})
        
    }

    frequencyCalculate = (msgArr) =>{
        let len = msgArr.length 
        var map = new Map()
        for(let i=0; i< len; i++){
            if(map.get(msgArr[i])=== undefined){
                map.set(msgArr[i], 1)
            } else {
                let count = map.get(msgArr[i]) + 1
                map.set(msgArr[i], count);
            }
         }
         return map 
    }

    render(){
        let encodedMsg = this.state.encodedMsg;
        let decodedMsg = this.state.decodedMsg;
        let BitStringLength = this.state.BitStringLength;
        console.log("[final decoded MSG:]", decodedMsg)
        // creating object for queue classs 
        // var priorityQueue = new PriorityQueue(); 
        
        // testing isEmpty and front on an empty queue 
        // return true 
        // console.log("[Empty check]", priorityQueue.isEmpty()); 
        
        // // returns "Empty Queue" 
        // console.log(priorityQueue.front()); 
        
        // adding elements to the queue 
        // priorityQueue.enqueue("David", 2); 
        // priorityQueue.enqueue("Subin", 1); 
        // priorityQueue.enqueue("Paul", 3); 
        // priorityQueue.enqueue("Winfield", 3); 
        
        
        // prints [Subin, David Paul] 
        //console.log(priorityQueue.printQueue()); 
        
        // prints Subin 
        //console.log(priorityQueue.front().element); 
        
        // // pritns Paul 
        // console.log(priorityQueue.rear().element); 
        
        // removes Subin 
        // priorityQueue contains 
        // [David Paul] 
        //console.log(priorityQueue.dequeue().element); 
        
        // Adding another element to the queue 
        //priorityQueue.enqueue("Winfield", 1); 
        
        // prints [Winfield, David, Paul] 
        //console.log(priorityQueue.printQueue());
        return (
            <div className={classes.Huffman}>
                <DemoNav></DemoNav>
                <div className={classes.HuffmanAlgorithm}>
                    <h1>HUFFMAN DEMO</h1>
                    <div>
                        <input type="text" onChange={this.inputHandler}></input>
                        <button onClick= {this.HuffmanEncoder}>Encode MSG</button>

                        <h3>Encoded BitString : {encodedMsg} </h3>
                        <h3>Encoded BitStringLength : {BitStringLength} </h3>
                </div>
                <div>
                        <input type="text" onChange={null}></input>
                        <button onClick= {this.decodeMsgHandler}>Decode MSG</button>
                        <h3>Decoded Msg : {decodedMsg} </h3>
                </div>
               </div>
            </div>
        )
    }
}

export default Huffman;