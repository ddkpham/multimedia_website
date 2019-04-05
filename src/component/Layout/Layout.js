import React from 'react';
import { Route, Switch} from 'react-router-dom'


import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';


import ResourcePage from '../../Pages/ResourcePage/ResourcePage';
import ArithmetricCodec from '../DemoPageInfo/ArithmeticCodec/ArithmeticCodec'
import HomePage from '../../Pages/HomePage/HomePage'
import CourseContentPage from '../../Pages/CourseContentPage/CourseContentPage';
import CourseWorkPage from '../../Pages/CourseWorkPage/CourseWorkPage';
import Huffman from '../DemoPageInfo/Huffman/Huffman'
import JPEG from '../DemoPageInfo/JPEG/JPEG'
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
        <Route path="/resources" component = {ResourcePage} />
        <Route path="/course-work" component = {CourseWorkPage} />
        <Route path="/arithmetic_encoding" component = {ArithmetricCodec} />
        <Route path="/huffman" component = {Huffman} />
        <Route path="/jpeg" component = {JPEG}/>
        <Route path="/" component={HomePage} />
        
        
       </Switch>
       

       
    </Aux>
    
    )
}

export default layout;