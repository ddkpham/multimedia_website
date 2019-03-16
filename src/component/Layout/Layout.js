import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
//import Toolbar from '../Navigation/Toolbar/Toolbar';
import Intro from '../Intro/Intro'

const layout = (props) =>{
    return(
    <Aux>
        Hello Just Testing so far. 
        <Intro />

        <Toolbar />
    </Aux>
    
    )
}

export default layout;