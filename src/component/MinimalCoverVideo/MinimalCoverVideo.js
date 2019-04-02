import React, {Component} from 'react';
import VideoCover from 'react-video-cover';

class MinimalCoverExample extends Component {

    componentDidMount(){
      this.videoRef.muted = true;
      this.videoRef.loop = true;
      this.videoRef.play();
    }

    render() {
      let videoPath = process.env.PUBLIC_URL + '/ink.mp4'
      switch(this.props.randNum){
          case 0:
            videoPath = process.env.PUBLIC_URL + '/ink.mp4'
            break;
          case 1:
            videoPath = process.env.PUBLIC_URL + '/sky.mp4'
            break;
          case 2:
            videoPath = process.env.PUBLIC_URL + '/flower.mp4'
            break;
          case 3:
            videoPath = process.env.PUBLIC_URL + '/seal.mp4'
            break;
      }
      const videoOptions = {
        src: videoPath,
        ref: videoRef => {
          this.videoRef = videoRef;
        },
        onClick: () => {
          if (this.videoRef && this.videoRef.paused) {
            this.videoRef.play();
          } else if (this.videoRef) {
            this.videoRef.pause();
          }
        },
        title: 'click to play/pause',
      };
      return (
        <div style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}>
            <VideoCover
                videoOptions={videoOptions}
            />
        </div>
      );
    }
  }

export default MinimalCoverExample;