import React, { useState } from 'react'
import AuthService from './AuthService'

const ResetPassword = () => {
  const service = new AuthService();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    service.resetPassword(email)
    .then(response => {
      setSent(true)
    })
  }

  if (sent) {
    return (
      <main>
        <p>We have sent your temporary password to your email</p>
        <p>If you do not recieve it, please check your spam folder.</p>
      </main>
    )
  }
  else {
    return (
      <div className="signupbox">
        <h1>Lost Password?</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label><br></br>
          <input type="text" placeholder="email" id="email" value={email} onChange={(e) => handleChange(e)}/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default ResetPassword;