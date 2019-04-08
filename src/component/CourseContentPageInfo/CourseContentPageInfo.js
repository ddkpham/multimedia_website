import React, {Component} from 'react';
import classes from './CourseContentPageInfo.module.css'
import { ListGroup, ListGroupItem } from 'reactstrap';

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
import Week10a from '../../assets/material/supplements/Week10.pdf';
import Week10b from '../../assets/material/supplements/Week10_2.pdf';
import Week11 from '../../assets/material/supplements/Week11.pdf';
import Week12a from '../../assets/material/supplements/Week12.pdf';
import Week12b from '../../assets/material/supplements/Week12_2.pdf';

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
        let week10a = null;
        let week10b = null;
        let week11 = null;
        let week12a = null; 
        let week12b = null;

        

        if(config.courseContent.chapter1){
            chapter1 = <ListGroupItem><a href={Chapter1} target='iframe_slides'>Chapter1</a></ListGroupItem>
        }
        if(config.courseContent.chapter2){
            chapter2 = <ListGroupItem><a href={Chapter2} target='iframe_slides'>Chapter2</a></ListGroupItem>
        }
        if(config.courseContent.chapter3){
            chapter3 = <ListGroupItem><a href={Chapter3} target='iframe_slides'>Chapter3</a></ListGroupItem>
        }
        if(config.courseContent.chapter4){
            chapter4 = <ListGroupItem><a href={Chapter4} target='iframe_slides'>Chapter4</a></ListGroupItem>
        }
        if(config.courseContent.chapter5){
            chapter5 = <ListGroupItem><a href={Chapter5} target='iframe_slides'>Chapter5</a></ListGroupItem>
        }
        if(config.courseContent.chapter6){
            chapter6 = <ListGroupItem><a href={Chapter6} target='iframe_slides'>Chapter6</a></ListGroupItem>
        }
        if(config.courseContent.chapter7){
            chapter7 = <ListGroupItem><a href={Chapter7} target='iframe_slides'>Chapter7</a></ListGroupItem>
        }
        if(config.courseContent.chapter8){
            chapter8 = <ListGroupItem><a href={Chapter8} target='iframe_slides'>Chapter8</a></ListGroupItem>
        }
        if(config.courseContent.chapter9){
            chapter9 = <ListGroupItem><a href={Chapter9} target='iframe_slides'>Chapter9</a></ListGroupItem>
        }
        if(config.courseContent.chapter10){
            chapter10 = <ListGroupItem><a href={Chapter10} target='iframe_slides'>Chapter10</a></ListGroupItem>
        }
        if(config.courseContent.chapter11){
            chapter11 = <ListGroupItem><a href={Chapter11} target='iframe_slides'>Chapter11</a></ListGroupItem>
        }
        if(config.courseContent.chapter12){
            chapter12 = <ListGroupItem><a href={Chapter12} target='iframe_slides'>Chapter12</a></ListGroupItem>
        }
        if(config.courseContent.chapter14){
            chapter14 = <ListGroupItem><a href={Chapter14} target='iframe_slides'>Chapter14</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week1){
            week1 = <ListGroupItem><a href={Week1} target='iframe_slides'>Week1: Multimedia Authoring</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week2){
            week2 = <ListGroupItem><a href={Week2} target='iframe_slides'>Week2: Image Representations</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week3){
            week3 = <ListGroupItem><a href={Week3} target='iframe_slides'>Week3: Color Representations</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week4){
            week4 = <ListGroupItem><a href={Week4} target='iframe_slides'>Week4: DCT matrix implementation</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week5){
            week5 = <ListGroupItem><a href={Week5} target='iframe_slides'>Week5: Analogy to DCT basis functions</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week6){
            week6 = <ListGroupItem><a href={Week6} target='iframe_slides'>Week6: Arithmetic Coding Example</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week7){
            week7 = <ListGroupItem><a href={Week7} target='iframe_slides'>Week7: Notes on Lossy Differential Coding</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week9){
            week9 = <ListGroupItem><a href={Week9} target='iframe_slides'>Week9: MPEG-2 SNR Scalability</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week10a){
            week10a = <ListGroupItem><a href={Week10a} target='iframe_slides'>Week10: Derivation of the Integer Transform Matrix</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week10b){
            week10b = <ListGroupItem><a href={Week10b} target='iframe_slides'>Week10: ** Implementation details about H.264 Codec</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week11){
            week11 = <ListGroupItem><a href={Week11} target='iframe_slides'>Week11: Features of H.266 (VVC)</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week12a){
           week12a =  <ListGroupItem><a href={Week12a} target='iframe_slides'>Chapter12: Notes on MPEG audio compression</a></ListGroupItem>
        }
        if(config.supplementaryMaterial.week12b){
            week12b = <ListGroupItem><a href={Week12b} target='iframe_slides'>Chapter12: ** Additional Notes on Audio Compression</a></ListGroupItem>
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
                        {chapter1}
                        {chapter2}
                        {chapter3}
                        {chapter4}
                        {chapter5}
                        {chapter6}
                        {chapter7}
                        {chapter8}
                        {chapter9}
                        {chapter10}
                        {chapter11}
                        {chapter12}
                        {chapter14}
                    <ListGroupItem style = {liStyle} >
                        Supplementary Materials
                    </ListGroupItem>
                        {week1}
                        {week2}
                        {week3}
                        {week4}
                        {week5}
                        {week6}
                        {week7}
                        {week9}
                        {week10a}
                        {week10b}
                        {week11}
                        {week12a}
                        {week12b}
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

// const ulStyle = {
//     style: 'none',
//     padding: '0px'
// }

export default CourseContentPageInfo;