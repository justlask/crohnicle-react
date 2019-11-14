import React, { Component } from 'react'
import AuthService from './Auth/AuthService'
import Button from './Button'

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
  }

  render() {
    if (this.props.user.loggedInUser) {
      return (
      <div> you're logged in, {this.props.user.loggedInUser.username}
        <Button name="logout" onClick={() => this.service.logout()}></Button>
      </div>

      )
    }
    else {
      return (
      <div>you're not logged in</div>
      )
    }
  }
}
