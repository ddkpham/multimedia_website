import React, {Component} from 'react';
import './CourseContentPageInfo.css';

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

class CourseContentPageInfo extends Component{
    render(){
        return(
            <div> 
                <header style = {headerStyle}>
                <h2>Course Content</h2>
                </header>

                <section>
                <nav style={navStyle}>
                    <ul style = {ulStyle}>
                    <li style = {liStyle} >
                        Grades
                    </li>
                    <li>
                        <a href='https://coursys.sfu.ca/'>Go to coursys</a>
                    </li>
                    <li style = {liStyle} >
                        Lecture notes
                    </li>
                    <li>
                        <a href={Chapter1} target='iframe_slides'>Intro</a>
                    </li>
                    <li>
                        <a href={Chapter1} target='iframe_slides'>Chapter1</a>
                    </li>
                    <li>
                        <a href={Chapter2} target='iframe_slides'>Chapter2</a>
                    </li>
                    <li>
                        <a href={Chapter3} target='iframe_slides'>Chapter3</a>
                    </li>
                    <li>
                        <a href={Chapter4} target='iframe_slides'>Chapter4</a>
                    </li>
                    <li>
                        <a href={Chapter5} target='iframe_slides'>Chapter5</a>
                    </li>
                    <li>
                        <a href={Chapter6} target='iframe_slides'>Chapter6</a>
                    </li>
                    <li>
                        <a href={Chapter7} target='iframe_slides'>Chapter7</a>
                    </li>
                    <li>
                        <a href={Chapter8} target='iframe_slides'>Chapter8</a>
                    </li>
                    <li>
                        <a href={Chapter9} target='iframe_slides'>Chapter9</a>
                    </li>
                    <li>
                        <a href={Chapter10} target='iframe_slides'>Chapter10</a>
                    </li>
                    <li>
                        <a href={Chapter11} target='iframe_slides'>Chapter11</a>
                    </li>
                    <li>
                        <a href={Chapter12} target='iframe_slides'>Chapter12</a>
                    </li>
                    <li>
                        <a href={Chapter14} target='iframe_slides'>Chapter14</a>
                    </li>

                    <li style = {liStyle} >
                        Supplementary Materials
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/1-MMAuthoring.pdf' target='iframe_slides'>Week1: Multimedia Authoring</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/2-Img-reps.pdf' target='iframe_slides'>Week2: Image Representations</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/4-Color-reps.pdf' target='iframe_slides'>Week3: Color Representations</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/5-DCT-implementation.pdf' target='iframe_slides'>Week4: DCT matrix implementation</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/6-DCT-basis.pdf' target='iframe_slides'>Week5: Analogy to DCT basis functions</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/6-Arith-coding-example.pdf' target='iframe_slides'>Week6: Arithmetic Coding Example</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/6-diff-coding-lossy.pdf' target='iframe_slides'>Week7: Notes on Lossy Differential Coding</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/10-MPEG-2-SNR-scalability.pdf' target='iframe_slides'>Week9: MPEG-2 SNR Scalability</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/11-Integer-transform.pdf' target='iframe_slides'>Week10: Derivation of the Integer Transform Matrix</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/H264_Codec_Notes.pdf'target='iframe_slides'>Week10: ** Implementation details about H.264 Codec</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/H266.pdf' target='iframe_slides'>Week11: Features of H.266 (VVC)</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/Notes-MPEG-audio.pdf' target='iframe_slides'>Chapter12: Notes on MPEG audio compression</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/lectureslides/12-MPEG-audio.pdf' target='iframe_slides'>Chapter12: ** Additional Notes on Audio Compression</a>
                    </li>
                    </ul>
                </nav>
                    <iframe 
                        src={Intro} name='iframe_slides'
                        height="700" width="70%"/>
                </section>

                
            </div>
        )
    }
}

const headerStyle = {
    background: '#000',
    color: '#fff',
    padding: '25px',
    textAlign: 'center',
    fontSize: '25px'
}

const liStyle =  {
    listStyle: 'none',
    fontSize: '20px',
    padding: '10px',
}

const navStyle =  {
    float: 'left',
    width: '30%',
    height: '700px',
    background: '#ccc',
}

const ulStyle = {
    style: 'none',
    padding: '0px'
}

export default CourseContentPageInfo;