import React, { Component } from 'react'
import AuthService from './Auth/AuthService'
import { Link,  } from 'react-router-dom'
import Button from './Button'

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
  }
  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.updateUser(null);  
    })
  }

  render() {
    if (this.props.user) {
      return (
        <header>
          <Link to="/"><h1 className="pink">crohnicles</h1></Link>
          <nav>
            <Link to="/groups">groups</Link>
            <Link to="/events">events</Link>
            <Link to="/friends">friends</Link>
            <Button name="logout" onClick={() => this.logoutUser()}></Button>
          </nav>
        </header>
      )
    }
    else {
      return (
        <header>
          <Link to="/"><h1 className="pink">crohnicles</h1></Link>
          <nav>
            <Link to="/login">log in</Link>
            <Link to="/signup">sign up</Link>
          </nav>
        </header>
      )
    }
  }
}
