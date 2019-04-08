import React, {Component} from 'react';
import classes from './DemoNav.module.css'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import config from '../../../Config/config';

class DemoNav extends Component{
    render(){
        let arithmetic = null;
        let adaptive_arithmetic = null;
        let huffman = null;
        let adaptive_huffman = null;
        let JPEG = null;

        if(config.demos.arithmetic){
            arithmetic = <ListGroupItem><NavLink to="/arithmetic_encoding" >Arithmetic</NavLink></ListGroupItem>
        }
        if(config.demos.adaptive_arithmetic){
            adaptive_arithmetic = <ListGroupItem><NavLink to="/adaptive-arithmetic">Adaptive Arithmetic</NavLink></ListGroupItem>
        }
        if(config.demos.huffman){
            huffman = <ListGroupItem><NavLink to="/huffman">Huffman</NavLink></ListGroupItem>
        }
        if(config.demos.adaptive_huffman){
            adaptive_huffman = <ListGroupItem><NavLink to="/adaptive-huffman">Adaptive Huffman</NavLink></ListGroupItem>
        }
        if(config.demos.JPEG){
            JPEG = <ListGroupItem><NavLink to="/jpeg">JPEG</NavLink></ListGroupItem>
        }
        return(
            <div className={classes.DemoNav}>
                    <ListGroup>
                    <ListGroupItem style = {liStyle} >
                        DemoList
                    </ListGroupItem>
                    {arithmetic}
                    {adaptive_arithmetic}
                    {huffman}
                    {adaptive_huffman}
                    {JPEG}
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