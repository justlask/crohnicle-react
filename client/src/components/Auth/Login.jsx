import React, { useState } from 'react';
import AuthService from './AuthService';
import FlashMessage from '../FlashMessage';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState({username: '', password: ''});


  const handleFormSubmit = (event) => {
    event.preventDefault();

    const username = user.username;
    const password = user.password;

    service.login(username, password)
    .then( response => {
      props.updateUser(response)
      props.history.push('/dashboard')
    })
    .catch( error => console.log(error) )
  }
    
  const handleChange = (event) => {  
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  return ( 
    <div className="signupbox">
      <h1>Log in</h1>
      <div className="form">
        <form onSubmit={handleFormSubmit} className="signup-login">
          <div className="floatinglabel">
            <label>Username</label>
            <input type="text" name="username" placeholder="username" value={user.username} onChange={ e => handleChange(e)}/><br></br>
          </div>
          <div  className="floatinglabel">
            <label>Password</label>
            <input type="password" name="password" placeholder="password" value={user.password} onChange={ e => handleChange(e)} /><br></br>
          </div> 
          <FlashMessage isHidden="false" message="helloooo" />            
          <input type="submit" value="Log in" className="submitbtn" />
        </form><br></br>
        <p>Don't have account? 
          <Link to={"/signup"}> Sign up</Link>
        </p>
      </div>
    </div> 
  )
}

export default Login;