import React , {Component} from 'react';

import classes from '../IntervalBar/IntervalBar.module.css'

class IntervalBar extends Component{
    render(){
        let width = this.props.end - this.props.start 
        let aNumHeader = (width * 0.4) + parseFloat(this.props.start);
        aNumHeader = aNumHeader.toFixed(2);
        let bNumHeader = width * 0.7 + parseFloat(this.props.start);
        bNumHeader = bNumHeader.toFixed(2);
        let cNumHeader = width * 0.9 + parseFloat(this.props.start);
        cNumHeader = cNumHeader.toFixed(2);
        
        return(
            <div>
                <div className={classes.Text}>
                    <span className={classes.atext}>{this.props.start}</span>
                    <span className={classes.btext}>{aNumHeader}</span>
                    <span className={classes.ctext}>{bNumHeader}</span>
                    <span className={classes.dtext}>{cNumHeader}</span>
                    <span className={classes.endtext}>{this.props.end}</span>

                </div>
                <div className={classes.IntervalBar}>
                
                    <div className={classes.a}> a</div>
                    <div className={classes.b}>b</div>
                    <div className={classes.c}>c</div>
                    <div className={classes.end}>$</div>

                </div>
            </div>
            
        )
    }
}

export default IntervalBar;