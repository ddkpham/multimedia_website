
import React, {Component} from 'react';
import CourseContentPageInfo from '../../component/CourseContentPageInfo/CourseContentPageInfo';


class CourseContentPage extends Component{
    render(){
        return(
            <div style = {bodyStyle}>
                <CourseContentPageInfo />
            </div>

        )
    }
}

const bodyStyle = {
    marginTop: '70px'
}

export default CourseContentPage;