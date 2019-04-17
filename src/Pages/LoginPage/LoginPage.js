import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classes from './LoginPage.module.css';

class LoginPage extends Component{
    state={
        username: null,
        password: null,
        authUsername: 'mmtext@sfu.ca',
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

    setAuthToken = () =>{
        let date = new Date()
        let authTime = date.getTime();

        //convert to milliseconds
        authTime = authTime / 1000;
        authTime = authTime + 3000;
        localStorage.setItem('authToken', authTime.toString())
        let test = localStorage.getItem('authToken')
        console.log('sessionStorage: ', test)
    }

    loginHandler = ()=>{
        console.log("button clicked")
        this.setAuthToken()
        let username = this.state.username;
        console.log(username)
        let password = this.state.password;
        console.log(password)
        if(username === 'mmtext@sfu.ca' && password==='multimedia'){
            console.log("correct password")
            //generate web token

            this.props.authenticateUser();
        } else {
            alert('wrong username or password')
        }
    }

    render(){
        return (
            <div className={classes.Login}>
                <h1>Login</h1>
                <h6>Welcome back! Login to access to multimedia website</h6>
                <Form onSubmit={this.loginHandler}>
                    <FormGroup>
                        <Label className={classes.Label}>Email</Label>
                        <Input
                            type="email" 
                            name="email" 
                            placeholder="please enter email"
                            value={this.state.value} 
                            onChange={this.userNameHandler}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={classes.Label}>Password</Label>
                        <Input
                            name="password" 
                            placeholder="please enter password"
                            type="password"
                            onChange={this.passwordHandler}></Input>
                    </FormGroup>
                    <Button className={classes.Submitbutton}>Submit</Button>
                </Form>
            </div>
        )
    }
}


export default LoginPage;