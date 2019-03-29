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
            title = <h2>Resources</h2>
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
            title = <h2>Demos</h2>
            buttonStr = 'Go to Resources'
            icon = {Data}
            demoList = (
                <div className={classes.DemoList}>
                <img style = {imgStyle} src={Data} alt='icon'></img>
                    <ul style = {ulStyle}>
                        <li><NavLink to="/arithmetic_encoding" >Arithmetic Encoding</NavLink></li><br></br>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/handouts.htm l">Huffman</a></li><br></br>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/usenetfaq.html">JPEG</a></li><br></br>
                    </ul>
                </div>
            )
        }

        return(
            
            <div style = {bodyStyle}>
                <header style = {headerStyle}>
                {title}
                </header>

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
    padding: '20px',
    marginTop: '20px',
    marginBottom: '15px',
    width: '165px',
    height: '165px'
}

const ulStyle = {
    style: 'none',
    padding: '0px'
}

const headerStyle = {
    background: '#000',
    color: '#fff',
    padding: '45px',
    textAlign: 'center',
    fontSize: '25px'
}

export default ResourcePage;