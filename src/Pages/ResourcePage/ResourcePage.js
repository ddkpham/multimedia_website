import React, {Component} from 'react';

import Button from '../../component/UI/Button/Button'
import classes from './ResourcePage.module.css'
class ResourcePage extends Component{
    state= {
        demoPage:false
    }

    componentDidUpdate(){
        console.log("component updated");
    }
    demoPageRender = ()=>{
        console.log("clicked")
        this.setState({demoPage:true})
    }
    render(){
        let title = null;
        console.log(this.state.demoPage)
        if(!this.state.demoPage){
            title = <h1>Resource Page</h1>
        }
        return(
            
            <div className={classes.ResourcePage}>
                {title}
                <ul>
                    <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/syllabus.html">Syllabus</a></li>
                    <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/handouts.html">Hand Outs</a></li>
                    <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/usenetfaq.html">USENET FAQS</a></li>
                    <li><a href="http://www.cs.sfu.ca/CourseCentral/365/li/material/misc/coollinks.html">Useful Link</a></li>
                </ul>
                <Button
                btnType="Success"
                clicked={this.demoPageRender}
                >DEMO</Button>
            </div>
        )
    }
}

export default ResourcePage;