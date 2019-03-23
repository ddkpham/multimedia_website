import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
//import Toolbar from '../Navigation/Toolbar/Toolbar';
import Intro from '../Intro/Intro'
import { Route, NavLink, Switch} from 'react-router-dom'

const layout = (props) =>{
    return(
    <Aux>
        {/* ----------- Toolbar/Navbar --------------------*/}
         <Toolbar /> 
       
       {/* --------------------- Routes --------------------*/}

       <Switch>
        {/* --------------------- Temporary anon functions for Pages --------------------*/}
        <Route path="/course-content" component= {()=> <h1>Course Content</h1>} />
        <Route path="/resources" component = {()=> <h1> Resource Page </h1>} />
        <Route path="/course-work" component = {()=> <h1> Course Work</h1>} />
        <Route path="/" component={Intro} />
        
       </Switch>
       

       
    </Aux>
    
    )
}

export default layout;