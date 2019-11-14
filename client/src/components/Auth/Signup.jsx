
import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link, Redirect } from 'react-router-dom';
import Button from '../Button'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', hasSignedUp: false };
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
  
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            hasSignedUp: true
        });
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => { 
    const {name, value} = event.target;
    this.setState({[name]: value});
  }


  render(){
    if (this.state.hasSignedUp) {
      return <Redirect to='/login' />
    }

    return(
      <div className="signupbox">
        <h1>Signup</h1>
        <form onSubmit={this.handleFormSubmit} className="signup-login">
        <div>
          <label >Username</label>
          <input type="text" name="username" placeholder="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="email" required />
        </div>

        <select name="type" id="type" required>
          <option value="" selected disabled>select account type</option>
          <option value="crohnie">patient</option>
          <option value="ally">ally</option>
          <option value="caregiver">caregiver</option>
          <option value="professional">medical professional</option>
        </select>

          
        <div>
          <label>Password</label>
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
        </div>
          <input className="submitbtn" type="submit" value="Signup" />
        </form>

        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p>
    </div>
    )
  }
}

export default Signup;