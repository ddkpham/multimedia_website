import React, {Component} from 'react';
import classes from './LoginPage.module.css';

class LoginPage extends Component{
    state={
        username: null,
        password: null,
        authUsername: 'mmtext',
        authPassword: 'multimedia'
    }

    userNameHandler = (event)=>{
        console.log(event.target.value)
        let username = event.target.value;
        this.setState({username: username})
    }

    passwordHandler = (event)=>{
        console.log(event.target.value)
        let password = event.target.value;
        this.setState({password:password})
    }

    loginHandler = ()=>{
        console.log("button clicked")
        let username = this.state.username;
        console.log(username)
        let password = this.state.password;
        console.log(password)
        if(username === 'mmtext' && password==='multimedia'){
            console.log("correct password")
            this.props.authenticateUser();
        } else {
            alert('wrong username or password')
        }
    }

    render(){
        return (
            <div className={classes.Login}>
                <h1>Login Page</h1> <br />
                <form onSubmit={this.loginHandler}>
                    <label>
                        <h3>Username</h3><br />
                        <input type="text" value={this.state.value} onChange={this.userNameHandler} /> <br />
                    </label>
                    <br />
                    <label>
                        <h3>Password</h3><br />
                        <input type="password"  onChange={this.passwordHandler} /> <br />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default LoginPage;