import React, {Component} from 'react';
import textbook from '../../assets/images/textbook.jpg';

import classes from './HomePageInfo.module.css'
class HomePageInfo extends Component{
    render(){
        const imgStyle = {
                display:'block',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '50px',
                marginBottom: '50px',
                align:'middle',
                width:'200px',
                height: '260px'
        }
        return(
            
            <div className={classes.HomePageInfo}>
                <div className={classes.ClassInfo}>
                    <h1>Class Info</h1>

                    <h3>Lecture Time : MWF 1:30-2:30</h3>
                    <h3>Classrom : AQ3003</h3>
                    <p>CSIL, Room ASB98700, 9804, etc.</p>
                    <p>For CSIL information, see <a href="http://www.sfu.ca/computing/about/support/csil.html">CSIL SUPPORT</a></p>
                    
                    <h3>CSIL:</h3>

                    <p>PC Workstation Map, see <a href={process.env.PUBLIC_URL + '/csil_layout.pdf'}>CSIL SUPPORT</a> </p>
                    <p>To get an access card, see <a href="http://www.sfu.ca/computing/about/support/tips/door-access.html">here</a></p>
                    <p>For remote desktop access to the CSIL lab, see <a href="http://www.sfu.ca/computing/about/support/csil/how-to-remote-access-to-csil.html">here</a></p>
                </div>
                <div id='class-image' className={classes.ClassImage}>
                    <h1>Fundamentals of Multimedia</h1>
                    <h1>2nd Edition </h1>
                    <img style={imgStyle} src={textbook} alt="textbook"></img>
                    <h2>ISBN: 978-3-319-05289-2, Springer (students can download via www.lib.sfu.ca)</h2>
                    <p><a href="http://www.cs.sfu.ca/mmbook/">http://www.cs.sfu.ca/mmbook/</a> (1st ed., plus student resources)</p>
                </div>
            </div>
        )
    }
}

export default HomePageInfo;