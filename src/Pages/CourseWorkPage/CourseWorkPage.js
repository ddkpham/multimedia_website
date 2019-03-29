
import React, {Component} from 'react';
import CourseWorkPageInfo from '../../component/CourseWorkPageInfo/CourseWorkPageInfo';


class CourseWorkPage extends Component{
    render(){
        return(
            <div style = {bodyStyle}>
                <CourseWorkPageInfo />
            </div>

        )
    }
}

const bodyStyle = {
    marginTop: '70px'
}

export default CourseWorkPage;