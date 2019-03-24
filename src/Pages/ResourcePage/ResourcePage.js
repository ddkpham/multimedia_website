import React, {Component} from 'react';

import Button from '../../component/UI/Button/Button';
import classes from './ResourcePage.module.css';
import { NavLink } from 'react-router-dom';
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
        let demoList = null;
        let resourceList = null;
        console.log(this.state.demoPage)
        if(!this.state.demoPage){
            title = <h1>Resource Page</h1>
            resourceList = (
                <div className={classes.ResourceList}>
                    {title}
                    <ul>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/syllabus.html">Syllabus</a></li>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/handouts.htm l">Hand Outs</a></li>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/usenetfaq.html">USENET FAQS</a></li>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/coollinks.html">Useful Link</a></li>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/coollinks.html">Demo</a></li>
                    </ul>
                    
                </div>
            )
        } else{
            title = <h1>DEMOS</h1>
            demoList = (
                <div className={classes.DemoList}>
                    {title}
                    <ul>
                        <li><NavLink to="/arithmetic_encoding" >Arithmetic Encoding</NavLink></li>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/handouts.htm l">Huffman</a></li>
                        <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/usenetfaq.html">JPEG</a></li>
                      
                    </ul>
                    
                </div>
            )
        }

        return(
            
            <div >
                {title}
                {demoList}
                {resourceList}
                <Button
                btnType="Success"
                clicked={this.demoPageRender}
                >DEMO</Button>
            </div>
        )
    }
}

export default ResourcePage;