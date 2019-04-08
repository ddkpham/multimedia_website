import React, {Component} from 'react';
import classes from './AdaptiveHuffman.module.css'
import DemoNav from '../DemoNav/DemoNav';
import Tree from "react-tree-graph";
import { relative } from 'path';
import { Button, Input } from 'reactstrap';


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
        BitStringLength: null,
        treeHeight: 0,
        data: {}
    }

    inputHandler = (event) =>{
        //this.state.data = {}
        //console.log(event.target.value)
        let msgToBeDecoded = event.target.value
        this.setState({msgToBeDecoded:msgToBeDecoded})
    }

    initialSymbolToCode = (symbol) =>{
        if (symbol === "$") {
            return "0"
        }
        // switch(symbol) {
        //     case "$":
        //         return "0"
        //     case "a":
        //         return "00001"
        //     case "b":
        //         return "00010"
        //     case "c":
        //         return "00011"
        //     case "d":
        //         return "00100"
        //     default:
        //         console.log("Unsupported Symbol")
        //         return null
        // }
        let asciiValue = symbol.charCodeAt(0)
        let bitString = ""
        for (let i = 0; i < 8; i++) {
            if (asciiValue & 1 === 1) {
                bitString = "1" + bitString
            } else {
                bitString = "0" + bitString
            }
            asciiValue = asciiValue >>> 1
        }
        return bitString

    }

    initialCodeToSymbol = (code) =>{
        if (code === "0") {
            return "$"
        }
        // switch(symbol) {
        //     case "0":
        //         return "$"
        //     case "00001":
        //         return "a"
        //     case "00010":
        //         return "b"
        //     case "00011":
        //         return "c"
        //     case "00100":
        //         return "d"
        //     default:
        //         console.log("Unsupported codeword")
        //         return null
        // }
        let asciiValue = 0
        let mask = 1
        for (let i = 0; i < 8; i++) {
            if (parseInt(code[7-i]) & 1 === 1) {
                asciiValue = asciiValue ^ mask
            }
            mask = mask << 1
        }
        return String.fromCharCode(asciiValue)
    }

    findNodesWithCount = (huffmanTree, count) =>{
        let nodesToVisit = []
        let nodesWithCount = []
        nodesToVisit.push(huffmanTree)
        while (nodesToVisit.length !== 0) {
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
        while (nodesToVisit.length !== 0) {
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
        if (symbol === "$") {
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

    getHeight = (huffmanTree)=> {
        if (huffmanTree.left === null && huffmanTree.right === null) {
            return 1
        }
        let leftHeight = 0
        let rightHeight = 0
        if (huffmanTree.left !== null) {
            leftHeight = 1 + this.getHeight(huffmanTree.left)
        }
        if (huffmanTree.right !== null) {
            rightHeight = 1 + this.getHeight(huffmanTree.right)
        }
        console.log(Math.max(leftHeight, rightHeight))
        return Math.max(leftHeight, rightHeight)
    }

    createDataTree = (huffmanTree)=> {
        if (huffmanTree === null) {
            return {}
        }

        if (huffmanTree.left === null && huffmanTree.right === null) {
            return {"name":huffmanTree.symbol}
        }

        let rightObject = this.createDataTree(huffmanTree.right)
        let leftObject = this.createDataTree(huffmanTree.left)
        let children = []
        if (rightObject !== null) {
            children.push(rightObject)
        }
        if (leftObject !== null) {
            children.push(leftObject)
        }

        let newObject = {
            "name": huffmanTree.symbol,
            "children": [rightObject,leftObject]
        }

        return newObject
    }

    HuffmanEncoder = ()=>{

        if (this.state.msgToBeDecoded ===null){
            alert('Message to be encoded cannot be empty')
            return
        }

        let symbolList = []
        var symbolMap = new Map()
        let newSymbolTreeNew = new HuffmanTree("$", 0);
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

        let treeHeight = this.getHeight(huffmanTreeRoot)
        this.setState({treeHeight:treeHeight}, ()=>{
            console.log(this.state.treeHeight)
        })

        let data = this.createDataTree(huffmanTreeRoot)
        this.setState({data:data}, ()=>{
            console.log(this.state.data)
        })

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
        let initalCodeLength = 8

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

        let msgToBeDecoded = this.state.msgToBeDecoded
        let asciiBitStringLength = 0
        if (msgToBeDecoded !== null) {
            asciiBitStringLength = msgToBeDecoded.length * 8
        }

        let compressionRatio = asciiBitStringLength / BitStringLength

        let data = this.state.data;
        let height = this.state.treeHeight * 100

        console.log("[final decoded MSG:]", decodedMsg)

        return (
            <div className={classes.AdaptiveHuffman}>
                <DemoNav></DemoNav>
                <div className={classes.AdaptiveHuffmanAlgorithm}>
                    <h1>Adaptive Huffman Coding Demo</h1>
                    <div>
                        <div className={classes.encoding}>
                            <input className={classes.encodedMsg} type="text" onChange={this.inputHandler} placeholder=" Please enter the msg"></input>
                            <Button disabled={!this.state.msgToBeDecoded} color="success" onClick= {this.HuffmanEncoder}>Encode MSG</Button>
                        </div>
                            <h5><b>Encoded BitString : </b>{encodedMsg} </h5>
                            <h5><b>Encoded BitStringLength : </b>{BitStringLength} </h5>
                            <h5><b>ASCII BitStringLength : </b>{asciiBitStringLength} </h5>
                            <h5><b>Compression Ratio : </b>{compressionRatio} </h5>
                        </div>

                <div className={classes.visualizerContainer}>
                    {/* Render Tree with data passed as prop */}
                    <Tree
                      data={data}
                      height={350}
                      width={350}
                      svgProps={{
                        transform: "rotate(90)"
                      }}
                      textProps={{
                        transform: "rotate(270)"
                      }}
                    />
                </div>

                <div className={classes.decoding}>
                        <Button disabled={!this.state.msgToBeDecoded} color="primary" onClick= {this.decodeMsgHandler}>Decode MSG</Button>
                        <h5><b>Decoded Msg : </b>{decodedMsg} </h5>
                </div>

               </div>
            </div>
        )
    }

}



export default AdaptiveHuffman;
