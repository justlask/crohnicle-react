import React, { useState } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

const Signup = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState({username: '', password: '', email: '', type: ''});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = user.username;
    const password = user.password;
    const email = user.email;
    const type = user.type;
  
    service.signup(username, password, email, type)
    .then(response => {
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

  return(
    <div className="signupbox">
      <h1>Signup</h1>
      <div className="form">
        <form onSubmit={handleFormSubmit} className="signup-login">
          <div className="floatinglabel">
            <label htmlFor="username" >Username</label>
            <input type="text" name="username" placeholder="username" value={user.username} onChange={ e => handleChange(e)} /><br></br>
          </div>

          <div className="floatinglabel">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="email" value={user.email} required onChange={ e => handleChange(e)} /><br></br>
          </div>

          <div className="floatinglabel">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" value={user.password} onChange={ e => handleChange(e)} /><br></br>
          </div>

          <select name="type" id="type" required onChange={(e) => handleChange(e)}>
            <option selected disabled>select account type</option>
            <option value="crohnie">patient</option>
            <option value="ally">ally</option>
            <option value="caregiver">caregiver</option>
            <option value="professional">medical professional</option>
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

export default Signup;