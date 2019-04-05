import React from 'react';

import classes from './Intro.module.css'

const intro = ( props ) => (
    <div className={classes.Intro}>
        <h1 style = {h1Style}>Welcome to our JPEG Compression Application</h1>
        <p>By David Pham and Simon Barer</p>
        <p>We wrote this using React, Flask and PIL</p>
        <p>This was written to illustrate JPEG Compression</p>
        <p>Pick a photo and get started</p>
        <p>Don't forget to choose a scaling factor</p>
    </div>
)

const h1Style =  {
    marginBottom: '30px',
    textDecoration: 'none',
    textAlign: 'center'
}
export default intro;