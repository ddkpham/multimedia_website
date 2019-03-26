import React, {Component} from 'react';
import Project_topic from '../../assets/material/365-term-project-topics.pdf';
import Library from '../../assets/images/library.png';


class CourseWorkPageInfo extends Component{
    render(){
        return(
            <div> 
                <header style = {headerStyle}>
                <h2>Course Work</h2>
                </header>

                <img style = {imgStyle} src={Library} alt='library'></img>
                <ul style = {ulStyle}>
                    <li style = {liStyle} >
                        Grades
                    </li>
                    <li>
                        <a href='https://coursys.sfu.ca/'>Go to coursys</a>
                    </li>
                    <br></br>
                    <li style = {liStyle} >
                        Assignments
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/work/PA1.html'>Assignment1</a>
                    </li>
                    <li>
                        <a href='http://www.cs.sfu.ca/CourseCentral/365/li/material/work/PA2.html'>Assignment2</a>
                    </li>
                    <li>
                        <a href={Project_topic}>Possible Term Project Topics</a>
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
    marginTop: '45px',
    marginBottom: '10px',
    width: '170px',
    height: '170px'
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

const ulStyle = {
    style: 'none',
    padding: '0px'
}

export default CourseWorkPageInfo;