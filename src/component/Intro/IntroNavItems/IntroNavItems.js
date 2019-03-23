import React, {Component} from 'react';

import classes from './IntroNavItems.module.css'
import { Link as Link }from 'react-router-dom';
class IntroNavItems extends Component{
    render(){
        let linkStyle = {
            textDecoration:'none', 
            color:'white', 
            fontSize:'1.4em',
            position:'relative',
            top:'-215px'
        }
        return(
            <div className={classes.IntroNavItems}>

               <div> 
                   <h1>SFU CMPT 365  |"|  Multi-Media</h1> 
                   <div className={classes.NavLink}> 
                    <ul >
                        <li>
                            <Link to="/" style={linkStyle} >Home</Link>
                        </li>
                        <li>
                            <Link to="/course-content" style={linkStyle} >Course Content</Link>
                        </li>
                        <li>
                            <Link to="/course-work" style={linkStyle} >Course Work</Link>
                        </li>
                        <li>
                            <Link to="/resources" style={linkStyle} >Resources</Link>
                        </li>
                    </ul>
                </div>
               </div>
               
                
                
            </div>

            
        )
    }
}

export default IntroNavItems;