import React, {Component} from 'react';
import classes from './DemoNav.module.css'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class DemoNav extends Component{
    render(){
        return(
            <div className={classes.DemoNav}>
                    <ListGroup>
                    <ListGroupItem style = {liStyle} >
                        DemoList
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink to="/arithmetic_encoding" >Arithmetic</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink to="/adaptive-arithmetic">Adaptive Arithmetic</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink to="/huffman">Huffman</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink to="/adaptive-huffman">Adaptive Huffman</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink to="/jpeg">JPEG</NavLink>
                    </ListGroupItem>
                    </ListGroup>
            </div>
        );
    }
}

const liStyle =  {
    fontSize: '20px',
    padding: '10px',
}

export default DemoNav;