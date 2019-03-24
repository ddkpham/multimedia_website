import React, {Component} from 'react';

import classes from './HomeVideo.module.css'

class HomeVideo extends Component{

    state = {
        videoURL:"http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
    }
    render(){
        return(
            <div id='video-container'className={classes.HomeVideo}>
                <video id="background-video" loop autoPlay>
                    <source src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                    <source src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
                <h1>Home Video</h1>
            </div>
            
        )
    }
}

export default HomeVideo;