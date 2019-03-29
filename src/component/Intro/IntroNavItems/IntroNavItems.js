import React, {Component} from 'react';

import classes from './IntroNavItems.module.css'
import { Link  }from 'react-router-dom';
class IntroNavItems extends Component{
    render(){
        const linkStyle = {
            textDecoration:'none', 
            color:'white', 
            fontSize:'1.6em',
        }

        return(
            <div className={classes.IntroNavItems}>

               <div> 
                   <h1>C M P T 3 6 5</h1>
                   <div className={classes.NavLink}> 
                    <ul >
                        <li>
                            <Link to="/" style={linkStyle} >HOME</Link>
                        </li>
                        <li>
                            <Link to="/course-content" style={linkStyle} >COURSE CONTENT</Link>
                        </li>
                        <li>
                            <Link to="/course-work" style={linkStyle} >COURSE WORK</Link>
                        </li>
                        <li>
                            <Link to="/resources" style={linkStyle} >RESOURCES</Link>
                        </li>
                    </ul>
                </div>
               </div> 
            </div>

            
        )
    }
}

export default IntroNavItems;