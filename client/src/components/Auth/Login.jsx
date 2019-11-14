import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = { username: '', password: '' };
      this.service = new AuthService();
    }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        return this.props.updateUser({loggedInUser: response})
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }



  render(){
    console.log(this.props)
    if(this.props.user.loggedInUser){
      return(
        <Redirect to="/dashboard" />
      )
    } else {
      return ( 
          <div className="signupbox">
            <form onSubmit={this.handleFormSubmit} className="signup-login">
            <h1>Login</h1>
              <div>
                <label className="icons">Username</label>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
              </div>
              <div>
                <label className="icons">Password</label>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
              </div>
                    
                <input type="submit" value="Login" className="submitbtn" />
                </form>
                <p>Don't have account? 
                    <Link to={"/signup"}> Signup</Link>
                </p>
            </div> 
      )
    }
  }
}

export default Login;