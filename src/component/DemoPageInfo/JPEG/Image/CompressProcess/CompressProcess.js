import React, {Component} from 'react';
import Aux from '../../../../../hoc/Aux';
import Button from '../../../../UI/Button/Button';
import classes from './CompressProcess.module.css'
import ImageDropdown from '../../ImageDropdownMenu/ImageDropdownMenu'
import CompressDropdown from '../../CompressDropdownMenu/CompressDropdownMenu'
class CompressProcess extends Component{
    render(){
        let text = null;
        if(this.props.loadingImage){
            text = <h1>Loading Image...</h1>
        }
        else{
            text = (
                <div className={classes.Modal}>
                    <h3>Welcome</h3>
                    <p>Select the image you would like to compress</p>
                </div>
            )
        }
        return(
            <Aux>
                {text}
                <ImageDropdown imageHandler={this.props.imageHandler} />
                <br />
                <p>Please select Quantization value (1-10)</p>
               
                <CompressDropdown compressHandler={this.props.compressHandler} />
                <Button
                    clicked={this.props.cancel}
                    btnType='Danger'
                >CANCEL</Button>
                <Button
                    clicked={this.props.confirm}
                    btnType='Success'
                >CONTINUE</Button>
            </Aux>
        );
    }
}

export default CompressProcess;