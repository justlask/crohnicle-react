import React, { Component } from 'react'
import AuthService from './Auth/AuthService'
import { Link, Redirect } from 'react-router-dom';
import Button from './Button'
import Status from './Profile/Status'
import Posts from './Profile/Posts'

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {user: this.props.user}
    this.service = new AuthService();
  }


  handleStatusUpdate = (info) => {
    console.log('okkkkkay')
    console.log(info)
    this.setState({user: info})
  }

  render() {
    if (this.props.user.loggedInUser) {
      return (
      <div> 
        <div>
        <p>you're logged in, {this.props.user.loggedInUser.username}</p>
        <Button name="logout" onClick={() => this.service.logout()}></Button>
        </div>
        <Status user={this.state.user} updateUser={this.props.updateUser} handleStatusUpdate={this.handleStatusUpdate}/>
        <Posts user={this.state.user} updateUser={this.props.updateUser} />
      </div>

      )
    }
    else {
      return (
        <Redirect to="/" />
      )
    }
  }
}
