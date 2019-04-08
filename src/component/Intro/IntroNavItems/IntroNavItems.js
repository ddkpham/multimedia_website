import React, {Component} from 'react';

import classes from './IntroNavItems.module.css'


class IntroNavItems extends Component{
    render(){
        // const linkStyle = {
        //     textDecoration:'none', 
        //     color:'white', 
        //     fontSize:'1.6em',
        // }

        return(
            <div className={classes.IntroNavItems}>

               <div> 
                   <h1>CMPT365</h1>
                   <h3>SFU SPRING 2019 MULTIMEDIA</h3>
               </div> 
            </div>

            
        )
    }
}

export default IntroNavItems;