import React, {Component} from 'react';
import Project_topic from '../../assets/material/365-term-project-topics.pdf';
import Library from '../../assets/images/library.png';
import classes from './CourseWorkPageInfo.module.css';
import config from '../../Config/config'


class CourseWorkPageInfo extends Component{
    render(){
        let coursys = null;
        if(config.courseWork.coursys){
            coursys = <a href='https://coursys.sfu.ca/'>Go to coursys</a>
        }
        let assignment1 = null;
        if(config.courseWork.assignment1){
            assignment1 = <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/work/PA1.html'>Assignment1</a>
        }
        let assignment2 = null;
        if(config.courseWork.assignment2){
            assignment2 = <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/work/PA2.html'>Assignment2</a>
        }
        let term_project = null;
        if(config.courseWork.term_project){
            term_project = <a href={Project_topic}>Possible Term Project Topics</a>
        }
        return(
            <div className={classes.CourseWorkPageInfo}> 
                <p className={classes.Header} >Course Work</p>

                <img style = {imgStyle} src={Library} alt='library'></img>
                <ul style = {ulStyle}>
                    <li style = {liStyle} >
                        Grades
                    </li>
                    <li>
                        {coursys}
                    </li>
                    <br></br>
                    <li style = {liStyle} >
                        Assignments
                    </li>
                    <li>
                        {assignment1}
                    </li>
                    <li>
                        {assignment2}
                    </li>
                    <li>
                        {term_project}
                    </li>
                    <br></br>
                    <li style = {liStyle} >
                        Emails
                    </li>
                    <li>
                        <a href="mailto:li@sfu.ca"> Send mail to the Instructor</a>
                    </li>
                    <li>
                        <a href="mailto:alan_mao@sfu.ca"> Send mail to the TA</a>
                    </li>
                    <li>
                        <a href="mailto:csilop@sfu.ca"> Send mail to the lab staff</a>
                    </li>
                </ul>
                <br></br>
            </div>
        )
    }
}

const imgStyle = {
    marginBottom: '40px',
    width: '170px',
    height: '170px'
}

const liStyle =  {
    listStyle: 'none',
    fontSize: '20px',
    padding: '10px',
}

const ulStyle = {
    style: 'none',
    padding: '0px'
}

export default CourseWorkPageInfo;