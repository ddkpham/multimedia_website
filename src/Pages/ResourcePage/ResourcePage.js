import React, {Component} from 'react';

import Button from '../../component/UI/Button/Button';
import classes from './ResourcePage.module.css';
import { NavLink } from 'react-router-dom';
import Data from '../../assets/images/data.png';
import Books from '../../assets/images/books.png';
import config from '../../Config/config'

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
        //links for resource page
        let syllabus = null;
        if(config.resources.syllabus){
            syllabus = <a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/syllabus.html">Syllabus</a>
        }
        let handouts = null;
        if(config.resources.handouts){
            handouts = <a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/handouts.html">Hand Outs</a>
        }
        let faq = null;
        if(config.resources.faq){
            faq = <a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/usenetfaq.html">USENET FAQS</a>
        }
        let useful_link = null;
        if(config.resources.useful_link){
            useful_link = <a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/coollinks.html">Useful Link</a>
        }
        let demo = null; 
        if(config.resources.demo){
            demo = <a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/coollinks.html">Demo</a>
        }
        let demoPage = null;
        if(config.resources.demoPage){
            demoPage = (
                <Button
                btnType="Success"
                clicked={this.demoPageRender}
                >{buttonStr}</Button>
            )
        }
        
        let arithmetic = null; 
        if(config.demos.arithmetic){
            arithmetic = <li><NavLink to="/arithmetic_encoding" >Arithmetic Encoding</NavLink></li>
        }
        let huffman = null;
        if(config.demos.huffman){
            huffman = <li><NavLink to="/huffman">Huffman Coding </NavLink></li>
        }
        let adaptive_huffman = null; 
        if(config.demos.adaptive_huffman){
            adaptive_huffman = <li><NavLink to="/adaptive-huffman">Adaptive Huffman Coding </NavLink></li>
        }
        let JPEG = null; 
        if(config.demos.JPEG){
            JPEG = <li><NavLink to="/jpeg">JPEG </NavLink></li>
        }
        let adaptive_arithmetic = null;
        if(config.demos.adaptive_arithmetic){
            adaptive_arithmetic = <li><NavLink to="/adaptive-arithmetic">Adaptive Arithmetic Coding </NavLink></li>
        }


        console.log(this.state.demoPage)
        if(!this.state.demoPage){
            title = <p className={classes.Header}> Resources </p>
            buttonStr = 'Go to Demos'
            icon = {Books}
            resourceList = (
                <div className={classes.ResourceList}>
                <img style = {imgStyle} src={Books} alt='icon'></img>
                    <ul style = {ulStyle}>
                        <li>{syllabus}</li><br></br>
                        <li>{handouts}</li><br></br>
                        <li>{faq}</li><br></br>
                        <li>{useful_link}</li><br></br>
                        <li>{demo}</li><br></br>
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
                        {arithmetic}<br></br>
                        {adaptive_arithmetic}<br></br>
                        {huffman}<br></br>
                        {adaptive_huffman}<br></br>
                        {JPEG}<br></br>
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