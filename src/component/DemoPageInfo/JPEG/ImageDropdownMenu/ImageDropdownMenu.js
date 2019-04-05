import React from 'react';
import classes from './ImageDropdownMenu.module.css';


class ImageDropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
       photo: null
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

  setImage = (fileName) =>{
      console.log(fileName)
      this.props.imageHandler(fileName)
      let photoSelected = fileName.split('.jpg')
      console.log(photoSelected)
      photoSelected = photoSelected[0]
      photoSelected = photoSelected.split("");
      photoSelected[0] = photoSelected[0].toUpperCase();
      photoSelected = photoSelected.join("")
      //console.log(photoSelected)
      this.setState({photo:photoSelected})

  }

  render() {
    let photo = <h4>Photo</h4>
    if (this.state.photo !== null){
        photo = <h4>{this.state.photo}</h4>
    }
    return (
        <div  className={classes.dropdown} style = {{background:"#ff6161",width:"200px", height:"40px"}} >
         <div className={classes.button} onClick={this.showDropdownMenu}> {photo} </div>

          { this.state.displayMenu ? (
          <ul>
         <li onClick={()=>this.setImage("lena.jpg")}><a>Lena</a></li>
         <li onClick={()=>this.setImage("space.jpg")}><a>Space</a></li>
         <li onClick={()=>this.setImage("puppy.jpg")}><a>Puppy</a></li>
         <li onClick={()=>this.setImage("kitty.jpg")}><a>Kitty</a></li>
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

export default ImageDropdown;