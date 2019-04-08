import React, {Component} from 'react';
import classes from './AdaptiveHuffman.module.css'
import DemoNav from '../DemoNav/DemoNav';

class HuffmanTree {

    constructor( symbol, count){
        this.left = null;
        this.right = null;
        this.parent = null;
        this.symbol = symbol;
        this.count = count;
        this.order = null;
    }

}

class AdaptiveHuffman extends Component{

    state = {
        msgToBeDecoded: null,
        encodedMsg: "",
        BitStringLength: null
    }

    inputHandler = (event) =>{
        //console.log(event.target.value)
        let msgToBeDecoded = event.target.value
        this.setState({msgToBeDecoded:msgToBeDecoded})
    }

    initialSymbolToCode = (symbol) =>{
        switch(symbol) {
            case "$":
                return "0"
            case "a":
                return "00001"
            case "b":
                return "00010"
            case "c":
                return "00011"
            case "d":
                return "00100"
            default:
                console.log("Unsupported Symbol")
                return null
        }
    }

    initialCodeToSymbol = (symbol) =>{
        switch(symbol) {
            case "0":
                return "$"
            case "00001":
                return "a"
            case "00010":
                return "b"
            case "00011":
                return "c"
            case "00100":
                return "d"
            default:
                console.log("Unsupported codeword")
                return null
        }
    }

    findNodesWithCount = (huffmanTree, count) =>{
        let nodesToVisit = []
        let nodesWithCount = []
        nodesToVisit.push(huffmanTree)
        while (nodesToVisit.length != 0) {
            let currNode = nodesToVisit.shift()
            if (currNode.count === count) {
                nodesWithCount.push(currNode)
            }
            if (currNode.left !== null) {
                nodesToVisit.push(currNode.left)
            }
            if (currNode.right !== null) {
                nodesToVisit.push(currNode.right)
            }
        }
        return nodesWithCount
    }

    reassignOrder = (huffmanTree) =>{
        let nodesToVisit = []
        nodesToVisit.push(huffmanTree)
        let order = 512;
        while (nodesToVisit.length != 0) {
            let currNode = nodesToVisit.shift()
            currNode.order = order
            order = order - 1
            if (currNode.right !== null) {
                nodesToVisit.push(currNode.right)
            }
            if (currNode.left !== null) {
                nodesToVisit.push(currNode.left)
            }
        }
        return
    }

    checkAndSwap = (huffmanTree, symbolTree) =>{
        let nodesWithCount = this.findNodesWithCount(huffmanTree, symbolTree.count)
        let highestOrderedNode = symbolTree
        var arrayLength = nodesWithCount.length
        for (var j = 0; j < arrayLength; j++) {
            if (highestOrderedNode.order < nodesWithCount[j].order) {
                highestOrderedNode = nodesWithCount[j]
            }
        }

        if (highestOrderedNode !== symbolTree && highestOrderedNode !== symbolTree.parent) {
            console.log("SWAP")
            let highestOrderedNodeParent = highestOrderedNode.parent
            let symbolTreeParent = symbolTree.parent

            if (highestOrderedNodeParent.left === highestOrderedNode) {
                highestOrderedNodeParent.left = symbolTree
            } else if (highestOrderedNodeParent.right === highestOrderedNode) {
                highestOrderedNodeParent.right = symbolTree
            } else {
                console.log("BAD")
            }

            if (symbolTreeParent.left === symbolTree) {
                symbolTreeParent.left = highestOrderedNode
            } else if (symbolTreeParent.right === symbolTree) {
                symbolTreeParent.right = highestOrderedNode
            } else {
                console.log("BAD")
            }

            highestOrderedNode.parent = symbolTreeParent
            symbolTree.parent = highestOrderedNodeParent

            this.reassignOrder(huffmanTree)

        }
    }

    updateTree = (symbol, huffmanTreeRoot, symbolMap, symbolList, newSymbolTreeNew, nextIsNew) =>{
        if (symbol == "$") {
            console.log("Next symbol is a new one")
            if (symbolMap.get(symbol) === undefined) {
                symbolMap.set("$", newSymbolTreeNew)
            }
            nextIsNew = true
        } else {
            if (nextIsNew) {
                console.log("New: " + symbol)

                let newSymbolTree = new HuffmanTree(symbol, 1)
                symbolList.push(newSymbolTree)
                symbolMap.set(symbol, newSymbolTree)

                let metaTree = new HuffmanTree(null, 1)

                metaTree.order = newSymbolTreeNew.order
                if (newSymbolTreeNew.parent !== null) {
                    newSymbolTreeNew.parent.left = metaTree
                }

                metaTree.left = newSymbolTreeNew
                metaTree.right = newSymbolTree
                metaTree.parent = newSymbolTreeNew.parent

                newSymbolTreeNew.parent = metaTree
                newSymbolTreeNew.order = metaTree.order - 2
                newSymbolTree.parent = metaTree
                newSymbolTree.order = metaTree.order - 1

                if (newSymbolTreeNew === huffmanTreeRoot) {
                    huffmanTreeRoot = metaTree
                }

                let parent = metaTree.parent
                while (parent !== null) {
                    parent.count = parent.count + 1
                    parent = parent.parent
                }

                nextIsNew = false
            } else {
                console.log("Not New: " + symbol)
                let symbolTree = symbolMap.get(symbol)
                this.checkAndSwap(huffmanTreeRoot, symbolTree)
                symbolTree.count = symbolTree.count + 1
                let parent = symbolTree.parent
                while (parent !== null) {
                    this.checkAndSwap(huffmanTreeRoot, parent)
                    parent.count = parent.count + 1
                    parent = parent.parent
                }
            }
        }
        return [nextIsNew, huffmanTreeRoot]
    }

    HuffmanEncoder = ()=>{

        let symbolList = []
        var symbolMap = new Map()
        let newSymbolTreeNew = new HuffmanTree("$", 0)
        newSymbolTreeNew.order = 512

        let huffmanTreeRoot = newSymbolTreeNew
        symbolList.push(newSymbolTreeNew)

        let msgToBeDecoded = this.state.msgToBeDecoded;
        let msgArr = msgToBeDecoded.split("");
        let len = msgArr.length

        let encodedMsg = ""

        let nextIsNew = false
        for(let i=0; i< len; i++){

            // encode(c)
            let codeWord = ""
            if (symbolMap.get(msgArr[i]) === undefined) {
                if (symbolMap.get("$") === undefined) {
                    codeWord = this.initialSymbolToCode("$")
                } else {
                    let currNode = symbolMap.get("$")
                    let prevNode = null
                    while(currNode.parent !== null){
                        prevNode = currNode;
                        currNode = currNode.parent;
                        if(prevNode === currNode.left){
                            codeWord = "0" + codeWord;
                        } else if (prevNode === currNode.right){
                            codeWord = "1" + codeWord;
                        }
                        else {
                            console.log("BAD")
                        }
                    }
                }
                encodedMsg = encodedMsg + codeWord

                let newSymbol = "$"
                let returnedArr = this.updateTree(newSymbol, huffmanTreeRoot, symbolMap, symbolList, newSymbolTreeNew, nextIsNew)
                nextIsNew = returnedArr[0]
                huffmanTreeRoot = returnedArr[1]

                codeWord = this.initialSymbolToCode(msgArr[i])

            } else {
                let currNode = symbolMap.get(msgArr[i])
                let prevNode = null
                while(currNode.parent !== null){
                    prevNode = currNode;
                    currNode = currNode.parent;
                    if(prevNode === currNode.left){
                        codeWord = "0" + codeWord;
                    } else if (prevNode === currNode.right){
                        codeWord = "1" + codeWord;
                    }
                    else {
                        console.log("BAD")
                    }
                }
            }
            encodedMsg = encodedMsg + codeWord

            // update_tree
            let newSymbol = msgArr[i]
            let returnedArr = this.updateTree(newSymbol, huffmanTreeRoot, symbolMap, symbolList, newSymbolTreeNew, nextIsNew)
            nextIsNew = returnedArr[0]
            huffmanTreeRoot = returnedArr[1]
        }

        this.setState({encodedMsg:encodedMsg}, ()=>{
            console.log(this.state.encodedMsg)
        })
        let BitStringLength = encodedMsg.split("").length
        this.setState({BitStringLength:BitStringLength}, ()=>{
            console.log(this.state.BitStringLength)
        })


    }

    decodeMsgHandler = ()=>{

        let symbolList = []
        var symbolMap = new Map()
        let newSymbolTreeNew = new HuffmanTree("$", 0)
        newSymbolTreeNew.order = 512

        let huffmanTreeRoot = newSymbolTreeNew
        symbolList.push(newSymbolTreeNew)

        let encodedMsg = this.state.encodedMsg;
        let msgArr = encodedMsg.split("");
        let len = msgArr.length

        let decodedMsg = ""
        let currNode = huffmanTreeRoot

        let currCodeWord = ""
        let initalCodeLength = 5

        let nextIsNew = false
        let insertSymbol = false
        let symbol = ""

        for(let i=0; i< len; i++){
            if (nextIsNew) {
                currCodeWord = currCodeWord + msgArr[i]
                if (currCodeWord.length === initalCodeLength) {
                    symbol = this.initialCodeToSymbol(currCodeWord)
                    decodedMsg = decodedMsg + symbol
                    insertSymbol = true
                    currCodeWord = ""
                }
            } else if (currNode.left === null && currNode.right === null) {
                symbol = currNode.symbol
                if (symbol !== "$") {
                    decodedMsg = decodedMsg + symbol
                }
                insertSymbol = true
            } else {
                if (msgArr[i] === "0") {
                    currNode = currNode.left
                } else if (msgArr[i] === "1") {
                    currNode = currNode.right
                } else {
                    console.log("BAD")
                }
                if (currNode.left === null && currNode.right === null) {
                    symbol = currNode.symbol

                    if (symbol !== "$") {
                        decodedMsg = decodedMsg + symbol
                    }
                    insertSymbol = true
                }
            }


            if (insertSymbol === true) {
                // update_tree
                let newSymbol = symbol
                let returnedArr = this.updateTree(newSymbol, huffmanTreeRoot, symbolMap, symbolList, newSymbolTreeNew, nextIsNew)
                nextIsNew = returnedArr[0]
                huffmanTreeRoot = returnedArr[1]
                insertSymbol = false
                currNode = huffmanTreeRoot
            }
        }

        console.log("[decodedMSG]", decodedMsg)
        this.setState({decodedMsg: decodedMsg})

    }

    render(){
        let encodedMsg = this.state.encodedMsg;
        let decodedMsg = this.state.decodedMsg;
        let BitStringLength = this.state.BitStringLength;
        console.log("[final decoded MSG:]", decodedMsg)

        return (
            <div className={classes.AdaptiveHuffman}>
                <DemoNav></DemoNav>
                <div className={classes.AdaptiveHuffmanAlgorithm}>
                    <h1>ADAPTIVE HUFFMAN DEMO</h1>
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



export default AdaptiveHuffman;
