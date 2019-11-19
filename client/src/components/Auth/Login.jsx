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
        this.props.updateUser(response)
        this.props.history.push('/dashboard')
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }


  render(){
      return ( 
          <div className="signupbox">
            <div className="form">
              <form onSubmit={this.handleFormSubmit} className="signup-login">
                <h1>Log in</h1>
                <div  className="floatinglabel">
                  <label>Username</label>
                  <input type="text" name="username" placeholder="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
                </div>

                <div  className="floatinglabel">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
                </div>
                      
                  <input type="submit" value="Login" className="submitbtn" />
                  </form><br></br>
                  <p>Don't have account? 
                      <Link to={"/signup"}> Signup</Link>
                  </p>
            </div>
          </div> 
      )
  }
}

export default Login;