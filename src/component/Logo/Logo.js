import React from 'react';

import JPEGLogo from '../../assets/images/sfulogo.png';
import classes from './Logo.module.css';

const logo = ( props ) => (
    <div className={classes.Logo} >
        <img src={JPEGLogo} alt='JPEG'></img>
    </div>
);

export default logo