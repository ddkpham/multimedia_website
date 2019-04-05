import React, {Component} from 'react';

import Button from '../../component/UI/Button/Button';
import classes from './ResourcePage.module.css';
import { NavLink } from 'react-router-dom';
import Data from '../../assets/images/data.png';
import Books from '../../assets/images/books.png';

class ResourcePage extends Component{
    state= {
        demoPage:false
    }

    componentDidUpdate(){
        console.log("component updated");
    }
    demoPageRender = ()=>{
        console.log("clicked")
        this.setState({demoPage:!this.state.demoPage})
    }
    render(){
        let title = null;
        let buttonStr = null;
        let demoList = null;
        let resourceList = null;
        let icon = null;
        console.log(this.state.demoPage)
        if(!this.state.demoPage){
            title = <p className={classes.Header}> Resources </p>
            buttonStr = 'Go to Demos'
            icon = {Books}
            resourceList = (
                <div className={classes.ResourceList}>
                <img style = {imgStyle} src={Books} alt='icon'></img>
                    <ul style = {ulStyle}>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/syllabus.html">Syllabus</a></li><br></br>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/handouts.html">Hand Outs</a></li><br></br>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/usenetfaq.html">USENET FAQS</a></li><br></br>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/coollinks.html">Useful Link</a></li><br></br>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/coollinks.html">Demo</a></li><br></br>
                    </ul>
                </div>
            )
        } else{
            title = <p className={classes.Header}> Demos</p>
            buttonStr = 'Go to Resources'
            icon = {Data}
            demoList = (
                <div className={classes.DemoList}>
                <img style = {imgStyle} src={Data} alt='icon'></img>
                    <ul style = {ulStyle}>
                        <li><NavLink to="/arithmetic_encoding" >Arithmetic Encoding</NavLink></li><br></br>
                        <li><NavLink to="/huffman">Huffman Coding </NavLink></li><br></br>
                        <li><NavLink to="/jpeg">JPEG </NavLink></li><br></br>
                    </ul>
                </div>
            )
        }

        return(
            
            <div style = {bodyStyle}>
                {title}
                {demoList}
                {resourceList}
                <Button
                btnType="Success"
                clicked={this.demoPageRender}
                >{buttonStr}</Button>
            </div>
        )
    }
}
 
const bodyStyle = {
    marginTop: '70px'
}

const imgStyle = {
    marginBottom: '40px',
    width: '135px',
    height: '135px'
}

const ulStyle = {
    style: 'none',
    padding: '0px'
}

export default ResourcePage;