import React, {Component} from 'react';
import VideoCover from 'react-video-cover';

class MinimalCoverExample extends Component {

    componentDidMount(){
      this.videoRef.muted = true;
      this.videoRef.loop = true;
      this.videoRef.play();
    }
    
    render() {
      let test = process.env.PUBLIC_URL + '/ink.mp4'
      const videoOptions = {
        src: test,
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