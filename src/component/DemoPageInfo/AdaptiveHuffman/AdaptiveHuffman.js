import React, {Component} from 'react';
import classes from './AdaptiveHuffman.module.css'

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


class AdaptiveHuffman extends Component{
    state = {
        map: null, 
        list: [], 
        freq: null,
        jsonObject: {
            name: 'subin',
            email: 'loser@hotmail.com'
        }

    }

    buttonHandler = ()=>{
        console.log("button clicked")
        //state changing 
        let map = []
        let jsonObject = {
            name: "subin",
            email: "not a loser"
        }
        this.setState({map:map, jsonObject: jsonObject})


        jsonObject = {...this.state.jsonObject};
        console.log(jsonObject)

    }



    render(){
        console.log('[rendering adaptive huffman comp]')
        let menu = null;
        if(this.state.map !== null){
            menu = (
                <div className={classes.AdaptiveHuffman}>
                    <h1>AdaptiveHuffman Demo</h1>
                     <button onClick={this.buttonHandler}></button>
                 </div>
            )
        }
        return(
            <div>
                <h1>AdaptiveHuffman Demo</h1>
                <button onClick={this.buttonHandler}></button>
            </div>
        )
    }
}



export default AdaptiveHuffman;