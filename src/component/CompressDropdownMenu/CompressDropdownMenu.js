import React from 'react';
import classes from './CompressDropdownMenu.module.css';


class CompressDropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
       compressVal: null
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  setCompressionVal = (compressVal) =>{
      console.log(compressVal)
      this.props.compressHandler(compressVal)
      this.setState({compressVal:compressVal})

  }

  render() {
    let compressVal = <h4>Quality</h4>
    if (this.state.compressVal !== null){
        compressVal = <h4>{this.state.compressVal}</h4>
    }
    return (
        <div  className={classes.dropdown} style = {{background:"#ff6161",width:"200px", height:"40px"}} >
         <div className={classes.button} onClick={this.showDropdownMenu}> {compressVal} </div>

          { this.state.displayMenu ? (
          <ul>
         <li><a onClick={()=>this.setCompressionVal("1")}>1</a></li>
         <li><a onClick={()=>this.setCompressionVal("2")}>2</a></li>
         <li><a onClick={()=>this.setCompressionVal("3")}>3</a></li>
         <li><a onClick={()=>this.setCompressionVal("4")}>4</a></li>
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

export default CompressDropdown;