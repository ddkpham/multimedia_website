import React from 'react';
import { Route, NavLink, Switch} from 'react-router-dom'


import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
import HomePage from '../../Pages/HomePage/HomePage'
import CourseContentPage from '../../Pages/CourseContentPage/CourseContentPage';
//import Toolbar from '../Navigation/Toolbar/Toolbar';


const layout = (props) =>{
    return(
    <Aux>
        {/* ----------- Toolbar/Navbar --------------------*/}
         <Toolbar /> 
       
       {/* --------------------- Routes --------------------*/}

       <Switch>
        {/* --------------------- Temporary anon functions for Pages --------------------*/}
        <Route path="/course-content" component= {CourseContentPage} />
        <Route path="/resources" component = {()=> <h1> Resource Page </h1>} />
        <Route path="/course-work" component = {()=> <h1> Course Work</h1>} />
        <Route path="/" component={HomePage} />
        
       </Switch>
       

       
    </Aux>
    
    )
}

export default layout;