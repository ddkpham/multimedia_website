import React, {Component} from 'react';
import classes from './CourseContentPageInfo.module.css'

// Lecture notes
import Intro from '../../assets/material/lectureslides/Intro.pdf';
import Chapter1 from '../../assets/material/lectureslides/Chapter1.pdf';
import Chapter2 from '../../assets/material/lectureslides/Chapter2.pdf';
import Chapter3 from '../../assets/material/lectureslides/Chapter3.pdf';
import Chapter4 from '../../assets/material/lectureslides/Chapter4.pdf';
import Chapter5 from '../../assets/material/lectureslides/Chapter5.pdf';
import Chapter6 from '../../assets/material/lectureslides/Chapter6.pdf';
import Chapter7 from '../../assets/material/lectureslides/Chapter7.pdf';
import Chapter8 from '../../assets/material/lectureslides/Chapter8.pdf';
import Chapter9 from '../../assets/material/lectureslides/Chapter9.pdf';
import Chapter10 from '../../assets/material/lectureslides/Chapter10.pdf';
import Chapter11 from '../../assets/material/lectureslides/Chapter11.pdf';
import Chapter12 from '../../assets/material/lectureslides/Chapter12.pdf';
import Chapter14 from '../../assets/material/lectureslides/Chapter14.pdf';

// Supplementary Materials
import Week1 from '../../assets/material/supplements/Week1.pdf';
import Week2 from '../../assets/material/supplements/Week2.pdf';
import Week3 from '../../assets/material/supplements/Week3.pdf';
import Week4 from '../../assets/material/supplements/Week4.pdf';
import Week5 from '../../assets/material/supplements/Week5.pdf';
import Week6 from '../../assets/material/supplements/Week6.pdf';
import Week7 from '../../assets/material/supplements/Week7.pdf';
import Week9 from '../../assets/material/supplements/Week9.pdf';
import Week10 from '../../assets/material/supplements/Week10.pdf';
import Week10_2 from '../../assets/material/supplements/Week10_2.pdf';
import Week11 from '../../assets/material/supplements/Week11.pdf';
import Week12 from '../../assets/material/supplements/Week12.pdf';
import Week12_2 from '../../assets/material/supplements/Week12_2.pdf';
import { ListGroup, ListGroupItem } from 'reactstrap';

class CourseContentPageInfo extends Component{
    render(){
        return(
            <div className={classes.CourseContentPageInfo}> 
                <p className={classes.Header} >Course Content</p>

                <section>
                <nav style={navStyle}>
                <ListGroup>
                    <ListGroupItem style = {liStyle} >
                        Lecture notes
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter1} target='iframe_slides'>Intro</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter1} target='iframe_slides'>Chapter1</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter2} target='iframe_slides'>Chapter2</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter3} target='iframe_slides'>Chapter3</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter4} target='iframe_slides'>Chapter4</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter5} target='iframe_slides'>Chapter5</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter6} target='iframe_slides'>Chapter6</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter7} target='iframe_slides'>Chapter7</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter8} target='iframe_slides'>Chapter8</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter9} target='iframe_slides'>Chapter9</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter10} target='iframe_slides'>Chapter10</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter11} target='iframe_slides'>Chapter11</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter12} target='iframe_slides'>Chapter12</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Chapter14} target='iframe_slides'>Chapter14</a>
                    </ListGroupItem>

                    <ListGroupItem style = {liStyle} >
                        Supplementary Materials
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week1} target='iframe_slides'>Week1: Multimedia Authoring</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week2} target='iframe_slides'>Week2: Image Representations</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week3} target='iframe_slides'>Week3: Color Representations</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week4} target='iframe_slides'>Week4: DCT matrix implementation</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week5} target='iframe_slides'>Week5: Analogy to DCT basis functions</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week6} target='iframe_slides'>Week6: Arithmetic Coding Example</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week7} target='iframe_slides'>Week7: Notes on Lossy Differential Coding</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week9} target='iframe_slides'>Week9: MPEG-2 SNR Scalability</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week10} target='iframe_slides'>Week10: Derivation of the Integer Transform Matrix</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week10_2} target='iframe_slides'>Week10: ** Implementation details about H.264 Codec</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week11} target='iframe_slides'>Week11: Features of H.266 (VVC)</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week12} target='iframe_slides'>Chapter12: Notes on MPEG audio compression</a>
                    </ListGroupItem>
                    <ListGroupItem>
                        <a href={Week12_2} target='iframe_slides'>Chapter12: ** Additional Notes on Audio Compression</a>
                    </ListGroupItem>
                    </ListGroup>
                </nav>
                    <iframe
                        src={Intro} name='iframe_slides'
                        height="630" width="70%" />
                </section>

                
            </div>
        )
    }
}


const liStyle =  {
    listStyle: 'none',
    fontSize: '20px',
    padding: '10px',
}

const navStyle =  {
    float: 'left',
    width: '30%',
    overflow: 'scroll',
    height: '630px',
    textAlign: 'center',
    fontSize: '12.5px',
}

const ulStyle = {
    style: 'none',
    padding: '0px'
}

export default CourseContentPageInfo;