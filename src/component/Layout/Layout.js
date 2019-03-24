import React from 'react';
import { Route, Switch} from 'react-router-dom'


import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';
import HomePage from '../../Pages/HomePage/HomePage';
import ResourcePage from '../../Pages/ResourcePage/ResourcePage';
//import Toolbar from '../Navigation/Toolbar/Toolbar';


const layout = (props) =>{
    return(
    <Aux>
        {/* ----------- Toolbar/Navbar --------------------*/}
         <Toolbar /> 
       
       {/* --------------------- Routes --------------------*/}

       <Switch>
        {/* --------------------- Temporary anon functions for Pages --------------------*/}
        <Route path="/course-content" component= {()=> <h1>Course Content</h1>} />
        <Route path="/resources" component = {ResourcePage} />
        <Route path="/course-work" component = {()=> <h1> Course Work</h1>} />
        <Route path="/" component={HomePage} />
        
       </Switch>
       

       
    </Aux>
    
    )
}

export default layout;