import React, { Component } from 'react';

import ImageManager from '../../containers/ImageManager/ImageManager';
import Intro from './JPEGIntro/Intro'
class JPEG extends Component{

    render (){
        return(
            <div>
                <h1>JPEG</h1>
                
                <Intro />
                <ImageManager />
            </div>
        )
    }
}

export default JPEG;