import React, { Component } from 'react'
import SecondaryNav from '../SecondaryNav'
import AuthService from '../Auth/AuthService'
import Button from '../Button'

export default class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: [],
      notFriends: []
    }
    this.service = new AuthService();
  }

  findFriends = (e) => {
    e.preventDefault();
    console.log(this.props.user)

    this.service.findFriends(this.props.user)
    .then(response => {
      console.log(response)
        this.setState({notFriends: response});
    })
    .catch( error => console.log(error) )
    console.log('these are not your friends')
  }

  showFriends = () => {
    console.log('these are your friends')
  }

  render() {
    return (
      <main>
        <nav style={{color: '#4E1681'}}>
          <Button name="find friends" onClick={(e) => this.findFriends(e)}></Button>
          <Button name="my friends" onClick={(e) => this.showFriends(e)}></Button>
        </nav>
        sup these are your friends



        <div>
          <p>{this.props.user.username}</p>
        </div>
      </main>
    )
  }
}
