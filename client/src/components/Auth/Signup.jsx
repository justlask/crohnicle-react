import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: ''};
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    const type = this.state.type
  
    this.service.signup(username, password, email, type)
    .then(response => {
        this.setState({
            username: "", 
            password: "",
        });
        this.props.updateUser(response)
        this.props.history.push('/dashboard')
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => { 
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSelect = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }


  render(){
    return(
      <div className="signupbox">
        <h1>Signup</h1>
        <div className="form">
          <form onSubmit={this.handleFormSubmit} className="signup-login">

          <div className="floatinglabel">
            <label htmlFor="username" >Username</label>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={ e => this.handleChange(e)} /><br></br>
          </div>

          <div className="floatinglabel">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="email" required onChange={ e => this.handleChange(e)} /><br></br>
          </div>

          <div className="floatinglabel">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
          </div>


          <select name="type" id="type" required onChange={this.handleSelect}>
            <option defaultValue="" selected disabled>select account type</option>
            <option defaultValue="crohnie">patient</option>
            <option defaultValue="ally">ally</option>
            <option defaultValue="caregiver">caregiver</option>
            <option defaultValue="professional">medical professional</option>
          </select><br></br>

            <input className="submitbtn" type="submit" value="Signup" />
          </form><br></br>

          <p>Already have account? 
              <Link to={"/login"}> Login</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default Signup;