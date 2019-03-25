import React from 'react';
import { Route, Switch} from 'react-router-dom'


import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';


import ResourcePage from '../../Pages/ResourcePage/ResourcePage';
import ArithmetricCodec from '../ArithmeticCodec/ArithmeticCodec'
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
        <Route path="/arithmetic_encoding" component = {ArithmetricCodec} />
        <Route path="/" component={HomePage} />
        
        
       </Switch>
       

       
    </Aux>
    
    )
}

export default layout;