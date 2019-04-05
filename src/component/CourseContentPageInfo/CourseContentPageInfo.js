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

//config check 
import config from '../../Config/config'
class CourseContentPageInfo extends Component{
    state = {
        chapter1: true
    }
    render(){
        let chapter1 = null;
        let chapter2 = null;
        let chapter3 = null;
        let chapter4 = null;
        let chapter5 = null;
        let chapter6 = null;
        let chapter7 = null;
        let chapter8 = null;
        let chapter9 = null;
        let chapter10 = null;
        let chapter11 = null;
        let chapter12 = null;
        let chapter14 = null;
        let week1 = null;
        let week2 = null;
        let week3 = null;
        let week4 = null;
        let week5 = null;
        let week6 = null;
        let week7 = null;
        let week9 = null;
        let week10 = null;
        let week10_2 = null;
        let week11 = null;
        let chapter12a = null; 
        let chapter12b = null;

        

        if(config.courseContent.chapter1){
            chapter1 = <a href={Chapter1} target='iframe_slides'>Chapter1</a>
        }
        if(config.courseContent.chapter2){
            chapter2 = <a href={Chapter2} target='iframe_slides'>Chapter2</a>
        }
        if(config.courseContent.chapter3){
            chapter3 = <a href={Chapter3} target='iframe_slides'>Chapter3</a>
        }
        if(config.courseContent.chapter4){
            chapter4 = <a href={Chapter4} target='iframe_slides'>Chapter4</a>
        }
        if(config.courseContent.chapter5){
            chapter5 = <a href={Chapter5} target='iframe_slides'>Chapter5</a>
        }
        if(config.courseContent.chapter6){
            chapter6 = <a href={Chapter6} target='iframe_slides'>Chapter6</a>
        }
        if(config.courseContent.chapter7){
            chapter7 = <a href={Chapter7} target='iframe_slides'>Chapter7</a>
        }
        if(config.courseContent.chapter8){
            chapter8 = <a href={Chapter8} target='iframe_slides'>Chapter8</a>
        }
        if(config.courseContent.chapter9){
            chapter9 = <a href={Chapter9} target='iframe_slides'>Chapter9</a>
        }
        if(config.courseContent.chapter10){
            chapter10 = <a href={Chapter10} target='iframe_slides'>Chapter10</a>
        }
        if(config.courseContent.chapter11){
            chapter11 = <a href={Chapter11} target='iframe_slides'>Chapter11</a>
        }
        if(config.courseContent.chapter12){
            chapter12 = <a href={Chapter12} target='iframe_slides'>Chapter12</a>
        }
        
        if(config.courseContent.chapter14){
            chapter14 = <a href={Chapter14} target='iframe_slides'>Chapter14</a>
        }
        if(config.supplementaryMaterial.week1){
            week1 = <a href={Week1} target='iframe_slides'>Week1: Multimedia Authoring</a>
        }
        if(config.supplementaryMaterial.week2){
            week2 = <a href={Week2} target='iframe_slides'>Week2: Image Representations</a>
        }
        if(config.supplementaryMaterial.week3){
            week3 = <a href={Week3} target='iframe_slides'>Week3: Color Representations</a>
        }
        if(config.supplementaryMaterial.week4){
            week4 = <a href={Week4} target='iframe_slides'>Week4: DCT matrix implementation</a>
        }
        if(config.supplementaryMaterial.week5){
            week5 = <a href={Week5} target='iframe_slides'>Week5: Analogy to DCT basis functions</a>
        }
        if(config.supplementaryMaterial.week6){
            week6 = <a href={Week6} target='iframe_slides'>Week6: Arithmetic Coding Example</a>
        }
        if(config.supplementaryMaterial.week7){
            week7 = <a href={Week7} target='iframe_slides'>Week7: Notes on Lossy Differential Coding</a>
        }
        if(config.supplementaryMaterial.week9){
            week9 = <a href={Week9} target='iframe_slides'>Week9: MPEG-2 SNR Scalability</a>
        }
        if(config.supplementaryMaterial.week10){
            week10 = <a href={Week10} target='iframe_slides'>Week10: Derivation of the Integer Transform Matrix</a>
        }
        if(config.supplementaryMaterial.week10_2){
            week10_2 = <a href={Week10_2} target='iframe_slides'>Week10: ** Implementation details about H.264 Codec</a>
        }
        if(config.supplementaryMaterial.week11){
            week11 = <a href={Week11} target='iframe_slides'>Week11: Features of H.266 (VVC)</a>
        }
        if(config.supplementaryMaterial.week12){
           chapter12a =  <a href={Week12} target='iframe_slides'>Chapter12: Notes on MPEG audio compression</a>
        }
        if(config.supplementaryMaterial.week12_2){
            chapter12b = <a href={Week12_2} target='iframe_slides'>Chapter12: ** Additional Notes on Audio Compression</a>
        }


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
                        {chapter1}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter2}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter3}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter4}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter5}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter6}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter7}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter8}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter9}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter10}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter11}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter12a}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter14}
                    </ListGroupItem>

                    <ListGroupItem style = {liStyle} >
                        Supplementary Materials
                    </ListGroupItem>
                    <ListGroupItem>
                        {week1}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week2}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week3}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week4}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week5}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week6}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week7}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week9}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week10}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week10_2}
                    </ListGroupItem>
                    <ListGroupItem>
                        {week11}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter12}
                    </ListGroupItem>
                    <ListGroupItem>
                        {chapter12b}
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